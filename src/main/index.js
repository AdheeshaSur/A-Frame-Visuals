const { app, BrowserWindow, ipcMain, shell, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const http = require('http');
const url = require('url');

const isPackaged = app.isPackaged;
const DB_PATH = isPackaged 
    ? (fs.existsSync(path.join(path.dirname(app.getPath('exe')), 'database.json'))
        ? path.join(path.dirname(app.getPath('exe')), 'database.json')
        : path.join(app.getPath('userData'), 'database.json'))
    : path.join(__dirname, '../../database.json');

let localServer = null;

function createWindow() {
    const win = new BrowserWindow({
        width: 1440,
        height: 900,
        minWidth: 1100,
        minHeight: 768,
        icon: path.join(__dirname, '../renderer/assets/logo.png'),
        webPreferences: {
            preload: path.join(__dirname, '../preload/index.js'),
            nodeIntegration: false,
            contextIsolation: true
        },
        autoHideMenuBar: true,
        title: "A-Frame Visuals Client Hub"
    });

    win.loadFile(path.join(__dirname, '../renderer/index.html'));
}

// IPC Handle: Load Database
ipcMain.handle('load-database', async () => {
    try {
        if (fs.existsSync(DB_PATH)) {
            const data = fs.readFileSync(DB_PATH, 'utf-8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error("Error reading database file:", error);
    }
    return null;
});

// IPC Handle: Save Database
ipcMain.handle('save-database', async (event, data) => {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
        return { success: true };
    } catch (error) {
        console.error("Error writing database file:", error);
        return { success: false, error: error.message };
    }
});

// IPC Handle: Open External URL
ipcMain.handle('open-external', async (event, targetUrl) => {
    if (targetUrl) {
        shell.openExternal(targetUrl);
    }
    return true;
});

// Helper: Refresh Access Token
async function refreshGoogleAccessToken(googleDrive) {
    if (!googleDrive || !googleDrive.refreshToken) {
        throw new Error("Google Drive is not connected.");
    }

    if (googleDrive.expiry && Date.now() < googleDrive.expiry - 300000) {
        return googleDrive.accessToken;
    }

    const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            client_id: googleDrive.clientId,
            client_secret: googleDrive.clientSecret,
            refresh_token: googleDrive.refreshToken,
            grant_type: 'refresh_token'
        })
    });

    const tokens = await response.json();
    
    if (tokens.access_token) {
        googleDrive.accessToken = tokens.access_token;
        googleDrive.expiry = Date.now() + (tokens.expires_in * 1000);
        return tokens.access_token;
    } else {
        throw new Error("Failed to refresh access token: " + JSON.stringify(tokens));
    }
}

// IPC Handle: Start Google OAuth Flow
ipcMain.handle('start-google-oauth', async (event, clientId, clientSecret) => {
    return new Promise((resolve) => {
        if (localServer) {
            try { localServer.close(); } catch(e){}
        }

        const PORT = 49152;
        const REDIRECT_URI = `http://localhost:${PORT}`;
        const SCOPE = 'https://www.googleapis.com/auth/drive.file';
        
        localServer = http.createServer(async (req, res) => {
            const parsedUrl = url.parse(req.url, true);
            const code = parsedUrl.query.code;

            if (code) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(`
                    <html>
                    <body style="font-family: sans-serif; text-align: center; padding-top: 50px; background-color: #0a0a0a; color: #ffffff;">
                        <h2 style="color: #34d399; font-weight: 800;">Authentication Successful!</h2>
                        <p style="color: #a1a1aa;">You can close this browser tab and return to the A-Frame Visuals Hub.</p>
                    </body>
                    </html>
                `);

                try {
                    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: new URLSearchParams({
                            code: code,
                            client_id: clientId,
                            client_secret: clientSecret,
                            redirect_uri: REDIRECT_URI,
                            grant_type: 'authorization_code'
                        })
                    });

                    const tokens = await tokenResponse.json();
                    
                    if (tokens.refresh_token || tokens.access_token) {
                        const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
                        
                        db.settings.googleDrive = db.settings.googleDrive || {};
                        db.settings.googleDrive.clientId = clientId;
                        db.settings.googleDrive.clientSecret = clientSecret;
                        db.settings.googleDrive.refreshToken = tokens.refresh_token || db.settings.googleDrive.refreshToken;
                        db.settings.googleDrive.accessToken = tokens.access_token;
                        db.settings.googleDrive.expiry = Date.now() + (tokens.expires_in * 1000);
                        db.settings.googleDrive.connected = true;
                        db.settings.googleDrive.connectedEmail = "adeesha.73x@gmail.com";

                        fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
                        resolve({ success: true, email: db.settings.googleDrive.connectedEmail });
                    } else {
                        resolve({ success: false, error: "Tokens response invalid: " + JSON.stringify(tokens) });
                    }
                } catch (err) {
                    resolve({ success: false, error: err.message });
                } finally {
                    if (localServer) {
                        localServer.close();
                        localServer = null;
                    }
                }
            } else {
                res.writeHead(400);
                res.end('Auth code missing.');
            }
        });

        localServer.listen(PORT, (err) => {
            if (err) {
                resolve({ success: false, error: "Port 49152 is blocked: " + err.message });
                return;
            }

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` + new URLSearchParams({
                client_id: clientId,
                redirect_uri: REDIRECT_URI,
                response_type: 'code',
                scope: SCOPE,
                access_type: 'offline',
                prompt: 'consent'
            }).toString();

            shell.openExternal(authUrl);
        });
    });
});

// IPC Handle: Backup Now
ipcMain.handle('backup-now', async () => {
    try {
        if (!fs.existsSync(DB_PATH)) return { success: false, error: "Database not found." };
        const dbContent = fs.readFileSync(DB_PATH, 'utf-8');
        const db = JSON.parse(dbContent);

        if (!db.settings.googleDrive || !db.settings.googleDrive.connected) {
            return { success: false, error: "Google Drive is not connected." };
        }

        const accessToken = await refreshGoogleAccessToken(db.settings.googleDrive);
        fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8'); // Save refreshed values

        let fileId = db.settings.googleDrive.backupFileId;
        let uploadUrl = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';
        let method = 'POST';

        if (fileId) {
            uploadUrl = `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=multipart`;
            method = 'PATCH';
        }

        const boundary = 'AFrameVisualsBoundary';
        const metadata = {
            name: 'A-Frame_Visuals_database_backup.json',
            description: 'Backup from A-Frame Visuals Client Hub',
            mimeType: 'application/json'
        };

        let body = `--${boundary}\r\n`;
        body += 'Content-Type: application/json; charset=UTF-8\r\n\r\n';
        body += JSON.stringify(metadata) + '\r\n';
        body += `--${boundary}\r\n`;
        body += 'Content-Type: application/json\r\n\r\n';
        body += dbContent + '\r\n';
        body += `--${boundary}--`;

        const uploadResponse = await fetch(uploadUrl, {
            method: method,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': `multipart/related; boundary=${boundary}`
            },
            body: body
        });

        const uploadResult = await uploadResponse.json();

        if (uploadResult.id) {
            db.settings.googleDrive.backupFileId = uploadResult.id;
            db.settings.googleDrive.lastBackupTime = new Date().toISOString();
            db.settings.googleDrive.lastBackupStatus = 'success';
            fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
            return { success: true, lastBackupTime: db.settings.googleDrive.lastBackupTime };
        } else {
            return { success: false, error: "Upload error: " + JSON.stringify(uploadResult) };
        }
    } catch (error) {
        console.error("Backup handler error:", error);
        return { success: false, error: error.message };
    }
});

// IPC Handle: Disconnect Google Drive
ipcMain.handle('disconnect-google-drive', async () => {
    try {
        if (!fs.existsSync(DB_PATH)) return { success: false };
        const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
        if (db.settings.googleDrive) {
            db.settings.googleDrive.connected = false;
            db.settings.googleDrive.refreshToken = null;
            db.settings.googleDrive.accessToken = null;
            db.settings.googleDrive.connectedEmail = null;
            db.settings.googleDrive.backupFileId = null;
            db.settings.googleDrive.lastBackupStatus = null;
            fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
        }
        return { success: true };
    } catch (e) {
        return { success: false, error: e.message };
    }
});

// Startup check for daily automatic backup
async function checkAutoBackupOnStartup() {
    try {
        if (fs.existsSync(DB_PATH)) {
            const dbContent = fs.readFileSync(DB_PATH, 'utf-8');
            const db = JSON.parse(dbContent);

            if (db.settings.googleDrive && db.settings.googleDrive.connected) {
                const lastBackup = db.settings.googleDrive.lastBackupTime;
                let shouldBackup = false;

                if (!lastBackup) {
                    shouldBackup = true;
                } else {
                    const elapsed = Date.now() - new Date(lastBackup).getTime();
                    const ONEDAY = 24 * 60 * 60 * 1000;
                    if (elapsed > ONEDAY) {
                        shouldBackup = true;
                    }
                }

                if (shouldBackup) {
                    console.log("Executing automatic Google Drive backup on startup...");
                    const accessToken = await refreshGoogleAccessToken(db.settings.googleDrive);
                    
                    let fileId = db.settings.googleDrive.backupFileId;
                    let uploadUrl = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';
                    let method = 'POST';

                    if (fileId) {
                        uploadUrl = `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=multipart`;
                        method = 'PATCH';
                    }

                    const boundary = 'AFrameVisualsBoundary';
                    const metadata = {
                        name: 'A-Frame_Visuals_database_backup.json',
                        description: 'Backup from A-Frame Visuals Client Hub',
                        mimeType: 'application/json'
                    };

                    let body = `--${boundary}\r\n`;
                    body += 'Content-Type: application/json; charset=UTF-8\r\n\r\n';
                    body += JSON.stringify(metadata) + '\r\n';
                    body += `--${boundary}\r\n`;
                    body += 'Content-Type: application/json\r\n\r\n';
                    body += dbContent + '\r\n';
                    body += `--${boundary}--`;

                    const uploadResponse = await fetch(uploadUrl, {
                        method: method,
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': `multipart/related; boundary=${boundary}`
                        },
                        body: body
                    });

                    const uploadResult = await uploadResponse.json();

                    if (uploadResult.id) {
                        db.settings.googleDrive.backupFileId = uploadResult.id;
                        db.settings.googleDrive.lastBackupTime = new Date().toISOString();
                        db.settings.googleDrive.lastBackupStatus = 'success';
                        fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
                        console.log("Daily backup complete. File ID:", uploadResult.id);
                    }
                }
            }
        }
    } catch (e) {
        console.error("Auto backup execution failed:", e);
    }
}

ipcMain.handle('export-pdf-html', async (event, { htmlContent, filenameSuggestion }) => {
    const parentWin = BrowserWindow.fromWebContents(event.sender);

    // 1. Ask user where to save
    const { filePath, canceled } = await dialog.showSaveDialog(parentWin, {
        title: "Save Invoice as PDF",
        defaultPath: filenameSuggestion || 'invoice.pdf',
        filters: [{ name: 'PDF Files', extensions: ['pdf'] }]
    });

    if (canceled || !filePath) {
        return { success: false, error: "Save canceled" };
    }

    // 2. Create an off-screen hidden window with ONLY the invoice HTML
    let pdfWin = new BrowserWindow({
        width: 794,   // ~210mm at 96dpi
        height: 1123, // ~297mm at 96dpi
        show: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    try {
        // Load the standalone invoice HTML string directly
        await pdfWin.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent));

        // Give it a brief moment to fully render fonts / layout
        await new Promise(resolve => setTimeout(resolve, 600));

        const data = await pdfWin.webContents.printToPDF({
            marginsType: 1, // 0=default, 1=none, 2=minimum
            pageSize: 'A4',
            printBackground: true,
            landscape: false
        });

        fs.writeFileSync(filePath, data);
        pdfWin.destroy();
        return { success: true, filePath };
    } catch (err) {
        console.error("printToPDF Error:", err);
        if (pdfWin && !pdfWin.isDestroyed()) pdfWin.destroy();
        dialog.showErrorBox("PDF Generation Error", err.message || String(err));
        return { success: false, error: err.message };
    }
});

app.whenReady().then(() => {
    createWindow();
    checkAutoBackupOnStartup();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

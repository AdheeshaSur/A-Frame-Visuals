const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    loadDatabase: () => ipcRenderer.invoke('load-database'),
    saveDatabase: (data) => ipcRenderer.invoke('save-database', data),
    openExternal: (url) => ipcRenderer.invoke('open-external', url),
    startGoogleOauth: (clientId, clientSecret) => ipcRenderer.invoke('start-google-oauth', clientId, clientSecret),
    backupNow: () => ipcRenderer.invoke('backup-now'),
    disconnectGoogleDrive: () => ipcRenderer.invoke('disconnect-google-drive'),
    exportPDFHtml: (htmlContent, filenameSuggestion) => ipcRenderer.invoke('export-pdf-html', { htmlContent, filenameSuggestion })
});

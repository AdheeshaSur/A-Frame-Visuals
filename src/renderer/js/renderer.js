// Central Application Logic for A-Frame Visuals Client Hub (Advanced Production Edition)

const PRODUCTION_STATUSES = [
    'Raw Footage',
    'First Cut',
    'Color Grading',
    'Audio & Sound',
    'Client Review',
    'Delivered'
];

const defaultDB = {
    settings: {
        fromCompany: "A-Frame Visuals",
        fromName: "Adheesha Sooriyaarachchi",
        fromEmail: "adeesha.73x@gmail.com",
        fromPhone: "+94713407686",
        currency: "Rs.",
        bankName: "Sampath Bank",
        bankBranch: "Yakkala",
        accName: "STAC Sooriyaarachchi",
        accNo: "1068 5781 5932",
        theme: "dark",
        accentColor: "monochrome",
        invoiceTemplate: "classic",
        pricingPresets: [
            { id: "preset-basic-cut", name: "Basic Cut & Background Music", price: 1800 },
            { id: "preset-cut-text", name: "Standard Cut & Subtitles", price: 2300 },
            { id: "preset-overlay-text", name: "Premium Edit with Overlays", price: 2800 },
            { id: "preset-ai-full", name: "Full AI Video Production", price: 5800 },
            { id: "preset-ai-animate", name: "AI Animation (Experimental)", price: 1000 }
        ]
    },
    clients: [
        {
            id: "client-salindu",
            name: "Mr. Salindu Madhukrisha",
            company: "Salindu Productions",
            email: "salindu@example.com",
            invoiceNo: "#AF-098",
            invoiceDate: "2026-06-17",
            notes: "Frequent client. Prefers high-end visual color grading. Bulk video project editing.",
            items: [
                { title: "Salindu Sir 01", desc: "Bike පදිනකොට", type: "Facebook Reel", price: 1500, date: "2026-05-10", status: "Paid", prodStatus: "Delivered" },
                { title: "Salindu Sir 02", desc: "කඳු ශේඩ් වෙලා හැදෙන්නෙ", type: "Facebook Reel", price: 1500, date: "2026-05-14", status: "Paid", prodStatus: "Delivered" },
                { title: "Salindu Sir 03", desc: "පලවෙනි දරුවා වාසනාවන්තයි", type: "Facebook Reel", price: 1500, date: "2026-05-19", status: "Paid", prodStatus: "Delivered" },
                { title: "Salindu Sir 04", desc: "ලස්සන මූණක් ලස්සන කතාවක්", type: "Facebook Reel", price: 1500, date: "2026-05-19", status: "Paid", prodStatus: "Delivered" },
                { title: "Salindu Sir 05", desc: "බුදු ඇස් හෙමින්නේ", type: "Facebook Reel", price: 1500, date: "2026-05-19", status: "Paid", prodStatus: "Delivered" },
                { title: "Salindu Sir 06", desc: "අද පටන් කරලා තියාගන්න", type: "Facebook Reel", price: 1500, date: "2026-05-24", status: "Paid", prodStatus: "Delivered" },
                { title: "Salindu Sir 07", desc: "සරසවියට පෙර සවියක්", type: "Facebook Reel", price: 1500, date: "2026-05-26", status: "Paid", prodStatus: "Delivered" },
                { title: "Salindu Sir 08", desc: "සිහල වල දැනුම", type: "Facebook Reel", price: 1500, date: "2026-05-29", status: "Unpaid", prodStatus: "Raw Footage" },
                { title: "Salindu Sir 09", desc: "හිඟි බිඟි සිංදු සිංදු", type: "Facebook Reel", price: 1500, date: "2026-05-30", status: "Unpaid", prodStatus: "First Cut" },
                { title: "Salindu Sir 10", desc: "පුරාවිද්‍ය", type: "Facebook Reel", price: 1500, date: "2026-06-02", status: "Unpaid", prodStatus: "Color Grading" },
                { title: "Salindu Sir 11", desc: "OL Class", type: "Facebook Reel", price: 1500, date: "2026-06-04", status: "Unpaid", prodStatus: "Audio & Sound" },
                { title: "Salindu Sir 12", desc: "සිංහල ඉගෙන ගන්නවා", type: "Facebook Reel", price: 1500, date: "2026-06-06", status: "Unpaid", prodStatus: "Client Review" },
                { title: "Salindu Sir 13", desc: "වැත්කඩුවේ නයිදරාළගේ දන්සල", type: "Facebook Reel", price: 1500, date: "2026-06-09", status: "Unpaid", prodStatus: "First Cut" },
                { title: "Salindu Sir 14", desc: "උද්දාල ස්වර්ණතිලකා", type: "Facebook Reel", price: 1500, date: "2026-06-12", status: "Unpaid", prodStatus: "Raw Footage" },
                { title: "Salindu Sir 15", desc: "Tere Vaaste", type: "Facebook Reel", price: 1500, date: "2026-06-14", status: "Unpaid", prodStatus: "Color Grading" },
                { title: "Salindu Sir 16", desc: "කෙටි කවිසෙ බුදු දහම..", type: "Facebook Reel", price: 1500, date: "2026-06-16", status: "Unpaid", prodStatus: "Client Review" }
            ]
        },
        {
            id: "client-kalana",
            name: "Mr. Kalana Damsara",
            company: "Damsara Studios",
            email: "kalana@example.com",
            invoiceNo: "#AF-099",
            invoiceDate: "2026-06-17",
            notes: "Prefers clean, minimal transitions. Standard delivery rate.",
            items: [
                { title: "Interview Subtitles & Cut", desc: "Trimming silent periods and adding Sinhala/English subtitles.", type: "Video Editing", price: 15000, date: "2026-06-14", status: "Paid", prodStatus: "Delivered" }
            ]
        },
        {
            id: "client-malith",
            name: "Mr. Malith Edirimuni",
            company: "Edirimuni Creative",
            email: "malith@example.com",
            invoiceNo: "#AF-100",
            invoiceDate: "2026-06-17",
            notes: "Social media marketing content creator.",
            items: [
                { title: "Instagram Reel Compilation", desc: "Combined multiple clips with trending music tracks.", type: "Reel", price: 10000, date: "2026-06-16", status: "Unpaid", prodStatus: "First Cut" }
            ]
        }
    ]
};

let db = { ...defaultDB };
let currentActiveClientId = "";
let selectedDirectoryClientId = "";
let selectedDirectoryEmployeeId = "";

// Calendar & Log State
let currentCalendarDate = new Date();
let selectedDate = formatLocalDate();
let historyClientFilter = "all";
let historyStatusFilter = "all";
let historySearchQuery = "";

function formatLocalDate(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// -------------------------------------------------------------
// TAB SYSTEM NAVIGATION
// -------------------------------------------------------------
function switchTab(tabId, targetEmployeeId = null) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));

    // Deactivate all navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-white', 'text-black', 'font-bold', 'shadow-md');
        btn.classList.add('text-neutral-400', 'hover:text-white', 'hover:bg-neutral-900');
    });

    // Show selected tab & highlight active nav link
    const targetTab = document.getElementById(`tab-${tabId}`);
    if (targetTab) {
        targetTab.classList.remove('hidden');
    }

    const activeNav = document.getElementById(`nav-${tabId}`);
    if (activeNav) {
        activeNav.classList.add('active', 'bg-white', 'text-black', 'font-bold', 'shadow-md');
        activeNav.classList.remove('text-neutral-400', 'hover:text-white', 'hover:bg-neutral-900');
    }

    // Tab-specific rendering
    if (tabId === 'dashboard') {
        renderDashboard();
    } else if (tabId === 'clients') {
        renderClientsDirectory();
    } else if (tabId === 'invoices') {
        populateInvoiceSelect();
        renderInvoiceItemsInputs();
        renderInvoicePreview();
    } else if (tabId === 'employees') {
        if (targetEmployeeId) {
            selectedDirectoryEmployeeId = targetEmployeeId;
        } else if (!selectedDirectoryEmployeeId && db.employees && db.employees.length > 0) {
            const ownerEmp = db.employees.find(e => e.id === 'employee-adheesha' || (e.role && e.role.toLowerCase().includes('owner')));
            selectedDirectoryEmployeeId = ownerEmp ? ownerEmp.id : db.employees[0].id;
        }
        renderEmployeesDirectory();
    } else if (tabId === 'settings') {
        loadSettingsFields();
    }
}

function selectOwnerProfile() {
    let ownerEmp = (db && db.employees) ? db.employees.find(e => e.id === 'employee-adheesha' || (e.role && e.role.toLowerCase().includes('owner'))) : null;
    let targetId = ownerEmp ? ownerEmp.id : ((db && db.employees && db.employees[0]) ? db.employees[0].id : 'employee-adheesha');
    switchTab('employees', targetId);
}

// -------------------------------------------------------------
// DATA PERSISTENCE & MIGRATION (Electron IPC, Web API & LocalStorage fallback)
// -------------------------------------------------------------
async function loadDatabase() {
    if (window.api && typeof window.api.loadDatabase === 'function') {
        // Running inside Electron desktop environment
        const loaded = await window.api.loadDatabase();
        if (loaded) {
            db = loaded;
        } else {
            db = JSON.parse(JSON.stringify(defaultDB));
            await saveDatabase();
        }
    } else {
        // Running in Browser: Try fetching from local dev server API first
        try {
            const res = await fetch('/api/db');
            if (res.ok) {
                const loaded = await res.json();
                if (loaded) {
                    db = loaded;
                } else {
                    db = JSON.parse(JSON.stringify(defaultDB));
                }
            } else {
                throw new Error('API not available');
            }
        } catch (e) {
            // Fallback to local storage if running standalone HTML without local server
            let stored = localStorage.getItem('aframevisuals_desktop_db');
            if (stored) {
                try {
                    db = JSON.parse(stored);
                } catch (e) {
                    db = JSON.parse(JSON.stringify(defaultDB));
                }
            } else {
                db = JSON.parse(JSON.stringify(defaultDB));
            }
        }
    }

    // Perform Schema Migrations automatically (Feature 1 & Theme/Template settings)
    migrateDatabase();

    // Apply Global Theme and Accents
    applyTheme();

    // Update Sidebar User Badge
    updateSidebarUserBadge();

    // Initialize Google Drive Status UI
    updateGoogleDriveStatusUI(db.settings.googleDrive);

    // Set default client selection
    if (db.clients.length > 0) {
        currentActiveClientId = db.clients[0].id;
        selectedDirectoryClientId = db.clients[0].id;
    }

    // Kickstart UI
    renderDashboard();
}

async function saveDatabase() {
    if (window.api && typeof window.api.saveDatabase === 'function') {
        await window.api.saveDatabase(db);
    } else {
        // Try saving to local dev server API if available
        try {
            await fetch('/api/db', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(db)
            });
        } catch (e) {
            // Fail silently if no server
        }
    }
    // Also save in localStorage as redundant fallback
    localStorage.setItem('aframevisuals_desktop_db', JSON.stringify(db));
}

function migrateDatabase() {
    let migrated = false;

    // Default appearance settings
    if (!db.settings.theme) {
        db.settings.theme = 'dark';
        migrated = true;
    }
    if (!db.settings.accentColor) {
        db.settings.accentColor = 'monochrome';
        migrated = true;
    }
    if (!db.settings.invoiceTemplate) {
        db.settings.invoiceTemplate = 'classic';
        migrated = true;
    }
    if (db.settings.invoiceTemplate !== 'classic') {
        db.settings.invoiceTemplate = 'classic';
        migrated = true;
    }
    if (!db.settings.pricingPresets || db.settings.pricingPresets.length === 0) {
        db.settings.pricingPresets = [
            { id: "preset-basic-cut", name: "Basic Cut & Background Music", price: 1800, employeeShare: 1440 },
            { id: "preset-cut-text", name: "Standard Cut & Subtitles", price: 2300, employeeShare: 1840 },
            { id: "preset-overlay-text", name: "Premium Edit with Overlays", price: 2800, employeeShare: 2380 },
            { id: "preset-ai-full", name: "Full AI Video Production", price: 5800, employeeShare: 4640 },
            { id: "preset-ai-animate", name: "AI Animation (Experimental)", price: 1100, employeeShare: 733 }
        ];
        migrated = true;
    }

    // Add employeeShare to presets if missing
    if (db.settings.pricingPresets) {
        db.settings.pricingPresets.forEach(preset => {
            if (preset.employeeShare === undefined) {
                if (preset.price === 1000) preset.employeeShare = 800;
                else if (preset.price === 1800) preset.employeeShare = 1440;
                else if (preset.price === 1500) preset.employeeShare = 1200;
                else if (preset.price === 2300) preset.employeeShare = 1840;
                else if (preset.price === 2000) preset.employeeShare = 1700;
                else if (preset.price === 2800) preset.employeeShare = 2380;
                else if (preset.price === 5000) preset.employeeShare = 4000;
                else if (preset.price === 5800) preset.employeeShare = 4640;
                else if (preset.price === 300) preset.employeeShare = 200;
                else if (preset.price === 1100) preset.employeeShare = 733;
                else preset.employeeShare = Math.round(preset.price * 0.8);
                migrated = true;
            }
        });
    }

    // Ensure services list exists
    if (!db.settings.services || db.settings.services.length === 0) {
        db.settings.services = [
            "Facebook Reel",
            "YouTube Shorts",
            "TikTok Reel",
            "Video Editing",
            "Reel Compilation",
            "Facebook Ad Campaign",
            "Zoom Live Stream"
        ];
        migrated = true;
    }

    // Ensure employees list has 3 team members (Owner + 2 Editors)
    if (!db.employees || db.employees.length === 0) {
        db.employees = [
            {
                id: "employee-adheesha",
                name: db.settings.fromName || "Adheesha Sooriyaarachchi",
                email: db.settings.fromEmail || "adeesha.73x@gmail.com",
                phone: db.settings.fromPhone || "+94713407686",
                role: "Owner / Lead Editor",
                joinDate: "2026-01-01",
                bankName: db.settings.bankName || "Sampath Bank",
                bankBranch: db.settings.bankBranch || "Yakkala",
                accName: db.settings.accName || "STAC Sooriyaarachchi",
                accNo: db.settings.accNo || "1068 5781 5932"
            },
            {
                id: "employee-editor1",
                name: "Kasun Perera",
                email: "kasun@example.com",
                phone: "+94771234567",
                role: "Senior Video Editor",
                joinDate: "2026-02-01",
                bankName: "Commercial Bank",
                bankBranch: "Colombo",
                accName: "K A K Perera",
                accNo: "8001 2345 6789"
            },
            {
                id: "employee-editor2",
                name: "Nimal Silva",
                email: "nimal@example.com",
                phone: "+94719876543",
                role: "Assistant Video Editor",
                joinDate: "2026-03-01",
                bankName: "BOC",
                bankBranch: "Gampaha",
                accName: "H N Silva",
                accNo: "7009 8765 4321"
            }
        ];
        migrated = true;
    }

    // Auto assign prodStatus / invoiceNo if they don't exist, and add employee fields
    const unpaidStatuses = ['Raw Footage', 'First Cut', 'Color Grading', 'Audio & Sound', 'Client Review'];
    db.clients.forEach(client => {
        let unpaidCount = 0;
        client.items.forEach(item => {
            if (!item.prodStatus) {
                if (item.status === 'Paid') {
                    item.prodStatus = 'Delivered';
                } else {
                    item.prodStatus = unpaidStatuses[unpaidCount % unpaidStatuses.length];
                    unpaidCount++;
                }
                migrated = true;
            }
            if (item.invoiceNo === undefined) {
                item.invoiceNo = "";
                migrated = true;
            }
            if (item.employeeId === undefined) {
                item.employeeId = "employee-adheesha";
                migrated = true;
            }
            if (item.employeeShare === undefined) {
                const matchingPreset = db.settings.pricingPresets.find(p => p.name === item.type);
                if (matchingPreset) {
                    item.employeeShare = matchingPreset.employeeShare;
                } else {
                    if (item.price === 1000) item.employeeShare = 800;
                    else if (item.price === 1800) item.employeeShare = 1440;
                    else if (item.price === 1500) item.employeeShare = 1200;
                    else if (item.price === 2300) item.employeeShare = 1840;
                    else if (item.price === 2000) item.employeeShare = 1700;
                    else if (item.price === 2800) item.employeeShare = 2380;
                    else if (item.price === 5000) item.employeeShare = 4000;
                    else if (item.price === 5800) item.employeeShare = 4640;
                    else if (item.price === 300) item.employeeShare = 200;
                    else if (item.price === 1100) item.employeeShare = 733;
                    else item.employeeShare = Math.round(item.price * 0.8);
                }
                migrated = true;
            }
            if (item.employeePayoutStatus === undefined) {
                item.employeePayoutStatus = item.status === 'Paid' ? 'Paid' : 'Pending';
                migrated = true;
            }
        });
    });

    if (migrated) {
        saveDatabase();
    }
}

// -------------------------------------------------------------
// GLOBAL THEME & ACCENT MANAGEMENT
// -------------------------------------------------------------
function applyTheme() {
    db.settings.theme = 'light';
    db.settings.accentColor = 'monochrome';
    db.settings.invoiceTemplate = 'classic';

    // Reset standard classes
    document.body.classList.remove('dark', 'theme-emerald', 'theme-purple', 'theme-amber');
    document.documentElement.classList.remove('dark');
}

// -------------------------------------------------------------
// DASHBOARD LOGIC (Calendar, Charts, Pipeline)
// -------------------------------------------------------------
function renderDashboard() {
    let invoiceCount = db.clients.length;
    let totalReceived = 0;
    let totalOutstanding = 0;
    let activeWorkload = 0;
    let pendingPayoutsTotal = 0;

    // Calculate stats
    db.clients.forEach(client => {
        client.items.forEach(item => {
            const price = Number(item.price) || 0;
            const adKeywordsRegex = /\b(ad|ads|boost|campaign|marketing)\b/i;
            const isAd = adKeywordsRegex.test(item.type || '') || adKeywordsRegex.test(item.title || '');

            if (item.status === 'Paid') {
                if (!isAd) totalReceived += price;
            } else {
                totalOutstanding += price;
            }
            if (item.prodStatus !== 'Delivered') {
                activeWorkload++;
            }
            // EXCLUDE Studio Owner ("employee-adheesha") from Editor Payout liabilities
            if (item.employeeId && item.employeeId !== 'employee-adheesha' && item.employeePayoutStatus !== 'Paid') {
                pendingPayoutsTotal += (Number(item.employeeShare) || 0);
            }
        });
    });

    // Update stats text
    if (document.getElementById('dash-total-invoices')) document.getElementById('dash-total-invoices').innerText = invoiceCount;
    if (document.getElementById('dash-total-received')) document.getElementById('dash-total-received').innerText = `${db.settings.currency || 'Rs.'} ${totalReceived.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    if (document.getElementById('dash-total-outstanding')) document.getElementById('dash-total-outstanding').innerText = `${db.settings.currency || 'Rs.'} ${totalOutstanding.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    if (document.getElementById('dash-total-payouts-pending')) document.getElementById('dash-total-payouts-pending').innerText = `${db.settings.currency || 'Rs.'} ${pendingPayoutsTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    if (document.getElementById('dash-active-workload')) document.getElementById('dash-active-workload').innerText = `${activeWorkload} Videos`;

    // Refresh user badge in sidebar
    updateSidebarUserBadge();

    // Render interactive monthly calendar
    renderCalendar();

    // Render selected date items
    renderSelectedDateActivities();

    // Render all-time history list at bottom
    renderWorkHistory();

    // Render Financial Studio Profitability Breakdown
    renderFinancialProfitability();

    // Render interactive analytics bar chart
    renderRevenueChart();
}

function renderFinancialProfitability() {
    let grossRevenue = 0;
    let editorPayoutsPaid = 0;
    let editorPayoutsPending = 0;

    db.clients.forEach(client => {
        client.items.forEach(item => {
            const price = Number(item.price) || 0;
            const payoutShare = Number(item.employeeShare) || 0;
            const adKeywordsRegex = /\b(ad|ads|boost|campaign|marketing)\b/i;
            const isAd = adKeywordsRegex.test(item.type || '') || adKeywordsRegex.test(item.title || '');

            if (item.status === 'Paid' && !isAd) {
                grossRevenue += price;
            }

            // EXCLUDE Studio Owner ("employee-adheesha") from Editor Payout liabilities
            if (item.employeeId && item.employeeId !== 'employee-adheesha') {
                if (item.employeePayoutStatus === 'Paid') {
                    editorPayoutsPaid += payoutShare;
                } else {
                    editorPayoutsPending += payoutShare;
                }
            }
        });
    });

    const netProfit = grossRevenue - editorPayoutsPaid;
    const marginPct = grossRevenue > 0 ? Math.max(0, ((netProfit / grossRevenue) * 100)).toFixed(1) : '0.0';

    if (document.getElementById('fin-gross-revenue')) {
        document.getElementById('fin-gross-revenue').innerText = `${db.settings.currency || 'Rs.'} ${grossRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    }
    if (document.getElementById('fin-editor-payouts')) {
        document.getElementById('fin-editor-payouts').innerText = `${db.settings.currency || 'Rs.'} ${(editorPayoutsPaid + editorPayoutsPending).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    }
    if (document.getElementById('fin-net-profit')) {
        document.getElementById('fin-net-profit').innerText = `${db.settings.currency || 'Rs.'} ${netProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    }
    if (document.getElementById('fin-margin-badge')) {
        document.getElementById('fin-margin-badge').innerText = `${marginPct}% Margin`;
    }
}

function sendWhatsAppClientInvoice() {
    const activeClient = db.clients.find(c => c.id === currentActiveClientId);
    if (!activeClient || !activeClient.items || activeClient.items.length === 0) {
        showToast("No active client or items to send invoice for.");
        return;
    }

    let itemsListText = "";
    let total = 0;
    activeClient.items.forEach((item, index) => {
        const itemPrice = Number(item.price) || 0;
        total += itemPrice;
        itemsListText += `${index + 1}. *${item.title}* (${item.type || 'Video'}) - ${db.settings.currency || 'Rs.'} ${itemPrice.toLocaleString()}\n`;
    });

    const bankName = db.settings.bankName || 'Sampath Bank';
    const bankBranch = db.settings.bankBranch || 'Yakkala';
    const accName = db.settings.accName || 'STAC Sooriyaarachchi';
    const accNo = db.settings.accNo || '1068 5781 5932';

    const msg = `🎬 *${(db.settings.fromCompany || 'A-FRAME VISUALS').toUpperCase()} - INVOICE STATEMENT*
Invoice No: ${activeClient.invoiceNo || '#AF-001'}
Date: ${activeClient.invoiceDate || formatLocalDate()}
Client Name: ${activeClient.name}

*Deliverables & Video Work:*
${itemsListText}
*Total Amount Due:* ${db.settings.currency || 'Rs.'} ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}

*Bank Settlement Details:*
Bank: ${bankName}
Branch: ${bankBranch}
Account Name: ${accName}
Account No: ${accNo}

Thank you for choosing ${db.settings.fromCompany || 'A-Frame Visuals'}! 🚀`;

    const encodedMsg = encodeURIComponent(msg);
    let targetUrl = `https://web.whatsapp.com/send?text=${encodedMsg}`;

    let cleanPhone = (activeClient.phone || '').replace(/[^0-9]/g, '');
    if (cleanPhone) {
        if (!cleanPhone.startsWith('94') && cleanPhone.startsWith('0')) {
            cleanPhone = '94' + cleanPhone.substring(1);
        }
        targetUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
    }

    openExternalUrl(targetUrl);
    showToast("Opening WhatsApp Invoice message...");
}

function sendWhatsAppEmployeePayout() {
    const activeEmp = (db.employees && db.employees.length > 0) ? db.employees.find(e => e.id === selectedDirectoryEmployeeId) : null;
    if (!activeEmp) {
        showToast("No employee profile selected.");
        return;
    }

    let itemsListText = "";
    let totalPayout = 0;

    let itemCount = 0;
    db.clients.forEach(client => {
        client.items.forEach(item => {
            if (item.employeeId === selectedDirectoryEmployeeId) {
                itemCount++;
                const share = Number(item.employeeShare) || 0;
                totalPayout += share;
                const statusStr = item.employeePayoutStatus === 'Paid' ? '✅ Paid' : '⏳ Pending';
                itemsListText += `• *${item.title}* (${client.name}): ${db.settings.currency || 'Rs.'} ${share.toLocaleString()} [${statusStr}]\n`;
            }
        });
    });

    if (itemCount === 0) {
        showToast("No video tasks assigned to this employee.");
        return;
    }

    const msg = `🎬 *${(db.settings.fromCompany || 'A-FRAME VISUALS').toUpperCase()} - PAYOUT ADVICE SLIP*
Employee: ${activeEmp.name} (${activeEmp.role || 'Video Editor'})
Date: ${formatLocalDate()}

*Assigned Deliverables & Payout Shares:*
${itemsListText}
*Total Payout Amount:* ${db.settings.currency || 'Rs.'} ${totalPayout.toLocaleString('en-US', { minimumFractionDigits: 2 })}

*Registered Settlement Account:*
Bank: ${activeEmp.bankName || 'N/A'}
Branch: ${activeEmp.bankBranch || 'N/A'}
Account Name: ${activeEmp.accName || 'N/A'}
Account No: ${activeEmp.accNo || 'N/A'}

Thank you for your valuable contribution to ${db.settings.fromCompany || 'A-Frame Visuals'}! 🌟`;

    const encodedMsg = encodeURIComponent(msg);
    let targetUrl = `https://web.whatsapp.com/send?text=${encodedMsg}`;

    let cleanPhone = (activeEmp.phone || '').replace(/[^0-9]/g, '');
    if (cleanPhone) {
        if (!cleanPhone.startsWith('94') && cleanPhone.startsWith('0')) {
            cleanPhone = '94' + cleanPhone.substring(1);
        }
        targetUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
    }

    openExternalUrl(targetUrl);
    showToast("Opening WhatsApp Payout Advice...");
}

function openExternalUrl(url) {
    if (window.api && typeof window.api.openExternal === 'function') {
        window.api.openExternal(url);
    } else {
        window.open(url, '_blank');
    }
}

function renderRevenueChart() {
    const wrapper = document.getElementById('revenue-chart-wrapper');
    if (!wrapper) return;

    wrapper.innerHTML = '';

    // Calculate total paid revenue per client (excluding ads)
    const clientData = db.clients.map(client => {
        let total = 0;
        client.items.forEach(item => {
            const price = Number(item.price) || 0;
            const adKeywordsRegex = /\b(ad|ads|boost|campaign|marketing)\b/i;
            const isAd = adKeywordsRegex.test(item.type || '') || adKeywordsRegex.test(item.title || '');
            if (item.status === 'Paid' && !isAd) {
                total += price;
            }
        });
        return {
            name: client.name,
            total: total
        };
    });

    const maxTotal = Math.max(...clientData.map(c => c.total), 1000); // Prevent division by zero

    clientData.forEach(c => {
        const pct = (c.total / maxTotal) * 100;
        const barDiv = document.createElement('div');
        barDiv.className = 'flex-1 min-w-[70px] max-w-[120px] flex flex-col items-center gap-2 group cursor-pointer h-full justify-end';

        barDiv.innerHTML = `
            <div class="text-[9px] font-bold text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200 select-none">
                ${db.settings.currency || 'Rs.'}${c.total.toLocaleString()}
            </div>
            <div class="w-full bg-neutral-100 dark:bg-neutral-800/60 rounded-t-lg relative overflow-hidden h-24 flex items-end">
                <div class="w-full bg-accent rounded-t-lg transition-all duration-700 ease-out chart-bar" style="height: 0%;" data-height="${pct}%"></div>
            </div>
            <div class="text-[10px] font-black text-neutral-600 dark:text-neutral-400 truncate w-full text-center mt-1 select-none">
                ${escapeHTML(c.name.replace(/^(mr\.|mrs\.|ms\.|dr\.)\s+/i, '').trim())}
            </div>
        `;
        wrapper.appendChild(barDiv);
    });

    // Trigger chart bar height animations in next frame
    requestAnimationFrame(() => {
        document.querySelectorAll('.chart-bar').forEach(bar => {
            bar.style.height = bar.getAttribute('data-height');
        });
    });
}

function renderCalendar() {
    const calendarContainer = document.getElementById('calendar-container');
    if (!calendarContainer) return;

    calendarContainer.innerHTML = '';

    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Header Row with month name and previous/next month buttons
    const headerDiv = document.createElement('div');
    headerDiv.className = 'flex justify-between items-center mb-6';
    headerDiv.innerHTML = `
        <h4 class="font-extrabold text-sm text-black dark:text-white uppercase tracking-wider">${monthNames[month]} ${year}</h4>
        <div class="flex gap-2 no-print">
            <button onclick="changeMonth(-1)" class="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition border border-neutral-200 dark:border-neutral-800">
                <svg class="h-4 w-4 text-black dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button onclick="changeMonth(1)" class="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition border border-neutral-200 dark:border-neutral-800">
                <svg class="h-4 w-4 text-black dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    `;
    calendarContainer.appendChild(headerDiv);

    // Weekdays
    const weekdaysDiv = document.createElement('div');
    weekdaysDiv.className = 'grid grid-cols-7 gap-1 text-center font-bold text-[10px] text-neutral-400 dark:text-neutral-500 uppercase mb-3';
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    daysOfWeek.forEach(day => {
        const d = document.createElement('div');
        d.innerText = day;
        weekdaysDiv.appendChild(d);
    });
    calendarContainer.appendChild(weekdaysDiv);

    // Grid
    const daysGrid = document.createElement('div');
    daysGrid.className = 'grid grid-cols-7 gap-1 text-center text-xs';

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevMonthTotalDays = new Date(year, month, 0).getDate();

    // Fill previous month days
    for (let i = firstDayIndex; i > 0; i--) {
        const dayNum = prevMonthTotalDays - i + 1;
        const cell = document.createElement('div');
        cell.className = 'py-3.5 text-neutral-300 dark:text-neutral-700 font-semibold';
        cell.innerText = dayNum;
        daysGrid.appendChild(cell);
    }

    const todayDateStr = formatLocalDate();

    // Current month days
    for (let day = 1; day <= totalDays; day++) {
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const cell = document.createElement('div');
        cell.className = 'py-3.5 rounded cursor-pointer transition relative flex flex-col items-center justify-center border border-transparent';

        const isToday = dateString === todayDateStr;
        const isSelected = dateString === selectedDate;

        const tasksForDay = [];
        db.clients.forEach(client => {
            client.items.forEach(item => {
                if (item.date === dateString) {
                    tasksForDay.push(`${client.name.replace(/^(mr\.|mrs\.|ms\.|dr\.)\s+/i, '')}: ${item.title}`);
                }
            });
        });
        const hasTasks = tasksForDay.length > 0;

        if (isSelected) {
            cell.className += ' bg-accent text-white font-bold shadow-sm';
        } else if (isToday) {
            cell.className += ' border border-accent text-accent font-bold';
        } else {
            cell.className += ' hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200';
        }

        if (hasTasks) {
            cell.title = tasksForDay.join('\n');
        }

        let dotColor = isSelected ? 'bg-white' : 'bg-accent';
        cell.innerHTML = `
            <span>${day}</span>
            ${hasTasks ? `<span class="absolute bottom-1 w-1.5 h-1.5 ${dotColor} rounded-full"></span>` : ''}
        `;

        cell.onclick = () => selectCalendarDate(dateString);
        daysGrid.appendChild(cell);
    }

    // Next month days filler
    const totalCellsSoFar = firstDayIndex + totalDays;
    const nextDaysNeeded = totalCellsSoFar % 7 === 0 ? 0 : 7 - (totalCellsSoFar % 7);
    for (let i = 1; i <= nextDaysNeeded; i++) {
        const cell = document.createElement('div');
        cell.className = 'py-3.5 text-neutral-300 dark:text-neutral-700 font-semibold';
        cell.innerText = i;
        daysGrid.appendChild(cell);
    }

    calendarContainer.appendChild(daysGrid);
}

function changeMonth(dir) {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + dir);
    renderCalendar();
}

function selectCalendarDate(dateString) {
    selectedDate = dateString;
    renderCalendar();
    renderSelectedDateActivities();
}

function renderSelectedDateActivities() {
    const activityContainer = document.getElementById('selected-date-activity-list');
    const titleEl = document.getElementById('selected-date-title');
    if (!activityContainer || !titleEl) return;

    const dateObj = new Date(selectedDate);
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateStrFormatted = isNaN(dateObj.getTime()) ? selectedDate : dateObj.toLocaleDateString('en-US', dateOptions);
    titleEl.innerText = `Log Work: ${dateStrFormatted}`;

    activityContainer.innerHTML = '';
    let foundTasks = [];

    db.clients.forEach(client => {
        client.items.forEach((item, index) => {
            if (item.date === selectedDate) {
                foundTasks.push({
                    clientName: client.name,
                    clientId: client.id,
                    itemIndex: index,
                    ...item
                });
            }
        });
    });

    if (foundTasks.length === 0) {
        activityContainer.innerHTML = `
            <div class="py-4 text-center text-[10px] text-neutral-400 dark:text-neutral-500 italic">
                No videos logged for this day. Click "+ Log Video Item" to add one.
            </div>
        `;
    } else {
        foundTasks.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.className = 'flex justify-between items-center border-b border-neutral-100 dark:border-neutral-800 pb-2 last:border-0 text-[11px]';

            const isPaid = task.status === 'Paid';
            const statusBadge = isPaid
                ? `<span class="text-[9px] font-bold bg-emerald-600 text-white px-1.5 py-0.5 rounded cursor-pointer hover:bg-emerald-700 transition" onclick="toggleItemPaymentStatus('${task.clientId}', '${escapeHTMLAttribute(task.title)}', '${task.date}')">Paid</span>`
                : `<span class="text-[9px] font-bold border border-rose-600 text-rose-600 px-1.5 py-0.5 rounded cursor-pointer hover:bg-rose-600 hover:text-white transition" onclick="toggleItemPaymentStatus('${task.clientId}', '${escapeHTMLAttribute(task.title)}', '${task.date}')">Pending</span>`;

            const isDelivered = task.prodStatus === 'Delivered';
            const completeBtn = isDelivered
                ? ''
                : `<button onclick="markItemAsDelivered('${task.clientId}', '${escapeHTMLAttribute(task.title)}', '${task.date}')" class="text-[10px] text-emerald-600 hover:text-emerald-700 transition underline font-bold">Complete</button>`;

            taskDiv.innerHTML = `
                <div class="space-y-0.5 min-w-0 flex-1 pr-2">
                    <div class="flex items-center gap-1.5">
                        <span class="font-bold truncate max-w-[120px] text-neutral-900 dark:text-neutral-100">${escapeHTML(task.title)}</span>
                        ${statusBadge}
                    </div>
                    <p class="text-[10px] text-neutral-400 dark:text-neutral-500 truncate">${escapeHTML(task.clientName)} | ${escapeHTML(task.type)}</p>
                </div>
                <div class="text-right flex items-center gap-3 shrink-0">
                    <span class="font-bold text-neutral-800 dark:text-neutral-200">${db.settings.currency || 'Rs.'} ${(task.price || 0).toLocaleString()}</span>
                    <div class="flex items-center gap-2">
                        ${completeBtn}
                        <button onclick="deleteLoggedTask('${task.clientId}', ${task.itemIndex})" class="text-[10px] text-neutral-400 hover:text-accent transition underline font-medium">Delete</button>
                    </div>
                </div>
            `;
            activityContainer.appendChild(taskDiv);
        });
    }

    const logClientSelect = document.getElementById('log-client-select');
    if (logClientSelect) {
        const previousVal = logClientSelect.value;
        logClientSelect.innerHTML = '';
        db.clients.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.id;
            opt.innerText = c.name;
            logClientSelect.appendChild(opt);
        });
        if (previousVal && db.clients.some(c => c.id === previousVal)) {
            logClientSelect.value = previousVal;
        } else if (db.clients.length > 0) {
            logClientSelect.value = db.clients[0].id;
        }
        if (logClientSelect.value) {
            handleLogClientChange(logClientSelect.value);
        }
    }

    const logEmployeeSelect = document.getElementById('log-employee-select');
    if (logEmployeeSelect) {
        const previousVal = logEmployeeSelect.value;
        logEmployeeSelect.innerHTML = '<option value="">-- Unassigned --</option>';
        if (db.employees) {
            db.employees.forEach(emp => {
                const opt = document.createElement('option');
                opt.value = emp.id;
                opt.innerText = `${emp.name} (${emp.role})`;
                logEmployeeSelect.appendChild(opt);
            });
        }
        if (previousVal && db.employees.some(emp => emp.id === previousVal)) {
            logEmployeeSelect.value = previousVal;
        } else if (db.employees && db.employees.length > 0) {
            logEmployeeSelect.value = db.employees[0].id;
        }
    }

    const logPackagePreset = document.getElementById('log-package-preset');
    if (logPackagePreset) {
        logPackagePreset.innerHTML = '<option value="">-- Custom (No Preset) --</option>';
        if (db.settings.pricingPresets) {
            db.settings.pricingPresets.forEach(preset => {
                const opt = document.createElement('option');
                opt.value = preset.id;
                opt.innerText = preset.name;
                logPackagePreset.appendChild(opt);
            });
        }
    }
}

function handleLogClientChange(clientId) {
    if (!clientId || !db || !db.clients) return;
    const client = db.clients.find(c => c.id === clientId);
    if (!client) return;

    const titleInput = document.getElementById('log-work-title');
    const typeInput = document.getElementById('log-work-type');
    const descInput = document.getElementById('log-work-desc');
    const priceInput = document.getElementById('log-work-price');
    const empSelect = document.getElementById('log-employee-select');
    const shareInput = document.getElementById('log-employee-share');
    const presetSelect = document.getElementById('log-package-preset');

    if (!client.items || client.items.length === 0) {
        if (titleInput) titleInput.value = `${client.name.replace(/^(mr\.|mrs\.|ms\.|dr\.)\s+/i, '')} Video 01`;
        if (typeInput) typeInput.value = "Facebook Reel";
        if (descInput) descInput.value = "";
        if (priceInput) priceInput.value = "1500";
        if (shareInput) shareInput.value = "1200";
        return;
    }

    // Get last logged video item for this client
    const lastItem = client.items[client.items.length - 1];

    // Auto-increment video number in title
    let newTitle = lastItem.title || `${client.name.replace(/^(mr\.|mrs\.|ms\.|dr\.)\s+/i, '')} Video 01`;
    if (lastItem.title) {
        const numberMatch = lastItem.title.match(/(\d+)(?!.*\d)/);
        if (numberMatch) {
            const rawNum = numberMatch[1];
            const nextNum = parseInt(rawNum, 10) + 1;
            const paddedNextNum = String(nextNum).padStart(rawNum.length, '0');
            const lastNumIndex = lastItem.title.lastIndexOf(rawNum);
            newTitle = lastItem.title.substring(0, lastNumIndex) + paddedNextNum + lastItem.title.substring(lastNumIndex + rawNum.length);
        } else {
            newTitle = `${lastItem.title} 02`;
        }
    }

    if (titleInput) titleInput.value = newTitle;
    if (typeInput) typeInput.value = lastItem.type || "Facebook Reel";
    if (descInput) descInput.value = lastItem.desc || "";
    if (priceInput) priceInput.value = lastItem.price !== undefined ? lastItem.price : 1500;

    if (empSelect) {
        if (lastItem.employeeId && db.employees && db.employees.some(e => e.id === lastItem.employeeId)) {
            empSelect.value = lastItem.employeeId;
        } else if (db.employees && db.employees.length > 0) {
            empSelect.value = db.employees[0].id;
        }
    }

    if (shareInput) {
        shareInput.value = lastItem.employeeShare !== undefined ? lastItem.employeeShare : Math.round((lastItem.price || 1500) * 0.8);
    }

    if (presetSelect && db.settings.pricingPresets) {
        const matchingPreset = db.settings.pricingPresets.find(p => p.name === lastItem.type || p.price === lastItem.price);
        if (matchingPreset) {
            presetSelect.value = matchingPreset.id;
        } else {
            presetSelect.value = "";
        }
    }
}

function logWorkForDate(e) {
    if (e) e.preventDefault();

    const clientId = document.getElementById('log-client-select').value;
    const title = document.getElementById('log-work-title').value.trim();
    const type = document.getElementById('log-work-type').value.trim() || "Video Editing";
    const desc = document.getElementById('log-work-desc').value.trim() || "";
    const price = parseFloat(document.getElementById('log-work-price').value) || 0;
    const status = document.getElementById('log-work-status').value;

    const employeeId = document.getElementById('log-employee-select')?.value || "";
    const employeeShare = parseFloat(document.getElementById('log-employee-share')?.value) || 0;
    const employeePayoutStatus = "Pending";

    if (!title) {
        alert("Please enter a video work title.");
        return;
    }

    const client = db.clients.find(c => c.id === clientId);
    if (!client) return;

    const defaultProdStatus = status === 'Paid' ? 'Delivered' : 'First Cut';

    client.items.push({
        title,
        desc,
        type,
        price,
        date: selectedDate,
        status,
        prodStatus: defaultProdStatus,
        employeeId,
        employeeShare,
        employeePayoutStatus
    });

    // Clear form inputs
    document.getElementById('log-work-title').value = '';
    document.getElementById('log-work-type').value = '';
    document.getElementById('log-work-desc').value = '';
    document.getElementById('log-work-price').value = '';
    if (document.getElementById('log-employee-share')) {
        document.getElementById('log-employee-share').value = '';
    }
    const logPkgPreset = document.getElementById('log-package-preset');
    if (logPkgPreset) {
        logPkgPreset.value = '';
    }

    saveDatabase();
    renderDashboard();
    showToast("Logged new work item!");
}

function deleteLoggedTask(clientId, index) {
    if (!confirm("Are you sure you want to delete this logged task?")) return;

    const client = db.clients.find(c => c.id === clientId);
    if (client && client.items[index]) {
        client.items.splice(index, 1);
        saveDatabase();
        renderDashboard();
        showToast("Deleted log entry");
    }
}

function toggleItemPaymentStatus(clientId, itemTitle, itemDate) {
    const client = db.clients.find(c => c.id === clientId);
    if (!client) return;

    // Search for the matching item
    const item = client.items.find(i => i.title === itemTitle && i.date === itemDate);
    if (item) {
        const oldStatus = item.status;
        item.status = oldStatus === 'Paid' ? 'Unpaid' : 'Paid';

        saveDatabase();

        // Refresh UI views
        renderDashboard();
        renderWorkHistory();
        renderClientsDirectory();
        if (currentActiveClientId === clientId) {
            renderInvoiceItemsInputs();
            renderInvoicePreview();
            updateInvoiceHeaderStatus();
        }

        showToast(`Changed "${item.title}" payment status to ${item.status === 'Paid' ? 'Paid' : 'Pending'}`);
    }
}

function markItemAsDelivered(clientId, itemTitle, itemDate) {
    const client = db.clients.find(c => c.id === clientId);
    if (!client) return;

    // Search for the matching item
    const item = client.items.find(i => i.title === itemTitle && i.date === itemDate);
    if (item) {
        item.prodStatus = 'Delivered';

        saveDatabase();

        // Refresh UI views
        renderDashboard();
        renderWorkHistory();
        renderClientsDirectory();
        if (currentActiveClientId === clientId) {
            renderInvoiceItemsInputs();
            renderInvoicePreview();
        }

        showToast(`Marked "${item.title}" as Completed / Delivered!`);
    }
}

function openEditWorkItemModal(clientId, itemIndex) {
    const client = db.clients.find(c => c.id === clientId);
    if (!client || !client.items || !client.items[itemIndex]) return;

    const item = client.items[itemIndex];
    document.getElementById('edit-item-client-id').value = clientId;
    document.getElementById('edit-item-index').value = itemIndex;

    document.getElementById('edit-item-title').value = item.title || '';
    document.getElementById('edit-item-type').value = item.type || 'Video Editing';
    document.getElementById('edit-item-date').value = item.date || formatLocalDate();
    document.getElementById('edit-item-desc').value = item.desc || '';
    document.getElementById('edit-item-price').value = item.price !== undefined ? item.price : 0;
    document.getElementById('edit-item-status').value = item.status || 'Pending';

    // Populate employee options
    const empSelect = document.getElementById('edit-item-employee');
    if (empSelect) {
        empSelect.innerHTML = '<option value="">-- Unassigned --</option>';
        if (db.employees) {
            db.employees.forEach(emp => {
                const opt = document.createElement('option');
                opt.value = emp.id;
                opt.innerText = `${emp.name} (${emp.role || 'Editor'})`;
                empSelect.appendChild(opt);
            });
        }
        empSelect.value = item.employeeId || (db.employees && db.employees[0] ? db.employees[0].id : '');
    }

    document.getElementById('edit-item-employee-share').value = item.employeeShare !== undefined ? item.employeeShare : 0;

    const modal = document.getElementById('modal-edit-work-item');
    if (modal) modal.classList.remove('hidden');
}

function closeEditWorkItemModal() {
    const modal = document.getElementById('modal-edit-work-item');
    if (modal) modal.classList.add('hidden');
}

function saveWorkItemEdit(e) {
    if (e) e.preventDefault();

    const clientId = document.getElementById('edit-item-client-id').value;
    const itemIndex = parseInt(document.getElementById('edit-item-index').value, 10);

    const client = db.clients.find(c => c.id === clientId);
    if (!client || !client.items || !client.items[itemIndex]) return;

    const item = client.items[itemIndex];
    item.title = document.getElementById('edit-item-title').value.trim();
    item.type = document.getElementById('edit-item-type').value.trim();
    item.date = document.getElementById('edit-item-date').value.trim();
    item.desc = document.getElementById('edit-item-desc').value.trim();
    item.price = parseFloat(document.getElementById('edit-item-price').value) || 0;
    item.status = document.getElementById('edit-item-status').value;
    item.employeeId = document.getElementById('edit-item-employee').value;
    item.employeeShare = parseFloat(document.getElementById('edit-item-employee-share').value) || 0;

    saveDatabase();
    closeEditWorkItemModal();

    renderDashboard();
    renderClientsDirectory();
    renderEmployeesDirectory();
    if (typeof renderWorkHistory === 'function') renderWorkHistory();
    if (currentActiveClientId === clientId) {
        renderInvoiceItemsInputs();
        renderInvoicePreview();
        updateInvoiceHeaderStatus();
    }
    showToast("Deliverable details updated!");
}

function deleteWorkItemFromModal() {
    const clientId = document.getElementById('edit-item-client-id').value;
    const itemIndex = parseInt(document.getElementById('edit-item-index').value, 10);

    const client = db.clients.find(c => c.id === clientId);
    if (!client || !client.items || !client.items[itemIndex]) return;

    if (!confirm(`Are you sure you want to delete "${client.items[itemIndex].title}"?`)) return;

    client.items.splice(itemIndex, 1);
    saveDatabase();
    closeEditWorkItemModal();

    renderDashboard();
    renderClientsDirectory();
    renderEmployeesDirectory();
    if (typeof renderWorkHistory === 'function') renderWorkHistory();
    if (currentActiveClientId === clientId) {
        renderInvoiceItemsInputs();
        renderInvoicePreview();
        updateInvoiceHeaderStatus();
    }
    showToast("Deliverable deleted!");
}

function renderWorkHistory() {
    const tbody = document.getElementById('history-timeline-body');
    const clientFilterSelect = document.getElementById('history-client-filter');
    const statusFilterSelect = document.getElementById('history-status-filter');
    if (!tbody) return;

    if (clientFilterSelect && clientFilterSelect.children.length <= 1) {
        clientFilterSelect.innerHTML = '<option value="all">All Clients</option>';
        db.clients.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.id;
            opt.innerText = c.name;
            clientFilterSelect.appendChild(opt);
        });
        clientFilterSelect.value = historyClientFilter;
    }

    tbody.innerHTML = '';
    let filteredHistory = [];

    db.clients.forEach(client => {
        if (historyClientFilter !== 'all' && client.id !== historyClientFilter) return;

        client.items.forEach((item, idx) => {
            if (historyStatusFilter === 'Unpaid' && item.status !== 'Unpaid') return;
            if (historyStatusFilter === 'Paid' && item.status !== 'Paid') return;
            if (historyStatusFilter === 'active' && item.prodStatus === 'Delivered') return;

            if (historySearchQuery) {
                const titleMatch = (item.title || "").toLowerCase().includes(historySearchQuery);
                const descMatch = (item.desc || "").toLowerCase().includes(historySearchQuery);
                if (!titleMatch && !descMatch) return;
            }

            filteredHistory.push({
                clientId: client.id,
                clientName: client.name,
                itemIdx: idx,
                ...item
            });
        });
    });

    filteredHistory.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (filteredHistory.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="py-8 text-center text-xs text-neutral-400 dark:text-neutral-600 italic">No historical activities found matching your filters.</td>
            </tr>
        `;
        return;
    }

    filteredHistory.forEach(task => {
        const tr = document.createElement('tr');
        tr.className = 'border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition';

        const isPaid = task.status === 'Paid';
        const statusBadge = isPaid
            ? `<span class="px-2 py-0.5 text-[9px] rounded font-bold bg-emerald-600 text-white uppercase tracking-wider cursor-pointer hover:bg-emerald-700 transition" onclick="toggleItemPaymentStatus('${task.clientId}', '${escapeHTMLAttribute(task.title)}', '${task.date}')">Paid</span>`
            : `<span class="px-2 py-0.5 text-[9px] rounded font-bold border border-rose-600 text-rose-600 uppercase tracking-wider cursor-pointer hover:bg-rose-600 hover:text-white transition" onclick="toggleItemPaymentStatus('${task.clientId}', '${escapeHTMLAttribute(task.title)}', '${task.date}')">Pending</span>`;

        const dObj = new Date(task.date);
        const formattedDate = isNaN(dObj.getTime()) ? task.date : dObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

        const assignedEmp = db.employees ? db.employees.find(e => e.id === task.employeeId) : null;
        const empTag = assignedEmp
            ? `<span class="inline-flex items-center gap-1 text-[9px] font-bold text-accent bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded mt-1">
                 <svg class="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                 ${escapeHTML(assignedEmp.name)}
               </span>`
            : '';

        tr.innerHTML = `
            <td class="py-4 px-4 text-xs font-semibold">${escapeHTML(task.clientName)}</td>
            <td class="py-4 px-4 text-xs">
                <span class="font-bold block">${escapeHTML(task.title)}</span>
                <span class="text-[10px] text-neutral-400 dark:text-neutral-500 block mt-0.5 truncate max-w-[200px]">${escapeHTML(task.desc || '')}</span>
                ${empTag}
            </td>
            <td class="py-4 px-4 text-xs text-neutral-500 dark:text-neutral-400">${escapeHTML(task.type)}</td>
            <td class="py-4 px-4 text-xs text-neutral-600 dark:text-neutral-400 font-medium">${formattedDate}</td>
            <td class="py-4 px-4 text-xs text-right font-bold">${db.settings.currency || 'Rs.'} ${(task.price || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
            <td class="py-4 px-4 text-center">${statusBadge}</td>
        `;
        tbody.appendChild(tr);
    });
}

function filterHistoryTo(filterType) {
    const clientSelect = document.getElementById('history-client-filter');
    const statusSelect = document.getElementById('history-status-filter');
    if (!clientSelect || !statusSelect) return;

    clientSelect.value = 'all';
    historyClientFilter = 'all';

    statusSelect.value = filterType;
    historyStatusFilter = filterType;

    renderWorkHistory();

    const historySection = document.getElementById('dashboard-analytics-section').nextElementSibling;
    if (historySection) {
        historySection.scrollIntoView({ behavior: 'smooth' });
    }
}

function handleHistoryClientFilterChange(value) {
    historyClientFilter = value;
    renderWorkHistory();
}

// Global hook for filter changes
function handleHistoryStatusFilterChange(value) {
    historyStatusFilter = value;
    renderWorkHistory();
}

function handleHistorySearch(value) {
    historySearchQuery = value.trim().toLowerCase();
    renderWorkHistory();
}

// -------------------------------------------------------------
// CLIENT DIRECTORY LOGIC
// -------------------------------------------------------------
function getInitials(name) {
    if (!name) return '??';
    const cleanName = name.replace(/^(mr\.|mrs\.|ms\.|dr\.)\s+/i, '').trim();
    const parts = cleanName.split(/\s+/);
    const initials = parts.map(p => p[0] || '').join('').toUpperCase();
    return initials.slice(0, 2) || name.slice(0, 2).toUpperCase();
}

function renderClientsDirectory() {
    const listContainer = document.getElementById('client-list-container');
    if (!listContainer) return;
    listContainer.innerHTML = '';

    const searchQuery = (document.getElementById('client-search-input')?.value || '').toLowerCase().trim();

    db.clients.forEach(client => {
        if (searchQuery) {
            const nameMatch = (client.name || '').toLowerCase().includes(searchQuery);
            const companyMatch = (client.company || '').toLowerCase().includes(searchQuery);
            if (!nameMatch && !companyMatch) return;
        }

        const initials = getInitials(client.name);
        const isActive = selectedDirectoryClientId === client.id;
        const itemBtn = document.createElement('button');
        itemBtn.className = `w-full text-left px-6 py-4 flex items-center gap-3.5 transition border-l-2 hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40 ${isActive ? 'border-accent bg-neutral-100/60 dark:bg-neutral-800/40 font-semibold text-accent' : 'border-transparent text-neutral-600 dark:text-neutral-400'}`;
        itemBtn.onclick = () => selectDirectoryClient(client.id);
        itemBtn.innerHTML = `
            <div class="h-9 w-9 shrink-0 rounded-full flex items-center justify-center text-xs font-black uppercase tracking-wider ${isActive ? 'bg-accent text-white shadow-sm' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200/50 dark:border-neutral-800'}">
                ${initials}
            </div>
            <div class="min-w-0 flex-1">
                <h4 class="font-bold text-xs truncate">${escapeHTML(client.name)}</h4>
                <p class="text-[10px] text-neutral-400 dark:text-neutral-500 mt-0.5 truncate">${escapeHTML(client.company || 'Individual')}</p>
            </div>
        `;
        listContainer.appendChild(itemBtn);
    });

    const editorCard = document.getElementById('client-editor-card');
    const emptyState = document.getElementById('client-empty-state');
    const activeClient = db.clients.find(c => c.id === selectedDirectoryClientId);

    if (activeClient) {
        editorCard.classList.remove('hidden');
        emptyState.classList.add('hidden');

        document.getElementById('edit-client-name').value = activeClient.name;
        document.getElementById('edit-client-company').value = activeClient.company || '';
        document.getElementById('edit-client-phone').value = activeClient.phone || '';

        // Calculate and Render Client stats & history
        const zoomKeywords = ["zoom", "youtube", "yt", "upload"];
        const adKeywordsRegex = /\b(ad|ads|boost|campaign|marketing)\b/i;

        const zoomServices = activeClient.items.filter(item =>
            zoomKeywords.some(keyword => (item.type || '').toLowerCase().includes(keyword) || (item.title || '').toLowerCase().includes(keyword))
        );
        const adCampaigns = activeClient.items.filter(item =>
            !zoomServices.includes(item) && (
                adKeywordsRegex.test(item.type || '') || adKeywordsRegex.test(item.title || '')
            )
        );
        const videoDeliverablesList = activeClient.items.filter(item =>
            !zoomServices.includes(item) && !adCampaigns.includes(item)
        );

        const totalVideos = videoDeliverablesList.length;
        let totalPaid = 0;
        let totalOutstanding = 0;

        activeClient.items.forEach(item => {
            const price = Number(item.price) || 0;
            const adKeywordsRegex = /\b(ad|ads|boost|campaign|marketing)\b/i;
            const isAd = adKeywordsRegex.test(item.type || '') || adKeywordsRegex.test(item.title || '');

            if (item.status === 'Paid') {
                if (!isAd) totalPaid += price;
            } else {
                totalOutstanding += price;
            }
        });

        if (document.getElementById('client-stats-total-videos')) {
            document.getElementById('client-stats-total-videos').innerText = totalVideos;
        }
        if (document.getElementById('client-stats-paid')) {
            document.getElementById('client-stats-paid').innerText = `${db.settings.currency || 'Rs.'} ${totalPaid.toLocaleString()}`;
        }
        if (document.getElementById('client-stats-outstanding')) {
            document.getElementById('client-stats-outstanding').innerText = `${db.settings.currency || 'Rs.'} ${totalOutstanding.toLocaleString()}`;
        }

        // 1. Render Video Deliverables Table
        const historyTbody = document.getElementById('client-work-history-table-body');
        if (historyTbody) {
            historyTbody.innerHTML = '';
            if (videoDeliverablesList.length === 0) {
                historyTbody.innerHTML = `
                    <tr>
                        <td colspan="5" class="py-6 text-center text-xs text-neutral-400 dark:text-neutral-600 italic">
                            No video deliverables logged yet.
                        </td>
                    </tr>
                `;
            } else {
                const sortedVideos = [...videoDeliverablesList].sort((a, b) => new Date(b.date) - new Date(a.date));
                sortedVideos.forEach(item => {
                    const originalIndex = activeClient.items.indexOf(item);
                    const tr = document.createElement('tr');
                    tr.className = 'border-b border-neutral-100/50 dark:border-neutral-800/40 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/20 transition';

                    const isPaid = item.status === 'Paid';
                    const statusBadge = isPaid
                        ? `<span class="px-2 py-0.5 text-[9px] rounded font-bold bg-emerald-600 text-white uppercase tracking-wider cursor-pointer hover:bg-emerald-700 transition" onclick="toggleItemPaymentStatus('${activeClient.id}', '${escapeHTMLAttribute(item.title)}', '${item.date}')">Paid</span>`
                        : `<span class="px-2 py-0.5 text-[9px] rounded font-bold border border-rose-600 text-rose-600 uppercase tracking-wider cursor-pointer hover:bg-rose-600 hover:text-white transition" onclick="toggleItemPaymentStatus('${activeClient.id}', '${escapeHTMLAttribute(item.title)}', '${item.date}')">Pending</span>`;

                    const dObj = new Date(item.date);
                    const formattedDate = isNaN(dObj.getTime()) ? item.date : dObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

                    tr.innerHTML = `
                        <td class="py-2.5 px-3">
                            <span class="font-bold text-neutral-900 dark:text-neutral-100 block">${escapeHTML(item.title)}</span>
                            <span class="text-[10px] text-neutral-400 dark:text-neutral-500 block mt-0.5 truncate max-w-[150px]">${escapeHTML(item.desc || '')}</span>
                        </td>
                        <td class="py-2.5 px-3 text-neutral-600 dark:text-neutral-400 font-medium">${escapeHTML(item.type || 'Video Editing')}</td>
                        <td class="py-2.5 px-3 text-neutral-500">${formattedDate}</td>
                        <td class="py-2.5 px-3 text-right font-bold text-neutral-800 dark:text-neutral-200">${db.settings.currency || 'Rs.'} ${(item.price || 0).toLocaleString()}</td>
                        <td class="py-2.5 px-3 text-center flex items-center justify-center gap-1.5">
                            ${statusBadge}
                            <button onclick="openEditWorkItemModal('${activeClient.id}', ${originalIndex})" title="Edit Deliverable" class="p-1 text-neutral-400 hover:text-accent dark:hover:text-accent transition">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>
                        </td>
                    `;
                    historyTbody.appendChild(tr);
                });
            }
        }

        // 2. Render YouTube & Zoom Services Table
        const zoomContainer = document.getElementById('client-zoom-services-container');
        const zoomTbody = document.getElementById('client-zoom-services-table-body');
        if (zoomContainer && zoomTbody) {
            if (zoomServices.length === 0) {
                zoomContainer.classList.add('hidden');
            } else {
                zoomContainer.classList.remove('hidden');
                zoomTbody.innerHTML = '';
                const sortedZoom = [...zoomServices].sort((a, b) => new Date(b.date) - new Date(a.date));
                sortedZoom.forEach(item => {
                    const tr = document.createElement('tr');
                    tr.className = 'border-b border-neutral-100/50 dark:border-neutral-800/40 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/20 transition';

                    const isPaid = item.status === 'Paid';
                    const statusBadge = isPaid
                        ? `<span class="px-2 py-0.5 text-[9px] rounded font-bold bg-emerald-600 text-white uppercase tracking-wider cursor-pointer hover:bg-emerald-700 transition" onclick="toggleItemPaymentStatus('${activeClient.id}', '${escapeHTMLAttribute(item.title)}', '${item.date}')">Paid</span>`
                        : `<span class="px-2 py-0.5 text-[9px] rounded font-bold border border-rose-600 text-rose-600 uppercase tracking-wider cursor-pointer hover:bg-rose-600 hover:text-white transition" onclick="toggleItemPaymentStatus('${activeClient.id}', '${escapeHTMLAttribute(item.title)}', '${item.date}')">Pending</span>`;

                    const dObj = new Date(item.date);
                    const formattedDate = isNaN(dObj.getTime()) ? item.date : dObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

                    tr.innerHTML = `
                        <td class="py-2.5 px-3">
                            <span class="font-bold text-neutral-900 dark:text-neutral-100 block">${escapeHTML(item.title)}</span>
                            <span class="text-[10px] text-neutral-400 dark:text-neutral-500 block mt-0.5 truncate max-w-[180px]">${escapeHTML(item.desc || '')}</span>
                        </td>
                        <td class="py-2.5 px-3 text-neutral-600 dark:text-neutral-400 font-medium">${escapeHTML(item.type || 'YT Upload Service')}</td>
                        <td class="py-2.5 px-3 text-neutral-500">${formattedDate}</td>
                        <td class="py-2.5 px-3 text-right font-bold text-neutral-800 dark:text-neutral-200">${db.settings.currency || 'Rs.'} ${(item.price || 0).toLocaleString()}</td>
                        <td class="py-2.5 px-3 text-center">${statusBadge}</td>
                    `;
                    zoomTbody.appendChild(tr);
                });
            }
        }

        // 3. Render Facebook Ad Campaigns Table with Performance Metrics
        const adContainer = document.getElementById('client-ad-campaigns-container');
        const adTbody = document.getElementById('client-ad-campaigns-table-body');
        if (adContainer && adTbody) {
            if (adCampaigns.length === 0) {
                adContainer.classList.add('hidden');
            } else {
                adContainer.classList.remove('hidden');
                adTbody.innerHTML = '';
                const sortedAds = [...adCampaigns].sort((a, b) => new Date(b.date) - new Date(a.date));
                sortedAds.forEach(item => {
                    const tr = document.createElement('tr');
                    tr.className = 'border-b border-neutral-100/50 dark:border-neutral-800/40 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/20 transition';

                    const isPaid = item.status === 'Paid';
                    const statusBadge = isPaid
                        ? `<span class="px-2 py-0.5 text-[9px] rounded font-bold bg-emerald-600 text-white uppercase tracking-wider cursor-pointer hover:bg-emerald-700 transition" onclick="toggleItemPaymentStatus('${activeClient.id}', '${escapeHTMLAttribute(item.title)}', '${item.date}')">Paid</span>`
                        : `<span class="px-2 py-0.5 text-[9px] rounded font-bold border border-rose-600 text-rose-600 uppercase tracking-wider cursor-pointer hover:bg-rose-600 hover:text-white transition" onclick="toggleItemPaymentStatus('${activeClient.id}', '${escapeHTMLAttribute(item.title)}', '${item.date}')">Pending</span>`;

                    const dObj = new Date(item.date);
                    const formattedDate = isNaN(dObj.getTime()) ? item.date : dObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

                    // Regex extract performance stats from description
                    let spend = item.spend || '-';
                    let leads = item.leads || '-';
                    let reach = item.reach || '-';
                    let impressions = item.impressions || '-';

                    if (item.desc && (spend === '-' || leads === '-' || reach === '-' || impressions === '-')) {
                        const spendMatch = item.desc.match(/spend:\s*(\$?\d+)/i);
                        const leadsMatch = item.desc.match(/leads:\s*([\w\s,]+)/i);
                        const reachMatch = item.desc.match(/reach:\s*([\d,]+)/i);
                        const impMatch = item.desc.match(/impressions?:\s*([\d,]+)/i);

                        if (spendMatch && spend === '-') spend = spendMatch[1];
                        if (leadsMatch && leads === '-') leads = leadsMatch[1].split(')')[0].trim();
                        if (reachMatch && reach === '-') reach = reachMatch[1];
                        if (impMatch && impressions === '-') impressions = impMatch[1];
                    }

                    tr.innerHTML = `
                        <td class="py-2.5 px-3">
                            <span class="font-bold text-neutral-900 dark:text-neutral-100 block">${escapeHTML(item.title)}</span>
                            <span class="text-[10px] text-neutral-400 dark:text-neutral-500 block mt-0.5 truncate max-w-[120px]">${escapeHTML(item.desc || '')}</span>
                        </td>
                        <td class="py-2.5 px-3 text-neutral-700 dark:text-neutral-300 font-semibold">${escapeHTML(spend)}</td>
                        <td class="py-2.5 px-3 text-neutral-600 dark:text-neutral-400 font-medium">${escapeHTML(leads)}</td>
                        <td class="py-2.5 px-3 text-neutral-500">${escapeHTML(reach)}</td>
                        <td class="py-2.5 px-3 text-neutral-500">${escapeHTML(impressions)}</td>
                        <td class="py-2.5 px-3 text-neutral-500">${formattedDate}</td>
                        <td class="py-2.5 px-3 text-right font-bold text-neutral-800 dark:text-neutral-200">${db.settings.currency || 'Rs.'} ${(item.price || 0).toLocaleString()}</td>
                        <td class="py-2.5 px-3 text-center">${statusBadge}</td>
                    `;
                    adTbody.appendChild(tr);
                });
            }
        }
    } else {
        editorCard.classList.add('hidden');
        emptyState.classList.remove('hidden');
    }
}

function selectDirectoryClient(id) {
    selectedDirectoryClientId = id;
    renderClientsDirectory();
}

// FEATURE 6: AUTO INCREMENT INVOICE NUMBER
function addNewClient() {
    const newId = "client-" + Date.now();
    const dateFormatted = formatLocalDate();

    let nextInvoiceNo = "#AF-101";
    if (db.clients && db.clients.length > 0) {
        let maxNum = 0;
        let prefix = "#AF-";
        db.clients.forEach(c => {
            if (c.invoiceNo) {
                const match = c.invoiceNo.match(/^(.*?)(\d+)$/);
                if (match) {
                    prefix = match[1];
                    const num = parseInt(match[2]);
                    if (num > maxNum) {
                        maxNum = num;
                    }
                }
            }
        });
        if (maxNum > 0) {
            nextInvoiceNo = prefix + String(maxNum + 1).padStart(3, '0');
        }
    }

    const newClient = {
        id: newId,
        name: "New Client Profile",
        company: "Company Name",
        phone: "+94 77 123 4567",
        invoiceNo: nextInvoiceNo,
        invoiceDate: dateFormatted,
        items: []
    };
    db.clients.push(newClient);
    selectedDirectoryClientId = newId;
    saveDatabase();
    renderClientsDirectory();
    showToast(`Added client with invoice ${nextInvoiceNo}`);
}

function saveClientEdit() {
    const client = db.clients.find(c => c.id === selectedDirectoryClientId);
    if (!client) return;

    client.name = document.getElementById('edit-client-name').value.trim();
    client.company = document.getElementById('edit-client-company').value.trim();
    client.phone = document.getElementById('edit-client-phone').value.trim();

    saveDatabase();
    renderClientsDirectory();
    showToast("Client details saved successfully!");
}

function deleteSelectedClient() {
    if (db.clients.length <= 1) {
        alert("At least one client profile must be maintained in the system.");
        return;
    }
    if (!confirm("Are you sure you want to delete this client and all associated work history?")) return;

    db.clients = db.clients.filter(c => c.id !== selectedDirectoryClientId);
    selectedDirectoryClientId = db.clients[0].id;
    saveDatabase();
    renderClientsDirectory();
    showToast("Deleted client profile");
}

// Dynamic Client JSON Export/Import
function exportClientJSON() {
    const client = db.clients.find(c => c.id === selectedDirectoryClientId);
    if (!client) return;

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(client, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `${client.name.replace(/\s+/g, '_')}_profile.json`);
    dlAnchorElem.click();
    showToast("Profile exported to JSON!");
}

function importClientJSON(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const imported = JSON.parse(e.target.result);
            if (!imported.name || !imported.items) {
                alert("Invalid profile JSON format.");
                return;
            }
            // Assign new ID to prevent collision
            imported.id = "client-" + Date.now();
            // Validate statuses
            imported.items.forEach(item => {
                if (!item.prodStatus) item.prodStatus = item.status === 'Paid' ? 'Delivered' : 'First Cut';
            });
            db.clients.push(imported);
            selectedDirectoryClientId = imported.id;
            saveDatabase();
            renderClientsDirectory();
            showToast(`Imported ${imported.name} successfully!`);
        } catch (error) {
            alert("Error parsing JSON file: " + error.message);
        }
    };
    reader.readAsText(file);
}

// -------------------------------------------------------------
// EMPLOYEE DIRECTORY & PAYOUT MANAGEMENT LOGIC
// -------------------------------------------------------------
function updateSidebarUserBadge() {
    const owner = (db.employees && db.employees.length > 0) ? db.employees[0] : null;
    const nameEl = document.getElementById('sidebar-user-name');
    const roleEl = document.getElementById('sidebar-user-role');
    const initialsEl = document.getElementById('sidebar-user-initials');

    if (owner) {
        if (nameEl) nameEl.innerText = owner.name;
        if (roleEl) roleEl.innerText = owner.role || 'Owner / Lead Editor';
        if (initialsEl) initialsEl.innerHTML = `<img src="assets/logo.png" class="h-full w-full object-contain" alt="A-Frame Visuals Logo">`;
    }
}

function copyEmployeeBankInfo() {
    const activeEmp = (db.employees && db.employees.length > 0) ? db.employees.find(e => e.id === selectedDirectoryEmployeeId) : null;
    if (!activeEmp) return;

    const bankText = `Bank: ${activeEmp.bankName || 'N/A'}\nBranch: ${activeEmp.bankBranch || 'N/A'}\nAccount Name: ${activeEmp.accName || 'N/A'}\nAccount No: ${activeEmp.accNo || 'N/A'}`;

    navigator.clipboard.writeText(bankText).then(() => {
        showToast("Copied Bank Settlement Details to Clipboard!");
    }).catch(() => {
        showToast("Failed to copy details.");
    });
}

function selectDirectoryEmployee(id) {
    selectedDirectoryEmployeeId = id;
    renderEmployeesDirectory();
}

function renderEmployeesDirectory() {
    updateSidebarUserBadge();

    const listContainer = document.getElementById('employee-list-container');
    if (!listContainer) return;
    listContainer.innerHTML = '';

    if (!db.employees) db.employees = [];

    const searchQuery = (document.getElementById('employee-search-input')?.value || '').toLowerCase().trim();

    db.employees.forEach(emp => {
        if (searchQuery) {
            const nameMatch = (emp.name || '').toLowerCase().includes(searchQuery);
            const roleMatch = (emp.role || '').toLowerCase().includes(searchQuery);
            if (!nameMatch && !roleMatch) return;
        }

        const initials = getInitials(emp.name);
        const isActive = selectedDirectoryEmployeeId === emp.id;
        const itemBtn = document.createElement('button');
        itemBtn.className = `w-full text-left px-6 py-4 flex items-center gap-3.5 transition border-l-2 hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40 ${isActive ? 'border-accent bg-neutral-100/60 dark:bg-neutral-800/40 font-semibold text-accent' : 'border-transparent text-neutral-600 dark:text-neutral-400'}`;
        itemBtn.onclick = () => selectDirectoryEmployee(emp.id);
        itemBtn.innerHTML = `
            <div class="h-9 w-9 shrink-0 rounded-full flex items-center justify-center text-xs font-black uppercase tracking-wider ${isActive ? 'bg-accent text-white shadow-sm' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200/50 dark:border-neutral-800'}">
                ${initials}
            </div>
            <div class="min-w-0 flex-1">
                <h4 class="font-bold text-xs truncate">${escapeHTML(emp.name)}</h4>
                <p class="text-[10px] text-neutral-400 dark:text-neutral-500 mt-0.5 truncate">${escapeHTML(emp.role || 'Freelance Editor')}</p>
            </div>
        `;
        listContainer.appendChild(itemBtn);
    });

    const editorCard = document.getElementById('employee-editor-card');
    const emptyState = document.getElementById('employee-empty-state');
    const activeEmp = db.employees.find(e => e.id === selectedDirectoryEmployeeId);

    if (activeEmp) {
        editorCard.classList.remove('hidden');
        emptyState.classList.add('hidden');

        document.getElementById('edit-employee-name').value = activeEmp.name || '';
        document.getElementById('edit-employee-role').value = activeEmp.role || '';
        document.getElementById('edit-employee-email').value = activeEmp.email || '';
        document.getElementById('edit-employee-phone').value = activeEmp.phone || '';
        document.getElementById('edit-employee-joindate').value = activeEmp.joinDate || '';

        document.getElementById('edit-employee-bank-name').value = activeEmp.bankName || '';
        document.getElementById('edit-employee-bank-branch').value = activeEmp.bankBranch || '';
        document.getElementById('edit-employee-bank-accname').value = activeEmp.accName || '';
        document.getElementById('edit-employee-bank-accno').value = activeEmp.accNo || '';

        // Render Employee history and calculations
        renderEmployeeHistory();
    } else {
        editorCard.classList.add('hidden');
        emptyState.classList.remove('hidden');
    }
}

function addNewEmployee() {
    const newId = "employee-" + Date.now();
    const today = formatLocalDate();

    const newEmp = {
        id: newId,
        name: "New Employee Profile",
        role: "Video Editor",
        email: "editor@example.com",
        phone: "+94 77 123 4567",
        joinDate: today,
        bankName: "Sampath Bank",
        bankBranch: "Colombo",
        accName: "New Employee Profile",
        accNo: "XXXX XXXX XXXX"
    };

    if (!db.employees) db.employees = [];
    db.employees.push(newEmp);
    selectedDirectoryEmployeeId = newId;

    saveDatabase();
    renderEmployeesDirectory();

    // Refresh log options dropdown too
    const logEmpSelect = document.getElementById('log-employee-select');
    if (logEmpSelect) {
        logEmpSelect.innerHTML = '<option value="">-- Unassigned --</option>';
        db.employees.forEach(emp => {
            const opt = document.createElement('option');
            opt.value = emp.id;
            opt.innerText = `${emp.name} (${emp.role})`;
            logEmpSelect.appendChild(opt);
        });
        logEmpSelect.value = newId;
    }

    showToast("Added new employee profile!");
}

function saveEmployeeEdit() {
    const activeEmp = db.employees.find(e => e.id === selectedDirectoryEmployeeId);
    if (!activeEmp) return;

    activeEmp.name = document.getElementById('edit-employee-name').value.trim();
    activeEmp.role = document.getElementById('edit-employee-role').value.trim();
    activeEmp.email = document.getElementById('edit-employee-email').value.trim();
    activeEmp.phone = document.getElementById('edit-employee-phone').value.trim();
    activeEmp.joinDate = document.getElementById('edit-employee-joindate').value.trim();

    activeEmp.bankName = document.getElementById('edit-employee-bank-name').value.trim();
    activeEmp.bankBranch = document.getElementById('edit-employee-bank-branch').value.trim();
    activeEmp.accName = document.getElementById('edit-employee-bank-accname').value.trim();
    activeEmp.accNo = document.getElementById('edit-employee-bank-accno').value.trim();

    // Sync Owner settings with global company settings if editing the Owner / Lead Editor
    if (activeEmp.id === 'employee-adheesha' || (db.employees.length > 0 && activeEmp.id === db.employees[0].id)) {
        if (!db.settings) db.settings = {};
        db.settings.fromName = activeEmp.name;
        db.settings.fromEmail = activeEmp.email;
        db.settings.fromPhone = activeEmp.phone;
        db.settings.bankName = activeEmp.bankName;
        db.settings.bankBranch = activeEmp.bankBranch;
        db.settings.accName = activeEmp.accName;
        db.settings.accNo = activeEmp.accNo;
    }

    saveDatabase();
    updateSidebarUserBadge();
    renderEmployeesDirectory();
    showToast("Employee profile saved successfully!");
}

function deleteSelectedEmployee() {
    const activeEmp = db.employees.find(e => e.id === selectedDirectoryEmployeeId);
    if (!activeEmp) return;

    if (db.employees.length <= 1) {
        alert("At least one employee profile must be maintained in the system.");
        return;
    }

    if (!confirm(`Are you sure you want to delete ${activeEmp.name}? Any tasks assigned to them will be unassigned.`)) return;

    // Unassign tasks
    db.clients.forEach(client => {
        client.items.forEach(item => {
            if (item.employeeId === selectedDirectoryEmployeeId) {
                item.employeeId = "";
            }
        });
    });

    db.employees = db.employees.filter(e => e.id !== selectedDirectoryEmployeeId);
    selectedDirectoryEmployeeId = db.employees[0].id;

    saveDatabase();
    renderEmployeesDirectory();
    showToast("Employee profile deleted.");
}

function renderEmployeeHistory() {
    const historyTbody = document.getElementById('employee-work-history-table-body');
    if (!historyTbody) return;

    const filterVal = document.getElementById('employee-payout-filter')?.value || 'all';
    const cycleVal = document.getElementById('employee-payout-cycle')?.value || 'all_time';

    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    let totalVideos = 0;
    let totalPaidPayouts = 0;
    let totalOutstandingPayouts = 0;

    let historyItems = [];

    db.clients.forEach(client => {
        client.items.forEach((item, index) => {
            if (item.employeeId === selectedDirectoryEmployeeId) {
                const itemDate = new Date(item.date);

                // Pay cycle filter check
                if (cycleVal === 'this_week' && (isNaN(itemDate.getTime()) || itemDate < startOfWeek)) return;
                if (cycleVal === 'this_month' && (isNaN(itemDate.getTime()) || itemDate < startOfMonth)) return;

                const payoutShare = Number(item.employeeShare) || 0;

                // Payout stats aggregation
                totalVideos++;
                if (item.employeePayoutStatus === 'Paid') {
                    totalPaidPayouts += payoutShare;
                } else {
                    totalOutstandingPayouts += payoutShare;
                }

                // Filter matching items
                if (filterVal === 'all' || item.employeePayoutStatus === filterVal) {
                    historyItems.push({
                        clientName: client.name,
                        clientId: client.id,
                        itemIndex: index,
                        ...item
                    });
                }
            }
        });
    });

    // Update stats labels
    document.getElementById('employee-stats-total-videos').innerText = totalVideos;
    document.getElementById('employee-stats-paid').innerText = `${db.settings.currency || 'Rs.'} ${totalPaidPayouts.toLocaleString()}`;

    if (selectedDirectoryEmployeeId === 'employee-adheesha') {
        document.getElementById('employee-stats-outstanding').innerText = `Rs. 0 (Studio Owner)`;
    } else {
        document.getElementById('employee-stats-outstanding').innerText = `${db.settings.currency || 'Rs.'} ${totalOutstandingPayouts.toLocaleString()}`;
    }

    historyTbody.innerHTML = '';

    if (historyItems.length === 0) {
        historyTbody.innerHTML = `
            <tr>
                <td colspan="6" class="py-6 text-center text-xs text-neutral-400 dark:text-neutral-600 italic">
                    No videos logged matching this filter / pay cycle.
                </td>
            </tr>
        `;
        return;
    }

    // Sort by date descending
    historyItems.sort((a, b) => new Date(b.date) - new Date(a.date));

    historyItems.forEach(item => {
        const tr = document.createElement('tr');
        tr.className = 'border-b border-neutral-100/50 dark:border-neutral-800/40 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/20 transition';

        const isPayoutPaid = item.employeePayoutStatus === 'Paid';
        const payoutStatusBadge = isPayoutPaid
            ? `<span class="px-2 py-1 text-[9px] font-black uppercase rounded bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">Paid</span>`
            : `<span class="px-2 py-1 text-[9px] font-black uppercase rounded bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400">Pending</span>`;

        const actionButton = isPayoutPaid
            ? `<button onclick="toggleEmployeeItemPayout('${item.clientId}', ${item.itemIndex}, 'Pending')" class="text-[10px] text-rose-600 hover:underline font-semibold">Mark Pending</button>`
            : `<button onclick="toggleEmployeeItemPayout('${item.clientId}', ${item.itemIndex}, 'Paid')" class="text-[10px] text-emerald-600 hover:underline font-semibold">Mark Paid</button>`;

        tr.innerHTML = `
            <td class="py-3 px-3 font-semibold text-neutral-900 dark:text-neutral-100">${escapeHTML(item.clientName)}</td>
            <td class="py-3 px-3">${escapeHTML(item.title)}</td>
            <td class="py-3 px-3 text-neutral-500 dark:text-neutral-400">${escapeHTML(item.date)}</td>
            <td class="py-3 px-3 text-right font-bold text-neutral-800 dark:text-neutral-200">${db.settings.currency || 'Rs.'} ${(item.employeeShare || 0).toLocaleString()}</td>
            <td class="py-3 px-3 text-center">${payoutStatusBadge}</td>
            <td class="py-3 px-3 text-right">${actionButton}</td>
        `;
        historyTbody.appendChild(tr);
    });
}

function toggleEmployeeItemPayout(clientId, itemIndex, newStatus) {
    const client = db.clients.find(c => c.id === clientId);
    if (client && client.items[itemIndex]) {
        client.items[itemIndex].employeePayoutStatus = newStatus;
        saveDatabase();

        // Re-render
        renderEmployeeHistory();
        renderInvoiceItemsInputs(); // update invoice editor inputs if visible
        renderInvoicePreview();     // update preview if visible

        showToast(`Payout status updated to ${newStatus}`);
    }
}

async function exportEmployeePayoutPDF(employeeId) {
    const empId = employeeId || selectedDirectoryEmployeeId;
    if (!empId) {
        alert("Please select an employee profile first.");
        return;
    }
    const emp = db.employees.find(e => e.id === empId);
    if (!emp) {
        alert("Employee profile not found.");
        return;
    }

    const cycleVal = document.getElementById('employee-payout-cycle')?.value || 'all_time';
    const filterVal = document.getElementById('employee-payout-filter')?.value || 'all';

    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    let itemsListRows = '';
    let totalPayout = 0;

    db.clients.forEach(client => {
        client.items.forEach(item => {
            if (item.employeeId === empId) {
                const itemDate = new Date(item.date);

                // Pay cycle filter check
                if (cycleVal === 'this_week' && (isNaN(itemDate.getTime()) || itemDate < startOfWeek)) return;
                if (cycleVal === 'this_month' && (isNaN(itemDate.getTime()) || itemDate < startOfMonth)) return;

                if (filterVal !== 'all' && item.employeePayoutStatus !== filterVal) return;

                const share = Number(item.employeeShare) || 0;
                totalPayout += share;
                const statusStr = item.employeePayoutStatus === 'Paid' ? 'PAID' : 'PENDING';
                itemsListRows += `
                    <tr style="border-bottom: 1px solid #e5e7eb;">
                        <td style="padding: 10px 12px; font-weight: 700;">${escapeHTML(item.title)}</td>
                        <td style="padding: 10px 12px; color: #4b5563;">${escapeHTML(client.name)}</td>
                        <td style="padding: 10px 12px; color: #4b5563;">${escapeHTML(item.type)}</td>
                        <td style="padding: 10px 12px; color: #4b5563;">${item.date}</td>
                        <td style="padding: 10px 12px; text-align: right; font-weight: 800;">${db.settings.currency || 'Rs.'} ${share.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                        <td style="padding: 10px 12px; text-align: center; font-weight: 800;">${statusStr}</td>
                    </tr>
                `;
            }
        });
    });

    const cycleLabelStr = cycleVal === 'this_week' ? 'Weekly Cycle (This Week)' : (cycleVal === 'this_month' ? 'Monthly Cycle (This Month)' : 'All Time');
    const logoSrc = window.location.protocol === 'file:'
        ? new URL('assets/logo.png', window.location.href).href
        : 'assets/logo.png';

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Pay Sheet - ${escapeHTMLAttribute(emp.name)}</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
            <style>
                @page {
                    size: A4 portrait;
                    margin: 0;
                }
                @media print {
                    body {
                        background: #ffffff !important;
                        margin: 0 !important;
                        padding: 0 !important;
                    }
                    .a4-page {
                        box-shadow: none !important;
                        margin: 0 !important;
                        width: 210mm !important;
                        height: 297mm !important;
                        padding: 16mm !important;
                    }
                }
                body {
                    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
                    margin: 0;
                    padding: 24px;
                    color: #000000;
                    background: #f1f5f9;
                    display: flex;
                    justify-content: center;
                }
                .a4-page {
                    background: #ffffff;
                    width: 210mm;
                    min-height: 297mm;
                    padding: 16mm;
                    box-sizing: border-box;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                .header { border-bottom: 2px solid #000000; padding-bottom: 18px; display: flex; justify-content: space-between; align-items: flex-start; }
                .company-name { font-size: 24px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.02em; }
                .doc-subtitle { font-size: 11px; font-weight: 800; color: #666666; text-transform: uppercase; letter-spacing: 0.15em; margin-top: 4px; }
                .details { display: flex; justify-content: space-between; margin-top: 24px; margin-bottom: 24px; gap: 16px; }
                .box { background: #fafafa; border: 1px solid #e5e7eb; padding: 14px; width: 48%; box-sizing: border-box; }
                .box-title { font-size: 9px; font-weight: 800; color: #666666; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 8px; }
                .box p { margin: 3px 0; font-size: 12px; color: #111111; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 12px; }
                th { background: #000000; color: #ffffff; text-transform: uppercase; font-size: 9px; font-weight: 800; letter-spacing: 0.08em; padding: 10px 12px; text-align: left; }
                .total-row { display: flex; justify-content: space-between; align-items: center; margin-top: 24px; padding-top: 16px; border-top: 2px solid #000000; font-size: 16px; font-weight: 900; }
                .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 10px; font-weight: 700; color: #888888; text-transform: uppercase; letter-spacing: 0.15em; }
            </style>
        </head>
        <body>
            <div class="a4-page">
                <div>
                    <div class="header">
                        <div style="display: flex; align-items: center; gap: 16px;">
                            <div style="height: 52px; width: 52px; display: flex; align-items: center; justify-content: center;">
                                <img src="${logoSrc}" style="height: 100%; width: 100%; object-fit: contain;" alt="A-Frame Visuals Logo">
                            </div>
                            <div>
                                <div class="company-name">${escapeHTML(db.settings.fromCompany || "A-Frame Visuals")}</div>
                                <div class="doc-subtitle">EMPLOYEE PAY SHEET & SETTLEMENT STATEMENT</div>
                            </div>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #666666;">Pay Period</div>
                            <div style="font-size: 13px; font-weight: 900; margin-top: 2px;">${cycleLabelStr}</div>
                            <div style="font-size: 10px; color: #888888; margin-top: 4px;">Issued: ${formatLocalDate()}</div>
                        </div>
                    </div>

                    <div class="details">
                        <div class="box">
                            <div class="box-title">Employee Profile Details</div>
                            <p style="font-weight: 900; font-size: 14px; color: #000000;">${escapeHTML(emp.name)}</p>
                            <p><strong>Designation:</strong> ${escapeHTML(emp.role || 'Video Editor')}</p>
                            <p><strong>Email:</strong> ${escapeHTML(emp.email || 'N/A')}</p>
                            <p><strong>Phone:</strong> ${escapeHTML(emp.phone || 'N/A')}</p>
                        </div>
                        <div class="box">
                            <div class="box-title">Bank Settlement Account</div>
                            <p><strong>Bank Name:</strong> ${escapeHTML(emp.bankName || 'Sampath Bank')}</p>
                            <p><strong>Branch:</strong> ${escapeHTML(emp.bankBranch || 'Yakkala')}</p>
                            <p><strong>Account Name:</strong> ${escapeHTML(emp.accName || 'N/A')}</p>
                            <p><strong>Account No:</strong> ${escapeHTML(emp.accNo || 'N/A')}</p>
                        </div>
                    </div>

                    <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #666666; margin-bottom: 8px;">Assigned Deliverables Breakdown</div>
                    <table>
                        <thead>
                            <tr>
                                <th>Video Deliverable</th>
                                <th>Client</th>
                                <th>Type</th>
                                <th>Date</th>
                                <th style="text-align: right;">Payout Share</th>
                                <th style="text-align: center;">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsListRows || '<tr><td colspan="6" style="padding: 20px; text-align: center; color: #888888;">No deliverables assigned for this pay period.</td></tr>'}
                        </tbody>
                    </table>

                    <div class="total-row">
                        <span>Total Accumulated Payout Amount</span>
                        <span>${db.settings.currency || 'Rs.'} ${totalPayout.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </div>
                </div>

                <div class="footer">
                    Thank you for your trusted creative contribution to ${escapeHTML(db.settings.fromCompany || "A-Frame Visuals")}!
                </div>
            </div>
        </body>
        </html>
    `;

    if (window.api && typeof window.api.exportPDFHtml === 'function') {
        const cleanEmpName = emp.name.replace(/[^a-zA-Z0-9_-]/g, '_');
        const filename = `PaySheet_${cleanEmpName}_${formatLocalDate()}.pdf`;
        const res = await window.api.exportPDFHtml(htmlContent, filename);
        if (res.success) {
            showToast("Exported Pay Sheet PDF!");
        }
    } else {
        const printWin = window.open('', '_blank');
        if (printWin) {
            printWin.document.write(htmlContent);
            printWin.document.close();
            setTimeout(() => { printWin.print(); }, 500);
        }
    }
}

function sendWhatsAppEmployeePayout() {
    const empId = selectedDirectoryEmployeeId;
    if (!empId) {
        alert("Please select an employee profile first.");
        return;
    }
    const emp = db.employees.find(e => e.id === empId);
    if (!emp) return;

    let totalPayout = 0;
    let itemsText = "";

    db.clients.forEach(client => {
        client.items.forEach((item, idx) => {
            if (item.employeeId === empId) {
                const share = Number(item.employeeShare) || 0;
                totalPayout += share;
                const statusStr = item.employeePayoutStatus === 'Paid' ? '[Paid]' : '[Pending]';
                itemsText += `- *${item.title}* (${client.name}): ${db.settings.currency || 'Rs.'} ${share.toLocaleString()} ${statusStr}\n`;
            }
        });
    });

    const summaryText = `*${(db.settings.fromCompany || "A-FRAME VISUALS").toUpperCase()} - EDITOR PAYOUT SLIP*
----------------------------------------
*Editor Name:* ${emp.name}
*Role:* ${emp.role || 'Video Editor'}
*Date:* ${formatLocalDate()}

*Assigned Deliverables:*
${itemsText || 'No deliverables listed.'}----------------------------------------
*Total Accumulated Payout: ${db.settings.currency || 'Rs.'} ${totalPayout.toLocaleString('en-US', { minimumFractionDigits: 2 })}*

*Bank Settlement Account:*
Bank: ${emp.bankName || 'Sampath Bank'}
Branch: ${emp.bankBranch || 'Yakkala'}
Acc Name: ${emp.accName || 'STAC Sooriyaarachchi'}
Acc No: ${emp.accNo || '1068 5781 5932'}

Thank you for your creative excellence with A-Frame Visuals!`;

    navigator.clipboard.writeText(summaryText).then(() => {
        showToast("Copied WhatsApp Payout Slip to clipboard!");
    }).catch(err => {
        alert("Failed to copy text: " + err);
    });
}

// -------------------------------------------------------------
// INVOICES & DELIVERABLES EDITOR LOGIC
// -------------------------------------------------------------
function populateInvoiceSelect() {
    const select = document.getElementById('invoice-client-select');
    if (!select) return;

    select.innerHTML = '';
    db.clients.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.innerText = `${c.name} (${c.company || 'No Company'})`;
        if (c.id === currentActiveClientId) opt.selected = true;
        select.appendChild(opt);
    });

    // Populate templates dropdown selection matching db settings
    const tempSelect = document.getElementById('invoice-template-select');
    if (tempSelect) {
        tempSelect.value = 'classic';
    }

    loadInvoiceDetails(currentActiveClientId);
}

function loadInvoiceDetails(clientId) {
    if (!clientId) {
        if (db.clients.length > 0) {
            clientId = db.clients[0].id;
        } else {
            return;
        }
    }

    currentActiveClientId = clientId;
    const client = db.clients.find(c => c.id === clientId) || db.clients[0];
    if (!client) return;

    // Reset exclusions so they start fresh with all items checked
    if (client.items) {
        client.items.forEach(item => {
            delete item.excludeFromInvoice;
        });
    }

    document.getElementById('invoice-meta-no').value = client.invoiceNo || '';
    document.getElementById('invoice-meta-date').value = client.invoiceDate || '';

    const hasUnpaid = client.items.some(i => i.status === 'Unpaid');
    document.getElementById('invoice-meta-status').value = hasUnpaid ? 'Unpaid' : 'Paid';

    renderInvoiceItemsInputs();
    renderInvoicePreview();
}

function updateInvoiceMeta() {
    const client = db.clients.find(c => c.id === currentActiveClientId);
    if (!client) return;

    client.invoiceNo = document.getElementById('invoice-meta-no').value;
    client.invoiceDate = document.getElementById('invoice-meta-date').value;

    const status = document.getElementById('invoice-meta-status').value;

    // Only update items that are currently selected/included in the invoice!
    const filterVal = document.getElementById('invoice-item-filter')?.value || 'current_and_unbilled';
    const unpaidOnly = document.getElementById('invoice-filter-unpaid-only')?.checked;

    let invoiceItems = client.items;
    if (filterVal === 'current_and_unbilled') {
        invoiceItems = client.items.filter(item => item.invoiceNo === client.invoiceNo || !item.invoiceNo);
    } else if (filterVal === 'current_only') {
        invoiceItems = client.items.filter(item => item.invoiceNo === client.invoiceNo);
    } else if (filterVal === 'unbilled_only') {
        invoiceItems = client.items.filter(item => !item.invoiceNo);
    }
    if (unpaidOnly) {
        invoiceItems = invoiceItems.filter(item => item.status !== 'Paid');
    }
    invoiceItems = invoiceItems.filter(item => !item.excludeFromInvoice);

    invoiceItems.forEach(i => {
        i.status = status;
        if (status === 'Paid') {
            i.prodStatus = 'Delivered';
        }
    });

    saveDatabase();
    renderInvoicePreview();
}

function updateInvoiceHeaderStatus() {
    const client = db.clients.find(c => c.id === currentActiveClientId);
    if (!client) return;

    // Get currently included items in the invoice
    const filterVal = document.getElementById('invoice-item-filter')?.value || 'current_and_unbilled';
    const unpaidOnly = document.getElementById('invoice-filter-unpaid-only')?.checked;

    let invoiceItems = client.items;
    if (filterVal === 'current_and_unbilled') {
        invoiceItems = client.items.filter(item => item.invoiceNo === client.invoiceNo || !item.invoiceNo);
    } else if (filterVal === 'current_only') {
        invoiceItems = client.items.filter(item => item.invoiceNo === client.invoiceNo);
    } else if (filterVal === 'unbilled_only') {
        invoiceItems = client.items.filter(item => !item.invoiceNo);
    }
    if (unpaidOnly) {
        invoiceItems = invoiceItems.filter(item => item.status !== 'Paid');
    }
    invoiceItems = invoiceItems.filter(item => !item.excludeFromInvoice);

    const hasUnpaid = invoiceItems.some(i => i.status === 'Unpaid');
    const statusEl = document.getElementById('invoice-meta-status');
    if (statusEl) {
        statusEl.value = hasUnpaid ? 'Unpaid' : 'Paid';
    }
}

async function exportInvoicePDF() {
    try {
        const client = db.clients.find(c => c.id === currentActiveClientId);
        if (!client) {
            alert("Please select a client profile first.");
            return;
        }

        const invoiceEl = document.getElementById('invoice-print-area');
        if (!invoiceEl) {
            alert("Invoice preview not found.");
            return;
        }

        const invoiceNo = document.getElementById('invoice-meta-no')?.value.trim() || 'INV';
        const clientCleanName = client.name.replace(/^(mr\.|mrs\.|ms\.|dr\.)\s+/i, '').replace(/\s+/g, '_');
        const filenameSuggestion = `${clientCleanName}_Invoice_${invoiceNo.replace('#', '')}.pdf`;

        // Auto-tag currently displayed items with current invoice number if unbilled
        const filterVal = document.getElementById('invoice-item-filter')?.value || 'current_and_unbilled';
        const unpaidOnly = document.getElementById('invoice-filter-unpaid-only')?.checked;
        let displayItems = client.items;
        if (filterVal === 'current_and_unbilled') {
            displayItems = client.items.filter(item => item.invoiceNo === client.invoiceNo || !item.invoiceNo);
        } else if (filterVal === 'current_only') {
            displayItems = client.items.filter(item => item.invoiceNo === client.invoiceNo);
        } else if (filterVal === 'unbilled_only') {
            displayItems = client.items.filter(item => !item.invoiceNo);
        }
        if (unpaidOnly) {
            displayItems = displayItems.filter(item => item.status !== 'Paid');
        }
        displayItems = displayItems.filter(item => !item.excludeFromInvoice);

        let dbUpdated = false;
        displayItems.forEach(item => {
            if (!item.invoiceNo) {
                item.invoiceNo = client.invoiceNo || "";
                dbUpdated = true;
            }
        });
        if (dbUpdated) {
            await saveDatabase();
            renderInvoiceItemsInputs();
            renderInvoicePreview();
        }

        showToast("Generating PDF statement...");

        // Grab computed styles from existing stylesheet files
        // and build a self-contained A4 HTML doc
        const invoiceHTML = invoiceEl.outerHTML;
        const tailwindCSS = await fetch('css/tailwind.css').then(r => r.text()).catch(() => '');
        const customCSS = await fetch('css/style.css').then(r => r.text()).catch(() => '');

        const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice</title>
  <style>
    ${tailwindCSS}
    ${customCSS}
    @page {
      size: A4;
      margin: 0;
    }
    * { box-sizing: border-box; }
    html, body {
      margin: 0; padding: 0;
      width: 210mm;
      height: 297mm;
      background: white;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      overflow: hidden;
    }
    .print-container {
      width: 210mm !important;
      height: 297mm !important;
      min-height: 297mm !important;
      padding: 12mm 14mm !important;
      margin: 0 !important;
      background: white !important;
      box-shadow: none !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: space-between !important;
      box-sizing: border-box !important;
    }
    /* Optimized spacing to prevent page overflow while keeping text readable */
    #invoice-header-block {
      padding-bottom: 12px !important;
    }
    .print-container .mt-10 {
      margin-top: 16px !important;
    }
    .print-container .mt-12 {
      margin-top: 20px !important;
    }
    .print-container .mt-6 {
      margin-top: 12px !important;
    }
    /* Compact but highly readable table rows */
    .print-container table th {
      padding: 8px 16px !important;
      font-size: 11px !important;
    }
    .print-container table td {
      padding: 6px 16px !important;
      font-size: 11px !important;
    }
    /* Compact bank details and footer */
    #preview-bank-box {
      padding: 8px 12px !important;
      margin-top: 4px !important;
    }
    .print-container .mt-12.pt-8 {
      margin-top: 16px !important;
      padding-top: 12px !important;
    }
  </style>
</head>
<body>
  ${invoiceHTML}
</body>
</html>`;

        if (window.api && typeof window.api.exportPDFHtml === 'function') {
            const res = await window.api.exportPDFHtml(htmlContent, filenameSuggestion);
            if (res.success) {
                showToast(`✅ PDF saved: ${res.filePath}`);
            } else {
                if (res.error !== "Save canceled") {
                    alert("Failed to export PDF: " + res.error);
                }
            }
        } else {
            window.print();
        }
    } catch (err) {
        alert("Renderer PDF Export Error: " + err.message);
    }
}

// FEATURE 6: DATE HELPER defaults
function setInvoiceDateHelper(days) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    const dateFormatted = formatLocalDate(d);
    document.getElementById('invoice-meta-date').value = dateFormatted;
    updateInvoiceMeta();
    showToast(`Set invoice date helper: ${dateFormatted}`);
}

function renderInvoiceItemsInputs() {
    const client = db.clients.find(c => c.id === currentActiveClientId);
    if (!client) return;

    const container = document.getElementById('invoice-items-inputs-container');
    if (!container) return;

    container.innerHTML = '';

    const filterVal = document.getElementById('invoice-item-filter')?.value || 'current_and_unbilled';
    const unpaidOnly = document.getElementById('invoice-filter-unpaid-only')?.checked;

    let displayItems = client.items;

    if (filterVal === 'current_and_unbilled') {
        displayItems = client.items.filter(item => item.invoiceNo === client.invoiceNo || !item.invoiceNo);
    } else if (filterVal === 'current_only') {
        displayItems = client.items.filter(item => item.invoiceNo === client.invoiceNo);
    } else if (filterVal === 'unbilled_only') {
        displayItems = client.items.filter(item => !item.invoiceNo);
    }

    if (unpaidOnly) {
        displayItems = displayItems.filter(item => item.status !== 'Paid');
    }

    displayItems.forEach((item) => {
        const idx = client.items.indexOf(item);
        if (idx === -1) return;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'pt-4 first:pt-0 space-y-2 animate-fade-in-up';

        const presetOptions = (db.settings.pricingPresets || []).map(preset => {
            const isSelected = item.type === preset.name ? 'selected' : '';
            return `<option value="${preset.id}" ${isSelected}>${preset.name}</option>`;
        }).join('');

        const employeeOptions = (db.employees || []).map(emp => {
            const isSelected = item.employeeId === emp.id ? 'selected' : '';
            return `<option value="${emp.id}" ${isSelected}>${emp.name}</option>`;
        }).join('');

        const isExcluded = item.excludeFromInvoice === true;

        itemDiv.innerHTML = `
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                    <input type="checkbox" ${isExcluded ? '' : 'checked'} onchange="toggleItemInvoiceSelection(${idx}, this.checked)" class="rounded border-neutral-300 dark:border-neutral-700 text-accent focus:ring-accent cursor-pointer">
                    <span class="text-xs font-bold text-neutral-500">Video Item #${idx + 1}</span>
                </div>
                <button onclick="removeInvoiceItem(${idx})" class="text-[10px] text-red-600 hover:underline font-semibold transition">Remove</button>
            </div>
            <div class="grid grid-cols-2 gap-2 transition-all duration-200 ${isExcluded ? 'opacity-40 pointer-events-none select-none' : ''}">
                <div class="col-span-2">
                    <label class="block text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase">Apply Package Preset</label>
                    <select onchange="applyInvoiceItemPreset(${idx}, this.value)" class="w-full border rounded px-2.5 py-1 text-xs bg-white dark:bg-neutral-800 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200" ${isExcluded ? 'disabled' : ''}>
                        <option value="">-- Custom / Select Preset --</option>
                        ${presetOptions}
                    </select>
                </div>
                <div class="col-span-2">
                    <label class="block text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase">Video Title</label>
                    <input type="text" value="${escapeHTMLAttribute(item.title)}" oninput="updateInvoiceItemField(${idx}, 'title', this.value)" class="w-full border rounded px-2.5 py-1 text-xs bg-white dark:bg-neutral-800 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200" ${isExcluded ? 'disabled' : ''}>
                </div>
                <div class="col-span-2">
                    <label class="block text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase">Description</label>
                    <textarea oninput="handleInvoiceItemDescInput(${idx}, this.value)" rows="2" class="w-full border rounded px-2.5 py-1 text-xs bg-white dark:bg-neutral-800 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200" ${isExcluded ? 'disabled' : ''}>${item.desc}</textarea>
                </div>
                <div>
                    <label class="block text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase">Type</label>
                    <input type="text" id="invoice-item-type-${idx}" value="${escapeHTMLAttribute(item.type)}" oninput="handleInvoiceItemTypeInput(${idx}, this.value)" class="w-full border rounded px-2.5 py-1 text-xs bg-white dark:bg-neutral-800 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200" ${isExcluded ? 'disabled' : ''}>
                </div>
                <div>
                    <label class="block text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase">Price</label>
                    <input type="number" id="invoice-item-price-${idx}" value="${item.price}" oninput="updateInvoiceItemField(${idx}, 'price', parseFloat(this.value) || 0)" class="w-full border rounded px-2.5 py-1 text-xs bg-white dark:bg-neutral-800 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200" ${isExcluded ? 'disabled' : ''}>
                </div>
                <div>
                    <label class="block text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase">Production Status</label>
                    <select onchange="updateInvoiceItemField(${idx}, 'prodStatus', this.value)" class="w-full border rounded px-2.5 py-1 text-xs bg-white dark:bg-neutral-800 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200" ${isExcluded ? 'disabled' : ''}>
                        ${PRODUCTION_STATUSES.map(st => `<option value="${st}" ${item.prodStatus === st ? 'selected' : ''}>${st}</option>`).join('')}
                    </select>
                </div>
                <div>
                    <label class="block text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase">Payment Status</label>
                    <select onchange="updateInvoiceItemField(${idx}, 'status', this.value); updateInvoiceHeaderStatus();" class="w-full border rounded px-2.5 py-1 text-xs bg-white dark:bg-neutral-800 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200" ${isExcluded ? 'disabled' : ''}>
                        <option value="Unpaid" ${item.status !== 'Paid' ? 'selected' : ''}>Unpaid</option>
                        <option value="Paid" ${item.status === 'Paid' ? 'selected' : ''}>Paid</option>
                    </select>
                </div>
                <div>
                    <label class="block text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase">Delivery Date</label>
                    <input type="text" value="${escapeHTMLAttribute(item.date)}" oninput="updateInvoiceItemField(${idx}, 'date', this.value)" class="w-full border rounded px-2.5 py-1 text-xs bg-white dark:bg-neutral-800 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200" ${isExcluded ? 'disabled' : ''}>
                </div>
                <div>
                    <label class="block text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase">Invoice Number</label>
                    <input type="text" value="${escapeHTMLAttribute(item.invoiceNo || '')}" placeholder="Unbilled" oninput="updateInvoiceItemField(${idx}, 'invoiceNo', this.value); renderInvoicePreview();" class="w-full border rounded px-2.5 py-1 text-xs bg-white dark:bg-neutral-800 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200" ${isExcluded ? 'disabled' : ''}>
                </div>
                <div class="col-span-2 border-t border-neutral-100 dark:border-neutral-800 my-0.5 pt-1.5"></div>
                <div>
                    <label class="block text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase">Assign Employee</label>
                    <select onchange="updateInvoiceItemField(${idx}, 'employeeId', this.value)" class="w-full border rounded px-2.5 py-1 text-xs bg-white dark:bg-neutral-800 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200" ${isExcluded ? 'disabled' : ''}>
                        <option value="">-- Unassigned --</option>
                        ${employeeOptions}
                    </select>
                </div>
                <div>
                    <label class="block text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase">Payout Share</label>
                    <input type="number" id="invoice-item-share-${idx}" value="${item.employeeShare || 0}" oninput="updateInvoiceItemField(${idx}, 'employeeShare', parseFloat(this.value) || 0)" class="w-full border rounded px-2.5 py-1 text-xs bg-white dark:bg-neutral-800 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200" ${isExcluded ? 'disabled' : ''}>
                </div>
                <div class="col-span-2">
                    <label class="block text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase">Employee Payout Status</label>
                    <select onchange="updateInvoiceItemField(${idx}, 'employeePayoutStatus', this.value)" class="w-full border rounded px-2.5 py-1 text-xs bg-white dark:bg-neutral-800 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200" ${isExcluded ? 'disabled' : ''}>
                        <option value="Pending" ${item.employeePayoutStatus !== 'Paid' ? 'selected' : ''}>Pending / Unpaid</option>
                        <option value="Paid" ${item.employeePayoutStatus === 'Paid' ? 'selected' : ''}>Paid</option>
                    </select>
                </div>
            </div>
        `;
        container.appendChild(itemDiv);
    });
}

function getSuggestedEmployeeShare(price) {
    if (price === 1000) return 800;
    if (price === 1800) return 1440;
    if (price === 1500) return 1200;
    if (price === 2300) return 1840;
    if (price === 2000) return 1700;
    if (price === 2800) return 2380;
    if (price === 5000) return 4000;
    if (price === 5800) return 4640;
    if (price === 300) return 200;
    if (price === 1100) return 733;
    return Math.round(price * 0.8);
}

function applyInvoiceItemPreset(idx, presetId) {
    if (!presetId) return;
    const preset = db.settings.pricingPresets.find(p => p.id === presetId);
    if (preset) {
        const client = db.clients.find(c => c.id === currentActiveClientId);
        if (client && client.items[idx]) {
            client.items[idx].type = preset.name;
            client.items[idx].price = preset.price;
            client.items[idx].employeeShare = preset.employeeShare || 0;

            // Prefill title if default
            if (client.items[idx].title === "New Video Deliverable" || !client.items[idx].title.trim()) {
                client.items[idx].title = preset.name;
            }

            saveDatabase();
            renderInvoiceItemsInputs();
            renderInvoicePreview();
            showToast(`Applied preset: ${preset.name}`);
        }
    }
}

function applyLogPackagePreset(presetId) {
    if (!presetId) {
        document.getElementById('log-work-type').value = '';
        document.getElementById('log-work-price').value = '';
        if (document.getElementById('log-employee-share')) {
            document.getElementById('log-employee-share').value = '';
        }
        return;
    }
    const preset = db.settings.pricingPresets.find(p => p.id === presetId);
    if (preset) {
        document.getElementById('log-work-type').value = preset.name;
        document.getElementById('log-work-price').value = preset.price;
        if (document.getElementById('log-employee-share')) {
            document.getElementById('log-employee-share').value = preset.employeeShare || 0;
        }
        const titleEl = document.getElementById('log-work-title');
        if (titleEl && (!titleEl.value.trim() || db.settings.pricingPresets.some(p => p.name === titleEl.value.trim()))) {
            titleEl.value = preset.name;
        }
        showToast(`Preset loaded: ${preset.name}`);
    }
}

// FEATURE 6: PRE-FILL / AUTOCOMPLETE PREDICTIONS based on client history
function suggestItemDefaults(client) {
    const todayDateStr = formatLocalDate();
    const firstPreset = (db.settings.pricingPresets && db.settings.pricingPresets[0]) || { name: "Video Editing", price: 15000 };
    const defaultSuggestion = {
        title: "New Video Deliverable",
        desc: "Description of video editing.",
        type: firstPreset.name,
        price: firstPreset.price,
        date: todayDateStr,
        prodStatus: "First Cut"
    };

    if (!client || !client.items || client.items.length === 0) {
        return defaultSuggestion;
    }

    // 1. Guess most frequent item type
    const typeCounts = {};
    client.items.forEach(item => {
        if (item.type) {
            typeCounts[item.type] = (typeCounts[item.type] || 0) + 1;
        }
    });
    let mostFrequentType = null;
    let maxCount = 0;
    for (const [type, count] of Object.entries(typeCounts)) {
        if (count > maxCount) {
            maxCount = count;
            mostFrequentType = type;
        }
    }
    if (!mostFrequentType) mostFrequentType = "Video Editing";

    // 2. Guess most frequent price for this type
    const priceCounts = {};
    client.items.forEach(item => {
        if (item.type === mostFrequentType && item.price !== undefined) {
            priceCounts[item.price] = (priceCounts[item.price] || 0) + 1;
        }
    });
    let suggestedPrice = 0;
    let maxPriceCount = 0;
    for (const [price, count] of Object.entries(priceCounts)) {
        if (count > maxPriceCount) {
            maxPriceCount = count;
            suggestedPrice = parseFloat(price);
        }
    }
    if (suggestedPrice === 0) suggestedPrice = 15000;

    // 3. Increment title if numeric sequence is detected (e.g. Salindu Sir 16 -> Salindu Sir 17)
    let suggestedTitle = "New Video Deliverable";
    const lastItem = client.items[client.items.length - 1];
    if (lastItem && lastItem.title) {
        const lastTitle = lastItem.title;
        const match = lastTitle.match(/^(.*?)(\d+)$/);
        if (match) {
            const prefix = match[1];
            const num = parseInt(match[2]);
            const paddingLength = match[2].length;
            const nextNum = num + 1;
            const paddedNextNum = String(nextNum).padStart(paddingLength, '0');
            suggestedTitle = prefix + paddedNextNum;
        } else {
            suggestedTitle = lastTitle;
        }
    }

    return {
        title: suggestedTitle,
        desc: `Editing and post-production work.`,
        type: mostFrequentType,
        price: suggestedPrice,
        date: todayDateStr,
        prodStatus: "First Cut"
    };
}

function addInvoiceItem() {
    const client = db.clients.find(c => c.id === currentActiveClientId);
    if (!client) return;

    // Get smart predictions
    const suggestion = suggestItemDefaults(client);

    client.items.push({
        title: suggestion.title,
        desc: suggestion.desc,
        type: suggestion.type,
        price: suggestion.price,
        date: suggestion.date,
        prodStatus: suggestion.prodStatus,
        status: document.getElementById('invoice-meta-status').value,
        invoiceNo: client.invoiceNo || ""
    });

    saveDatabase();
    renderInvoiceItemsInputs();
    renderInvoicePreview();
    showToast(`Added! Predicted "${suggestion.type}" (Rs. ${suggestion.price})`);
}

function removeInvoiceItem(idx) {
    const client = db.clients.find(c => c.id === currentActiveClientId);
    if (!client) return;

    client.items.splice(idx, 1);
    saveDatabase();
    renderInvoiceItemsInputs();
    renderInvoicePreview();
    showToast("Removed deliverable line");
}

function toggleItemInvoiceSelection(idx, isChecked) {
    const client = db.clients.find(c => c.id === currentActiveClientId);
    if (!client || !client.items[idx]) return;

    client.items[idx].excludeFromInvoice = !isChecked;
    saveDatabase();
    renderInvoiceItemsInputs();
    renderInvoicePreview();
}

function handleInvoiceItemDescInput(idx, value) {
    updateInvoiceItemField(idx, 'desc', value);
}

function handleInvoiceItemTypeInput(idx, value) {
    updateInvoiceItemField(idx, 'type', value);
}

function updateInvoiceItemField(idx, field, value) {
    const client = db.clients.find(c => c.id === currentActiveClientId);
    if (!client || !client.items[idx]) return;

    client.items[idx][field] = value;

    if (field === 'price') {
        const share = getSuggestedEmployeeShare(value);
        client.items[idx].employeeShare = share;
        const shareInput = document.getElementById(`invoice-item-share-${idx}`);
        if (shareInput) {
            shareInput.value = share;
        }
    }

    saveDatabase();
    renderInvoicePreview();
}

// -------------------------------------------------------------
// LIVE PREVIEW SYNC & DRAW LOGIC (Classic Monochrome Template)
// -------------------------------------------------------------
function openInvoicePreviewModal() {
    renderInvoicePreview();
    const modal = document.getElementById('invoice-preview-modal');
    if (modal) modal.classList.remove('hidden');
}

function closeInvoicePreviewModal() {
    const modal = document.getElementById('invoice-preview-modal');
    if (modal) modal.classList.add('hidden');
}

function changeInvoiceTemplate(tempId) {
    db.settings.invoiceTemplate = 'classic';
    saveDatabase();
    renderInvoicePreview();
    showToast("Classic monochrome template selected");
}

function renderInvoicePreview() {
    const client = db.clients.find(c => c.id === currentActiveClientId);
    if (!client) return;

    const printArea = document.getElementById('invoice-print-area');
    if (!printArea) return;

    // Apply template class wrapper dynamically
    const tempId = 'classic';
    db.settings.invoiceTemplate = 'classic';
    printArea.className = `print-container bg-white w-[210mm] min-h-[297mm] shadow-2xl p-12 text-black flex flex-col justify-between`;

    // Load Settings-based labels
    document.getElementById('preview-logo-name').innerText = db.settings.fromCompany || "A-Frame Visuals";
    document.getElementById('preview-from-name').innerText = db.settings.fromName || "";
    document.getElementById('preview-from-company').innerText = db.settings.fromCompany || "";
    document.getElementById('preview-from-email').innerText = db.settings.fromEmail || "";
    document.getElementById('preview-from-phone').innerText = db.settings.fromPhone || "";

    document.getElementById('preview-bank').innerText = db.settings.bankName || "";
    document.getElementById('preview-branch').innerText = db.settings.bankBranch || "";
    document.getElementById('preview-acc-name').innerText = db.settings.accName || "";
    document.getElementById('preview-acc-no').innerText = db.settings.accNo || "";

    document.getElementById('preview-currency-sub').innerText = db.settings.currency || "Rs.";
    document.getElementById('preview-currency-total').innerText = db.settings.currency || "Rs.";

    // Active Invoice values
    document.getElementById('preview-invoice-no').innerText = client.invoiceNo || "";

    const dObj = new Date(client.invoiceDate);
    const formattedDate = isNaN(dObj.getTime()) ? client.invoiceDate : dObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    document.getElementById('preview-invoice-date').innerText = formattedDate || "";

    // Client details
    document.getElementById('preview-to-name').innerText = client.name || "";
    document.getElementById('preview-to-company').innerText = client.company || "Individual";
    if (document.getElementById('preview-to-phone')) {
        document.getElementById('preview-to-phone').innerText = client.phone || "";
    }

    // Render table body
    const tbody = document.getElementById('preview-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    const filterVal = document.getElementById('invoice-item-filter')?.value || 'current_and_unbilled';
    const unpaidOnly = document.getElementById('invoice-filter-unpaid-only')?.checked;

    let displayItems = client.items;

    if (filterVal === 'current_and_unbilled') {
        displayItems = client.items.filter(item => item.invoiceNo === client.invoiceNo || !item.invoiceNo);
    } else if (filterVal === 'current_only') {
        displayItems = client.items.filter(item => item.invoiceNo === client.invoiceNo);
    } else if (filterVal === 'unbilled_only') {
        displayItems = client.items.filter(item => !item.invoiceNo);
    }

    if (unpaidOnly) {
        displayItems = displayItems.filter(item => item.status !== 'Paid');
    }

    displayItems = displayItems.filter(item => !item.excludeFromInvoice);

    let subtotal = 0;

    if (displayItems.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="py-8 text-center text-xs text-neutral-400 dark:text-neutral-600 italic">
                    No outstanding/unpaid deliverables for this statement.
                </td>
            </tr>
        `;
    } else {
        displayItems.forEach(item => {
            const price = Number(item.price) || 0;
            subtotal += price;

            const dItem = new Date(item.date);
            const itemDateFormatted = isNaN(dItem.getTime()) ? item.date : dItem.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

            const tr = document.createElement('tr');
            tr.className = 'border-b border-neutral-100';
            tr.innerHTML = `
                <td class="w-[22%] py-2.5 px-4 text-xs font-semibold text-neutral-900">${escapeHTML(item.title)}</td>
                <td class="w-[36%] py-2.5 px-4 text-xs text-neutral-600">${escapeHTML(item.desc)}</td>
                <td class="w-[18%] py-2.5 px-4 text-xs text-neutral-600">${escapeHTML(item.type)}</td>
                <td class="w-[12%] py-2.5 px-4 text-xs text-right font-semibold text-neutral-900">${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                <td class="w-[12%] py-2.5 px-4 text-xs text-right text-neutral-600">${escapeHTML(itemDateFormatted)}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    document.getElementById('preview-subtotal').innerText = subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 });
    document.getElementById('preview-grandtotal').innerText = subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 });

    // Classic monochrome invoice styling
    const headerBlock = document.getElementById('invoice-header-block');
    const tableHeader = document.getElementById('preview-table-header');
    const grandtotalRow = document.getElementById('preview-grandtotal-row');
    const bankBox = document.getElementById('preview-bank-box');

    // Reset styles
    headerBlock.className = "flex justify-between items-start border-b border-black pb-8";
    tableHeader.className = "text-white text-xs";
    tableHeader.style.backgroundColor = "";
    tableHeader.style.color = "";
    tableHeader.style.borderBottom = "";
    grandtotalRow.className = "flex justify-between py-3 border-t-2 border-black";
    bankBox.className = "bg-neutral-50 p-3.5 rounded border border-neutral-200 w-full space-y-0.5";

    tableHeader.style.backgroundColor = "#000000";
    tableHeader.style.color = "#ffffff";
}

// WhatsApp Invoice Share format generator
function copyShareableSummary() {
    const client = db.clients.find(c => c.id === currentActiveClientId);
    if (!client) return;

    const filterVal = document.getElementById('invoice-item-filter')?.value || 'current_and_unbilled';
    const unpaidOnly = document.getElementById('invoice-filter-unpaid-only')?.checked;

    let displayItems = client.items;

    if (filterVal === 'current_and_unbilled') {
        displayItems = client.items.filter(item => item.invoiceNo === client.invoiceNo || !item.invoiceNo);
    } else if (filterVal === 'current_only') {
        displayItems = client.items.filter(item => item.invoiceNo === client.invoiceNo);
    } else if (filterVal === 'unbilled_only') {
        displayItems = client.items.filter(item => !item.invoiceNo);
    }

    if (unpaidOnly) {
        displayItems = displayItems.filter(item => item.status !== 'Paid');
    }

    displayItems = displayItems.filter(item => !item.excludeFromInvoice);

    let subtotal = 0;
    let listText = "";

    displayItems.forEach((item, idx) => {
        const price = Number(item.price) || 0;
        subtotal += price;
        listText += `${idx + 1}. *${item.title}* (${db.settings.currency || 'Rs.'} ${price.toLocaleString()})\n   - ${item.type} [${item.prodStatus || 'First Cut'}]\n`;
    });

    const output = `*A-FRAME VISUALS - STATEMENT*
----------------------------------------
Invoice No: *${client.invoiceNo}*
Date: ${client.invoiceDate}

*Billed To:*
${client.name} (${client.company || 'Individual'})
${client.phone || ''}

*Deliverables:*
${listText || 'No items listed.'}----------------------------------------
*Total Outstanding: ${db.settings.currency || 'Rs.'} ${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}*

*Bank Settlement Details:*
Bank: ${db.settings.bankName || '[Bank Name]'}
Branch: ${db.settings.bankBranch || '[Branch]'}
Account Name: ${db.settings.accName || '[Name]'}
Account No: ${db.settings.accNo || '[Number]'}

Thank you for your trusted business connection!`;

    navigator.clipboard.writeText(output).then(() => {
        showToast("Copied WhatsApp Billing Summary!");
    }).catch(err => {
        alert("Failed to copy text: " + err);
    });
}

// -------------------------------------------------------------
// SETTINGS TAB LOGIC & CLOUD BACKUPS
// -------------------------------------------------------------
function loadSettingsFields() {
    document.getElementById('settings-from-company').value = db.settings.fromCompany || '';
    document.getElementById('settings-from-name').value = db.settings.fromName || '';
    document.getElementById('settings-from-email').value = db.settings.fromEmail || '';
    document.getElementById('settings-from-phone').value = db.settings.fromPhone || '';
    document.getElementById('settings-currency').value = db.settings.currency || 'Rs.';
    document.getElementById('settings-bank-name').value = db.settings.bankName || '';
    document.getElementById('settings-bank-branch').value = db.settings.bankBranch || '';
    document.getElementById('settings-acc-name').value = db.settings.accName || '';
    document.getElementById('settings-acc-no').value = db.settings.accNo || '';

    // Load Google Drive backup credentials if present
    const gDrive = db.settings.googleDrive || {};
    const gdriveId = document.getElementById('settings-gdrive-client-id');
    const gdriveSec = document.getElementById('settings-gdrive-client-secret');
    if (gdriveId) gdriveId.value = gDrive.clientId || '';
    if (gdriveSec) gdriveSec.value = gDrive.clientSecret || '';
    if (document.getElementById('gdrive-status-banner')) {
        updateGoogleDriveStatusUI(gDrive);
    }

    // Populate Services Management Edit UI
    const servicesList = document.getElementById('settings-services-list');
    if (servicesList) {
        servicesList.innerHTML = '';
        if (!db.settings.services) {
            db.settings.services = ["Facebook Reel", "YouTube Shorts", "TikTok Reel", "Video Editing", "Reel Compilation", "Facebook Ad Campaign", "Zoom Live Stream"];
        }
        db.settings.services.forEach((service, index) => {
            const div = document.createElement('div');
            div.className = 'flex items-center gap-2 bg-neutral-50 dark:bg-neutral-950 p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800';
            div.innerHTML = `
                <input type="text" id="service-name-${index}" value="${escapeHTMLAttribute(service)}" class="flex-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-2.5 py-1.5 text-xs focus:outline-none font-semibold">
                <button onclick="deleteServiceSetting(${index})" class="text-rose-500 hover:text-rose-700 text-xs font-bold px-2 py-1">✕</button>
            `;
            servicesList.appendChild(div);
        });
    }

    // Populate Packages & Pricing Presets Edit UI (Clean Table Rows)
    const presetsList = document.getElementById('settings-pricing-presets-list');
    if (presetsList) {
        presetsList.innerHTML = '';
        if (db.settings.pricingPresets && db.settings.pricingPresets.length > 0) {
            db.settings.pricingPresets.forEach((preset, index) => {
                const tr = document.createElement('tr');
                tr.className = 'group hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors';
                tr.innerHTML = `
                    <td class="py-2 pr-2">
                        <input type="text" id="preset-name-${index}" value="${escapeHTMLAttribute(preset.name)}" placeholder="Package Name" class="w-full input-borderless text-xs font-semibold text-neutral-800 dark:text-neutral-100" style="border: none !important; background: transparent !important; box-shadow: none !important; outline: none !important; padding: 4px 0;">
                    </td>
                    <td class="py-2 px-2 w-28">
                        <input type="number" id="preset-price-${index}" value="${preset.price}" placeholder="0" class="w-full text-right bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-2.5 py-1.5 text-xs text-neutral-800 dark:text-neutral-200 focus:outline-none">
                    </td>
                    <td class="py-2 px-2 w-28">
                        <input type="number" id="preset-employee-share-${index}" value="${preset.employeeShare || 0}" placeholder="0" class="w-full text-right bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-2.5 py-1.5 text-xs text-neutral-800 dark:text-neutral-200 focus:outline-none">
                    </td>
                    <td class="py-2 pl-2 w-8 text-center">
                        <button onclick="deletePresetSetting(${index})" title="Delete Package" class="p-1 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded transition">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </td>
                `;
                presetsList.appendChild(tr);
            });
        } else {
            presetsList.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center py-8 text-neutral-400 dark:text-neutral-500 text-xs">
                        No packages added yet. Click <strong>+ Add Package</strong> above to create your first pricing tier.
                    </td>
                </tr>
            `;
        }
    }
}

function addServiceSetting() {
    db.settings.services = db.settings.services || [];
    db.settings.services.push("New Service Category");
    saveDatabase();
    loadSettingsFields();
    showToast("Added new service category");
}

function deleteServiceSetting(index) {
    if (db.settings.services && db.settings.services[index] !== undefined) {
        db.settings.services.splice(index, 1);
        saveDatabase();
        loadSettingsFields();
        showToast("Removed service category");
    }
}

function addPresetSetting() {
    db.settings.pricingPresets = db.settings.pricingPresets || [];
    const newId = `preset-${Date.now()}`;
    db.settings.pricingPresets.push({
        id: newId,
        name: "New Package Preset",
        price: 2000,
        employeeShare: 1600
    });
    saveDatabase();
    loadSettingsFields();
    showToast("Added new package preset");
}

function deletePresetSetting(index) {
    if (db.settings.pricingPresets && db.settings.pricingPresets[index] !== undefined) {
        db.settings.pricingPresets.splice(index, 1);
        saveDatabase();
        loadSettingsFields();
        showToast("Removed package preset");
    }
}

function saveSettings() {
    db.settings.theme = 'light';
    db.settings.accentColor = 'monochrome';
    db.settings.invoiceTemplate = 'classic';
    db.settings.fromCompany = document.getElementById('settings-from-company').value;
    db.settings.fromName = document.getElementById('settings-from-name').value;
    db.settings.fromEmail = document.getElementById('settings-from-email').value;
    db.settings.fromPhone = document.getElementById('settings-from-phone').value;
    db.settings.currency = document.getElementById('settings-currency').value;
    db.settings.bankName = document.getElementById('settings-bank-name').value;
    db.settings.bankBranch = document.getElementById('settings-bank-branch').value;
    db.settings.accName = document.getElementById('settings-acc-name').value;
    db.settings.accNo = document.getElementById('settings-acc-no').value;

    // Save Services if UI elements exist
    const servicesListEl = document.getElementById('settings-services-list');
    if (servicesListEl && db.settings.services) {
        const updatedServices = [];
        db.settings.services.forEach((_, index) => {
            const nameEl = document.getElementById(`service-name-${index}`);
            if (nameEl && nameEl.value.trim()) {
                updatedServices.push(nameEl.value.trim());
            }
        });
        db.settings.services = updatedServices;
    }

    // Save Google Drive API credentials if elements exist
    const gdriveId = document.getElementById('settings-gdrive-client-id');
    const gdriveSec = document.getElementById('settings-gdrive-client-secret');
    if (gdriveId && gdriveSec) {
        db.settings.googleDrive = db.settings.googleDrive || {};
        db.settings.googleDrive.clientId = gdriveId.value.trim();
        db.settings.googleDrive.clientSecret = gdriveSec.value.trim();
    }

    // Save pricing presets
    if (db.settings.pricingPresets) {
        db.settings.pricingPresets.forEach((preset, index) => {
            const nameEl = document.getElementById(`preset-name-${index}`);
            const priceEl = document.getElementById(`preset-price-${index}`);
            const shareEl = document.getElementById(`preset-employee-share-${index}`);
            if (nameEl && priceEl && shareEl) {
                preset.name = nameEl.value.trim();
                preset.price = parseFloat(priceEl.value) || 0;
                preset.employeeShare = parseFloat(shareEl.value) || 0;
            }
        });
    }

    saveDatabase();
    applyTheme(); // Refresh app appearance immediately
    if (document.getElementById('gdrive-status-banner')) {
        updateGoogleDriveStatusUI(db.settings.googleDrive);
    }
    showToast("Settings saved successfully!");
}

function updateGoogleDriveStatusUI(gDrive) {
    const dot = document.getElementById('gdrive-status-dot');
    const text = document.getElementById('gdrive-status-text');
    const log = document.getElementById('gdrive-last-backup');
    const btnConnect = document.getElementById('btn-gdrive-connect');
    const btnBackup = document.getElementById('btn-gdrive-backup');
    const btnDisconnect = document.getElementById('btn-gdrive-disconnect');

    if (!dot || !text || !log || !btnConnect || !btnBackup || !btnDisconnect) return;

    if (gDrive && gDrive.connected) {
        dot.className = "h-2.5 w-2.5 rounded-full bg-emerald-500";
        text.innerText = `Connected as ${gDrive.connectedEmail || 'adeesha.73x@gmail.com'}`;

        if (gDrive.lastBackupTime) {
            const time = new Date(gDrive.lastBackupTime).toLocaleString();
            log.innerText = `Last successful backup: ${time}`;
        } else {
            log.innerText = "Connected. No backups completed yet.";
        }

        btnConnect.classList.add('hidden');
        btnBackup.classList.remove('hidden');
        btnDisconnect.classList.remove('hidden');
    } else {
        dot.className = "h-2.5 w-2.5 rounded-full bg-rose-500";
        text.innerText = "Not Connected";
        log.innerText = "Never backed up";

        btnConnect.classList.remove('hidden');
        btnBackup.classList.add('hidden');
        btnDisconnect.classList.add('hidden');
    }
}

async function connectGoogleDrive() {
    const clientId = document.getElementById('settings-gdrive-client-id').value.trim();
    const clientSecret = document.getElementById('settings-gdrive-client-secret').value.trim();

    if (!clientId || !clientSecret) {
        alert("Please enter both Google Client ID and Client Secret before connecting.");
        return;
    }

    showToast("Starting Google authorization...");

    if (window.api && typeof window.api.startGoogleOauth === 'function') {
        const res = await window.api.startGoogleOauth(clientId, clientSecret);
        if (res.success) {
            const loaded = await window.api.loadDatabase();
            if (loaded) db = loaded;
            updateGoogleDriveStatusUI(db.settings.googleDrive);
            showToast("Google Drive connected successfully!");
        } else {
            alert("Connection failed: " + res.error);
        }
    } else {
        alert("Google Drive backup integration is only available in the desktop app.");
    }
}

async function triggerManualBackup() {
    showToast("Uploading database backup...");
    if (window.api && typeof window.api.backupNow === 'function') {
        const res = await window.api.backupNow();
        if (res.success) {
            const loaded = await window.api.loadDatabase();
            if (loaded) db = loaded;
            updateGoogleDriveStatusUI(db.settings.googleDrive);
            showToast("Backup uploaded to Google Drive!");
        } else {
            alert("Backup failed: " + res.error);
        }
    }
}

async function disconnectGoogleDrive() {
    if (!confirm("Are you sure you want to disconnect Google Drive? Your local OAuth tokens will be cleared.")) return;

    if (window.api && typeof window.api.disconnectGoogleDrive === 'function') {
        const res = await window.api.disconnectGoogleDrive();
        if (res.success) {
            const loaded = await window.api.loadDatabase();
            if (loaded) db = loaded;
            updateGoogleDriveStatusUI(db.settings.googleDrive);
            showToast("Google Drive disconnected.");
        } else {
            alert("Disconnection failed: " + res.error);
        }
    }
}

function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'bg-accent text-white px-4 py-3 rounded-lg shadow-xl text-xs uppercase tracking-wider font-bold border border-neutral-800/20 flex items-center gap-2 transform transition-all duration-300 translate-y-2 opacity-0 pointer-events-auto';
    toast.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-2', 'opacity-0');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// -------------------------------------------------------------
// AUXILIARY UTILITIES
// -------------------------------------------------------------
function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g,
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

function escapeHTMLAttribute(str) {
    if (!str) return '';
    return str.replace(/"/g, '&quot;');
}

function syncLogPackageDropdown() {
    const typeValue = document.getElementById('log-work-type')?.value.trim().toLowerCase();
    const dropdown = document.getElementById('log-package-preset');
    if (!dropdown) return;

    if (!typeValue) {
        dropdown.value = '';
        return;
    }

    // Find preset with matching name
    const preset = db.settings.pricingPresets.find(p => p.name.trim().toLowerCase() === typeValue);
    if (preset) {
        dropdown.value = preset.id;
    } else {
        dropdown.value = ''; // Custom
    }
}

function handleLogTypeInput(value) {
    if (!value) return;
    const cleanVal = value.trim().toLowerCase();
    const preset = db.settings.pricingPresets.find(p => p.name.trim().toLowerCase() === cleanVal);
    if (preset) {
        const priceInput = document.getElementById('log-work-price');
        if (priceInput) {
            priceInput.value = preset.price;
            showToast(`Auto-filled price from plan: ${db.settings.currency || 'Rs.'} ${preset.price}`);
        }
    }
    syncLogPackageDropdown();
}



function handleInvoiceItemTypeInput(idx, value) {
    updateInvoiceItemField(idx, 'type', value);

    if (!value) return;
    const cleanVal = value.trim().toLowerCase();
    const preset = db.settings.pricingPresets.find(p => p.name.trim().toLowerCase() === cleanVal);
    if (preset) {
        const client = db.clients.find(c => c.id === currentActiveClientId);
        if (client && client.items[idx]) {
            client.items[idx].price = preset.price;
            saveDatabase();

            const priceInput = document.getElementById(`invoice-item-price-${idx}`);
            if (priceInput) {
                priceInput.value = preset.price;
            }

            renderInvoicePreview();
            showToast(`Auto-filled price from plan: ${db.settings.currency || 'Rs.'} ${preset.price}`);
        }
    }
}

function handleLogDescriptionInput(value) {
    if (!value) return;
    const cleanVal = value.trim().toLowerCase();
    const preset = db.settings.pricingPresets.find(p => p.name.trim().toLowerCase() === cleanVal);
    if (preset) {
        const priceInput = document.getElementById('log-work-price');
        if (priceInput) {
            priceInput.value = preset.price;
            showToast(`Auto-filled price from plan: ${db.settings.currency || 'Rs.'} ${preset.price}`);
        }
    }
}

function handleInvoiceItemDescInput(idx, value) {
    updateInvoiceItemField(idx, 'desc', value);

    if (!value) return;
    const cleanVal = value.trim().toLowerCase();
    const preset = db.settings.pricingPresets.find(p => p.name.trim().toLowerCase() === cleanVal);
    if (preset) {
        const client = db.clients.find(c => c.id === currentActiveClientId);
        if (client && client.items[idx]) {
            client.items[idx].price = preset.price;
            saveDatabase();

            const priceInput = document.getElementById(`invoice-item-price-${idx}`);
            if (priceInput) {
                priceInput.value = preset.price;
            }

            renderInvoicePreview();
            showToast(`Auto-filled price from plan: ${db.settings.currency || 'Rs.'} ${preset.price}`);
        }
    }
}

// Initialize Application on Window Load
window.addEventListener('DOMContentLoaded', () => {
    loadDatabase();
});

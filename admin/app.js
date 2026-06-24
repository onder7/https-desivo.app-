// ================= SUPABASE INITIALIZATION =================
const supabaseUrl = 'https://olwqkfltyxojrwmoxfqf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sd3FrZmx0eXhvanJ3bW94ZnFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyMzkwNTEsImV4cCI6MjA5NTgxNTA1MX0.duoJUgcT3pLppCF3hyD2UyzqONiPL0zUsIFUKotidpw';

const supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);

// ================= ADMIN CONFIGURATION =================
const ADMIN_WHITELIST = [
  'destek@desivo.app',
  'hasan@desivo.app',
  'admin@desivo.app',
  'hasankokce@gmail.com' // Eklendi
];

// App State
let currentUser = null;
let allUsers = [];
let allSubscriptions = [];
let allBugs = [];
let subscriptionChartInstance = null;
let platformChartInstance = null;

// ================= DOM ELEMENTS =================
const authPage = document.getElementById('auth-page');
const appPage = document.getElementById('app-page');
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('login-email');
const passwordInput = document.getElementById('login-password');
const authError = document.getElementById('auth-error');
const authSuccess = document.getElementById('auth-success');
const btnLogout = document.getElementById('btn-logout');
const adminEmailDisplay = document.getElementById('admin-email-display');
const adminInitials = document.getElementById('admin-initials');

// Tabs & Sidebar Nav
const navItems = document.querySelectorAll('.nav-item');
const tabPanes = document.querySelectorAll('.tab-pane');

// Stats Cards
const statTotalUsers = document.getElementById('stat-total-users');
const statPremiumUsers = document.getElementById('stat-premium-users');
const statTotalContents = document.getElementById('stat-total-contents');
const statActiveBugs = document.getElementById('stat-active-bugs');
const sidebarBugBadge = document.getElementById('sidebar-bug-badge');

// User manager
const usersTable = document.getElementById('users-table');
const usersTableBody = document.getElementById('users-table-body');
const usersLoading = document.getElementById('users-loading');
const userSearchInput = document.getElementById('user-search-input');
const userFilterPlan = document.getElementById('user-filter-plan');

// Bug manager
const bugsTable = document.getElementById('bugs-table');
const bugsTableBody = document.getElementById('bugs-table-body');
const bugsLoading = document.getElementById('bugs-loading');

// Notifications
const notifyForm = document.getElementById('notify-form');
const notifyTitle = document.getElementById('notify-title');
const notifyBody = document.getElementById('notify-body');
const notifyTarget = document.getElementById('notify-target');
const notifySpecificUserGroup = document.getElementById('notify-specific-user-group');
const notifyEmail = document.getElementById('notify-email');
const notifyAlertSuccess = document.getElementById('notify-alert-success');
const notifyAlertDanger = document.getElementById('notify-alert-danger');

// Email Elements
const emailForm = document.getElementById('email-form');
const emailSubject = document.getElementById('email-subject');
const emailBody = document.getElementById('email-body');
const emailTarget = document.getElementById('email-target');
const emailSpecificUserGroup = document.getElementById('email-specific-user-group');
const emailRecipient = document.getElementById('email-recipient');
const emailAlertSuccess = document.getElementById('email-alert-success');
const emailAlertDanger = document.getElementById('email-alert-danger');

// Email Editor Mode & Preview Elements
const btnEditorEasy = document.getElementById('btn-editor-easy');
const btnEditorCode = document.getElementById('btn-editor-code');
const emailEasyFields = document.getElementById('email-easy-fields');
const emailCodeFields = document.getElementById('email-code-fields');

const emailEasyTitle = document.getElementById('email-easy-title');
const emailEasyBody = document.getElementById('email-easy-body');
const emailEasyBtnText = document.getElementById('email-easy-btn-text');
const emailEasyBtnUrl = document.getElementById('email-easy-btn-url');
const emailEasyFooter = document.getElementById('email-easy-footer');

const btnPreviewDesktop = document.getElementById('btn-preview-desktop');
const btnPreviewMobile = document.getElementById('btn-preview-mobile');
const emailPreviewContainer = document.getElementById('email-preview-container');
const emailPreviewIframe = document.getElementById('email-preview-iframe');

let activeEditorMode = 'easy'; // 'easy' or 'code'

// Modal Edit User
const modalEditUser = document.getElementById('modal-edit-user');
const modalUserError = document.getElementById('modal-user-error');
const editUserId = document.getElementById('edit-user-id');
const editUserEmail = document.getElementById('edit-user-email');
const editUserPlan = document.getElementById('edit-user-plan');
const editUserLimit = document.getElementById('edit-user-limit');
const editUserUsed = document.getElementById('edit-user-used');
const btnSaveUser = document.getElementById('btn-save-user');

// Content Audit Manager
const auditTable = document.getElementById('audit-table');
const auditTableBody = document.getElementById('audit-table-body');
const auditLoading = document.getElementById('audit-loading');
const auditSearchInput = document.getElementById('audit-search-input');
const auditFilterPlatform = document.getElementById('audit-filter-platform');

// Modal View Project
const modalViewProject = document.getElementById('modal-view-project');
const viewProjectTitle = document.getElementById('view-project-title');
const viewProjectPlatform = document.getElementById('view-project-platform');
const viewProjectTone = document.getElementById('view-project-tone');
const viewProjectDuration = document.getElementById('view-project-duration');
const viewProjectViralScore = document.getElementById('view-project-viral-score');
const viewProjectIdea = document.getElementById('view-project-idea');
const projectNoContentAlert = document.getElementById('project-no-content-alert');
const projectDetailContentArea = document.getElementById('project-detail-content-area');
const viewProjectViralTitle = document.getElementById('view-project-viral-title');
const viewProjectHooks = document.getElementById('view-project-hooks');
const viewProjectScript = document.getElementById('view-project-script');
const viewProjectScenePlan = document.getElementById('view-project-scene-plan');
const viewProjectOnScreen = document.getElementById('view-project-on-screen');
const viewProjectCaption = document.getElementById('view-project-caption');
const viewProjectThumbnailIdea = document.getElementById('view-project-thumbnail-idea');
const viewProjectCta = document.getElementById('view-project-cta');
const viewProjectHashtags = document.getElementById('view-project-hashtags');
const viewProjectSuggestions = document.getElementById('view-project-suggestions');

// Remote Config (Uygulama Ayarları) Manager
const configForm = document.getElementById('config-form');
const configFreeLimit = document.getElementById('config-free-limit');
const configWeeklyAdLimit = document.getElementById('config-weekly-ad-limit');
const configReferralCredit = document.getElementById('config-referral-credit');
const configMaintenanceMode = document.getElementById('config-maintenance-mode');
const configMinVersionIos = document.getElementById('config-min-version-ios');
const configMinVersionAndroid = document.getElementById('config-min-version-android');
const configAppStoreUrl = document.getElementById('config-app-store-url');
const configPlayStoreUrl = document.getElementById('config-play-store-url');
const configOpenaiKey = document.getElementById('config-openai-key');
const configAnnouncementActive = document.getElementById('config-announcement-active');
const configAnnouncementTitle = document.getElementById('config-announcement-title');
const configAnnouncementBody = document.getElementById('config-announcement-body');
const configAlertSuccess = document.getElementById('config-alert-success');
const configAlertDanger = document.getElementById('config-alert-danger');
const btnSaveConfig = document.getElementById('btn-save-config');

// Global Refresher
const btnRefreshStats = document.getElementById('btn-refresh-stats');
const btnClearBugs = document.getElementById('btn-clear-bugs');

// ================= INIT ACTION =================
document.addEventListener('DOMContentLoaded', () => {
  // Init lucide icons
  lucide.createIcons();
  
  // Check auth session
  checkSession();
  
  // Register tab event listeners
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTab = item.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });
  
  // Login event
  loginForm.addEventListener('submit', handleLogin);
  
  // Logout event
  btnLogout.addEventListener('click', handleLogout);
  
  // Search & Filter Users
  userSearchInput.addEventListener('input', renderUsersTable);
  userFilterPlan.addEventListener('change', renderUsersTable);
  
  // Edit User modal save
  btnSaveUser.addEventListener('click', saveUserChanges);
  
  // Refresh stats
  btnRefreshStats.addEventListener('click', () => {
    loadDashboardStats();
    loadCharts();
  });
  
  // Clear bugs
  btnClearBugs.addEventListener('click', handleClearAllBugs);
  
  // Notify target filter toggle
  notifyTarget.addEventListener('change', () => {
    if (notifyTarget.value === 'specific') {
      notifySpecificUserGroup.style.display = 'block';
      notifyEmail.setAttribute('required', 'true');
    } else {
      notifySpecificUserGroup.style.display = 'none';
      notifyEmail.removeAttribute('required');
    }
  });
  
  // Send notification event
  notifyForm.addEventListener('submit', handleSendNotification);

  // Email target filter toggle
  if (emailTarget) {
    emailTarget.addEventListener('change', () => {
      if (emailTarget.value === 'specific') {
        emailSpecificUserGroup.style.display = 'block';
        emailRecipient.setAttribute('required', 'true');
      } else {
        emailSpecificUserGroup.style.display = 'none';
        emailRecipient.removeAttribute('required');
      }
    });
  }
  
  // Send email event
  if (emailForm) {
    emailForm.addEventListener('submit', handleSendEmail);
  }

  // Email Builder Event Listeners
  if (btnEditorEasy && btnEditorCode) {
    btnEditorEasy.addEventListener('click', () => {
      activeEditorMode = 'easy';
      btnEditorEasy.classList.add('active');
      btnEditorCode.classList.remove('active');
      emailEasyFields.style.display = 'block';
      emailCodeFields.style.display = 'none';
      updatePreview();
    });

    btnEditorCode.addEventListener('click', () => {
      activeEditorMode = 'code';
      btnEditorCode.classList.add('active');
      btnEditorEasy.classList.remove('active');
      emailEasyFields.style.display = 'none';
      emailCodeFields.style.display = 'block';
      updatePreview();
    });
  }

  // Live updates on easy inputs
  const easyInputs = [emailEasyTitle, emailEasyBody, emailEasyBtnText, emailEasyBtnUrl, emailEasyFooter];
  easyInputs.forEach(input => {
    if (input) {
      input.addEventListener('input', updatePreview);
    }
  });

  // Live updates on code inputs
  if (emailBody) {
    emailBody.addEventListener('input', () => {
      if (activeEditorMode === 'code') {
        updatePreview();
      }
    });
  }

  // Preview device width toggles
  if (btnPreviewDesktop && btnPreviewMobile) {
    btnPreviewDesktop.addEventListener('click', () => {
      btnPreviewDesktop.classList.add('active');
      btnPreviewMobile.classList.remove('active');
      if (emailPreviewContainer) {
        emailPreviewContainer.classList.remove('preview-mobile-view');
        emailPreviewIframe.style.height = '500px';
      }
    });

    btnPreviewMobile.addEventListener('click', () => {
      btnPreviewMobile.classList.add('active');
      btnPreviewDesktop.classList.remove('active');
      if (emailPreviewContainer) {
        emailPreviewContainer.classList.add('preview-mobile-view');
        emailPreviewIframe.style.height = '600px';
      }
    });
  }

  // Initialize email preview
  if (emailPreviewIframe) {
    setTimeout(updatePreview, 100);
  }
  
  // API Test & Visibility events
  btnToggleKeyVisibility.addEventListener('click', toggleKeyVisibility);
  apiTestForm.addEventListener('submit', handleApiTest);
  btnFetchApiUsage.addEventListener('click', fetchApiUsage);
  
  // Revenue events
  const btnRefreshRevenue = document.getElementById('btn-refresh-revenue');
  const revenueExcludeSandbox = document.getElementById('revenue-exclude-sandbox');
  if (btnRefreshRevenue) btnRefreshRevenue.addEventListener('click', loadRevenueData);
  if (revenueExcludeSandbox) revenueExcludeSandbox.addEventListener('change', renderRevenueTable);

  // Content Audit events
  if (auditSearchInput) auditSearchInput.addEventListener('input', renderAuditTable);
  if (auditFilterPlatform) auditFilterPlatform.addEventListener('change', renderAuditTable);

  // System Config event
  if (configForm) configForm.addEventListener('submit', handleSaveSystemSettings);
});

// ================= AUTHENTICATION LOGIC =================
async function checkSession() {
  const { data, error } = await supabase.auth.getSession();
  if (data?.session) {
    validateAndEnter(data.session.user);
  } else {
    showAuthPage();
  }
}

async function handleLogin(e) {
  e.preventDefault();
  authError.style.display = 'none';
  authSuccess.style.display = 'none';
  
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  
  const btn = document.getElementById('btn-login');
  btn.disabled = true;
  btn.innerHTML = 'Giriş Yapılıyor...';
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    
    validateAndEnter(data.user);
  } catch (err) {
    authError.textContent = err.message || 'Giriş yapılamadı.';
    authError.style.display = 'block';
    btn.disabled = false;
    btn.innerHTML = '<i data-lucide="log-in"></i> Güvenli Giriş Yap';
    lucide.createIcons();
  }
}

async function validateAndEnter(user) {
  if (ADMIN_WHITELIST.includes(user.email.toLowerCase())) {
    currentUser = user;
    showAppPage();
    loadAllData();
  } else {
    authError.textContent = 'Yetkisiz erişim. Bu e-posta adresi sistem yöneticisi whitelist listesinde bulunmuyor.';
    authError.style.display = 'block';
    await supabase.auth.signOut();
    showAuthPage();
  }
  
  const btn = document.getElementById('btn-login');
  btn.disabled = false;
  btn.innerHTML = '<i data-lucide="log-in"></i> Güvenli Giriş Yap';
  lucide.createIcons();
}

async function handleLogout() {
  await supabase.auth.signOut();
  currentUser = null;
  showAuthPage();
}

function showAuthPage() {
  authPage.style.display = 'flex';
  appPage.style.display = 'none';
}

function showAppPage() {
  authPage.style.display = 'none';
  appPage.style.display = 'flex';
  
  if (currentUser) {
    adminEmailDisplay.textContent = currentUser.email;
    adminInitials.textContent = currentUser.email.substring(0, 2).toUpperCase();
  }
}

// ================= DATA LOADING =================
async function loadAllData() {
  loadDashboardStats();
  loadCharts();
  loadUsers();
  loadBugs();
}

async function loadDashboardStats() {
  try {
    // 1. Total users
    const { count: usersCount, error: err1 } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });
    if (err1) throw err1;
    statTotalUsers.textContent = usersCount || 0;

    // 2. Premium users
    const { count: premiumCount, error: err2 } = await supabase
      .from('subscriptions')
      .select('*', { count: 'exact', head: true })
      .neq('plan', 'free');
    if (err2) throw err2;
    statPremiumUsers.textContent = premiumCount || 0;

    // 3. Generated content
    const { count: contentsCount, error: err3 } = await supabase
      .from('generated_contents')
      .select('*', { count: 'exact', head: true });
    if (err3) throw err3;
    statTotalContents.textContent = contentsCount || 0;

    // 4. Active bug reports
    const { count: bugsCount, error: err4 } = await supabase
      .from('bug_reports')
      .select('*', { count: 'exact', head: true });
    if (err4) throw err4;
    statActiveBugs.textContent = bugsCount || 0;
    
    if (bugsCount > 0) {
      sidebarBugBadge.textContent = bugsCount;
      sidebarBugBadge.style.display = 'inline-flex';
    } else {
      sidebarBugBadge.style.display = 'none';
    }

  } catch (e) {
    console.error('Error loading dashboard stats:', e);
  }
}

async function loadCharts() {
  try {
    // Subscription plan distribution
    const { data: subData, error: errSub } = await supabase
      .from('subscriptions')
      .select('plan');
      
    if (!errSub && subData) {
      const counts = { free: 0, creator: 0, agency: 0 };
      subData.forEach(s => {
        if (counts[s.plan] !== undefined) counts[s.plan]++;
      });
      renderSubscriptionChart(counts.free, counts.creator, counts.agency);
    }

    // Platform distribution from projects
    const { data: projData, error: errProj } = await supabase
      .from('projects')
      .select('platform')
      .limit(1000);
      
    if (!errProj && projData) {
      const pCounts = {};
      projData.forEach(p => {
        const plat = p.platform || 'reels';
        pCounts[plat] = (pCounts[plat] || 0) + 1;
      });
      renderPlatformChart(pCounts);
    }
  } catch (e) {
    console.error('Error loading chart data:', e);
  }
}

// Chart Renderers
function renderSubscriptionChart(free, creator, agency) {
  const ctx = document.getElementById('chart-subscriptions').getContext('2d');
  
  if (subscriptionChartInstance) {
    subscriptionChartInstance.destroy();
  }
  
  subscriptionChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Free (Ücretsiz)', 'Creator (Pro)', 'Agency (Ajans)'],
      datasets: [{
        data: [free, creator, agency],
        backgroundColor: ['rgba(100, 104, 128, 0.4)', 'rgba(108, 99, 255, 0.7)', 'rgba(255, 46, 147, 0.7)'],
        borderColor: ['#646880', '#6C63FF', '#FF2E93'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#9FA4BC', font: { family: 'Inter' } }
        }
      }
    }
  });
}

function renderPlatformChart(counts) {
  const ctx = document.getElementById('chart-platforms').getContext('2d');
  
  if (platformChartInstance) {
    platformChartInstance.destroy();
  }
  
  const labels = Object.keys(counts).map(k => k.charAt(0).toUpperCase() + k.slice(1));
  const data = Object.values(counts);
  
  // Highlight colors
  const bgColors = Object.keys(counts).map(k => {
    if (k.toLowerCase() === 'youtube') return 'rgba(239, 68, 68, 0.6)';
    if (k.toLowerCase() === 'tiktok') return 'rgba(0, 245, 255, 0.6)';
    if (k.toLowerCase() === 'instagram' || k.toLowerCase() === 'reels') return 'rgba(225, 48, 108, 0.6)';
    if (k.toLowerCase() === 'linkedin') return 'rgba(10, 102, 194, 0.6)';
    return 'rgba(108, 99, 255, 0.6)';
  });
  
  const borderColors = Object.keys(counts).map(k => {
    if (k.toLowerCase() === 'youtube') return '#EF4444';
    if (k.toLowerCase() === 'tiktok') return '#00F5FF';
    if (k.toLowerCase() === 'instagram' || k.toLowerCase() === 'reels') return '#E1306C';
    if (k.toLowerCase() === 'linkedin') return '#0A66C2';
    return '#6C63FF';
  });

  platformChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels.length > 0 ? labels : ['Mecra Yok'],
      datasets: [{
        label: 'Proje Sayısı',
        data: data.length > 0 ? data : [0],
        backgroundColor: bgColors.length > 0 ? bgColors : ['rgba(108, 99, 255, 0.6)'],
        borderColor: borderColors.length > 0 ? borderColors : ['#6C63FF'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#9FA4BC' } },
        y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#9FA4BC', stepSize: 1 } }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

// ================= USER MANAGEMENT =================
async function loadUsers() {
  usersLoading.style.display = 'flex';
  usersTable.style.display = 'none';
  
  try {
    const { data: profiles, error: errProf } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (errProf) throw errProf;
    allUsers = profiles || [];
    
    const { data: subs, error: errSubs } = await supabase
      .from('subscriptions')
      .select('*');
      
    if (errSubs) throw errSubs;
    allSubscriptions = subs || [];
    
    renderUsersTable();
  } catch (e) {
    console.error('Error loading users:', e);
  } finally {
    usersLoading.style.display = 'none';
    usersTable.style.display = 'table';
  }
}

function renderUsersTable() {
  const searchQuery = userSearchInput.value.toLowerCase().trim();
  const planFilter = userFilterPlan.value;
  
  usersTableBody.innerHTML = '';
  
  const filteredUsers = allUsers.filter(u => {
    // Email or name search match
    const nameMatch = (u.full_name || '').toLowerCase().includes(searchQuery);
    const emailMatch = (u.email || '').toLowerCase().includes(searchQuery);
    const matchesSearch = nameMatch || emailMatch;
    
    // Plan filter match
    const sub = allSubscriptions.find(s => s.user_id === u.id);
    const plan = sub ? sub.plan : 'free';
    const matchesPlan = planFilter === 'all' || plan === planFilter;
    
    return matchesSearch && matchesPlan;
  });
  
  if (filteredUsers.length === 0) {
    usersTableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-secondary); padding: 30px;">Kriterlere uygun kullanıcı bulunamadı.</td></tr>`;
    return;
  }
  
  filteredUsers.forEach(u => {
    const sub = allSubscriptions.find(s => s.user_id === u.id) || {
      plan: 'free',
      generation_limit: 3,
      used_generations: 0
    };
    
    const formattedDate = u.created_at ? new Date(u.created_at).toLocaleDateString('tr-TR') : 'Bilinmiyor';
    const planBadge = `<span class="badge-pill badge-${sub.plan}">${sub.plan.toUpperCase()}</span>`;
    
    const tokenDisplay = u.expo_push_token 
      ? `<span class="badge-pill badge-active" title="${u.expo_push_token}" style="cursor:help;">Aktif Token</span>` 
      : `<span class="badge-pill badge-free">Token Yok</span>`;
      
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div class="user-meta">
          <strong>${u.full_name || 'Misafir'}</strong>
          <span class="user-email">${u.email || 'Email yok'}</span>
        </div>
      </td>
      <td>${planBadge}</td>
      <td>${sub.used_generations} / ${sub.generation_limit}</td>
      <td>${formattedDate}</td>
      <td><code>${u.referral_code || '-'}</code></td>
      <td>${tokenDisplay}</td>
      <td>
        <div class="table-actions">
          <button class="action-btn edit-btn" onclick="openEditUserModal('${u.id}', '${u.email || ''}', '${sub.plan}', ${sub.generation_limit}, ${sub.used_generations})" title="Kullanıcıyı Düzenle">
            <i data-lucide="edit-3" style="width: 14px; height: 14px;"></i>
          </button>
          <button class="action-btn delete-btn" onclick="handleDeleteUser('${u.id}', '${u.full_name || 'Bu kullanıcıyı'}')" title="Hesabı Komple Sil">
            <i data-lucide="user-x" style="width: 14px; height: 14px;"></i>
          </button>
        </div>
      </td>
    `;
    usersTableBody.appendChild(tr);
  });
  
  lucide.createIcons();
}

// User Modal controller
window.openEditUserModal = function(id, email, plan, limit, used) {
  modalUserError.style.display = 'none';
  editUserId.value = id;
  editUserEmail.value = email;
  editUserPlan.value = plan;
  editUserLimit.value = limit;
  editUserUsed.value = used;
  
  modalEditUser.classList.add('active');
};

window.closeUserModal = function() {
  modalEditUser.classList.remove('active');
};

async function saveUserChanges() {
  const userId = editUserId.value;
  const plan = editUserPlan.value;
  const limit = parseInt(editUserLimit.value, 10);
  const used = parseInt(editUserUsed.value, 10);
  
  btnSaveUser.disabled = true;
  btnSaveUser.textContent = 'Kaydediliyor...';
  
  try {
    // Check if subscription row exists
    const existingSub = allSubscriptions.find(s => s.user_id === userId);
    
    if (existingSub) {
      // Update
      const { error } = await supabase
        .from('subscriptions')
        .update({
          plan,
          generation_limit: limit,
          used_generations: used,
          renewal_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        })
        .eq('user_id', userId);
        
      if (error) throw error;
    } else {
      // Insert
      const { error } = await supabase
        .from('subscriptions')
        .insert({
          user_id: userId,
          plan,
          generation_limit: limit,
          used_generations: used,
          renewal_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        });
        
      if (error) throw error;
    }
    
    // Refresh user list
    closeUserModal();
    loadUsers();
    loadDashboardStats();
    loadCharts();
  } catch (e) {
    modalUserError.textContent = e.message || 'Kaydedilemedi.';
    modalUserError.style.display = 'block';
  } finally {
    btnSaveUser.disabled = false;
    btnSaveUser.textContent = 'Değişiklikleri Kaydet';
  }
}

window.handleDeleteUser = async function(id, name) {
  if (!confirm(`DİKKAT: "${name}" isimli kullanıcının hesabını ve Supabase üzerindeki TÜM verilerini (projeler, abonelik kiti vb.) kalıcı olarak silmek istediğinizden emin misiniz?`)) {
    return;
  }
  
  try {
    // Purge dependencies
    await supabase.from('brand_kits').delete().eq('user_id', id);
    await supabase.from('projects').delete().eq('user_id', id);
    await supabase.from('subscriptions').delete().eq('user_id', id);
    await supabase.from('referrals').delete().eq('referrer_id', id);
    await supabase.from('referrals').delete().eq('referred_id', id);
    
    // Delete profile
    const { error: errProf } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id);
      
    if (errProf) throw errProf;
    
    alert('Hesap başarıyla silindi ve tüm veritabanı kayıtları temizlendi.');
    loadUsers();
    loadDashboardStats();
  } catch (e) {
    console.error('Error deleting user:', e);
    alert('Kullanıcı silinemedi: ' + e.message);
  }
};

// ================= BUG REPORT AUDIT =================
async function loadBugs() {
  bugsLoading.style.display = 'flex';
  bugsTable.style.display = 'none';
  
  try {
    const { data, error } = await supabase
      .from('bug_reports')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    allBugs = data || [];
    
    renderBugsTable();
  } catch (e) {
    console.error('Error loading bugs:', e);
  } finally {
    bugsLoading.style.display = 'none';
    bugsTable.style.display = 'table';
  }
}

function renderBugsTable() {
  bugsTableBody.innerHTML = '';
  
  if (allBugs.length === 0) {
    bugsTableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-secondary); padding: 30px;">Hata raporu bulunamadı. Uygulama pürüzsüz çalışıyor! 🚀</td></tr>`;
    return;
  }
  
  allBugs.forEach((bug, index) => {
    const formattedDate = bug.created_at ? new Date(bug.created_at).toLocaleString('tr-TR') : 'Bilinmiyor';
    const emailDisplay = bug.user_email || 'Anonim / Giriş Yapılmamış';
    
    const trSummary = document.createElement('tr');
    trSummary.id = `bug-sum-${bug.id || index}`;
    trSummary.innerHTML = `
      <td style="cursor: pointer; text-align: center; width: 40px;" onclick="toggleBugDetails('${bug.id || index}')">
        <i data-lucide="chevron-right" id="bug-icon-${bug.id || index}" style="width: 16px; height: 16px; transition: var(--transition);"></i>
      </td>
      <td>${formattedDate}</td>
      <td><span class="user-email" style="font-size: 13px; color: var(--text);">${emailDisplay}</span></td>
      <td style="max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 500; color: #FFA3D7;">${bug.error_message || 'Detaysız hata'}</td>
      <td><code>${bug.device_info || 'Bilinmeyen Cihaz'}</code></td>
      <td>
        <button class="action-btn delete-btn" onclick="handleDeleteBug('${bug.id}')" title="Raporu Sil">
          <i data-lucide="trash" style="width: 14px; height: 14px;"></i>
        </button>
      </td>
    `;
    
    const trDetail = document.createElement('tr');
    trDetail.id = `bug-det-${bug.id || index}`;
    trDetail.className = 'bug-detail-row';
    trDetail.style.display = 'none';
    trDetail.innerHTML = `
      <td colspan="6">
        <div class="bug-detail-content">
          <div class="bug-detail-title">Kullanıcı Açıklaması</div>
          <div class="bug-description-text">"${bug.user_description || 'Kullanıcı bir açıklama girmedi.'}"</div>
          
          <div class="bug-detail-title">Hata Yığını (Stack Trace)</div>
          <pre class="bug-stack-trace">${bug.error_stack || 'Stack trace bulunamadı.'}</pre>
        </div>
      </td>
    `;
    
    bugsTableBody.appendChild(trSummary);
    bugsTableBody.appendChild(trDetail);
  });
  
  lucide.createIcons();
}

window.toggleBugDetails = function(id) {
  const row = document.getElementById(`bug-det-${id}`);
  const icon = document.getElementById(`bug-icon-${id}`);
  
  if (row.style.display === 'none') {
    row.style.display = 'table-row';
    icon.style.transform = 'rotate(90deg)';
    icon.style.color = 'var(--magenta)';
  } else {
    row.style.display = 'none';
    icon.style.transform = 'rotate(0deg)';
    icon.style.color = '';
  }
};

window.handleDeleteBug = async function(id) {
  if (!confirm('Bu hata raporunu silmek istediğinizden emin misiniz?')) return;
  
  try {
    const { error } = await supabase
      .from('bug_reports')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    
    loadBugs();
    loadDashboardStats();
  } catch (e) {
    console.error('Error deleting bug:', e);
    alert('Hata raporu silinemedi: ' + e.message);
  }
};

async function handleClearAllBugs() {
  if (!confirm('UYARI: Veritabanındaki TÜM hata raporlarını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) return;
  
  try {
    const { error } = await supabase
      .from('bug_reports')
      .delete()
      .neq('id', 'placeholder-uuid-to-delete-all'); // Supabase deletes all matchable
      
    if (error) throw error;
    
    alert('Tüm arıza raporları temizlendi.');
    loadBugs();
    loadDashboardStats();
  } catch (e) {
    console.error('Error clearing bugs:', e);
    alert('Temizleme işlemi başarısız: ' + e.message);
  }
}

// ================= BROADCAST NOTIFICATIONS =================
async function handleSendNotification(e) {
  e.preventDefault();
  notifyAlertSuccess.style.display = 'none';
  notifyAlertDanger.style.display = 'none';
  
  const title = notifyTitle.value.trim();
  const body = notifyBody.value.trim();
  const targetType = notifyTarget.value;
  
  const btn = document.getElementById('btn-send-notify');
  btn.disabled = true;
  btn.textContent = 'Gönderiliyor...';
  
  try {
    let tokens = [];
    
    if (targetType === 'all') {
      // Fetch all users with push tokens
      const { data, error } = await supabase
        .from('profiles')
        .select('expo_push_token')
        .not('expo_push_token', 'is', null);
        
      if (error) throw error;
      
      tokens = data.map(p => p.expo_push_token).filter(t => t && t.startsWith('ExponentPushToken'));
    } else {
      // Fetch specific user
      const targetEmail = notifyEmail.value.trim();
      const { data, error } = await supabase
        .from('profiles')
        .select('expo_push_token')
        .eq('email', targetEmail)
        .single();
        
      if (error) throw error;
      if (!data || !data.expo_push_token) {
        throw new Error('Belirtilen kullanıcıya ait aktif bir Expo Push Token bulunamadı.');
      }
      
      tokens = [data.expo_push_token];
    }
    
    if (tokens.length === 0) {
      throw new Error('Gönderim yapılacak cihaz push tokenı bulunamadı. Kullanıcılar bildirim izni vermemiş olabilir.');
    }
    
    // Send request via Expo Push API
    // Note: Expo accepts batches of push notifications.
    const messages = tokens.map(token => ({
      to: token,
      sound: 'default',
      title: title,
      body: body,
      data: { withSome: 'data' }
    }));
    
    // Dispatch securely via Supabase Edge Function to avoid CORS and SSL certificate errors
    const { data: result, error: invokeError } = await supabase.functions.invoke('openai-proxy', {
      body: { action: 'send-push', payload: messages }
    });
    
    if (invokeError) {
      if (invokeError.context) {
        try {
          const errBody = await invokeError.context.clone().json();
          let errMsg = 'Edge Function Hatası';
          if (errBody) {
            if (typeof errBody.error === 'string') {
              errMsg = errBody.error;
            } else if (errBody.error && typeof errBody.error === 'object') {
              errMsg = errBody.error.message || errBody.error.error || JSON.stringify(errBody.error);
            } else if (errBody.message) {
              errMsg = errBody.message;
            }
          }
          throw new Error(errMsg);
        } catch (e) {
          throw new Error(e.message || invokeError.message);
        }
      }
      throw invokeError;
    }
    console.log('Supabase Function Response:', result);
    
    notifyAlertSuccess.textContent = `Bildirim başarıyla ${tokens.length} adet cihaza gönderildi!`;
    notifyAlertSuccess.style.display = 'block';
    
    notifyForm.reset();
    notifySpecificUserGroup.style.display = 'none';
    notifyEmail.removeAttribute('required');
  } catch (err) {
    notifyAlertDanger.textContent = err.message || 'Bildirim gönderilemedi.';
    notifyAlertDanger.style.display = 'block';
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i data-lucide="send"></i> Bildirimi Gönder (Push)';
    lucide.createIcons();
  }
}

// ================= EMAIL NEWSLETTER BUILDER & PREVIEW LOGIC =================
function compileEmailTemplate(title, bodyText, btnText, btnUrl, footerText) {
  const paragraphs = bodyText.split('\n').filter(p => p.trim() !== '').map(p => {
    return `<p style="font-size: 15px; line-height: 1.6; color: #a0a5c0; margin: 0 0 20px 0; text-align: center;">${p.trim()}</p>`;
  }).join('');

  const btnHtml = (btnText && btnUrl) ? `
        <div class="btn-container" style="margin-bottom: 35px; text-align: center;">
          <a href="${btnUrl}" class="btn" target="_blank" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #ff2e93 0%, #6c63ff 100%); color: #ffffff !important; text-decoration: none; font-weight: 600; font-size: 15px; border-radius: 8px; box-shadow: 0 4px 15px rgba(255, 46, 147, 0.3);">
            ${btnText}
          </a>
        </div>` : '';

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Desivo Bülten</title>
  <style>
    body { font-family: 'Inter', -apple-system, sans-serif; background-color: #0b0c10; color: #e4e6eb; margin: 0; padding: 0; }
    .wrapper { width: 100%; table-layout: fixed; background-color: #0b0c10; padding: 40px 0; }
    .container { max-width: 600px; margin: 0 auto; background-color: #12131a; border: 1px solid #222533; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); }
    .header { padding: 30px; text-align: center; background: linear-gradient(135deg, #181922 0%, #12131a 100%); border-bottom: 1px solid #222533; }
    .content { padding: 40px 30px; text-align: center; }
    h1 { font-size: 22px; font-weight: 700; color: #ffffff; margin: 0 0 16px 0; text-align: center; }
    p { font-size: 15px; line-height: 1.6; color: #a0a5c0; margin: 0 0 20px 0; text-align: center; }
    .btn-container { margin-bottom: 35px; text-align: center; }
    .btn { display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #ff2e93 0%, #6c63ff 100%); color: #ffffff !important; text-decoration: none; font-weight: 600; font-size: 15px; border-radius: 8px; box-shadow: 0 4px 15px rgba(255, 46, 147, 0.3); }
    .footer { padding: 30px; background-color: #0b0c10; text-align: center; border-top: 1px solid #222533; font-size: 12px; color: #646880; }
    .footer p { font-size: 12px; color: #646880; margin: 0; }
  </style>
</head>
<body>
  <div class="wrapper" style="width: 100%; table-layout: fixed; background-color: #0b0c10; padding: 40px 0;">
    <div class="container" style="max-width: 600px; margin: 0 auto; background-color: #12131a; border: 1px solid #222533; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);">
      <div class="header" style="padding: 30px; text-align: center; background: linear-gradient(135deg, #181922 0%, #12131a 100%); border-bottom: 1px solid #222533;">
        <div style="display: inline-block; vertical-align: middle;">
          <img src="https://desivo.app/assets/logo.png" alt="Desivo Logo" width="36" height="36" style="border: 0; vertical-align: middle; margin-right: 8px;">
          <span style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 24px; font-weight: 800; color: #ffffff; vertical-align: middle; letter-spacing: -0.5px;">Desivo<span style="color: #ff2e93; margin-left: 1px;">.</span></span>
        </div>
      </div>
      <div class="content" style="padding: 40px 30px; text-align: center;">
        <h1 style="font-size: 22px; font-weight: 700; color: #ffffff; margin: 0 0 16px 0; text-align: center;">${title}</h1>
        ${paragraphs}
        ${btnHtml}
      </div>
      <div class="footer" style="padding: 30px; background-color: #0b0c10; text-align: center; border-top: 1px solid #222533; font-size: 12px; color: #646880;">
        <p style="margin: 0; font-size: 12px; color: #646880;">${footerText}</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function updatePreview() {
  let htmlContent = '';
  if (activeEditorMode === 'easy') {
    const title = emailEasyTitle ? emailEasyTitle.value.trim() : '';
    const bodyText = emailEasyBody ? emailEasyBody.value : '';
    const btnText = emailEasyBtnText ? emailEasyBtnText.value.trim() : '';
    const btnUrl = emailEasyBtnUrl ? emailEasyBtnUrl.value.trim() : '';
    const footerText = emailEasyFooter ? emailEasyFooter.value.trim() : '';
    
    htmlContent = compileEmailTemplate(title, bodyText, btnText, btnUrl, footerText);
    if (emailBody) emailBody.value = htmlContent;
  } else {
    htmlContent = emailBody ? emailBody.value : '';
  }

  if (emailPreviewIframe) {
    try {
      const doc = emailPreviewIframe.contentDocument || emailPreviewIframe.contentWindow.document;
      doc.open();
      doc.write(htmlContent);
      doc.close();
    } catch (err) {
      console.error('Önizleme yükleme hatası:', err);
    }
  }
}

// ================= EMAIL NEWSLETTER LOGIC =================
async function handleSendEmail(e) {
  e.preventDefault();
  emailAlertSuccess.style.display = 'none';
  emailAlertDanger.style.display = 'none';
  
  const subject = emailSubject.value.trim();
  const body = emailBody.value.trim();
  const targetType = emailTarget.value;
  
  const btn = document.getElementById('btn-send-email');
  btn.disabled = true;
  btn.textContent = 'Gönderiliyor...';
  
  try {
    let emails = [];
    
    if (targetType === 'all') {
      // Fetch all users with email addresses
      const { data, error } = await supabase
        .from('profiles')
        .select('email')
        .not('email', 'is', null);
        
      if (error) throw error;
      
      emails = data.map(p => p.email).filter(Boolean);
    } else {
      // Fetch specific user
      const targetEmail = emailRecipient.value.trim();
      emails = [targetEmail];
    }
    
    if (emails.length === 0) {
      throw new Error('Gönderim yapılacak e-posta adresi bulunamadı.');
    }
    
    // Dispatch securely via Supabase Edge Function
    const { data: result, error: invokeError } = await supabase.functions.invoke('openai-proxy', {
      body: { 
        action: 'send-email', 
        payload: {
          to: emails,
          subject: subject,
          body: body
        }
      }
    });
    
    if (invokeError) {
      if (invokeError.context) {
        try {
          const errBody = await invokeError.context.clone().json();
          let errMsg = 'Edge Function Hatası';
          if (errBody) {
            if (typeof errBody.error === 'string') {
              errMsg = errBody.error;
            } else if (errBody.error && typeof errBody.error === 'object') {
              errMsg = errBody.error.message || errBody.error.error || JSON.stringify(errBody.error);
            } else if (errBody.message) {
              errMsg = errBody.message;
            }
          }
          throw new Error(errMsg);
        } catch (e) {
          throw new Error(e.message || invokeError.message);
        }
      }
      throw invokeError;
    }
    console.log('Supabase Email Response:', result);
    
    emailAlertSuccess.textContent = `E-posta başarıyla ${emails.length} adrese gönderildi!`;
    emailAlertSuccess.style.display = 'block';
    
    emailForm.reset();
    emailSpecificUserGroup.style.display = 'none';
    emailRecipient.removeAttribute('required');
  } catch (err) {
    emailAlertDanger.textContent = err.message || 'E-posta gönderilemedi.';
    emailAlertDanger.style.display = 'block';
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i data-lucide="send"></i> E-Postayı Gönder (Mail)';
    lucide.createIcons();
  }
}

// ================= TABS UTILITY =================
function switchTab(tabId) {
  // Update nav link classes
  navItems.forEach(item => {
    if (item.getAttribute('data-tab') === tabId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
  
  // Show active tab content
  tabPanes.forEach(pane => {
    if (pane.id === tabId) {
      pane.classList.add('active');
    } else {
      pane.classList.remove('active');
    }
  });
  
  // Custom reload action on tabs
  if (tabId === 'tab-users') {
    loadUsers();
  } else if (tabId === 'tab-bugs') {
    loadBugs();
  } else if (tabId === 'tab-overview') {
    loadDashboardStats();
    loadCharts();
  } else if (tabId === 'tab-api-test') {
    loadSavedApiKey();
  } else if (tabId === 'tab-revenue') {
    loadRevenueData();
  } else if (tabId === 'tab-audit') {
    loadAuditData();
  } else if (tabId === 'tab-config') {
    loadSystemSettings();
  }
}

// ================= API TEST & STATUS LOGIC =================
const apiKeyInput = document.getElementById('api-key-input');
const btnToggleKeyVisibility = document.getElementById('btn-toggle-key-visibility');
const iconToggleVisibility = document.getElementById('icon-toggle-visibility');
const apiTestForm = document.getElementById('api-test-form');
const apiTestModel = document.getElementById('api-test-model');
const apiTestPrompt = document.getElementById('api-test-prompt');
const apiAlertSuccess = document.getElementById('api-alert-success');
const apiAlertDanger = document.getElementById('api-alert-danger');
const btnRunApiTest = document.getElementById('btn-run-api-test');

const apiTestResultBox = document.getElementById('api-test-result-box');
const apiResStatus = document.getElementById('api-res-status');
const apiResLatency = document.getElementById('api-res-latency');
const apiResModel = document.getElementById('api-res-model');
const apiResTokens = document.getElementById('api-res-tokens');
const apiResText = document.getElementById('api-res-text');

const apiUsageDate = document.getElementById('api-usage-date');
const btnFetchApiUsage = document.getElementById('btn-fetch-api-usage');
const apiUsageLoading = document.getElementById('api-usage-loading');
const apiUsageResult = document.getElementById('api-usage-result');
const apiUsageTableBody = document.getElementById('api-usage-table-body');
const apiUsageNoData = document.getElementById('api-usage-no-data');
const apiUsageTotalCost = document.getElementById('api-usage-total-cost');

function loadSavedApiKey() {
  const savedKey = localStorage.getItem('desivo_openai_api_key');
  if (savedKey) {
    apiKeyInput.value = savedKey;
  }
  
  // Set default date for usage to today
  if (!apiUsageDate.value) {
    const today = new Date().toISOString().split('T')[0];
    apiUsageDate.value = today;
  }
}

function toggleKeyVisibility() {
  if (apiKeyInput.type === 'password') {
    apiKeyInput.type = 'text';
    iconToggleVisibility.setAttribute('data-lucide', 'eye-off');
  } else {
    apiKeyInput.type = 'password';
    iconToggleVisibility.setAttribute('data-lucide', 'eye');
  }
  lucide.createIcons();
}

async function handleApiTest(e) {
  e.preventDefault();
  apiAlertSuccess.style.display = 'none';
  apiAlertDanger.style.display = 'none';
  apiTestResultBox.style.display = 'none';
  
  const apiKey = apiKeyInput.value.trim();
  const model = apiTestModel.value;
  const prompt = apiTestPrompt.value.trim();
  
  if (!apiKey) {
    apiAlertDanger.textContent = 'Lütfen geçerli bir OpenAI API anahtarı girin.';
    apiAlertDanger.style.display = 'block';
    return;
  }
  
  // Save to localStorage
  localStorage.setItem('desivo_openai_api_key', apiKey);
  
  btnRunApiTest.disabled = true;
  btnRunApiTest.textContent = 'İstek Gönderiliyor...';
  
  const startTime = Date.now();
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 100
      })
    });
    
    const duration = Date.now() - startTime;
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || `HTTP Hata: ${response.status}`);
    }
    
    apiResStatus.textContent = 'BAŞARILI';
    apiResStatus.className = 'badge-pill badge-active';
    apiResLatency.textContent = `${duration} ms`;
    apiResModel.textContent = data.model || model;
    
    const usage = data.usage || { prompt_tokens: 0, completion_tokens: 0 };
    apiResTokens.textContent = `Prompt: ${usage.prompt_tokens} | Completion: ${usage.completion_tokens}`;
    
    apiResText.textContent = data.choices?.[0]?.message?.content || 'Cevap alınamadı.';
    
    apiAlertSuccess.textContent = 'OpenAI API bağlantısı başarıyla kuruldu!';
    apiAlertSuccess.style.display = 'block';
    apiTestResultBox.style.display = 'block';
  } catch (err) {
    apiAlertDanger.textContent = `Bağlantı Hatası: ${err.message}`;
    apiAlertDanger.style.display = 'block';
    
    apiResStatus.textContent = 'HATA';
    apiResStatus.className = 'badge-pill badge-error';
    apiResLatency.textContent = 'N/A';
    apiResModel.textContent = model;
    apiResTokens.textContent = 'N/A';
    apiResText.textContent = err.message;
    apiTestResultBox.style.display = 'block';
  } finally {
    btnRunApiTest.disabled = false;
    btnRunApiTest.innerHTML = '<i data-lucide="play"></i> Test İsteği Gönder (Run)';
    lucide.createIcons();
  }
}

async function fetchApiUsage() {
  apiUsageLoading.style.display = 'flex';
  apiUsageResult.style.display = 'none';
  apiUsageNoData.style.display = 'none';
  
  const apiKey = apiKeyInput.value.trim();
  const dateStr = apiUsageDate.value;
  
  if (!apiKey) {
    apiUsageLoading.style.display = 'none';
    apiUsageNoData.textContent = 'Kullanım sorgulaması yapmak için önce soldaki formda geçerli bir API Key girin.';
    apiUsageNoData.style.display = 'block';
    return;
  }
  
  try {
    const response = await fetch(`https://api.openai.com/v1/usage?date=${dateStr}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || `HTTP Hata: ${response.status}`);
    }
    
    const usages = data.data || [];
    
    if (usages.length === 0) {
      apiUsageLoading.style.display = 'none';
      apiUsageNoData.textContent = 'Seçilen tarihe ait herhangi bir API kullanım kaydı bulunamadı.';
      apiUsageNoData.style.display = 'block';
      return;
    }
    
    apiUsageTableBody.innerHTML = '';
    
    // Aggregate usage by model_subpath
    const modelSummary = {};
    let totalCost = 0;
    
    usages.forEach(item => {
      const model = item.model_subpath || 'unknown';
      const promptTokens = item.prompt_tokens || 0;
      const completionTokens = item.completion_tokens || 0;
      const requests = item.num_requests || 1;
      
      if (!modelSummary[model]) {
        modelSummary[model] = { requests: 0, tokens: 0, cost: 0 };
      }
      
      const totalTokens = promptTokens + completionTokens;
      modelSummary[model].requests += requests;
      modelSummary[model].tokens += totalTokens;
      
      // Calculate estimated cost in USD based on official token prices (2026 average)
      let cost = 0;
      if (model.includes('gpt-4o-mini')) {
        cost = (promptTokens * 0.15 + completionTokens * 0.60) / 1000000;
      } else if (model.includes('gpt-4o')) {
        cost = (promptTokens * 5.00 + completionTokens * 15.00) / 1000000;
      } else if (model.includes('gpt-3.5-turbo')) {
        cost = (promptTokens * 0.50 + completionTokens * 1.50) / 1000000;
      } else {
        cost = (totalTokens * 1.5) / 1000000;
      }
      
      modelSummary[model].cost += cost;
      totalCost += cost;
    });
    
    // Render rows
    for (const [model, stats] of Object.entries(modelSummary)) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${model}</strong></td>
        <td>${stats.requests} istek</td>
        <td>${stats.tokens.toLocaleString('tr-TR')} token <small style="color:var(--text-muted); display:block;">Yaklaşık: $${stats.cost.toFixed(4)}</small></td>
      `;
      apiUsageTableBody.appendChild(tr);
    }
    
    apiUsageTotalCost.textContent = `$${totalCost.toFixed(4)}`;
    
    apiUsageLoading.style.display = 'none';
    apiUsageResult.style.display = 'block';
  } catch (err) {
    console.error('Error fetching API usage:', err);
    apiUsageLoading.style.display = 'none';
    apiUsageNoData.textContent = `Sorgulama Hatası: ${err.message}. (Not: Kredi bakiyesi sorgulama API anahtarı yetkisine veya güncel OpenAI API formatına bağlıdır.)`;
    apiUsageNoData.style.display = 'block';
  }
}

// ================= GELİR & ABONELİK LOGIC =================
let paidSubscriptions = [];
let revenueDistributionChartInstance = null;

async function loadRevenueData() {
  const revenueLoading = document.getElementById('revenue-loading');
  const revenueTable = document.getElementById('revenue-table');
  
  if (revenueLoading) revenueLoading.style.display = 'flex';
  if (revenueTable) revenueTable.style.display = 'none';
  
  try {
    // 1. Fetch subscriptions with plans != 'free'
    const { data: subs, error: errSubs } = await supabase
      .from('subscriptions')
      .select('*')
      .neq('plan', 'free');
      
    if (errSubs) throw errSubs;
    
    // 2. Fetch profiles to match names/emails
    const { data: profiles, error: errProfs } = await supabase
      .from('profiles')
      .select('id, full_name, email');
      
    if (errProfs) throw errProfs;
    
    // Combine them
    paidSubscriptions = (subs || []).map(sub => {
      const profile = (profiles || []).find(p => p.id === sub.user_id) || {
        full_name: 'Bilinmeyen Kullanıcı',
        email: 'Email Yok'
      };
      return {
        ...sub,
        profile
      };
    });
    
    renderRevenueTable();
  } catch (e) {
    console.error('Error loading revenue data:', e);
    alert('Finansal veriler yüklenemedi: ' + e.message);
  } finally {
    if (revenueLoading) revenueLoading.style.display = 'none';
    if (revenueTable) revenueTable.style.display = 'table';
  }
}

function renderRevenueTable() {
  const revenueExcludeSandboxInput = document.getElementById('revenue-exclude-sandbox');
  const revenueExcludeSandbox = revenueExcludeSandboxInput ? revenueExcludeSandboxInput.checked : true;
  const revenueTableBody = document.getElementById('revenue-table-body');
  
  if (!revenueTableBody) return;
  revenueTableBody.innerHTML = '';
  
  // Filter sandbox if checked
  const filteredSubs = paidSubscriptions.filter(sub => {
    if (revenueExcludeSandbox && sub.environment === 'sandbox') {
      return false;
    }
    return true;
  });
  
  if (filteredSubs.length === 0) {
    revenueTableBody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: var(--text-secondary); padding: 30px;">Aktif ücretli abonelik bulunamadı.</td></tr>';
    updateRevenueStats(0, 0, 0, 0);
    renderRevenueCharts(0, 0, 0, 0, 0);
    return;
  }
  
  let creatorCount = 0;
  let agencyCount = 0;
  let appStoreCount = 0;
  let stripeCount = 0;
  let webCount = 0;
  
  filteredSubs.forEach(sub => {
    const price = sub.plan === 'agency' ? 1499 : 349;
    if (sub.plan === 'agency') {
      agencyCount++;
    } else {
      creatorCount++;
    }
    
    const source = sub.purchase_source || 'app_store';
    if (source === 'stripe') stripeCount++;
    else if (source === 'web') webCount++;
    else appStoreCount++;
    
    const formattedDate = sub.renewal_date ? new Date(sub.renewal_date).toLocaleDateString('tr-TR') : 'Bilinmiyor';
    const planBadge = `<span class="badge-pill badge-${sub.plan}">${sub.plan.toUpperCase()}</span>`;
    const envBadge = sub.environment === 'sandbox' 
      ? `<span class="badge-pill badge-free">SANDBOX</span>` 
      : `<span class="badge-pill badge-active">PROD</span>`;
      
    const statusText = sub.subscription_status || 'active';
    const statusBadge = statusText === 'active' 
      ? `<span class="badge-pill badge-active">AKTİF</span>` 
      : `<span class="badge-pill badge-free">${statusText.toUpperCase()}</span>`;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div class="user-meta">
          <strong>${sub.profile.full_name}</strong>
          <span class="user-email">${sub.profile.email}</span>
        </div>
      </td>
      <td>${planBadge}</td>
      <td><strong>${price} TL</strong>/ay</td>
      <td><span class="badge-pill badge-creator">${source.toUpperCase()}</span></td>
      <td>${envBadge}</td>
      <td>${formattedDate}</td>
      <td>${statusBadge}</td>
    `;
    revenueTableBody.appendChild(tr);
  });
  
  // Calculate revenue indicators
  const activeSubsCount = filteredSubs.length;
  const mrr = (creatorCount * 349) + (agencyCount * 1499);
  const arr = mrr * 12;
  const arpu = activeSubsCount > 0 ? (mrr / activeSubsCount) : 0;
  
  updateRevenueStats(mrr, activeSubsCount, arpu, arr);
  renderRevenueCharts(creatorCount, agencyCount, appStoreCount, stripeCount, webCount);
}

function updateRevenueStats(mrr, activeSubs, arpu, arr) {
  document.getElementById('rev-stat-mrr').textContent = `${mrr.toLocaleString('tr-TR')} TL`;
  document.getElementById('rev-stat-active-subs').textContent = activeSubs;
  document.getElementById('rev-stat-arpu').textContent = `${arpu.toFixed(1)} TL`;
  document.getElementById('rev-stat-arr').textContent = `${arr.toLocaleString('tr-TR')} TL`;
}

function renderRevenueCharts(creator, agency, appstore, stripe, web) {
  // Chart 1: Plan Earnings
  const ctxDistribution = document.getElementById('chart-revenue-distribution').getContext('2d');
  
  if (revenueDistributionChartInstance) {
    revenueDistributionChartInstance.destroy();
  }
  
  const creatorEarnings = creator * 349;
  const agencyEarnings = agency * 1499;
  
  revenueDistributionChartInstance = new Chart(ctxDistribution, {
    type: 'pie',
    data: {
      labels: [`Creator (Pro) - ${creatorEarnings} TL`, `Agency (Ajans) - ${agencyEarnings} TL`],
      datasets: [{
        data: [creatorEarnings, agencyEarnings],
        backgroundColor: ['rgba(108, 99, 255, 0.7)', 'rgba(255, 46, 147, 0.7)'],
        borderColor: ['#6C63FF', '#FF2E93'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#9FA4BC', font: { family: 'Inter' } }
        }
      }
    }
  });
  
  // Chart 2: Source Method Distribution
  const ctxSources = document.getElementById('chart-revenue-sources').getContext('2d');
  
  if (window.revenueSourcesChartInstance) {
    window.revenueSourcesChartInstance.destroy();
  }
  
  window.revenueSourcesChartInstance = new Chart(ctxSources, {
    type: 'doughnut',
    data: {
      labels: [`App Store - ${appstore}`, `Stripe - ${stripe}`, `Web - ${web}`],
      datasets: [{
        data: [appstore, stripe, web],
        backgroundColor: ['rgba(108, 99, 255, 0.6)', 'rgba(0, 245, 255, 0.6)', 'rgba(16, 185, 129, 0.6)'],
        borderColor: ['#6C63FF', '#00F5FF', '#10B981'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#9FA4BC', font: { family: 'Inter' } }
        }
      }
    }
  });
}

// ================= CONTENT AUDIT LOGIC =================
let allProjects = [];

async function loadAuditData() {
  if (auditLoading) auditLoading.style.display = 'flex';
  if (auditTable) auditTable.style.display = 'none';
  
  try {
    // 1. Fetch projects
    const { data: projects, error: errProj } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (errProj) throw errProj;
    
    // 2. Fetch profiles
    const { data: profiles, error: errProf } = await supabase
      .from('profiles')
      .select('id, full_name, email');
      
    if (errProf) throw errProf;
    
    allProjects = (projects || []).map(p => {
      const prof = (profiles || []).find(pr => pr.id === p.user_id) || {
        full_name: 'Bilinmeyen Kullanıcı',
        email: 'Email Yok'
      };
      return { ...p, profile: prof };
    });
    
    renderAuditTable();
  } catch (e) {
    console.error('Error loading audit data:', e);
    alert('Projeler yüklenemedi: ' + e.message);
  } finally {
    if (auditLoading) auditLoading.style.display = 'none';
    if (auditTable) auditTable.style.display = 'table';
  }
}

function renderAuditTable() {
  if (!auditTableBody) return;
  auditTableBody.innerHTML = '';
  
  const searchVal = auditSearchInput.value.toLowerCase().trim();
  const platformVal = auditFilterPlatform.value;
  
  const filtered = allProjects.filter(p => {
    const titleMatch = (p.title || '').toLowerCase().includes(searchVal);
    const emailMatch = (p.profile?.email || '').toLowerCase().includes(searchVal);
    const nameMatch = (p.profile?.full_name || '').toLowerCase().includes(searchVal);
    
    const matchesSearch = titleMatch || emailMatch || nameMatch;
    const matchesPlatform = platformVal === 'all' || p.platform === platformVal;
    
    return matchesSearch && matchesPlatform;
  });
  
  if (filtered.length === 0) {
    auditTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--text-secondary); padding: 30px;">Uygun proje bulunamadı.</td></tr>';
    return;
  }
  
  filtered.forEach(p => {
    const formattedDate = p.created_at ? new Date(p.created_at).toLocaleDateString('tr-TR') : 'Bilinmiyor';
    const scoreVal = p.viral_score || 0;
    const scoreColor = scoreVal > 80 ? 'var(--magenta)' : scoreVal > 50 ? 'var(--secondary)' : 'var(--text-secondary)';
    
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div class="user-meta">
          <strong>${p.profile?.full_name || 'Bilinmeyen'}</strong>
          <span class="user-email">${p.profile?.email || 'Email yok'}</span>
        </div>
      </td>
      <td><strong>${p.title || 'Başlıksız Proje'}</strong></td>
      <td><span class="platform-chip ${p.platform || 'reels'}">${(p.platform || 'reels').toUpperCase()}</span></td>
      <td><strong style="color: ${scoreColor};">%${scoreVal}</strong></td>
      <td>${formattedDate}</td>
      <td>
        <div class="table-actions">
          <button class="action-btn edit-btn" onclick="openProjectDetailsModal('${p.id}')" title="Detayları Gör">
            <i data-lucide="eye" style="width: 14px; height: 14px;"></i>
          </button>
          <button class="action-btn delete-btn" onclick="handleDeleteProject('${p.id}', '${p.title || 'bu projeyi'}')" title="Projeyi Sil">
            <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
          </button>
        </div>
      </td>
    `;
    auditTableBody.appendChild(tr);
  });
  
  lucide.createIcons();
}

window.openProjectDetailsModal = async function(projectId) {
  projectNoContentAlert.style.display = 'none';
  projectDetailContentArea.style.display = 'none';
  
  // Clear modal values
  viewProjectTitle.textContent = 'Proje Detayları';
  viewProjectPlatform.textContent = '';
  viewProjectTone.textContent = '';
  viewProjectDuration.textContent = '';
  viewProjectViralScore.textContent = '';
  viewProjectIdea.textContent = '';
  
  modalViewProject.classList.add('active');
  
  try {
    const proj = allProjects.find(p => p.id === projectId);
    if (!proj) throw new Error('Proje bulunamadı.');
    
    viewProjectTitle.textContent = proj.title || 'Proje Detayları';
    viewProjectPlatform.textContent = (proj.platform || 'reels').toUpperCase();
    viewProjectTone.textContent = proj.tone || 'Bilinmiyor';
    viewProjectDuration.textContent = proj.duration || 'Bilinmiyor';
    viewProjectViralScore.textContent = `%${proj.viral_score || 0}`;
    viewProjectIdea.textContent = proj.idea || 'Fikir girilmemiş.';
    
    // Fetch generated content details
    const { data: content, error } = await supabase
      .from('generated_contents')
      .select('*')
      .eq('project_id', projectId)
      .maybeSingle();
      
    if (error) throw error;
    
    if (!content) {
      projectNoContentAlert.style.display = 'block';
    } else {
      projectDetailContentArea.style.display = 'block';
      viewProjectViralTitle.value = content.viral_title || '';
      viewProjectScript.value = content.script || '';
      viewProjectScenePlan.value = content.scene_plan || '';
      viewProjectOnScreen.value = content.on_screen_texts || '';
      viewProjectCaption.value = content.caption || '';
      viewProjectThumbnailIdea.value = content.thumbnail_idea || '';
      viewProjectCta.value = content.cta || '';
      viewProjectSuggestions.value = content.suggestions || '';
      
      const hashtags = Array.isArray(content.hashtags) ? content.hashtags.join(', ') : (content.hashtags || '');
      viewProjectHashtags.value = hashtags;
      
      // Hooks list
      viewProjectHooks.innerHTML = '';
      if (Array.isArray(content.hooks) && content.hooks.length > 0) {
        content.hooks.forEach((hook, i) => {
          const div = document.createElement('div');
          div.style.background = 'rgba(255,255,255,0.02)';
          div.style.padding = '8px 12px';
          div.style.borderRadius = '6px';
          div.style.border = '1px solid var(--border)';
          div.style.fontSize = '12.5px';
          div.innerHTML = `<strong>Kanca ${i+1}:</strong> ${hook}`;
          viewProjectHooks.appendChild(div);
        });
      } else if (content.hooks) {
        const div = document.createElement('div');
        div.innerHTML = content.hooks;
        viewProjectHooks.appendChild(div);
      }
    }
  } catch (err) {
    console.error('Error fetching project content:', err);
    alert('Senaryo detayı yüklenemedi: ' + err.message);
  }
};

window.closeProjectModal = function() {
  modalViewProject.classList.remove('active');
};

window.handleDeleteProject = async function(projectId, title) {
  if (!confirm(`DİKKAT: "${title}" isimli projeyi ve ona bağlı tüm yapay zeka çıktılarını kalıcı olarak silmek istediğinizden emin misiniz?`)) {
    return;
  }
  
  try {
    // Delete generated content first
    await supabase.from('generated_contents').delete().eq('project_id', projectId);
    
    // Delete project
    const { error } = await supabase.from('projects').delete().eq('id', projectId);
    if (error) throw error;
    
    alert('Proje başarıyla silindi.');
    loadAuditData();
    loadDashboardStats();
  } catch (e) {
    console.error('Error deleting project:', e);
    alert('Proje silinemedi: ' + e.message);
  }
};

// ================= SYSTEM SETTINGS (REMOTE CONFIG) LOGIC =================
async function loadSystemSettings() {
  configAlertSuccess.style.display = 'none';
  configAlertDanger.style.display = 'none';
  
  try {
    const { data, error } = await supabase
      .from('system_settings')
      .select('*')
      .eq('id', 'default')
      .single();
      
    if (error) throw error;
    
    if (data) {
      configFreeLimit.value = data.free_generation_limit ?? 3;
      configWeeklyAdLimit.value = data.weekly_ad_limit ?? 3;
      configReferralCredit.value = data.referral_reward_credits ?? 1;
      configMaintenanceMode.checked = data.maintenance_mode ?? false;
      configMinVersionIos.value = data.min_version_ios ?? '1.0.0';
      configMinVersionAndroid.value = data.min_version_android ?? '1.0.0';
      configAppStoreUrl.value = data.app_store_url ?? 'https://apps.apple.com/app/desivo';
      configPlayStoreUrl.value = data.play_store_url ?? 'https://play.google.com/store/apps/details?id=com.desivo.app';
      configOpenaiKey.value = data.openai_api_key ?? '';
      configAnnouncementActive.checked = data.announcement_active ?? false;
      configAnnouncementTitle.value = data.announcement_title ?? '';
      configAnnouncementBody.value = data.announcement_body ?? '';
    }
  } catch (e) {
    console.error('Error loading system settings:', e);
    configAlertDanger.textContent = 'Sistem ayarları yüklenemedi: ' + e.message;
    configAlertDanger.style.display = 'block';
  }
}

async function handleSaveSystemSettings(e) {
  e.preventDefault();
  configAlertSuccess.style.display = 'none';
  configAlertDanger.style.display = 'none';
  
  btnSaveConfig.disabled = true;
  btnSaveConfig.textContent = 'Kaydediliyor...';
  
  try {
    const updates = {
      free_generation_limit: parseInt(configFreeLimit.value, 10),
      weekly_ad_limit: parseInt(configWeeklyAdLimit.value, 10),
      referral_reward_credits: parseInt(configReferralCredit.value, 10),
      maintenance_mode: configMaintenanceMode.checked,
      min_version_ios: configMinVersionIos.value.trim(),
      min_version_android: configMinVersionAndroid.value.trim(),
      app_store_url: configAppStoreUrl.value.trim(),
      play_store_url: configPlayStoreUrl.value.trim(),
      openai_api_key: configOpenaiKey.value.trim(),
      announcement_active: configAnnouncementActive.checked,
      announcement_title: configAnnouncementTitle.value.trim(),
      announcement_body: configAnnouncementBody.value.trim(),
      updated_at: new Date().toISOString()
    };
    
    const { error } = await supabase
      .from('system_settings')
      .update(updates)
      .eq('id', 'default');
      
    if (error) throw error;
    
    configAlertSuccess.textContent = 'Sistem ayarları başarıyla güncellendi ve canlıya alındı!';
    configAlertSuccess.style.display = 'block';
  } catch (err) {
    console.error('Error saving system settings:', err);
    configAlertDanger.textContent = 'Ayarlar kaydedilemedi: ' + err.message;
    configAlertDanger.style.display = 'block';
  } finally {
    btnSaveConfig.disabled = false;
    btnSaveConfig.innerHTML = '<i data-lucide="save"></i> Ayarları Güncelle ve Canlıya Al';
    lucide.createIcons();
  }
}


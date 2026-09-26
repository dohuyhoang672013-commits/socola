/**
 * ChocoRank - Mock Authentication & Session Manager
 * Quản lý phiên đăng nhập và phân quyền giả lập bằng localStorage
 */

const AUTH_STORAGE_KEY = 'chocorank_current_user';
const USERS_STORAGE_KEY = 'chocorank_users_list';

// Danh sách tài khoản mặc định
const DEFAULT_USERS = [
  {
    id: 'user-admin-01',
    name: 'Choco Master Admin',
    email: 'admin@chocorank.com',
    password: 'admin123',
    role: 'admin',
    avatar: '🛡️',
    title: 'Tổng Quản Trị Viên',
    joinedDate: '01/01/2025',
    status: 'active'
  },
  {
    id: 'user-guest-02',
    name: 'Nguyễn Văn Khách',
    email: 'khach@chocorank.com',
    password: '123456',
    role: 'user',
    avatar: '🍫',
    title: 'Thành Viên Sành Ăn (VIP)',
    joinedDate: '15/02/2025',
    status: 'active'
  },
  {
    id: 'user-guest-03',
    name: 'Trần Thị Thu Hà',
    email: 'thuha@chocorank.com',
    password: '123456',
    role: 'user',
    avatar: '🍬',
    title: 'Tín Đồ Kẹo Ngọt',
    joinedDate: '10/03/2025',
    status: 'active'
  }
];

// Khởi tạo người dùng nếu chưa có
function initUsersStorage() {
  const existing = localStorage.getItem(USERS_STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
  }
}

// Lấy danh sách toàn bộ người dùng
function getAllUsers() {
  initUsersStorage();
  try {
    return JSON.parse(localStorage.getItem(USERS_STORAGE_KEY)) || DEFAULT_USERS;
  } catch (e) {
    return DEFAULT_USERS;
  }
}

// Lấy thông tin người dùng đang đăng nhập
function getCurrentUser() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

// Đăng nhập giả lập
function loginUser(emailOrUsername, password) {
  initUsersStorage();
  const users = getAllUsers();
  const cleanInput = (emailOrUsername || '').trim().toLowerCase();

  const user = users.find(u => 
    (u.email.toLowerCase() === cleanInput || u.name.toLowerCase() === cleanInput) && 
    u.password === password
  );

  if (!user) {
    return {
      success: false,
      message: 'Email hoặc mật khẩu không chính xác. Hãy kiểm tra lại hoặc dùng nút Đăng Nhập Nhanh!'
    };
  }

  // Lưu phiên đăng nhập
  const sessionUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    title: user.title,
    joinedDate: user.joinedDate
  };

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionUser));

  return {
    success: true,
    user: sessionUser,
    message: `Xin chào, ${user.name}! Đăng nhập thành công.`
  };
}

// Đăng ký tài khoản mới giả lập (Tách biệt quyền Khách Hàng và Quản Trị Viên)
function registerUser(userData) {
  initUsersStorage();
  const users = getAllUsers();
  const email = (userData.email || '').trim().toLowerCase();

  if (!email || !userData.password || !userData.name) {
    return {
      success: false,
      message: 'Vui lòng điền đầy đủ Họ tên, Email và Mật khẩu!'
    };
  }

  if (users.some(u => u.email.toLowerCase() === email)) {
    return {
      success: false,
      message: 'Email này đã được đăng ký! Vui lòng dùng email khác hoặc chuyển sang Đăng Nhập.'
    };
  }

  const role = userData.role === 'admin' ? 'admin' : 'user';

  // Nếu đăng ký tài khoản Quản Trị Viên: Bắt buộc phải có Mã Ủy Quyền Quản Trị Hợp Lệ
  if (role === 'admin') {
    const enteredCode = (userData.adminSecretCode || '').trim().toUpperCase();
    const VALID_ADMIN_CODES = ['ADMIN2026', 'CHOCOADMIN', 'CHOCO2026', 'ADMIN123'];
    
    if (!enteredCode || !VALID_ADMIN_CODES.includes(enteredCode)) {
      return {
        success: false,
        message: 'Mã ủy quyền quản trị viên không chính xác! Bạn không có quyền khởi tạo tài khoản Ban Quản Trị.'
      };
    }
  }

  const newUser = {
    id: (role === 'admin' ? 'admin-' : 'user-') + Date.now(),
    name: userData.name.trim(),
    email: email,
    password: userData.password,
    role: role,
    avatar: role === 'admin' ? '🛡️' : (userData.avatar || '🍫'),
    title: role === 'admin' ? 'Quản Trị Viên Hệ Thống' : 'Thành Viên Sành Ăn (VIP)',
    joinedDate: new Date().toLocaleDateString('vi-VN'),
    status: 'active'
  };

  users.push(newUser);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

  // Tự động lưu phiên đăng nhập ngay sau khi đăng ký
  const sessionUser = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    avatar: newUser.avatar,
    title: newUser.title,
    joinedDate: newUser.joinedDate
  };
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionUser));

  return {
    success: true,
    user: sessionUser,
    message: role === 'admin'
      ? `Chào mừng Quản Trị Viên ${newUser.name}! Tài khoản Ban Quản Trị đã được tạo thành công.`
      : `Chào mừng ${newUser.name}! Tài khoản Khách Hàng của bạn đã được tạo thành công.`
  };
}

// Đăng xuất
function logoutUser() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  return { success: true };
}

// Tự động cập nhật giao diện thanh điều hướng Header
function renderAuthHeader() {
  const container = document.getElementById('authNavContainer');
  if (!container) return;

  const user = getCurrentUser();

  if (!user) {
    // Chưa đăng nhập
    container.innerHTML = `
      <a href="auth.html" class="nav-auth-btn" id="navLoginBtn" title="Đăng nhập / Đăng ký tài khoản">
        <span class="auth-btn-icon">🔑</span>
        <span class="auth-btn-label">Đăng Nhập</span>
      </a>
    `;
    return;
  }

  // Đã đăng nhập
  const isAdmin = user.role === 'admin';
  const roleBadge = isAdmin
    ? `<span class="auth-user-badge badge-admin" title="Tài khoản Ban Quản Trị">🛡️ Quản Trị Viên</span>`
    : `<span class="auth-user-badge badge-vip" title="Tài khoản Khách Hàng">⭐ ${user.title || 'Khách VIP'}</span>`;

  const adminLink = isAdmin
    ? `<a href="admin.html" class="nav-admin-portal-btn" title="Vào Bảng Điều Khiển Quản Trị">
        <span>⚙️ Khu Quản Trị</span>
       </a>`
    : '';

  container.innerHTML = `
    <div class="auth-user-profile" id="authUserProfile">
      <div class="user-avatar-badge">${user.avatar || '🍫'}</div>
      <div class="user-meta-info">
        <span class="user-name-text">${user.name}</span>
        ${roleBadge}
      </div>
      ${adminLink}
      <button class="nav-logout-btn" id="headerLogoutBtn" title="Đăng xuất khỏi tài khoản">
        <span>🚪</span>
      </button>
    </div>
  `;

  const logoutBtn = document.getElementById('headerLogoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      logoutUser();
      renderAuthHeader();
      // Nếu có toast container thì hiển thị toast
      const toastCont = document.getElementById('toastContainer');
      if (toastCont) {
        const toast = document.createElement('div');
        toast.className = 'toast toast-info';
        toast.textContent = 'Đã đăng xuất thành công!';
        toastCont.appendChild(toast);
        setTimeout(() => toast.remove(), 2500);
      }
      // Nếu đang ở admin.html thì quay về index.html
      if (window.location.pathname.includes('admin.html')) {
        window.location.href = 'index.html';
      }
    });
  }
}

// Khởi chạy khi tài liệu sẵn sàng
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initUsersStorage();
    renderAuthHeader();
  });
}

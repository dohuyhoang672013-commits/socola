/**
 * ChocoRank - Real Supabase Authentication & Session Manager
 * Xác thực thực tế 100% qua Supabase Auth API
 * Quản lý phiên đăng nhập và phân quyền an toàn, tuyệt đối không lưu mật khẩu ở bảng thường
 */

const AUTH_STORAGE_KEY = 'chocorank_current_user';
const SESSION_STORAGE_KEY = 'chocorank_supabase_session';
const OLD_USERS_STORAGE_KEY = 'chocorank_users_list';

// Dọn dẹp triệt để dữ liệu đăng nhập giả lập cũ khỏi trình duyệt
(function cleanupLegacyAuth() {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(OLD_USERS_STORAGE_KEY);
    }
  } catch (e) {
    // Bỏ qua nếu môi trường hạn chế localStorage
  }
})();

// Lấy thông tin cấu hình Supabase
function getSupabaseAuthConfig() {
  if (typeof window !== 'undefined' && window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.url) {
    return window.SUPABASE_CONFIG;
  }
  return {
    url: 'https://ukwuzbacxinidphzhftr.supabase.co',
    publishableKey: 'sb_publishable_vHK1gIdoebQ-4WwaIjeEmg_elX97-SK'
  };
}

/**
 * Trả về thông tin người dùng đang đăng nhập (đồng bộ, đọc từ localStorage)
 * Giữ nguyên cấu trúc cho toàn bộ ứng dụng (Header, Cart, Checkout, Admin, Quiz)
 */
function getCurrentUser() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

/**
 * Lấy phiên đăng nhập Supabase đầy đủ (gồm access_token, refresh_token, expires_at)
 */
function getSupabaseSession() {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

/**
 * Chuyển đổi dữ liệu User trả về từ Supabase Auth sang định dạng chuẩn của ứng dụng
 * Ưu tiên app_metadata (phía máy chủ) rồi đến user_metadata, mặc định luôn là 'user' (khách)
 */
function formatSessionUser(supabaseUser) {
  if (!supabaseUser) return null;
  const meta = supabaseUser.user_metadata || {};
  const appMeta = supabaseUser.app_metadata || {};
  const email = supabaseUser.email || '';

  // Kiểm tra vai trò: 'admin' hay 'user' (mặc định là 'user')
  const rawRole = (appMeta.role || meta.role || 'user').toLowerCase().trim();
  const role = rawRole === 'admin' ? 'admin' : 'user';

  const name = (meta.name || meta.full_name || email.split('@')[0] || 'Khách Hàng').trim();
  const avatar = meta.avatar || (role === 'admin' ? '🛡️' : '🍫');
  const title = meta.title || (role === 'admin' ? 'Tổng Quản Trị Viên' : 'Thành Viên Sành Ăn (VIP)');
  const joinedDate = supabaseUser.created_at
    ? new Date(supabaseUser.created_at).toLocaleDateString('vi-VN')
    : new Date().toLocaleDateString('vi-VN');

  return {
    id: supabaseUser.id,
    name: name,
    email: email,
    role: role,
    avatar: avatar,
    title: title,
    joinedDate: joinedDate
  };
}

/**
 * Lưu phiên làm việc Supabase và thông tin người dùng vào localStorage (tồn tại qua nhiều lần đóng/mở trình duyệt)
 */
function saveAuthSession(sessionData) {
  if (!sessionData || !sessionData.user) return null;

  const sessionUser = formatSessionUser(sessionData.user);
  
  // Tính thời điểm hết hạn
  const expiresInSeconds = sessionData.expires_in || 3600;
  const expiresAt = Date.now() + (expiresInSeconds * 1000);

  const fullSession = {
    access_token: sessionData.access_token,
    refresh_token: sessionData.refresh_token,
    token_type: sessionData.token_type || 'bearer',
    expires_at: expiresAt,
    user: sessionData.user
  };

  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionUser));
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(fullSession));
  } catch (e) {
    console.error('[Auth Storage Error]:', e);
  }

  return sessionUser;
}

/**
 * Xóa sạch phiên đăng nhập khi Đăng Xuất
 */
function clearAuthSession() {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (e) {
    console.error('[Auth Clear Error]:', e);
  }
}

/**
 * ĐĂNG NHẬP THẬT QUA SUPABASE AUTH
 * Endpoint: POST ${url}/auth/v1/token?grant_type=password
 */
async function loginUser(email, password) {
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPassword = (password || '').trim();

  if (!cleanEmail || !cleanPassword) {
    return {
      success: false,
      message: 'Vui lòng nhập đầy đủ Email và Mật khẩu!'
    };
  }

  try {
    const config = getSupabaseAuthConfig();
    const res = await fetch(`${config.url}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        'apikey': config.publishableKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: cleanEmail,
        password: cleanPassword
      })
    });

    const data = await res.json();

    if (!res.ok) {
      console.warn('[Supabase Login Failed]:', data);
      let errorMsg = 'Email hoặc mật khẩu không chính xác. Hãy kiểm tra lại!';
      if (data.error_description) {
        if (data.error_description.includes('Invalid login credentials')) {
          errorMsg = 'Email hoặc mật khẩu không chính xác!';
        } else if (data.error_description.includes('Email not confirmed')) {
          errorMsg = 'Email chưa được xác thực!';
        } else {
          errorMsg = data.error_description;
        }
      } else if (data.msg) {
        errorMsg = data.msg;
      }
      return { success: false, message: errorMsg };
    }

    // Đăng nhập thành công, lưu phiên
    const sessionUser = saveAuthSession(data);
    renderAuthHeader();

    return {
      success: true,
      user: sessionUser,
      message: `Xin chào, ${sessionUser.name}! Đăng nhập thành công.`
    };
  } catch (err) {
    console.error('[Supabase Login Exception]:', err);
    return {
      success: false,
      message: 'Không thể kết nối đến máy chủ xác thực Supabase. Vui lòng thử lại sau!'
    };
  }
}

/**
 * ĐĂNG KÝ TÀI KHOẢN MỚI THẬT QUA SUPABASE AUTH
 * Tuyệt đối không lưu mật khẩu vào bảng thường - Supabase Auth tự mã hóa và lưu trữ an toàn
 * Endpoint: POST ${url}/auth/v1/signup
 */
async function registerUser(userData) {
  const name = (userData.name || '').trim();
  const email = (userData.email || '').trim().toLowerCase();
  const password = (userData.password || '').trim();
  const role = userData.role === 'admin' ? 'admin' : 'user';

  if (!name || !email || !password) {
    return {
      success: false,
      message: 'Vui lòng điền đầy đủ Họ tên, Email và Mật khẩu!'
    };
  }

  if (password.length < 6) {
    return {
      success: false,
      message: 'Mật khẩu phải có độ dài tối thiểu 6 ký tự!'
    };
  }

  // Nếu là tài khoản Quản Trị Viên: Bắt buộc kiểm tra mã ủy quyền
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

  const avatar = role === 'admin' ? '🛡️' : (userData.avatar || '🍫');
  const title = role === 'admin' ? 'Quản Trị Viên Hệ Thống' : (userData.title || 'Thành Viên Sành Ăn (VIP)');

  try {
    const config = getSupabaseAuthConfig();
    const signupRes = await fetch(`${config.url}/auth/v1/signup`, {
      method: 'POST',
      headers: {
        'apikey': config.publishableKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        data: {
          name: name,
          full_name: name,
          role: role,
          avatar: avatar,
          title: title
        }
      })
    });

    const signupData = await signupRes.json();

    if (!signupRes.ok) {
      console.warn('[Supabase Signup Failed]:', signupData);
      let errorMsg = 'Không thể tạo tài khoản.';
      if (signupData.msg) {
        if (signupData.msg.includes('already registered') || signupData.msg.includes('User already')) {
          errorMsg = 'Email này đã được đăng ký! Vui lòng dùng email khác hoặc chuyển sang Đăng Nhập.';
        } else if (signupData.msg.includes('at least 6 characters')) {
          errorMsg = 'Mật khẩu phải có tối thiểu 6 ký tự!';
        } else {
          errorMsg = signupData.msg;
        }
      } else if (signupData.error_description) {
        errorMsg = signupData.error_description;
      }
      return { success: false, message: errorMsg };
    }

    // Đăng ký thành công -> Tự động đăng nhập ngay để lấy phiên hoạt động
    const loginRes = await loginUser(email, password);
    if (loginRes.success) {
      return {
        success: true,
        user: loginRes.user,
        message: role === 'admin'
          ? `Chào mừng Quản Trị Viên ${name}! Tài khoản Ban Quản Trị đã được tạo và kích hoạt thành công.`
          : `Chào mừng ${name}! Tài khoản Khách Hàng của bạn đã được tạo thành công.`
      };
    }

    return {
      success: true,
      message: 'Tài khoản đã tạo thành công! Vui lòng tiến hành đăng nhập.'
    };
  } catch (err) {
    console.error('[Supabase Signup Exception]:', err);
    return {
      success: false,
      message: 'Lỗi kết nối khi đăng ký tài khoản. Vui lòng thử lại!'
    };
  }
}

/**
 * ĐĂNG XUẤT THẬT QUA SUPABASE AUTH
 * Hủy token trên máy chủ Supabase và xóa sạch bộ nhớ phiên cục bộ
 */
async function logoutUser() {
  const session = getSupabaseSession();

  if (session && session.access_token) {
    try {
      const config = getSupabaseAuthConfig();
      await fetch(`${config.url}/auth/v1/logout`, {
        method: 'POST',
        headers: {
          'apikey': config.publishableKey,
          'Authorization': `Bearer ${session.access_token}`
        }
      });
    } catch (e) {
      console.warn('[Supabase Logout Warn]:', e);
    }
  }

  clearAuthSession();
  renderAuthHeader();
  return { success: true };
}

/**
 * Làm mới phiên token nếu sắp hết hạn (Auto Refresh Session)
 */
async function refreshSupabaseSession() {
  const session = getSupabaseSession();
  if (!session || !session.refresh_token) return;

  // Nếu còn hơn 10 phút thì chưa cần refresh
  if (session.expires_at && session.expires_at - Date.now() > 10 * 60 * 1000) {
    return;
  }

  try {
    const config = getSupabaseAuthConfig();
    const res = await fetch(`${config.url}/auth/v1/token?grant_type=refresh_token`, {
      method: 'POST',
      headers: {
        'apikey': config.publishableKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        refresh_token: session.refresh_token
      })
    });

    if (res.ok) {
      const refreshed = await res.json();
      saveAuthSession(refreshed);
      renderAuthHeader();
    } else {
      // Refresh token không hợp lệ (đã bị thu hồi)
      console.warn('[Auth Refresh Expired]');
    }
  } catch (e) {
    console.warn('[Auth Refresh Error]:', e);
  }
}

/**
 * CẬP NHẬT GIAO DIỆN THANH ĐIỀU HƯỚNG HEADER (Hiển thị tên người dùng, avatar, chức vụ)
 */
function renderAuthHeader() {
  const container = document.getElementById('authNavContainer');
  if (!container) return;

  const user = getCurrentUser();

  if (!user) {
    // Chưa đăng nhập: Nút Đăng Nhập / Đăng Ký
    container.innerHTML = `
      <a href="auth.html" class="nav-auth-btn" id="navLoginBtn" title="Đăng nhập / Đăng ký tài khoản">
        <span class="auth-btn-icon">🔑</span>
        <span class="auth-btn-label">Đăng Nhập</span>
      </a>
    `;
    return;
  }

  // Đã đăng nhập thật bằng Supabase Auth
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

  // Gắn sự kiện nút Đăng Xuất
  const logoutBtn = document.getElementById('headerLogoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      logoutBtn.disabled = true;
      await logoutUser();
      
      const toastCont = document.getElementById('toastContainer');
      if (toastCont) {
        const toast = document.createElement('div');
        toast.className = 'toast toast-info';
        toast.innerHTML = '<span>🚪 Đã đăng xuất an toàn khỏi hệ thống!</span>';
        toastCont.appendChild(toast);
        setTimeout(() => toast.remove(), 2500);
      }

      // Nếu đang ở trang Quản Trị admin.html thì chuyển hướng về index.html
      if (window.location.pathname.includes('admin.html')) {
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 500);
      }
    });
  }
}

/**
 * Kiểm tra xem người dùng hiện tại có vai trò Quản Trị Viên (Admin) hay không
 */
function isAdmin() {
  const user = getCurrentUser();
  return !!(user && user.role === 'admin');
}

/**
 * Hàm chốt chặn bảo vệ các trang quản trị:
 * Nếu chưa đăng nhập hoặc không có vai trò admin -> Lập tức đưa về trang đăng nhập auth.html
 */
function requireAdmin() {
  const user = getCurrentUser();
  if (!user || user.role !== 'admin') {
    window.location.replace('auth.html?unauthorized=1');
    return false;
  }
  return true;
}

/**
 * Đồng bộ dữ liệu người dùng mới nhất từ Supabase Auth (cập nhật vai trò nếu được nâng cấp từ kho)
 */
async function syncCurrentUserProfile() {
  const session = getSupabaseSession();
  if (!session || !session.access_token) return;

  try {
    const config = getSupabaseAuthConfig();
    const res = await fetch(`${config.url}/auth/v1/user`, {
      headers: {
        'apikey': config.publishableKey,
        'Authorization': `Bearer ${session.access_token}`
      }
    });

    if (res.ok) {
      const latestUser = await res.json();
      const current = getCurrentUser();
      const latest = formatSessionUser(latestUser);

      // Nếu vai trò hoặc tên có sự thay đổi từ kho Supabase, cập nhật ngay phiên lưu trữ
      if (!current || current.role !== latest.role || current.name !== latest.name || current.avatar !== latest.avatar) {
        console.log('[Auth Sync] Đã cập nhật vai trò người dùng từ Supabase:', latest.role);
        const updatedSession = { ...session, user: latestUser };
        saveAuthSession(updatedSession);
        renderAuthHeader();
      }
    }
  } catch (e) {
    // Không chặn ứng dụng nếu mất kết nối mạng
  }
}

// Khởi chạy khi tài liệu sẵn sàng
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Hiển thị ngay trạng thái đăng nhập từ localStorage để giao diện mượt mà, không bị chớp giật
    renderAuthHeader();

    // 2. Chạy ngầm kiểm tra và làm mới token nếu cần
    refreshSupabaseSession();

    // 3. Đồng bộ vai trò người dùng mới nhất từ Supabase Auth
    syncCurrentUserProfile();
  });
}

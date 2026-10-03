/**
 * SUPABASE CLIENT & DATA SERVICE
 * Kết nối trực tiếp tới kho Supabase của ChocoRank (Project: ukwuzbacxinidphzhftr)
 * Tải sản phẩm, danh mục và quản lý đơn hàng từ Supabase REST API
 */

// Đọc cấu hình từ window.SUPABASE_CONFIG (được nạp từ js/supabase-config.js đã chặn trong .gitignore)
const SUPABASE_CONFIG = (typeof window !== 'undefined' && window.SUPABASE_CONFIG) ? window.SUPABASE_CONFIG : {
  url: '',
  publishableKey: ''
};

// Bộ nhớ đệm tạm thời trong phiên
let _supabaseProductsCache = null;
let _supabaseCategoriesCache = null;

/**
 * Tải toàn bộ danh sách sản phẩm từ kho Supabase
 * Chuyển đổi các cột từ snake_case của Postgres sang cấu trúc camelCase giao diện đang dùng
 */
async function loadProductsFromSupabase(forceRefresh = false) {
  if (_supabaseProductsCache && !forceRefresh) {
    return _supabaseProductsCache;
  }

  try {
    const config = getSupabaseConfig();
    if (!config || !config.url || !config.publishableKey) {
      throw new Error('Chưa cấu hình Supabase URL hoặc Publishable Key');
    }
    const headers = {
      'apikey': config.publishableKey,
      'Authorization': `Bearer ${config.publishableKey}`,
      'Content-Type': 'application/json'
    };

    // Thiết lập timeout 2.5 giây để tránh chặn giao diện người dùng nếu kết nối mạng chậm hoặc Supabase lỗi
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    // Tải đồng thời cả products và categories
    const [productsRes, categoriesRes] = await Promise.all([
      fetch(`${config.url}/rest/v1/products?select=*&order=rank_order.asc.nullslast`, { headers, signal: controller.signal }),
      fetch(`${config.url}/rest/v1/categories?select=*`, { headers, signal: controller.signal })
    ]);
    clearTimeout(timeoutId);

    if (!productsRes.ok) {
      throw new Error(`Lỗi tải sản phẩm từ Supabase: ${productsRes.status} ${productsRes.statusText}`);
    }

    const rawProducts = await productsRes.json();
    const rawCategories = categoriesRes.ok ? await categoriesRes.json() : [];

    // Tạo bản đồ tra cứu tên danh mục
    const categoryMap = new Map();
    rawCategories.forEach(cat => {
      categoryMap.set(cat.id, cat.name);
    });

    _supabaseCategoriesCache = rawCategories;

    // Chuyển đổi dữ liệu chuẩn cho giao diện
    const formattedProducts = rawProducts.map(row => {
      return {
        id: row.id,
        productType: row.product_type || (row.category_id && row.category_id.startsWith('candy') ? 'candy' : 'chocolate'),
        name: row.name,
        brand: row.brand,
        origin: row.origin || 'Nhập khẩu',
        category: row.category_id,
        categoryName: categoryMap.get(row.category_id) || row.category_id,
        cocoa: row.cocoa_percentage !== null && row.cocoa_percentage !== undefined ? Number(row.cocoa_percentage) : 0,
        price: Number(row.price),
        weight: row.weight || '',
        priceTier: row.price_tier || '',
        priceTierKey: row.price_tier_key || 'mid',
        image: row.image_url || 'assets/images/placeholder.jpg',
        badge: row.badge || '',
        badgeType: row.badge_type || '',
        rank: row.rank_order || 99,
        scores: row.scores || {
          overall: 9.0,
          taste: 9.0,
          value: 9.0,
          texture: 9.0,
          aroma: 9.0,
          bitterness: 50,
          sweetness: 50,
          meltRate: 80
        },
        reviewsCount: row.reviews_count || 0,
        tastingNotes: Array.isArray(row.tasting_notes) ? row.tasting_notes : [],
        description: row.description || '',
        pros: Array.isArray(row.pros) ? row.pros : [],
        cons: Array.isArray(row.cons) ? row.cons : [],
        pairing: Array.isArray(row.pairing) ? row.pairing : [],
        recommendedFor: row.recommended_for || '',
        isActive: row.is_active !== false
      };
    });

    _supabaseProductsCache = formattedProducts;

    // Gán vào biến toàn cục CHOCOLATE_DATA để toàn bộ các hàm lọc, tìm kiếm, giỏ hàng sử dụng mượt mà
    window.CHOCOLATE_DATA = formattedProducts;

    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('supabase:products-loaded', { detail: formattedProducts }));
    }

    return formattedProducts;
  } catch (error) {
    console.warn('[Supabase Warning] Không thể kết nối hoặc tải dữ liệu từ Supabase:', error.message || error);
    console.log('[Supabase Fallback] Đang kích hoạt dữ liệu socola & kẹo tích hợp sẵn.');

    // Fallback sang dữ liệu có sẵn từ js/data.js
    const fallback = (typeof CHOCOLATE_DATA !== 'undefined' && Array.isArray(CHOCOLATE_DATA) && CHOCOLATE_DATA.length > 0)
      ? CHOCOLATE_DATA
      : ((typeof window !== 'undefined' && Array.isArray(window.CHOCOLATE_DATA) && window.CHOCOLATE_DATA.length > 0) ? window.CHOCOLATE_DATA : []);

    _supabaseProductsCache = fallback;
    if (typeof window !== 'undefined') {
      window.CHOCOLATE_DATA = fallback;
    }
    return fallback;
  }
}

/**
 * Tải danh mục từ kho Supabase
 */
async function loadCategoriesFromSupabase() {
  if (_supabaseCategoriesCache) return _supabaseCategoriesCache;
  try {
    const config = getSupabaseConfig();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${config.url}/rest/v1/categories?select=*`, {
      headers: {
        'apikey': config.publishableKey,
        'Authorization': `Bearer ${config.publishableKey}`
      },
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (res.ok) {
      _supabaseCategoriesCache = await res.json();
      return _supabaseCategoriesCache;
    }
  } catch (e) {
    console.warn('[Supabase] Không thể tải danh mục, sử dụng mặc định:', e.message || e);
  }
  return [];
}

function getSupabaseConfig() {
  if (typeof window !== 'undefined' && window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.url) {
    return window.SUPABASE_CONFIG;
  }
  return {
    url: 'https://ukwuzbacxinidphzhftr.supabase.co',
    publishableKey: 'sb_publishable_vHK1gIdoebQ-4WwaIjeEmg_elX97-SK'
  };
}

/**
 * Tạo headers xác thực an toàn cho các truy vấn Supabase REST API
 * Tự động gắn Bearer access_token của phiên đăng nhập (RLS nhận diện vai trò user/admin)
 */
function getSupabaseAuthHeaders(options = {}) {
  const config = getSupabaseConfig();
  let token = config.publishableKey;

  // Lấy access_token của phiên đăng nhập hiện tại nếu có
  if (typeof getSupabaseSession === 'function') {
    const session = getSupabaseSession();
    if (session && session.access_token) {
      token = session.access_token;
    }
  } else if (typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem('chocorank_supabase_session');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.access_token) {
          token = parsed.access_token;
        }
      }
    } catch (e) {}
  }

  const headers = {
    'apikey': config.publishableKey,
    'Authorization': `Bearer ${token}`
  };

  if (options.json !== false) {
    headers['Content-Type'] = 'application/json';
  }
  if (options.prefer) {
    headers['Prefer'] = options.prefer;
  }
  return headers;
}

/**
 * Gửi đơn đặt hàng mới lưu vào bảng orders trên Supabase
 */
async function saveOrderToSupabase(orderData) {
  try {
    const config = getSupabaseConfig();
    const rawId = orderData.orderId || orderData.id || `CR-${Math.floor(10000 + Math.random() * 90000)}`;
    const cleanId = String(rawId).replace(/^#/, '').trim();

    // Lấy thông tin user hiện tại nếu đã đăng nhập
    let currentUserId = null;
    let currentUserEmail = null;
    try {
      let session = null;
      if (typeof getSupabaseSession === 'function') {
        session = getSupabaseSession();
      } else if (typeof localStorage !== 'undefined') {
        const raw = localStorage.getItem('chocorank_supabase_session');
        if (raw) session = JSON.parse(raw);
      }
      if (session && session.user) {
        currentUserId = session.user.id || null;
        currentUserEmail = session.user.email || null;
      }
    } catch (e) {}

    const customerName = (orderData.customer?.name || orderData.customerName || 'Khách Hàng Quý').trim();
    const customerPhone = (orderData.customer?.phone || orderData.customerPhone || '0901234567').trim() || '0901234567';
    const customerEmail = (orderData.customer?.email || orderData.customerEmail || currentUserEmail || '').trim() || null;
    const customerAddress = (orderData.customer?.address || orderData.customerAddress || 'Chưa cung cấp địa chỉ').trim();
    const customerNote = (orderData.customer?.note || orderData.customerNote || '').trim() || null;
    const paymentMethod = orderData.paymentMethod || orderData.payment_method || 'COD (Tiền mặt khi nhận)';
    const items = Array.isArray(orderData.items) ? orderData.items : [];
    const subtotal = Number(orderData.subtotal) || 0;
    const discount = Number(orderData.discount) || 0;
    const grandTotal = Number(orderData.grandTotal || orderData.grand_total) || 0;
    const status = orderData.status || 'Chờ giao hàng';

    const payload = {
      id: cleanId,
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_email: customerEmail,
      customer_address: customerAddress,
      customer_note: customerNote,
      payment_method: paymentMethod,
      items: items,
      subtotal: subtotal,
      discount: discount,
      grand_total: grandTotal,
      status: status
    };
    if (currentUserId) {
      payload.user_id = currentUserId;
    }

    const authHeaders = getSupabaseAuthHeaders({ prefer: 'resolution=merge-duplicates,return=representation' });

    // 1. Gửi trực tiếp lên kho Supabase REST API
    try {
      const res = await fetch(`${config.url}/rest/v1/orders`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const insertedRows = await res.json();
        console.log('[Supabase Order] ✅ Đã lưu đơn hàng thành công vào bảng orders trên Supabase:', cleanId, insertedRows);
        return { success: true, orderId: cleanId, data: insertedRows ? insertedRows[0] : payload };
      }

      const errText = await res.text();
      console.warn('[Supabase Order REST Error]:', res.status, errText);
    } catch (directErr) {
      console.warn('[Supabase Order Direct Fetch Failed]:', directErr);
    }

    // 2. Dự phòng: Nếu kết nối trực tiếp gặp lỗi mạng/CORS, gửi qua endpoint proxy nội bộ /api/orders
    try {
      const proxyRes = await fetch('/api/orders', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(payload)
      });
      if (proxyRes.ok) {
        const proxyData = await proxyRes.json();
        console.log('[Supabase Order Proxy] ✅ Đã lưu qua server proxy vào Supabase:', cleanId, proxyData);
        return { success: true, orderId: cleanId, data: proxyData };
      }
    } catch (proxyErr) {
      console.warn('[Supabase Order Proxy Failed]:', proxyErr);
    }

    return { success: false, error: 'Không thể kết nối lưu đơn hàng vào kho Supabase' };
  } catch (error) {
    console.error('[Supabase Order Error]:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Tải danh sách đơn hàng từ kho Supabase (cho trang Quản trị viên)
 */
async function loadOrdersFromSupabase() {
  try {
    const config = getSupabaseConfig();
    const headers = getSupabaseAuthHeaders({ json: false });
    const res = await fetch(`${config.url}/rest/v1/orders?select=*&order=created_at.desc`, {
      headers: headers
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const rows = await res.json();
    return rows.map(r => ({
      orderId: r.id,
      date: new Date(r.created_at).toLocaleString('vi-VN'),
      customer: {
        name: r.customer_name,
        phone: r.customer_phone,
        email: r.customer_email,
        address: r.customer_address,
        note: r.customer_note
      },
      paymentMethod: r.payment_method,
      items: r.items || [],
      subtotal: Number(r.subtotal),
      discount: Number(r.discount),
      grandTotal: Number(r.grand_total),
      status: r.status
    }));
  } catch (err) {
    console.error('[Supabase] Lỗi khi tải danh sách đơn hàng:', err);
    return [];
  }
}

/**
 * Cập nhật trạng thái đơn hàng trên kho Supabase (Quản trị viên)
 */
async function updateOrderStatusInSupabase(orderId, newStatus) {
  try {
    const config = getSupabaseConfig();
    const cleanId = String(orderId).trim();
    const authHeaders = getSupabaseAuthHeaders({ prefer: 'return=representation' });

    // 1. Cập nhật trực tiếp lên Supabase REST API
    try {
      const res = await fetch(`${config.url}/rest/v1/orders?id=eq.${encodeURIComponent(cleanId)}`, {
        method: 'PATCH',
        headers: authHeaders,
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        const rows = await res.json();
        console.log('[Supabase Order] ✅ Đã cập nhật trạng thái đơn hàng thành công:', cleanId, newStatus);
        return { success: true, data: rows ? rows[0] : null };
      }
      const errText = await res.text();
      console.warn('[Supabase Order PATCH Direct Error]:', errText);
    } catch (errDirect) {
      console.warn('[Supabase Order Direct Exception]:', errDirect);
    }

    // 2. Dự phòng qua proxy server nội bộ nếu direct fetch bị chặn
    try {
      const proxyRes = await fetch('/api/orders', {
        method: 'PATCH',
        headers: authHeaders,
        body: JSON.stringify({ orderId: cleanId, status: newStatus })
      });
      if (proxyRes.ok) {
        console.log('[Supabase Order Proxy] ✅ Đã cập nhật trạng thái đơn qua proxy:', cleanId, newStatus);
        return { success: true };
      }
    } catch (proxyErr) {
      console.warn('[Supabase Order Proxy Exception]:', proxyErr);
    }

    return { success: false, error: 'Không thể cập nhật trạng thái đơn hàng lên kho Supabase' };
  } catch (error) {
    console.error('[Supabase Order Update Exception]:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Thêm sản phẩm mới lên Supabase
 */
async function addProductToSupabase(prod) {
  try {
    const config = getSupabaseConfig();
    const productType = prod.type || prod.productType || 'chocolate';
    const categoryId = prod.category_id || prod.category || (productType === 'candy' ? 'candy-gummy' : 'dark');

    const payload = {
      id: prod.id || ('prod-' + Date.now()),
      product_type: productType,
      name: prod.name,
      brand: prod.brand || 'Thủ Công',
      origin: prod.origin || 'Việt Nam',
      category_id: categoryId,
      cocoa_percentage: prod.cocoaPercentage !== undefined ? Number(prod.cocoaPercentage) : (productType === 'chocolate' ? 70 : 0),
      price: typeof prod.price === 'number' ? prod.price : parseInt(String(prod.priceFormatted || prod.price || '150000').replace(/[^0-9]/g, ''), 10) || 150000,
      image_url: prod.image || 'assets/images/dark_chocolate.jpg',
      rank_order: prod.rank || 99,
      scores: typeof prod.scores === 'object' ? prod.scores : { overall: prod.score || 9.5 }
    };

    const headers = getSupabaseAuthHeaders({ prefer: 'return=representation' });
    const res = await fetch(`${config.url}/rest/v1/products`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('[Supabase Add Product Error]:', errText);
      return { success: false, error: errText };
    }

    const inserted = await res.json();
    _supabaseProductsCache = null; // Invalidate cache
    return { success: true, data: inserted[0] };
  } catch (error) {
    console.error('[Supabase Add Product Exception]:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Cập nhật thông tin sản phẩm trên Supabase
 */
async function updateProductInSupabase(id, updates) {
  try {
    const config = getSupabaseConfig();
    const payload = {};

    if (updates.name !== undefined) payload.name = updates.name;
    if (updates.brand !== undefined) payload.brand = updates.brand;
    if (updates.origin !== undefined) payload.origin = updates.origin;
    if (updates.product_type !== undefined || updates.type !== undefined) {
      payload.product_type = updates.product_type || updates.type;
    }
    if (updates.cocoa_percentage !== undefined || updates.cocoaPercentage !== undefined) {
      payload.cocoa_percentage = Number(updates.cocoa_percentage ?? updates.cocoaPercentage);
    }
    if (updates.price !== undefined || updates.priceFormatted !== undefined) {
      payload.price = typeof updates.price === 'number'
        ? updates.price
        : parseInt(String(updates.priceFormatted || updates.price).replace(/[^0-9]/g, ''), 10);
    }
    if (updates.image_url !== undefined || updates.image !== undefined) {
      payload.image_url = updates.image_url || updates.image;
    }
    if (updates.scores !== undefined) payload.scores = updates.scores;
    else if (updates.score !== undefined) payload.scores = { overall: Number(updates.score) };

    const headers = getSupabaseAuthHeaders({ prefer: 'return=representation' });
    const res = await fetch(`${config.url}/rest/v1/products?id=eq.${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('[Supabase Update Product Error]:', errText);
      return { success: false, error: errText };
    }

    _supabaseProductsCache = null; // Invalidate cache
    return { success: true };
  } catch (error) {
    console.error('[Supabase Update Product Exception]:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Xóa sản phẩm khỏi Supabase
 */
async function deleteProductFromSupabase(id) {
  try {
    const config = getSupabaseConfig();
    const headers = getSupabaseAuthHeaders({ json: false });
    const res = await fetch(`${config.url}/rest/v1/products?id=eq.${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: headers
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('[Supabase Delete Product Error]:', errText);
      return { success: false, error: errText };
    }

    _supabaseProductsCache = null; // Invalidate cache
    return { success: true };
  } catch (error) {
    console.error('[Supabase Delete Product Exception]:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Tải danh sách người dùng từ Supabase profiles
 */
async function loadProfilesFromSupabase() {
  try {
    const config = getSupabaseConfig();
    const headers = getSupabaseAuthHeaders({ json: false });
    const res = await fetch(`${config.url}/rest/v1/profiles?select=*&order=created_at.asc`, {
      headers: headers
    });
    if (!res.ok) return null;
    const rows = await res.json();
    return rows.map(r => ({
      id: r.id,
      name: r.name,
      email: r.email,
      role: r.role,
      avatar: r.avatar || '🍫',
      title: r.title,
      joinedDate: r.joined_date,
      status: r.status
    }));
  } catch (e) {
    console.warn('[Supabase Profiles] Không thể tải danh sách tài khoản:', e);
    return null;
  }
}

/**
 * Lưu người dùng mới vào Supabase profiles
 */
async function saveProfileToSupabase(profile) {
  try {
    const config = getSupabaseConfig();
    const payload = {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      role: profile.role,
      avatar: profile.avatar || '🍫',
      title: profile.title,
      joined_date: profile.joinedDate,
      status: profile.status || 'active'
    };
    const headers = getSupabaseAuthHeaders({ prefer: 'return=representation' });
    const res = await fetch(`${config.url}/rest/v1/profiles`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });
    return { success: res.ok };
  } catch (e) {
    console.warn('[Supabase Profiles] Lỗi lưu tài khoản:', e);
    return { success: false, error: e.message };
  }
}

// Khởi tạo sẵn biến toàn cục CHOCOLATE_DATA
if (typeof window !== 'undefined') {
  window.CHOCOLATE_DATA = window.CHOCOLATE_DATA || [];
}

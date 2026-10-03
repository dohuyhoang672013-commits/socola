/**
 * ChocoRank - Shopping Cart & Order Manager
 * Quản lý giỏ hàng và đặt hàng giả lập (localStorage)
 */

const CART_STORAGE_KEY = 'chocorank_cart';
const ORDERS_STORAGE_KEY = 'chocorank_orders';

// Lấy danh sách sản phẩm trong giỏ
function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

// Lưu giỏ hàng
function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  updateCartNavBadge();
}

// Thêm sản phẩm vào giỏ hàng (Hỗ trợ cả khách vãng lai và thành viên đăng nhập)
function addToCart(productId, quantity = 1, redirectCheckout = false, allowGuest = true) {
  const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;

  // Nếu bắt buộc đăng nhập mà chưa có tài khoản
  if (!currentUser && !allowGuest) {
    openAuthRequiredModal('Đặt Mua Sản Phẩm');
    if (typeof showToast === 'function') {
      showToast('Vui lòng đăng nhập hoặc tạo tài khoản để có thể đặt mua sản phẩm!', 'warning');
    }
    return { success: false, reason: 'auth_required' };
  }

  // Tìm thông tin sản phẩm trong dữ liệu
  const product = (typeof window !== 'undefined' && Array.isArray(window.CHOCOLATE_DATA))
    ? window.CHOCOLATE_DATA.find(p => p.id === productId)
    : (typeof CHOCOLATE_DATA !== 'undefined' ? CHOCOLATE_DATA.find(p => p.id === productId) : null);

  if (!product) {
    return { success: false, reason: 'product_not_found' };
  }

  const cart = getCart();
  const existingIndex = cart.findIndex(item => item.id === productId);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      brand: product.brand,
      origin: product.origin || 'Nhập khẩu',
      productType: product.productType || (product.type === 'candy' ? 'candy' : 'chocolate'),
      quantity: quantity
    });
  }

  saveCart(cart);

  if (redirectCheckout) {
    window.location.href = 'checkout.html';
    return { success: true };
  }

  if (typeof showToast === 'function') {
    showToast(`Đã thêm "${product.name}" vào giỏ hàng! 🛒`, 'success');
  }

  return { success: true, cart };
}

// Xóa 1 món khỏi giỏ hàng
function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  return cart;
}

// Cập nhật số lượng món trong giỏ
function updateCartQuantity(productId, quantity) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity = Math.max(1, quantity);
    saveCart(cart);
  }
  return cart;
}

// Làm trống toàn bộ giỏ hàng
function clearCart() {
  localStorage.removeItem(CART_STORAGE_KEY);
  updateCartNavBadge();
}

// Lấy tổng số lượng món trong giỏ
function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.quantity || 1), 0);
}

// Tính toán tóm tắt chi phí đơn hàng
function getCartSummary() {
  const cart = getCart();
  const subtotal = cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  
  // Ưu đãi thành viên VIP: Giảm 10%
  const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
  const discountRate = currentUser ? 0.10 : 0;
  const discountAmount = Math.round(subtotal * discountRate);
  
  // Phí đóng gói bảo quản nhiệt độ và giao hỏa tốc: Miễn phí cho thành viên
  const shippingFee = subtotal > 0 ? 0 : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  return {
    items: cart,
    itemCount: getCartCount(),
    subtotal: subtotal,
    discountRate: discountRate,
    discountAmount: discountAmount,
    shippingFee: shippingFee,
    grandTotal: grandTotal,
    hasDiscount: discountAmount > 0
  };
}

// Lưu đơn hàng vào kho Supabase và lưu bản sao phòng ngừa vào localStorage
function saveOrder(orderData, syncSupabase = true) {
  try {
    const existingRaw = localStorage.getItem(ORDERS_STORAGE_KEY);
    const orders = existingRaw ? JSON.parse(existingRaw) : [];
    const orderId = orderData.orderId || orderData.id;
    const idx = orders.findIndex(o => (o.orderId || o.id) === orderId);
    if (idx > -1) {
      orders[idx] = orderData;
    } else {
      orders.unshift(orderData);
    }
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));

    // Đồng bộ trực tiếp lên kho Supabase (bảng orders) nếu được yêu cầu
    if (syncSupabase && typeof saveOrderToSupabase === 'function') {
      saveOrderToSupabase(orderData).catch(err => {
        console.warn('Lỗi lưu đơn hàng vào Supabase:', err);
      });
    }

    return true;
  } catch (e) {
    console.error('Lỗi khi lưu đơn hàng:', e);
    return false;
  }
}

// Cập nhật số lượng trên huy hiệu giỏ hàng ở thanh điều hướng
function updateCartNavBadge() {
  const badge = document.getElementById('cartCountBadge');
  if (badge) {
    const count = getCartCount();
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-flex' : 'none';
  }
}

// Mở modal yêu cầu tài khoản
function openAuthRequiredModal(actionMessage) {
  const modal = document.getElementById('authRequiredModal');
  if (modal) {
    modal.classList.add('active');
  } else {
    // Nếu trang hiện tại không có modal thì chuyển hướng tới auth.html
    window.location.href = 'auth.html?reason=auth_required';
  }
}

// Tự động cập nhật badge khi tải trang
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    updateCartNavBadge();
  });
}

/**
 * CHOCOLUXE APPLICATION LOGIC
 * Quản lý trạng thái, bộ lọc, tìm kiếm, so sánh, trắc nghiệm và giao diện
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // APP STATE
  // =========================================================================
  const state = {
    searchQuery: '',
    productType: 'chocolate', // 'chocolate' | 'candy' | 'all'
    categoryFilter: 'all',
    cocoaFilter: 'all',
    priceFilter: 'all',
    sortMode: 'rating',
    wishlist: JSON.parse(localStorage.getItem('choco_wishlist') || '[]'),
    compareList: [],
    showOnlyWishlist: false,
    quizType: 'chocolate', // 'chocolate' | 'candy'
    quizStep: 0,
    quizAnswers: [],
    eatingStyleFilter: 'all'
  };

  // DOM ELEMENTS CACHE
  const elements = {
    chocolateGrid: document.getElementById('chocolateGrid'),
    resultsCount: document.getElementById('resultsCount'),
    searchInput: document.getElementById('searchInput'),
    clearSearchBtn: document.getElementById('clearSearchBtn'),
    sortSelect: document.getElementById('sortSelect'),
    cocoaFilterSelect: document.getElementById('cocoaFilterSelect'),
    priceFilterSelect: document.getElementById('priceFilterSelect'),
    categoryPillsContainer: document.getElementById('categoryPillsContainer'),
    resetFiltersBtn: document.getElementById('resetFiltersBtn'),
    
    // Creative Eating Styles & Pairings
    eatingStylesGrid: document.getElementById('eatingStylesGrid'),
    stylesFilterTabs: document.getElementById('stylesFilterTabs'),
    randomEatingStyleBtn: document.getElementById('randomEatingStyleBtn'),
    
    // Authenticity Guide & Tests
    authGuideTabs: document.getElementById('authGuideTabs'),
    authPanelChocolate: document.getElementById('authPanelChocolate'),
    authPanelCandy: document.getElementById('authPanelCandy'),
    casesAccordion: document.getElementById('casesAccordion'),
    
    // Mode Switch & Headers
    rankingModeSwitch: document.getElementById('rankingModeSwitch'),
    candyAuthAlertBanner: document.getElementById('candyAuthAlertBanner'),
    rankingSectionBadge: document.getElementById('rankingSectionBadge'),
    rankingSectionTitle: document.getElementById('rankingSectionTitle'),
    rankingSectionSubtitle: document.getElementById('rankingSectionSubtitle'),
    navCandiesLink: document.getElementById('navCandiesLink'),
    
    // Quiz Triggers & Modal Elements
    startQuizBtn: document.getElementById('startQuizBtn'),
    startQuizHeroBtn: document.getElementById('startQuizHeroBtn'),
    startCandyQuizBtn: document.getElementById('startCandyQuizBtn'),
    startCandyQuizHeroBtn: document.getElementById('startCandyQuizHeroBtn'),
    modalQuizTabs: document.getElementById('modalQuizTabs'),
    quizModal: document.getElementById('quizModal'),
    quizQuestionContainer: document.getElementById('quizQuestionContainer'),
    
    // Header & Actions
    wishlistCountBadge: document.getElementById('wishlistCountBadge'),
    wishlistBtn: document.getElementById('wishlistBtn'),
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    navBuyGuideBtn: document.getElementById('navBuyGuideBtn'),
    buyGuideModal: document.getElementById('buyGuideModal'),
    
    // Comparison Tray & Modal
    comparisonTray: document.getElementById('comparisonTray'),
    trayCount: document.getElementById('trayCount'),
    trayThumbs: document.getElementById('trayThumbs'),
    openCompareBtn: document.getElementById('openCompareBtn'),
    clearCompareBtn: document.getElementById('clearCompareBtn'),
    compareModal: document.getElementById('compareModal'),
    compareTableContainer: document.getElementById('compareTableContainer'),
    
    // Product Detail Modal
    detailModal: document.getElementById('detailModal'),
    detailModalContent: document.getElementById('detailModalContent'),
    
    // Quiz Modal
    startQuizBtn: document.getElementById('startQuizBtn'),
    startQuizHeroBtn: document.getElementById('startQuizHeroBtn'),
    quizModal: document.getElementById('quizModal'),
    quizQuestionContainer: document.getElementById('quizQuestionContainer'),
    
    // Toast Container
    toastContainer: document.getElementById('toastContainer'),
    
    // Statistics Container
    statsCategoryBars: document.getElementById('statsCategoryBars'),
    statsCocoaBars: document.getElementById('statsCocoaBars'),
    statsOriginList: document.getElementById('statsOriginList')
  };

  // =========================================================================
  // INITIALIZATION & SUPABASE INTEGRATION
  // =========================================================================
  async function init() {
    // 1. Gắn sự kiện giao diện và giỏ hàng trước
    bindEvents();
    updateWishlistBadge();

    // 2. Hiển thị loading skeleton mượt mà trong khi nạp dữ liệu từ kho Supabase
    if (elements.chocolateGrid) {
      elements.chocolateGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 70px 20px;">
          <div style="display: inline-block; width: 44px; height: 44px; border: 3px solid rgba(212,175,55,0.25); border-top-color: var(--gold-light); border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
          <p style="margin-top: 18px; color: var(--gold-light); font-weight: 700; font-size: 1.05rem;">
            Đang kết nối & tải dữ liệu sản phẩm từ kho Supabase...
          </p>
          <span style="font-size: 0.85rem; color: var(--text-muted);">
            Đồng bộ danh mục và các món đang bán thời gian thực
          </span>
        </div>
      `;
    }

    // 3. Tải dữ liệu động từ kho Supabase (forceRefresh: true để luôn lấy dữ liệu mới nhất)
    if (typeof loadProductsFromSupabase === 'function') {
      try {
        await loadProductsFromSupabase(true);
      } catch (err) {
        console.error('[App] Lỗi kết nối kho Supabase:', err);
      }
    }

    // 4. Render các thành phần giao diện với dữ liệu trực tuyến từ Supabase
    renderHeroHighlight();
    renderStatistics();
    renderCategoryPills();
    renderChocolates();
    renderEatingStyles();
    renderAuthenticityCases();
  }

  function renderHeroHighlight() {
    if (!CHOCOLATE_DATA || CHOCOLATE_DATA.length === 0) return;
    const topItem = CHOCOLATE_DATA.find(i => i.rank === 1 && i.productType === 'chocolate') || CHOCOLATE_DATA[0];
    if (!topItem) return;

    const heroCard = document.querySelector('.hero-card');
    if (heroCard) {
      const img = heroCard.querySelector('.hero-card-img');
      const badge = heroCard.querySelector('.hero-card-badge');
      const title = heroCard.querySelector('.hero-card-content h3');
      const desc = heroCard.querySelector('.hero-card-content p');
      const price = heroCard.querySelector('.hero-card-price');
      const score = heroCard.querySelector('.hero-card-footer span[style*="font-size: 1.4rem"]');

      if (img) { img.src = topItem.image; img.alt = topItem.name; }
      if (badge && topItem.badge) badge.textContent = topItem.badge;
      if (title) title.textContent = topItem.name;
      if (desc && topItem.description) desc.textContent = topItem.description.slice(0, 110) + '...';
      if (price) price.textContent = formatCurrency(topItem.price);
      if (score && topItem.scores?.overall) score.textContent = `★ ${topItem.scores.overall} / 10`;
    }

    const chocoCount = CHOCOLATE_DATA.filter(p => p.productType === 'chocolate').length;
    const statItem = document.querySelector('.hero-stats .stat-item .stat-number');
    if (statItem && chocoCount > 0) {
      statItem.textContent = `${chocoCount}+`;
    }
  }

  // =========================================================================
  // DYNAMIC CATEGORY PILLS
  // =========================================================================
  function renderCategoryPills() {
    if (!elements.categoryPillsContainer) return;

    const allData = CHOCOLATE_DATA || [];
    const chocoTotal = allData.filter(p => p.productType === 'chocolate').length;
    const candyTotal = allData.filter(p => p.productType === 'candy').length;
    const allTotal = allData.length;

    let pills = [];
    if (state.productType === 'chocolate') {
      pills = [
        { id: 'all', label: `Tất Cả Socola (${chocoTotal})` },
        { id: 'dark', label: 'Socola Đen Thượng Hạng' },
        { id: 'nama', label: 'Socola Tươi (Nama)' },
        { id: 'artisanal', label: 'Socola Nghệ Nhân (Bean-to-Bar)' },
        { id: 'praline', label: 'Hạt Phỉ & Praline' },
        { id: 'milk', label: 'Socola Sữa & Caramel' },
        { id: 'white', label: 'Socola Trắng & Matcha' }
      ];
    } else if (state.productType === 'candy') {
      pills = [
        { id: 'all', label: `Tất Cả Kẹo (${candyTotal})` },
        { id: 'candy-gummy', label: 'Kẹo Dẻo & Kẹo Mềm (Gummy)' },
        { id: 'candy-caramel', label: 'Kẹo Bơ & Toffee Caramel' },
        { id: 'candy-herbal', label: 'Kẹo Thảo Dược & Ngậm' },
        { id: 'candy-fruit', label: 'Kẹo Trái Cây Thủy Tinh' },
        { id: 'candy-nut', label: 'Kẹo Hạt Giòn Bọc Đường' },
        { id: 'candy-traditional', label: 'Kẹo Dân Gian (Dừa, Cu Đơ)' }
      ];
    } else {
      pills = [
        { id: 'all', label: `Tất Cả (${allTotal} Món)` },
        { id: 'dark', label: 'Socola Đen' },
        { id: 'nama', label: 'Socola Tươi (Nama)' },
        { id: 'praline', label: 'Praline & Hạt Phỉ' },
        { id: 'candy-gummy', label: 'Kẹo Dẻo Trái Cây' },
        { id: 'candy-caramel', label: 'Kẹo Bơ Caramel' },
        { id: 'candy-herbal', label: 'Kẹo Thảo Dược' },
        { id: 'candy-traditional', label: 'Kẹo Dân Gian' }
      ];
    }

    elements.categoryPillsContainer.innerHTML = pills.map(p => `
      <button class="pill-btn ${state.categoryFilter === p.id ? 'active' : ''}" data-category="${p.id}" role="tab">
        ${p.label}
      </button>
    `).join('');

    elements.categoryPillsContainer.querySelectorAll('.pill-btn').forEach(pill => {
      pill.addEventListener('click', () => {
        elements.categoryPillsContainer.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
        pill.classList.add('active');
        state.categoryFilter = pill.dataset.category;
        state.showOnlyWishlist = false;
        renderChocolates();
      });
    });
  }

  function setRankingMode(mode) {
    state.productType = mode;
    state.categoryFilter = 'all';

    // Update switcher buttons active state
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    // Toggle candy authenticity alert banner
    if (elements.candyAuthAlertBanner) {
      elements.candyAuthAlertBanner.style.display = (mode === 'candy') ? 'flex' : 'none';
    }

    // Update Section Header text
    if (elements.rankingSectionTitle) {
      if (mode === 'candy') {
        if (elements.rankingSectionBadge) elements.rankingSectionBadge.textContent = 'BẢNG XẾP HẠNG KẸO ĐỈNH CAO';
        elements.rankingSectionTitle.textContent = 'Top Những Loại Kẹo Ngon Nhất & Đáng Mua Nhất';
        if (elements.rankingSectionSubtitle) elements.rankingSectionSubtitle.textContent = 'Tuyển chọn 8 loại kẹo huyền thoại thế giới và đặc sản Việt Nam: Kẹo dẻo Haribo, kẹo bơ Werther, kẹo ngậm Ricola, kẹo dừa sáp Bến Tre, kẹo Cu Đơ...';
      } else if (mode === 'chocolate') {
        if (elements.rankingSectionBadge) elements.rankingSectionBadge.textContent = 'BẢNG XẾP HẠNG SOCOLA TOÀN DIỆN';
        elements.rankingSectionTitle.textContent = 'Danh Sách Socola Ngon Nhất & Đáng Mua Nhất';
        if (elements.rankingSectionSubtitle) elements.rankingSectionSubtitle.textContent = 'Được xếp hạng chi tiết theo thang điểm 10 đa chiều: Độ đắng, độ ngọt, độ mịn tan chảy, hương thơm và tỉ lệ giá trị.';
      } else {
        if (elements.rankingSectionBadge) elements.rankingSectionBadge.textContent = 'BẢNG XẾP HẠNG TOÀN DIỆN';
        elements.rankingSectionTitle.textContent = 'Bảng Xếp Hạng Socola & Kẹo Ngon Hàng Đầu';
        if (elements.rankingSectionSubtitle) elements.rankingSectionSubtitle.textContent = 'Tổng hợp 20 dòng socola và kẹo ngon nhất được người tiêu dùng và chuyên gia ẩm thực bình chọn.';
      }
    }

    renderCategoryPills();
    renderChocolates();

    if (mode === 'candy') {
      showToast('Đã chọn xem Bảng xếp hạng Những Loại Kẹo Ngon Nhất! 🍬');
    } else if (mode === 'chocolate') {
      showToast('Đã chọn xem Bảng xếp hạng Socola Thượng Hạng! 🍫');
    } else {
      showToast('Đang hiển thị toàn bộ 20 loại socola và kẹo ngon nhất! ✨');
    }
  }

  // =========================================================================
  // RENDER STATISTICS
  // =========================================================================
  function renderStatistics() {
    // 1. Category Distribution
    if (elements.statsCategoryBars) {
      elements.statsCategoryBars.innerHTML = STATS_DATA.categoryDistribution.map(item => `
        <div class="progress-item">
          <div class="progress-info">
            <span>${item.label}</span>
            <strong>${item.percentage}%</strong>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${item.percentage}%; background: ${item.color};"></div>
          </div>
        </div>
      `).join('');
    }

    // 2. Cocoa Distribution
    if (elements.statsCocoaBars) {
      elements.statsCocoaBars.innerHTML = STATS_DATA.cocoaDistribution.map(item => `
        <div class="progress-item">
          <div class="progress-info">
            <span>${item.range}</span>
            <strong>${item.percentage}%</strong>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${item.percentage}%;"></div>
          </div>
        </div>
      `).join('');
    }

    // 3. Origin Rankings
    if (elements.statsOriginList) {
      elements.statsOriginList.innerHTML = STATS_DATA.originRankings.map((item, index) => `
        <div class="progress-item">
          <div class="progress-info">
            <span><strong>#${index + 1}</strong> ${item.country}</span>
            <span class="text-gold">★ ${item.score}/100</span>
          </div>
          <p style="font-size: 0.76rem; color: var(--text-dim); margin-top: -2px;">${item.note}</p>
        </div>
      `).join('');
    }
  }

  // =========================================================================
  // FILTERING & SORTING LOGIC
  // =========================================================================
  function getFilteredChocolates() {
    const dataSource = (typeof window !== 'undefined' && Array.isArray(window.CHOCOLATE_DATA) && window.CHOCOLATE_DATA.length > 0)
      ? window.CHOCOLATE_DATA
      : (typeof CHOCOLATE_DATA !== 'undefined' && Array.isArray(CHOCOLATE_DATA) ? CHOCOLATE_DATA : []);
    let list = [...dataSource];

    // Wishlist filter
    if (state.showOnlyWishlist) {
      list = list.filter(item => state.wishlist.includes(item.id));
    }

    // Search Query
    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase().trim();
      list = list.filter(item => 
        item.name.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.origin.toLowerCase().includes(q) ||
        item.tastingNotes.some(note => note.toLowerCase().includes(q)) ||
        item.categoryName.toLowerCase().includes(q)
      );
    }

    // Product Type Filter (chocolate | candy | all)
    if (state.productType !== 'all') {
      list = list.filter(item => item.productType === state.productType);
    }

    // Category Filter
    if (state.categoryFilter !== 'all') {
      list = list.filter(item => item.category === state.categoryFilter);
    }

    // Cocoa % Filter
    if (state.cocoaFilter !== 'all') {
      if (state.cocoaFilter === 'under50') list = list.filter(i => i.cocoa < 50);
      else if (state.cocoaFilter === '50to70') list = list.filter(i => i.cocoa >= 50 && i.cocoa <= 70);
      else if (state.cocoaFilter === '70to85') list = list.filter(i => i.cocoa > 70 && i.cocoa <= 85);
      else if (state.cocoaFilter === 'above85') list = list.filter(i => i.cocoa > 85);
    }

    // Price Tier Filter
    if (state.priceFilter !== 'all') {
      list = list.filter(i => i.priceTierKey === state.priceFilter);
    }

    // Sorting
    list.sort((a, b) => {
      switch (state.sortMode) {
        case 'rating':
          return b.scores.overall - a.scores.overall;
        case 'value':
          return b.scores.value - a.scores.value;
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'cocoa-desc':
          return b.cocoa - a.cocoa;
        default:
          return a.rank - b.rank;
      }
    });

    return list;
  }

  // =========================================================================
  // RENDER CHOCOLATE CARDS
  // =========================================================================
  function renderChocolates() {
    const list = getFilteredChocolates();

    if (elements.resultsCount) {
      let typeText = 'loại socola & kẹo';
      if (state.productType === 'candy') typeText = 'loại kẹo ngon nhất';
      else if (state.productType === 'chocolate') typeText = 'loại socola thượng hạng';
      elements.resultsCount.innerHTML = `Hiển thị <strong>${list.length}</strong> ${typeText} được bình chọn hàng đầu`;
    }

    if (!elements.chocolateGrid) return;

    if (list.length === 0) {
      const emptyIcon = state.productType === 'candy' ? '🍬🔍' : (state.productType === 'chocolate' ? '🍫🔍' : '✨🔍');
      const emptyText = state.productType === 'candy' ? 'Không tìm thấy loại kẹo phù hợp' : (state.productType === 'chocolate' ? 'Không tìm thấy loại socola phù hợp' : 'Không tìm thấy sản phẩm nào phù hợp');
      elements.chocolateGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: var(--bg-surface); border-radius: var(--radius-lg); border: 1px dashed var(--bg-glass-border);">
          <div style="font-size: 3rem; margin-bottom: 12px;">${emptyIcon}</div>
          <h3 style="font-size: 1.4rem; margin-bottom: 8px;">${emptyText}</h3>
          <p style="color: var(--text-muted); margin-bottom: 20px;">Vui lòng thử tìm với từ khóa khác hoặc đặt lại bộ lọc tìm kiếm.</p>
          <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
            <button id="resetEmptyBtn" class="btn-primary" style="cursor: pointer;">↺ Đặt Lại Bộ Lọc</button>
            <button id="showAllEmptyBtn" class="btn-secondary" style="cursor: pointer; border: 1px solid var(--gold-light); color: var(--gold-light); background: rgba(212,175,55,0.1); padding: 10px 18px; border-radius: var(--radius-sm); font-weight: 600;">✨ Hiển Thị Tất Cả (Socola & Kẹo)</button>
          </div>
        </div>
      `;
      document.getElementById('resetEmptyBtn')?.addEventListener('click', resetFilters);
      document.getElementById('showAllEmptyBtn')?.addEventListener('click', () => {
        setRankingMode('all');
        resetFilters();
      });
      return;
    }

    const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;

    elements.chocolateGrid.innerHTML = list.map((item, index) => {
      const isFav = state.wishlist.includes(item.id);
      const isCompared = state.compareList.includes(item.id);
      
      // Determine rank styling
      let rankClass = 'rank-normal';
      if (item.rank === 1) rankClass = 'rank-1';
      else if (item.rank === 2) rankClass = 'rank-2';
      else if (item.rank === 3) rankClass = 'rank-3';

      const isCandy = item.productType === 'candy';

      return `
        <article class="choco-card" data-id="${item.id}">
          <div class="card-rank ${rankClass}">#${item.rank}</div>
          
          <button class="card-fav-btn ${isFav ? 'active' : ''}" data-action="fav" data-id="${item.id}" title="${isFav ? 'Bỏ yêu thích' : 'Lưu vào yêu thích'}">
            ${isFav ? '❤️' : '🤍'}
          </button>

          <div class="card-image-wrap">
            <img class="card-image" src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.onerror=null; this.src='assets/images/placeholder.jpg';">
            <div class="card-badge">${item.badge}</div>
          </div>

          <div class="card-body">
            <div class="card-meta">
              <span class="origin-badge">${item.origin}</span>
              ${isCandy ? 
                `<span class="cocoa-badge candy-badge-feature">🍬 ${item.candyFeature || 'Kẹo Cao Cấp'}</span>` : 
                `<span class="cocoa-badge">${item.cocoa}% Cacao</span>`
              }
            </div>

            <h3 class="card-title">${item.name}</h3>
            <p class="card-brand">${item.brand}</p>

            <div class="card-score-row">
              <div class="overall-score">
                <span class="score-number">${item.scores.overall.toFixed(1)}</span>
                <span class="score-max">/10</span>
              </div>
              <div class="score-rating-text">★ Đáng Mua: ${item.scores.value}/10</div>
            </div>

            <div class="flavor-mini-bars">
              ${isCandy ? `
                <div class="flavor-mini-bar">
                  <div class="flavor-label">
                    <span>Độ Giòn / Dẻo</span>
                    <strong>${Math.round(item.scores.texture * 10)}%</strong>
                  </div>
                  <div class="flavor-track">
                    <div class="flavor-fill" style="width: ${Math.round(item.scores.texture * 10)}%; background: linear-gradient(90deg, #ec4899, #f43f5e);"></div>
                  </div>
                </div>
              ` : `
                <div class="flavor-mini-bar">
                  <div class="flavor-label">
                    <span>Độ Đắng</span>
                    <strong>${item.scores.bitterness}%</strong>
                  </div>
                  <div class="flavor-track">
                    <div class="flavor-fill flavor-fill-bitter" style="width: ${item.scores.bitterness}%;"></div>
                  </div>
                </div>
              `}
              <div class="flavor-mini-bar">
                <div class="flavor-label">
                  <span>Độ Ngọt</span>
                  <strong>${item.scores.sweetness}%</strong>
                </div>
                <div class="flavor-track">
                  <div class="flavor-fill flavor-fill-sweet" style="width: ${item.scores.sweetness}%;"></div>
                </div>
              </div>
            </div>

            <div class="tasting-tags">
              ${item.tastingNotes.slice(0, 3).map(note => `<span class="tasting-tag">🏷️ ${note}</span>`).join('')}
            </div>

            <div class="card-footer">
              <div class="price-box">
                <span class="price-label">Giá tham khảo</span>
                <span class="price-value">${formatCurrency(item.price)}</span>
              </div>

              <div class="card-actions">
                <button type="button" class="btn-buy-card ${isCandy ? 'btn-buy-candy' : ''} ${!currentUser ? 'btn-buy-locked' : ''}" data-action="buy" data-id="${item.id}" title="${currentUser ? 'Đặt hàng trải nghiệm' : 'Chức năng đặt hàng yêu cầu đăng ký tài khoản'}">
                  ${currentUser ? '🛒 Đặt mua' : '🔒 Đăng nhập để mua'}
                </button>
                <button class="btn-detail" data-action="detail" data-id="${item.id}">
                  Chi tiết
                </button>
                <button class="btn-compare-toggle ${isCompared ? 'added' : ''}" data-action="compare" data-id="${item.id}" title="${isCompared ? 'Bỏ so sánh' : 'Thêm vào so sánh'}">
                  ${isCompared ? '✓ Đang so' : '+ So sánh'}
                </button>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // =========================================================================
  // WISHLIST MANAGEMENT
  // =========================================================================
  function toggleWishlist(id) {
    const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
    if (!user) {
      openAuthRequiredModal('Lưu Danh Sách Yêu Thích');
      showToast('Vui lòng đăng ký hoặc đăng nhập tài khoản để lưu danh sách yêu thích!', 'warning');
      return;
    }

    const item = CHOCOLATE_DATA.find(c => c.id === id);
    if (!item) return;

    if (state.wishlist.includes(id)) {
      state.wishlist = state.wishlist.filter(itemKey => itemKey !== id);
      showToast(`Đã xóa "${item.name}" khỏi danh sách yêu thích.`);
    } else {
      state.wishlist.push(id);
      showToast(`Đã lưu "${item.name}" vào danh sách yêu thích! ❤️`);
    }

    localStorage.setItem('choco_wishlist', JSON.stringify(state.wishlist));
    updateWishlistBadge();
    renderChocolates();
  }

  // =========================================================================
  // AUTH RESTRICTION & MOCK ORDER MODALS
  // =========================================================================
  function openAuthRequiredModal(actionName = 'Đặt Mua') {
    const modal = document.getElementById('authRequiredModal');
    if (modal) {
      modal.classList.add('active');
    }
  }

  function openMockOrderModal(item) {
    const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
    const modal = document.getElementById('mockOrderModal');
    const title = document.getElementById('orderItemTitle');
    const content = document.getElementById('orderItemContent');
    if (!modal || !content) return;

    // Tự động đưa sản phẩm vào giỏ hàng để sẵn sàng nếu chuyển sang checkout.html
    addToCart(item.id, 1, false, true);

    const originalPrice = item.price;
    const discount = user ? Math.round(originalPrice * 0.1) : 0;
    const finalPrice = originalPrice - discount;

    title.textContent = `Đặt Mua: ${item.name}`;
    content.innerHTML = `
      <div style="display: flex; gap: 12px; align-items: center; background: var(--bg-surface); padding: 12px 14px; border-radius: var(--radius-sm); margin-bottom: 14px; border: 1px solid rgba(255,255,255,0.08);">
        <img src="${item.image}" alt="${item.name}" style="width: 65px; height: 65px; object-fit: cover; border-radius: var(--radius-sm); border: 1px solid rgba(212,175,55,0.25);">
        <div style="flex: 1; min-width: 0;">
          <h4 style="margin: 0 0 3px 0; color: var(--text-main); font-size: 0.98rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.name}</h4>
          <span style="font-size: 0.78rem; color: var(--text-muted);">${item.brand} • ${item.origin || 'Nhập khẩu'}</span>
          <div style="font-weight: 800; color: var(--gold-light); font-size: 1.05rem; margin-top: 2px;">${formatCurrency(originalPrice)}</div>
        </div>
        <button type="button" id="quickAutofillBtn" style="background: rgba(212,175,55,0.12); border: 1px dashed var(--gold-primary); color: var(--gold-light); border-radius: var(--radius-sm); padding: 6px 10px; font-size: 0.75rem; cursor: pointer; white-space: nowrap;">
          ⚡ Điền mẫu
        </button>
      </div>

      <!-- Quick Delivery Inputs -->
      <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 14px;">
        <div>
          <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-main); display: block; margin-bottom: 3px;">Họ và tên người nhận *</label>
          <input type="text" id="quickCustName" class="form-input" value="${user ? user.name : ''}" placeholder="Nhập họ và tên..." style="padding: 9px 12px; font-size: 0.88rem;" required>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <div>
            <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-main); display: flex; justify-content: space-between; margin-bottom: 3px;">
              <span>Số điện thoại</span>
              <span style="font-size: 0.72rem; color: #a3e635; font-weight: normal;">(Chấp nhận số giả)</span>
            </label>
            <input type="text" id="quickCustPhone" class="form-input" placeholder="Số thật hoặc số giả (VD: 0123, 123...)" style="padding: 9px 12px; font-size: 0.88rem;">
          </div>
          <div>
            <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-main); display: block; margin-bottom: 3px;">Thanh toán</label>
            <select id="quickPayMethod" class="select-control" style="padding: 9px 12px; font-size: 0.86rem; width: 100%;">
              <option value="cod">💵 Tiền mặt (COD)</option>
              <option value="qr">📱 Quét mã QR Siêu Tốc</option>
            </select>
          </div>
        </div>

        <div>
          <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-main); display: block; margin-bottom: 3px;">Địa chỉ giao hàng chi tiết *</label>
          <input type="text" id="quickCustAddress" class="form-input" placeholder="Số nhà, tên đường, phường/xã, quận/huyện..." style="padding: 9px 12px; font-size: 0.88rem;" required>
        </div>
      </div>

      <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-sm); padding: 10px 12px; font-size: 0.84rem; display: flex; flex-direction: column; gap: 5px;">
        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--text-muted);">Tạm tính:</span>
          <span>${formatCurrency(originalPrice)}</span>
        </div>
        ${user ? `
          <div style="display: flex; justify-content: space-between; color: #34d399;">
            <span>⭐ Ưu đãi thành viên VIP (10%):</span>
            <span>- ${formatCurrency(discount)}</span>
          </div>
        ` : ''}
        <div style="display: flex; justify-content: space-between; color: #34d399;">
          <span>❄️ Đóng gói thùng xốp đá gel lạnh:</span>
          <span>Miễn phí (0₫)</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-top: 1px dashed rgba(255,255,255,0.12); padding-top: 6px; font-size: 1rem; font-weight: 800;">
          <span>Tổng số tiền:</span>
          <span style="color: var(--gold-light); font-size: 1.15rem;">${formatCurrency(finalPrice)}</span>
        </div>
      </div>
    `;

    modal.classList.add('active');

    // Handle Quick Autofill
    document.getElementById('quickAutofillBtn')?.addEventListener('click', () => {
      const nameInput = document.getElementById('quickCustName');
      const phoneInput = document.getElementById('quickCustPhone');
      const addressInput = document.getElementById('quickCustAddress');
      if (nameInput) nameInput.value = user ? user.name : 'Nguyễn Văn Khách';
      if (phoneInput) phoneInput.value = '0123456789 (Số giả)';
      if (addressInput) addressInput.value = 'Số 24 Tràng Tiền, P. Tràng Tiền, Q. Hoàn Kiếm, Hà Nội';
      showToast('Đã điền thông tin mẫu!', 'success');
    });

    // Confirm button click
    const confirmBtn = document.getElementById('confirmOrderBtn');
    confirmBtn.onclick = () => {
      const name = document.getElementById('quickCustName')?.value.trim() || (user ? user.name : 'Khách Hàng Quý');
      const phone = document.getElementById('quickCustPhone')?.value.trim() || '0123456789 (Số giả lập)';
      const address = document.getElementById('quickCustAddress')?.value.trim();
      const payMethod = document.getElementById('quickPayMethod')?.value === 'qr' ? 'Quét mã VietQR / MoMo' : 'COD (Tiền mặt khi nhận)';

      if (!address) {
        showToast('Vui lòng điền địa chỉ nhận hàng để nhận sản phẩm!', 'warning');
        return;
      }

      // Save order
      const orderId = '#CR-' + Math.floor(10000 + Math.random() * 90000);
      saveOrder({
        orderId,
        date: new Date().toLocaleString('vi-VN'),
        customer: { name, phone, email: user ? user.email : 'khach@chocorank.com', address, note: 'Giao hỏa tốc thùng xốp đá gel' },
        paymentMethod: payMethod,
        items: [{ id: item.id, name: item.name, price: item.price, quantity: 1, image: item.image, brand: item.brand }],
        subtotal: originalPrice,
        discount: discount,
        grandTotal: finalPrice,
        status: 'Chờ giao hàng'
      });

      clearCart();
      modal.classList.remove('active');
      showToast(`🎉 Đặt mua thành công "${item.name}"! Mã đơn hàng ${orderId}.`, 'success');
    };
  }

  function handleBuyProduct(id) {
    const item = CHOCOLATE_DATA.find(c => c.id === id);
    if (!item) return;
    openMockOrderModal(item);
  }

  function updateWishlistBadge() {
    if (elements.wishlistCountBadge) {
      elements.wishlistCountBadge.textContent = state.wishlist.length;
    }
  }

  // =========================================================================
  // COMPARISON TOOL
  // =========================================================================
  function toggleCompare(id) {
    const item = CHOCOLATE_DATA.find(c => c.id === id);
    if (!item) return;

    if (state.compareList.includes(id)) {
      state.compareList = state.compareList.filter(itemKey => itemKey !== id);
      showToast(`Đã bỏ "${item.name}" khỏi mục so sánh.`);
    } else {
      if (state.compareList.length >= 3) {
        showToast('Bạn chỉ có thể so sánh tối đa 3 loại socola cùng lúc!', 'warning');
        return;
      }
      state.compareList.push(id);
      showToast(`Đã thêm "${item.name}" vào khay so sánh.`);
    }

    updateComparisonTray();
    renderChocolates();
  }

  function updateComparisonTray() {
    if (!elements.comparisonTray) return;

    if (state.compareList.length > 0) {
      elements.comparisonTray.classList.add('visible');
      elements.trayCount.textContent = `${state.compareList.length}/3`;
      
      elements.trayThumbs.innerHTML = state.compareList.map(id => {
        const item = CHOCOLATE_DATA.find(c => c.id === id);
        return item ? `<img class="tray-item-thumb" src="${item.image}" alt="${item.name}" title="${item.name}">` : '';
      }).join('');
    } else {
      elements.comparisonTray.classList.remove('visible');
    }
  }

  function clearCompare() {
    state.compareList = [];
    updateComparisonTray();
    renderChocolates();
    showToast('Đã xóa toàn bộ khay so sánh.');
  }

  function openCompareModal() {
    if (state.compareList.length === 0) {
      showToast('Vui lòng chọn ít nhất 1 loại socola để so sánh!', 'warning');
      return;
    }

    const items = state.compareList.map(id => CHOCOLATE_DATA.find(c => c.id === id)).filter(Boolean);
    const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;

    elements.compareTableContainer.innerHTML = `
      <table class="compare-table">
        <thead>
          <tr>
            <th style="width: 220px;">Thuộc Tính</th>
            ${items.map(item => `
              <th class="compare-col-header">
                <img class="compare-thumb" src="${item.image}" alt="${item.name}">
                <div style="font-size: 1.1rem; font-weight: 700;">${item.name}</div>
                <div style="font-size: 0.8rem; color: var(--gold-light);">${item.brand}</div>
              </th>
            `).join('')}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Xếp Hạng & Huy Hiệu</strong></td>
            ${items.map(item => `<td><strong class="text-gold">#${item.rank}</strong> - ${item.badge}</td>`).join('')}
          </tr>
          <tr>
            <td><strong>Điểm Tổng Thể</strong></td>
            ${items.map(item => `<td><strong style="font-size: 1.2rem; color: var(--gold-light);">${item.scores.overall}/10</strong></td>`).join('')}
          </tr>
          <tr>
            <td><strong>Điểm Đáng Mua (Value)</strong></td>
            ${items.map(item => `<td><span class="text-gold">★ ${item.scores.value}/10</span></td>`).join('')}
          </tr>
          <tr>
            <td><strong>Xuất Xứ</strong></td>
            ${items.map(item => `<td>${item.origin}</td>`).join('')}
          </tr>
          <tr>
            <td><strong>Dòng Socola</strong></td>
            ${items.map(item => `<td>${item.categoryName}</td>`).join('')}
          </tr>
          <tr>
            <td><strong>Nồng Độ Cacao</strong></td>
            ${items.map(item => `<td><strong>${item.cocoa}% Cacao</strong></td>`).join('')}
          </tr>
          <tr>
            <td><strong>Độ Đắng / Độ Ngọt</strong></td>
            ${items.map(item => `<td>Đắng ${item.scores.bitterness}% | Ngọt ${item.scores.sweetness}%</td>`).join('')}
          </tr>
          <tr>
            <td><strong>Giá Tham Khảo</strong></td>
            ${items.map(item => `<td><strong style="color: var(--gold-light); font-size: 1.1rem;">${formatCurrency(item.price)}</strong> (${item.weight})</td>`).join('')}
          </tr>
          <tr>
            <td><strong>Nốt Hương Nếm Thử</strong></td>
            ${items.map(item => `<td>${item.tastingNotes.join(', ')}</td>`).join('')}
          </tr>
          <tr>
            <td><strong>Khuyên Dùng Cho Ai</strong></td>
            ${items.map(item => `<td>${item.recommendedFor}</td>`).join('')}
          </tr>
          <tr>
            <td><strong>Ưu Điểm Vượt Trội</strong></td>
            ${items.map(item => `<td><ul style="padding-left: 16px; font-size: 0.84rem;">${item.pros.map(p => `<li>${p}</li>`).join('')}</ul></td>`).join('')}
          </tr>
          <tr>
            <td><strong>Đặt Mua Ngay</strong></td>
            ${items.map(item => `
              <td>
                <button type="button" class="btn-buy-card ${item.productType === 'candy' ? 'btn-buy-candy' : ''} ${!currentUser ? 'btn-buy-locked' : ''}" data-action="buy" data-id="${item.id}" style="width: 100%; justify-content: center; font-size: 0.82rem; padding: 8px 12px;">
                  ${currentUser ? '🛒 Đặt hàng ngay' : '🔒 Đăng nhập để mua'}
                </button>
              </td>
            `).join('')}
          </tr>
        </tbody>
      </table>
    `;

    openModal(elements.compareModal);
  }

  // =========================================================================
  // PRODUCT DETAIL MODAL
  // =========================================================================
  function openDetailModal(id) {
    const item = CHOCOLATE_DATA.find(c => c.id === id);
    if (!item) return;

    const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;

    elements.detailModalContent.innerHTML = `
      <div class="detail-modal-layout">
        <div class="detail-left">
          <div class="detail-img-wrap">
            <img class="detail-img" src="${item.image}" alt="${item.name}">
            <div class="card-badge" style="position: absolute; bottom: 16px; left: 16px;">${item.badge}</div>
          </div>
          
          <div class="detail-scores-grid">
            <div class="score-box-metric">
              <div class="label">Điểm Hương Vị</div>
              <div class="val">${item.scores.taste}/10</div>
            </div>
            <div class="score-box-metric">
              <div class="label">Độ Đáng Tiền (P/P)</div>
              <div class="val">${item.scores.value}/10</div>
            </div>
            <div class="score-box-metric">
              <div class="label">Độ Mịn Tan Chảy</div>
              <div class="val">${item.scores.texture}/10</div>
            </div>
            <div class="score-box-metric">
              <div class="label">Mùi Thơm Tự Nhiên</div>
              <div class="val">${item.scores.aroma}/10</div>
            </div>
          </div>

          <div style="background: var(--bg-surface-elevated); padding: 18px; border-radius: var(--radius-md); margin-top: 14px;">
            <h5 style="color: var(--gold-light); margin-bottom: 8px;">🍷 Gợi Ý Thưởng Thức Kèm</h5>
            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
              ${item.pairing.map(p => `<span class="tasting-tag" style="background: rgba(212, 175, 55, 0.15); color: var(--gold-light);">☕ ${p}</span>`).join('')}
            </div>
          </div>

          ${(() => {
            if (typeof EATING_STYLES_DATA === 'undefined') return '';
            const matchedStyles = EATING_STYLES_DATA.filter(s => s.compatibleProductIds && s.compatibleProductIds.includes(item.id));
            if (matchedStyles.length === 0) return '';
            return `
              <div class="detail-eating-style-box">
                <div class="detail-eating-style-title">
                  <span>🍽️ Kiểu Thưởng Thức Đỉnh Cao:</span>
                </div>
                ${matchedStyles.slice(0, 2).map(s => `
                  <div style="margin-bottom: 8px;">
                    <strong style="color: var(--gold-light); font-size: 0.84rem;">${s.icon} ${s.title}:</strong>
                    <p class="detail-eating-style-text">${s.subtitle}.</p>
                  </div>
                `).join('')}
                <a href="#eating-styles" onclick="closeModal(elements.detailModal);" style="font-size: 0.78rem; color: var(--gold-light); text-decoration: none; font-weight: 700; display: inline-flex; align-items: center; gap: 4px; margin-top: 4px;">
                  Xem toàn bộ 10+ kiểu ăn độc đáo →
                </a>
              </div>
            `;
          })()}
        </div>

        <div class="detail-right">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <span class="origin-badge" style="font-size: 0.95rem;">${item.origin} • ${item.categoryName}</span>
            ${item.productType === 'candy' ? 
              `<span class="cocoa-badge candy-badge-feature" style="font-size: 0.9rem;">🍬 ${item.candyFeature}</span>` : 
              `<span class="cocoa-badge" style="font-size: 0.9rem;">${item.cocoa}% Cacao</span>`
            }
          </div>

          <h2 style="font-size: 1.8rem; margin-bottom: 4px;">${item.name}</h2>
          <p style="color: var(--text-muted); font-size: 0.92rem; margin-bottom: 18px;">Thương hiệu: <strong>${item.brand}</strong></p>

          <div style="display: flex; align-items: baseline; gap: 12px; margin-bottom: 20px;">
            <span style="font-size: 1.8rem; font-weight: 800; color: var(--gold-light);">${formatCurrency(item.price)}</span>
            <span style="color: var(--text-dim); font-size: 0.9rem;">/ ${item.weight}</span>
            <span style="background: rgba(16, 185, 129, 0.15); color: var(--success); font-size: 0.75rem; padding: 2px 8px; border-radius: var(--radius-full); font-weight: 600;">${item.priceTier}</span>
          </div>

          <p style="color: var(--text-main); font-size: 0.95rem; line-height: 1.7; margin-bottom: 20px;">
            ${item.description}
          </p>

          <div style="margin-bottom: 20px;">
            <h5 style="font-size: 0.9rem; color: var(--gold-light); margin-bottom: 8px;">Nốt Hương Nếm Thử (Tasting Notes)</h5>
            <div class="tasting-tags">
              ${item.tastingNotes.map(n => `<span class="tasting-tag" style="font-size: 0.85rem; padding: 5px 12px;">🌟 ${n}</span>`).join('')}
            </div>
          </div>

          <div style="background: rgba(255, 255, 255, 0.03); border-left: 3px solid var(--gold-primary); padding: 12px 16px; margin-bottom: 20px;">
            <strong style="color: var(--gold-light); font-size: 0.88rem;">Khuyên Dùng Cho:</strong>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">${item.recommendedFor}</p>
          </div>

          <div class="pros-cons-grid">
            <div class="pros-box">
              <h5>✓ Ưu Điểm Nổi Bật</h5>
              <ul>
                ${item.pros.map(p => `<li>${p}</li>`).join('')}
              </ul>
            </div>
            <div class="cons-box">
              <h5>✕ Cần Lưu Ý</h5>
              <ul>
                ${item.cons.map(c => `<li>${c}</li>`).join('')}
              </ul>
            </div>
          </div>

          <!-- Authenticity Tips Card in Modal -->
          ${(() => {
            if (item.productType === 'candy') {
              const candyTip = getCandyAuthenticityTip(item.id);
              return `
                <div class="candy-auth-modal-card">
                  <div class="candy-auth-modal-header">
                    <span class="auth-modal-badge">🛡️ CẨM NANG PHÂN BIỆT THẬT - GIẢ</span>
                    <h4 style="margin: 6px 0 0; font-size: 1.05rem; color: #f472b6;">Bí Quyết Thẩm Định ${item.name}</h4>
                  </div>
                  <div class="candy-auth-modal-list">
                    <div class="auth-modal-item item-real">
                      <span class="auth-point-icon">✅</span>
                      <div class="auth-point-content">
                        <strong>Kẹo Chuẩn / Chính Hãng:</strong>
                        <p>${candyTip.real}</p>
                      </div>
                    </div>
                    <div class="auth-modal-item item-fake">
                      <span class="auth-point-icon">❌</span>
                      <div class="auth-point-content">
                        <strong>Kẹo Nhái / Kém Chất Lượng:</strong>
                        <p>${candyTip.fake}</p>
                      </div>
                    </div>
                    <div class="auth-modal-item item-test">
                      <span class="auth-point-icon">🔬</span>
                      <div class="auth-point-content">
                        <strong>Mẹo Thử Nhanh 10 Giây:</strong>
                        <p>${candyTip.quickTest}</p>
                      </div>
                    </div>
                  </div>
                  <button type="button" class="btn-auth-lab-link" onclick="closeModal(elements.detailModal); switchAuthGuide('candy');">
                    <span>🍬 Mở Bảng So Sánh Kẹo Thật - Giả & 4 Bài Test Tại Nhà →</span>
                  </button>
                </div>
              `;
            } else {
              return `
                <div class="choco-auth-modal-card">
                  <div class="candy-auth-modal-header">
                    <span class="auth-modal-badge" style="background: rgba(212, 175, 55, 0.15); color: var(--gold-light);">🛡️ THẨM ĐỊNH SOCOLA CHUẨN</span>
                    <h4 style="margin: 6px 0 0; font-size: 1.05rem; color: var(--gold-light);">Nhận Biết 100% Bơ Cacao vs Mỡ Thay Thế (CBS)</h4>
                  </div>
                  <div class="candy-auth-modal-list">
                    <div class="auth-modal-item item-real">
                      <span class="auth-point-icon">✅</span>
                      <div class="auth-point-content">
                        <strong>Socola Thật:</strong> 100% bơ cacao tự nhiên, tan mịn ở 34°C - 36°C (bằng thân nhiệt), bẻ nghe tiếng 'tách' vang giòn, có thể nở hoa bơ trắng bạc tự nhiên.
                      </div>
                    </div>
                    <div class="auth-modal-item item-fake">
                      <span class="auth-point-icon">❌</span>
                      <div class="auth-point-content">
                        <strong>Socola Giả / Compound:</strong> Dầu cọ hydro hóa chỉ tan ở 40°C - 45°C, để lại màng dầu sáp ngấy nhớn trên vòm họng, bẻ mềm ỉu hoặc vỡ vụn.
                      </div>
                    </div>
                  </div>
                  <button type="button" class="btn-auth-lab-link" style="border-color: rgba(212, 175, 55, 0.4); color: var(--gold-light);" onclick="closeModal(elements.detailModal); switchAuthGuide('chocolate');">
                    <span>🍫 Mở Phòng Thử Nghiệm Socola Thật - Giả Chi Tiết →</span>
                  </button>
                </div>
              `;
            }
          })()}

          <div class="detail-buy-box">
            <div class="buy-box-header">
              <div>
                <span class="buy-sub-title">ĐẶT HÀNG TRẢI NGHIỆM</span>
                <h4 class="buy-main-title">🛒 Đặt Mua Trực Tuyến</h4>
              </div>
              <span class="buy-verified-badge">✓ Đã Thẩm Định</span>
            </div>

            <div class="detail-buy-actions">
              <button type="button" class="btn-buy-modal-primary ${item.productType === 'candy' ? 'btn-buy-candy' : ''} ${!currentUser ? 'btn-buy-locked' : ''}" data-action="buy" data-id="${item.id}" style="border: none; cursor: pointer;">
                <span>${currentUser ? '🛒 Đặt Hàng Trực Tiếp' : '🔒 Đăng Nhập Để Đặt Mua'}</span>
                <span class="ext-arrow">${currentUser ? '✓' : '🔑'}</span>
              </button>
              <button class="btn-secondary" onclick="document.dispatchEvent(new CustomEvent('toggle-compare-from-modal', { detail: '${item.id}' }))">
                + So Sánh
              </button>
            </div>

            <div class="buy-trust-guarantee">
              <span>🚚 Hỗ trợ giao hỏa tốc 2H</span>
              <span>❄️ Đóng gói chuẩn nhiệt độ mát</span>
              <span>🛡️ Cam kết hàng chính hãng 100%</span>
            </div>
          </div>
        </div>
      </div>
    `;

    openModal(elements.detailModal);
  }

  // =========================================================================
  // CREATIVE EATING STYLES & PAIRINGS LAB (CÁC KIỂU ĂN SOCOLA & KẸO)
  // =========================================================================
  function renderEatingStyles() {
    if (!elements.eatingStylesGrid || typeof EATING_STYLES_DATA === 'undefined') return;

    const filteredStyles = state.eatingStyleFilter === 'all'
      ? EATING_STYLES_DATA
      : EATING_STYLES_DATA.filter(s => s.category === state.eatingStyleFilter);

    elements.eatingStylesGrid.innerHTML = filteredStyles.map(s => `
      <article class="style-card" id="style-card-${s.id}">
        <div class="style-card-header">
          <div class="style-icon-box" aria-hidden="true">${s.icon}</div>
          <div class="style-meta-tags">
            <span class="style-badge-tag">${s.badge}</span>
            <span class="style-diff-tag">⏱️ ${s.difficulty}</span>
          </div>
        </div>

        <h3 class="style-card-title">${s.title}</h3>
        <div class="style-card-subtitle">${s.subtitle}</div>
        <p class="style-card-desc">${s.description}</p>

        <div class="style-ingredients-section">
          <div class="style-sub-heading">🥣 Nguyên Liệu Cần Chuẩn Bị</div>
          <ul class="style-ingr-list">
            ${s.ingredients.map(ing => `<li>${ing}</li>`).join('')}
          </ul>
        </div>

        <div class="style-sub-heading" style="margin-top: 4px;">📝 Các Bước Thưởng Thức</div>
        <div class="style-steps-list">
          ${s.steps.map(step => `<div class="style-step-item">${step}</div>`).join('')}
        </div>

        <div class="style-protip-box">
          <strong>💡 Mẹo Nhà Nghề (Pro-Tip):</strong>
          <span>${s.proTip}</span>
        </div>

        <div class="style-products-pairing">
          <div class="style-sub-heading" style="margin-bottom: 4px;">🍫 Món Thích Hợp Nhất:</div>
          <div class="style-product-pills">
            ${s.compatibleProductNames.map((name, idx) => {
              const prodId = s.compatibleProductIds ? s.compatibleProductIds[idx] : null;
              return `
                <button type="button" class="style-prod-link" data-product-id="${prodId || ''}" title="Xem chi tiết ${name}">
                  <span>${name}</span>
                  <span style="color: var(--gold-light);">↗</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>
      </article>
    `).join('');

    // Wire up clicking on product pills in style cards
    elements.eatingStylesGrid.querySelectorAll('.style-prod-link').forEach(btn => {
      btn.addEventListener('click', () => {
        const pId = btn.dataset.productId;
        if (pId) {
          openDetailModal(pId);
        }
      });
    });
  }

  function handleRandomEatingStyle() {
    if (typeof EATING_STYLES_DATA === 'undefined' || EATING_STYLES_DATA.length === 0) return;

    // Pick a random style
    const randomIndex = Math.floor(Math.random() * EATING_STYLES_DATA.length);
    const selectedStyle = EATING_STYLES_DATA[randomIndex];

    // Reset filter to 'all' so the card is visible
    state.eatingStyleFilter = 'all';
    if (elements.stylesFilterTabs) {
      elements.stylesFilterTabs.querySelectorAll('.style-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.styleFilter === 'all');
      });
    }

    renderEatingStyles();

    // Scroll to the card
    const cardEl = document.getElementById(`style-card-${selectedStyle.id}`);
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      cardEl.classList.remove('highlight-flash');
      // Trigger reflow for animation restart
      void cardEl.offsetWidth;
      cardEl.classList.add('highlight-flash');
      showToast(`🎲 Gợi ý bất ngờ: "${selectedStyle.title}"!`, 'info');

      setTimeout(() => {
        cardEl.classList.remove('highlight-flash');
      }, 5000);
    }
  }

  // =========================================================================
  // AUTHENTICITY GUIDE & INTERACTIVE DETECTIVE QUIZ
  // =========================================================================
  function getCandyAuthenticityTip(id) {
    const map = {
      'haribo-goldbears': {
        real: 'Chiết xuất 100% từ nước ép trái cây cô đặc tự nhiên + Gelatin thực phẩm tinh khiết Châu Âu. Kẹo có độ dai sần sật đặc trưng, màu trong suốt tự nhiên, vị ngọt thanh mát.',
        fake: 'Dùng phẩm màu công nghiệp Azo hóa học (E102, E129) và gelatin bẩn. Kẹo nhão dính, ngâm nước phai màu lòe loẹt và có mùi hắc.',
        quickTest: 'Thả kẹo vào cốc nước ấm: Kẹo thật chỉ nở to từ từ, nước vẫn trong veo. Kẹo nhái tan màu lòe loẹt làm đục nước sau 1 phút.'
      },
      'werthers-original-caramel': {
        real: 'Nấu từ bơ kem sữa tươi thật 100% (Real Butter & Fresh Cream) theo công thức Đức truyền thống. Vị béo bùi ấm áp, tan êm dịu sạch bong trong miệng.',
        fake: 'Thay thế bằng shortening công nghiệp hoặc dầu cọ hydro hóa + hương liệu bơ tổng hợp. Vị ngọt lợ ngắt cổ, ngậm xong để lại lớp màng dầu mỡ ngấy nhớn trên vòm họng.',
        quickTest: 'Cắn ngậm tan: Kẹo thật tan lướt êm dịu không cặn bã; kẹo nhái cảm giác lạo xạo cặn bột và ngấy mỡ sáp lâu tan.'
      },
      'keo-dua-sap-bentre': {
        real: 'Nấu từ 100% nước cốt dừa tươi nguyên chất Bến Tre và mạch nha nếp thơm. Dẻo mềm béo ngậy, TUYỆT ĐỐI KHÔNG DÍNH KẼ RĂNG.',
        fake: 'Pha nhiều bột năng, đường cát rẻ tiền và hương liệu dừa tổng hợp nồng gắt. Kẹo cứng quắt hoặc dính bết chặt vào răng rất khó chịu.',
        quickTest: 'Thử độ dính răng: Cắn kẹo dừa chuẩn trượt tan sạch sẽ; kẹo dừa pha bột dính bết chặt vào kẽ răng phải dùng tăm cậy.'
      },
      'cavendish-harvey-fruit': {
        real: 'Hộp thiếc dập nổi hoa văn vàng kim sắc sảo, kẹo được phủ lớp đường phấn icing trắng mịn chống ẩm. Vị nước ép trái cây chua thanh ngọt dịu.',
        fake: 'Vỏ hộp thiếc mỏng gỉ sét, kẹo bên trong chảy nước dính chặt thành một tảng khối đặc quánh, nồng mùi tinh dầu nhân tạo rẻ tiền.',
        quickTest: 'Mở nắp hộp: Kẹo chuẩn các viên rời rạc phủ phấn trắng khô ráo; kẹo nhái ướt nhẹp và dính bết tảng.'
      },
      'ricola-original-herb': {
        real: 'Dập nổi logo "Ricola" sắc nét góc cạnh trên từng viên. Tinh chất 13 loại thảo mộc vùng núi tuyết Thụy Sĩ giúp the mát tự nhiên, làm dịu êm họng suốt 30 phút.',
        fake: 'Logo dập nhòe nhoẹt mờ tịt, kẹo dính bết vào giấy bọc. Ngậm vào có vị cay nồng xộc mũi của tinh dầu hóa chất, ngậm xong làm rát cổ họng.',
        quickTest: 'Soi mặt viên kẹo: Kẹo thật chữ nổi sắc nét, vị the sâu lắng; kẹo nhái ngọt gắt đường xộc mùi hóa chất nồng.'
      },
      'mms-peanut-candy': {
        real: 'Vỏ đường bóng mượt in chữ "m" tinh xảo, hạt đậu phộng to mẩy rang chín vàng bùi ngậy bọc trong socola sữa thật mịn màng.',
        fake: 'Vỏ đường sần sùi phai màu dính tay, hạt đậu teo tóp ẩm mốc có mùi dầu hôi, lớp socola giả bở bột không tan.',
        quickTest: 'Bẻ đôi viên kẹo: Kẹo chuẩn hạt đậu phộng giòn thơm đều màu; kẹo nhái đậu phộng dai nhách hoặc mốc xỉn.'
      },
      'keo-cu-do-hatinh': {
        real: 'Bánh tráng nướng quạt than giòn rụm không cháy, mật mía nguyên chất vàng óng dẻo quánh, hạt đậu phộng to giòn thơm bùi, nồng ấm gừng già cay.',
        fake: 'Bánh tráng dai ỉu xìu, mật mía cháy đen pha đường cát, đậu phộng teo hôi dầu, ngọt gắt rát họng.',
        quickTest: 'Cắn bánh tráng: Kẹo thật bánh tráng nổ giòn tan rôm rốp; kẹo dởm bánh tráng dai ngoách khó bẻ.'
      },
      'morinaga-hi-chew': {
        real: 'Cấu trúc 2 lớp màu tương phản công nghệ Nhật Bản, kết cấu dẻo dai đàn hồi nhai ngập chân răng nhưng không dính răng, hương thơm nước ép hoa quả tự nhiên.',
        fake: 'Kẹo bở bột hoặc dính nhớp vào răng, màu sắc đục ngầu, vị ngọt gắt đường hóa học và nồng mùi hương liệu.',
        quickTest: 'Kéo giãn: Kẹo thật dẻo dai đàn hồi dài; kẹo giả đứt ngang vụn bở.'
      }
    };
    return map[id] || {
      real: 'Nguyên liệu tự nhiên, quy trình sản xuất đạt chuẩn an toàn vệ sinh thực phẩm quốc tế.',
      fake: 'Chứa phẩm màu công nghiệp, đường hóa học hoặc chất béo công nghiệp kém chất lượng.',
      quickTest: 'Kiểm tra bao bì sắc nét, hạn sử dụng và mùi thơm thanh khiết tự nhiên khi mở gói.'
    };
  }

  function switchAuthGuide(target = 'candy') {
    if (!elements.authGuideTabs) return;

    elements.authGuideTabs.querySelectorAll('.auth-tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.authTarget === target);
    });

    if (target === 'candy') {
      elements.authPanelChocolate?.classList.remove('active');
      elements.authPanelCandy?.classList.add('active');
      document.querySelectorAll('#quizCaseFilter button').forEach(b => {
        b.classList.toggle('active', b.dataset.caseFilter === 'candy');
      });
      renderAuthenticityCases('candy');
      showToast('Đang mở Cẩm nang Thẩm định & Mẹo Phân Biệt Kẹo Thật vs Giả! 🍬');
    } else {
      elements.authPanelChocolate?.classList.add('active');
      elements.authPanelCandy?.classList.remove('active');
      document.querySelectorAll('#quizCaseFilter button').forEach(b => {
        b.classList.toggle('active', b.dataset.caseFilter === 'chocolate');
      });
      renderAuthenticityCases('chocolate');
      showToast('Đang mở Cẩm nang Phân Biệt Socola Thật vs Socola Giả! 🍫');
    }

    const authSection = document.getElementById('authenticity');
    if (authSection) {
      authSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
  window.switchAuthGuide = switchAuthGuide;

  function renderAuthenticityCases(filterCategory = 'all') {
    if (!elements.casesAccordion || typeof AUTHENTICITY_CASES_DATA === 'undefined') return;

    const filteredCases = filterCategory === 'all'
      ? AUTHENTICITY_CASES_DATA
      : AUTHENTICITY_CASES_DATA.filter(item => item.category === filterCategory);

    elements.casesAccordion.innerHTML = filteredCases.map((c, index) => `
      <div class="case-card" id="case-card-${c.id}">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <span style="font-size: 0.76rem; font-weight: 700; color: var(--gold-light); text-transform: uppercase;">
            ${c.category === 'candy' ? '🍬 TÌNH HUỐNG KẸO' : '🍫 TÌNH HUỐNG SOCOLA'} • BÀI ${index + 1}
          </span>
          <span style="font-size: 0.72rem; background: rgba(255,255,255,0.06); padding: 2px 8px; border-radius: var(--radius-full); color: var(--text-muted);">
            Thẩm Định Thực Tế
          </span>
        </div>
        <h4 class="case-question-title">
          <span>${c.title}</span>
        </h4>
        <div class="case-hint">💡 Gợi ý nhận biết: ${c.hint}</div>

        <div class="case-buttons-row">
          <button type="button" class="btn-choice btn-choice-real" data-case-id="${c.id}" data-guess="real">
            <span>✅ Theo bạn: HÀNG THẬT</span>
          </button>
          <button type="button" class="btn-choice btn-choice-fake" data-case-id="${c.id}" data-guess="fake">
            <span>❌ Theo bạn: HÀNG GIẢ / NHÁI</span>
          </button>
        </div>

        <div class="case-result-box" id="result-box-${c.id}">
          <div class="case-verdict-banner ${c.correctAnswer === 'real' ? 'verdict-real' : 'verdict-fake'}" id="verdict-banner-${c.id}">
            ${c.verdictTitle}
          </div>
          <p class="case-explanation-text">${c.explanation}</p>
          <div class="case-protip-note">
            <strong>🛡️ Lời khuyên người tiêu dùng thông thái:</strong> ${c.proTip}
          </div>
        </div>
      </div>
    `).join('');

    // Handle user clicking guess buttons
    elements.casesAccordion.querySelectorAll('.btn-choice').forEach(btn => {
      btn.addEventListener('click', () => {
        const caseId = btn.dataset.caseId;
        const guess = btn.dataset.guess;
        const caseData = AUTHENTICITY_CASES_DATA.find(item => item.id === caseId);
        if (!caseData) return;

        const resultBox = document.getElementById(`result-box-${caseId}`);
        const verdictBanner = document.getElementById(`verdict-banner-${caseId}`);

        if (resultBox) {
          resultBox.classList.add('visible');

          if (guess === caseData.correctAnswer) {
            showToast('🎉 Chính xác! Bạn có trực giác thẩm định rất nhạy bén.', 'info');
          } else {
            showToast('💡 Chưa chính xác! Hãy đọc lời giải thích của chuyên gia bên dưới nhé.', 'warning');
          }

          resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    });
  }

  // =========================================================================
  // TASTE & CANDY QUIZ WIZARD (TRẮC NGHIỆM TÌM ĐỒ NGỌT CHÂN ÁI)
  // =========================================================================
  function startQuiz(type = 'chocolate') {
    state.quizType = type;
    state.quizStep = 0;
    state.quizAnswers = [];

    // Update modal tab buttons active state
    document.querySelectorAll('.quiz-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.quiz === type);
    });

    renderQuizStep();
    openModal(elements.quizModal);
  }

  function renderQuizStep() {
    const questions = state.quizType === 'candy' ? CANDY_QUIZ_QUESTIONS : TASTE_QUIZ_QUESTIONS;
    const q = questions[state.quizStep];
    if (!q) {
      finishQuiz();
      return;
    }

    const badgeText = state.quizType === 'candy' ? 
      `CÂU HỎI KẸO ${state.quizStep + 1} / ${questions.length}` : 
      `CÂU HỎI SOCOLA ${state.quizStep + 1} / ${questions.length}`;

    const icon = state.quizType === 'candy' ? '🍬' : '✨';

    elements.quizQuestionContainer.innerHTML = `
      <span class="quiz-step-badge" ${state.quizType === 'candy' ? 'style="color: #f472b6;"' : ''}>${badgeText}</span>
      <h3 class="quiz-question-title">${q.question}</h3>
      <div class="quiz-options-list">
        ${q.options.map(opt => `
          <button class="quiz-opt-btn" data-target="${opt.target}">
            <span class="quiz-opt-icon">${icon}</span>
            <span>${opt.text}</span>
          </button>
        `).join('')}
      </div>
    `;

    elements.quizQuestionContainer.querySelectorAll('.quiz-opt-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget.dataset.target;
        state.quizAnswers.push(target);
        state.quizStep++;
        renderQuizStep();
      });
    });
  }

  function finishQuiz() {
    const dataSource = (typeof window !== 'undefined' && Array.isArray(window.CHOCOLATE_DATA) && window.CHOCOLATE_DATA.length > 0)
      ? window.CHOCOLATE_DATA
      : (typeof CHOCOLATE_DATA !== 'undefined' && Array.isArray(CHOCOLATE_DATA) && CHOCOLATE_DATA.length > 0 ? CHOCOLATE_DATA : []);

    let matchedItem;
    let matchReason = '';

    if (state.quizType === 'candy') {
      const ans1 = state.quizAnswers[0] || 'gummy';       // texture
      const ans2 = state.quizAnswers[1] || 'fruit';       // flavor
      const ans3 = state.quizAnswers[2] || 'snack';       // context / occasion

      if (ans2 === 'herb' || ans3 === 'throat' || ans1 === 'herbal') {
        matchedItem = dataSource.find(c => c.id === 'ricola-original-herb');
        matchReason = 'Hương vị 13 loại thảo mộc núi tuyết Alps tự nhiên làm dịu họng, thông mũi và mang lại hơi thở thơm mát tức thì!';
      } else if (ans3 === 'tea' || ans1 === 'traditional') {
        if (ans2 === 'nut' || (ans1 === 'traditional' && ans3 === 'tea' && ans2 !== 'fruit')) {
          matchedItem = dataSource.find(c => c.id === 'keo-cu-do-hatinh');
          matchReason = 'Mật mía gừng già cay ấm áp kết hợp lạc giòn kẹp bánh tráng nướng, cực kỳ tuyệt vời khi nhâm nhi cùng trà xanh!';
        } else {
          matchedItem = dataSource.find(c => c.id === 'keo-dua-sap-bentre');
          matchReason = 'Độ dẻo béo ngậy 100% từ nước cốt dừa sáp tự nhiên Bến Tre, tinh hoa ẩm thực dân gian truyền thống trứ danh!';
        }
      } else if (ans1 === 'caramel' || ans2 === 'butter') {
        matchedItem = dataSource.find(c => c.id === 'werthers-original-caramel');
        matchReason = 'Kẹo bơ kem caramel nấu chậm từ năm 1903 ngậy thơm quý phái, ngậm tan chậm rãi êm ái!';
      } else if (ans3 === 'luxury') {
        matchedItem = dataSource.find(c => c.id === 'cavendish-harvey-fruit');
        matchReason = 'Hộp thiếc vàng ánh kim hoàng gia chứa từng viên kẹo thủy tinh lấp lánh đượm nước ép trái cây mọng nước!';
      } else if (ans2 === 'nut') {
        matchedItem = dataSource.find(c => c.id === 'mms-peanut-candy');
        matchReason = 'Đậu phộng rang giòn rụm bọc socola và vỏ kẹo đa sắc màu, ăn vặt giải trí siêu giòn bùi vui nhộn!';
      } else if (ans2 === 'fruit' && ans1 === 'gummy') {
        if (ans3 === 'snack') {
          matchedItem = dataSource.find(c => c.id === 'haribo-goldbears');
          matchReason = 'Chú gấu vàng huyền thoại dai dẻo nhai sần sật với 6 vị nước ép trái cây tự nhiên không dính răng!';
        } else {
          matchedItem = dataSource.find(c => c.id === 'morinaga-hi-chew');
          matchReason = 'Công nghệ nhồi nhân đôi độc quyền của Nhật Bản, lớp sữa mềm bọc nước ép nho & dâu tươi bùng nổ vị giác!';
        }
      } else {
        matchedItem = dataSource.find(c => c.id === 'haribo-goldbears') || dataSource.find(c => c.productType === 'candy');
        matchReason = 'Loại kẹo dẻo được yêu thích số 1 hành tinh, vị chua ngọt thanh mát tự nhiên và nhai cực đã miệng!';
      }

      if (!matchedItem) {
        matchedItem = dataSource.find(c => c.productType === 'candy') || {
          id: 'haribo-goldbears',
          name: 'Kẹo Dẻo Haribo Goldbären (Goldbears)',
          brand: 'Haribo',
          origin: 'Đức 🇩🇪',
          price: 38000,
          badge: '🐻 Kẹo Dẻo Gấu Bán Chạy Nhất Thế Giới',
          candyFeature: '100% Nước Ép Trái Cây Tự Nhiên',
          image: 'assets/images/haribo_goldbears.jpg'
        };
      }

      const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;

      elements.quizQuestionContainer.innerHTML = `
        <div style="padding: 10px 0;">
          <div style="font-size: 3.5rem; margin-bottom: 10px;">🎉🍬</div>
          <span class="quiz-step-badge" style="color: #f472b6;">KẾT QUẢ KẸO HỢP GU NHẤT CHO BẠN</span>
          <h3 style="font-size: 1.8rem; margin-bottom: 8px;">"${matchedItem.name}"</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 20px;">${matchReason}</p>
          
          <div style="background: var(--bg-surface-elevated); border: 1px solid rgba(236, 72, 153, 0.4); border-radius: var(--radius-md); padding: 20px; display: flex; align-items: center; gap: 20px; text-align: left; margin-bottom: 24px;">
            <img src="${matchedItem.image}" alt="${matchedItem.name}" style="width: 90px; height: 90px; object-fit: cover; border-radius: var(--radius-sm);" onerror="this.onerror=null; this.src='assets/images/placeholder.jpg';">
            <div>
              <div style="color: #f472b6; font-weight: 700;">${matchedItem.badge}</div>
              <div style="font-size: 0.85rem; color: var(--text-muted); margin: 4px 0;">${matchedItem.origin} • 🍬 ${matchedItem.candyFeature || 'Kẹo Thượng Hạng'}</div>
              <div style="font-size: 1.15rem; font-weight: 800; color: #f472b6;">${formatCurrency(matchedItem.price)}</div>
            </div>
          </div>

          <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
            <button type="button" class="btn-candy-primary ${!currentUser ? 'btn-buy-locked' : ''}" data-action="buy" data-id="${matchedItem.id}" style="width: auto; padding: 10px 22px; display: inline-flex; align-items: center; gap: 6px; border: none; cursor: pointer;">
              ${currentUser ? '🛒 Đặt Mua Kẹo Này Ngay' : '🔒 Đăng Nhập Để Đặt Mua'}
            </button>
            <button class="btn-secondary" id="btnQuizViewDetail" style="width: auto; padding: 10px 22px;">
              🔍 Xem Chi Tiết Kẹo
            </button>
            <button class="btn-secondary" id="btnQuizRestart">
              🔄 Làm Lại
            </button>
            <button class="btn-secondary" id="btnSwitchToChocoQuiz">
              🍫 Thử Trắc Nghiệm Socola
            </button>
          </div>
        </div>
      `;

      document.getElementById('btnQuizViewDetail')?.addEventListener('click', () => {
        closeModal(elements.quizModal);
        openDetailModal(matchedItem.id);
      });

      document.getElementById('btnQuizRestart')?.addEventListener('click', () => startQuiz('candy'));
      document.getElementById('btnSwitchToChocoQuiz')?.addEventListener('click', () => startQuiz('chocolate'));
    } else {
      // Chocolate Quiz calculation (Phân tích toàn diện: Vị giác ans1 + Mục đích ans2 + Mức giá ans3)
      const ans1 = state.quizAnswers[0] || 'dark';     // 'dark' | 'nama' | 'praline' | 'milk'
      const ans2 = state.quizAnswers[1] || 'health';   // 'health' | 'luxury' | 'artisan' | 'budget'
      const ans3 = state.quizAnswers[2] || 'mid';      // 'low' | 'mid' | 'high'

      if (ans1 === 'nama') {
        if (ans3 === 'high' || ans2 === 'luxury') {
          matchedItem = dataSource.find(c => c.id === 'royce-nama-matcha') || dataSource.find(c => c.id === 'royce-nama-au-lait');
          matchReason = 'Đỉnh cao socola tươi Nama Nhật Bản với lớp bột trà xanh Uji / kem sữa tươi béo ngậy tan chảy tức thì như tuyết mùa đông!';
        } else {
          matchedItem = dataSource.find(c => c.id === 'royce-nama-au-lait');
          matchReason = 'Độ mềm mướt tan chảy số 1 châu Á kết hợp kem tươi nguyên chất Hokkaido và bột cacao nhung mịn!';
        }
      } else if (ans1 === 'dark') {
        if (ans3 === 'low' || ans2 === 'budget') {
          matchedItem = dataSource.find(c => c.id === 'ghirardelli-intense-72');
          matchReason = 'Socola đen 72% đậm đà danh tiếng từ San Francisco với mức giá cực kỳ tiết kiệm và chuẩn vị sành sỏi!';
        } else if (ans2 === 'health') {
          matchedItem = dataSource.find(c => c.id === 'lindt-excellence-85');
          matchReason = 'Độ đắng 85% cacao thuần khiết Thụy Sĩ, cực ít đường và dồi dào chất chống oxy hóa bảo vệ sức khỏe tim mạch!';
        } else if (ans2 === 'artisan' || ans3 === 'mid') {
          matchedItem = dataSource.find(c => c.id === 'marou-daklak-70') || dataSource.find(c => c.id === 'marou-baria-76');
          matchReason = 'Tuyệt tác Bean-to-bar Đắk Lắk được New York Times ca ngợi tinh tế và lôi cuốn nhất thế giới!';
        } else if (ans3 === 'high' || ans2 === 'luxury') {
          matchedItem = dataSource.find(c => c.id === 'valrhona-guanaja-70');
          matchReason = 'Tuyệt tác Grand Cru danh giá nước Pháp, tiêu chuẩn vàng khắt khe cho giới đầu bếp Michelin thượng lưu!';
        } else {
          matchedItem = dataSource.find(c => c.id === 'marou-daklak-70');
          matchReason = 'Hương vị cacao nguyên bản đa tầng phức hợp, niềm tự hào thương hiệu Bean-to-bar của Việt Nam!';
        }
      } else if (ans1 === 'praline') {
        if (ans3 === 'high' || ans2 === 'luxury') {
          matchedItem = dataSource.find(c => c.id === 'godiva-gold-collection');
          matchReason = 'Hộp quà vàng hoàng gia Bỉ sang trọng bậc nhất thế giới với bộ sưu tập nhân praline hạt phỉ thơm lừng quý phái!';
        } else if (ans3 === 'mid') {
          matchedItem = dataSource.find(c => c.id === 'guylian-sea-shells');
          matchReason = 'Biểu tượng socola vỏ sò trứ danh nước Bỉ với nhân praline hạt phỉ rang nướng thơm ngậy mượt mà!';
        } else {
          matchedItem = dataSource.find(c => c.id === 'ferrero-rocher-gold');
          matchReason = 'Cấu trúc 4 tầng giòn rụm bọc hạt phỉ nướng nguyên hạt và kem chocolate hạt dẻ Nutella béo bùi chuẩn gu!';
        }
      } else if (ans1 === 'milk') {
        if (ans3 === 'low' || ans2 === 'budget') {
          matchedItem = dataSource.find(c => c.id === 'toblerone-swiss-milk');
          matchReason = 'Huyền thoại socola sữa Thụy Sĩ đỉnh núi Matterhorn với hạnh nhân ngào đường giòn tan siêu cuốn và giá cực hời!';
        } else {
          matchedItem = dataSource.find(c => c.id === 'tonys-caramel-sea-salt');
          matchReason = 'Sự hòa quyện bùng nổ giữa muối biển nổ giòn, kẹo toffee caramel dẻo thơm và thanh socola sữa siêu dày đậm vị!';
        }
      } else if (ans2 === 'luxury' || ans3 === 'high') {
        matchedItem = dataSource.find(c => c.id === 'godiva-gold-collection');
        matchReason = 'Hộp quà vàng hoàng gia Bỉ sang trọng quý phái, lựa chọn đẳng cấp không thể bỏ lỡ!';
      } else {
        matchedItem = dataSource.find(c => c.productType === 'chocolate') || dataSource[0];
        matchReason = 'Lựa chọn tiêu biểu được đông đảo người sành ăn yêu thích và đánh giá xuất sắc nhất!';
      }

      if (!matchedItem) {
        matchedItem = dataSource.find(c => c.productType === 'chocolate') || dataSource[0] || {
          id: 'marou-daklak-70',
          name: 'Marou Đắk Lắk 70% Single Origin',
          brand: 'Marou Faiseurs de Chocolat',
          origin: 'Việt Nam 🇻🇳',
          price: 135000,
          cocoa: 70,
          badge: '🏆 Top 1 Bean-to-Bar Việt Nam',
          image: 'assets/images/marou_daklak.jpg'
        };
      }

      const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;

      elements.quizQuestionContainer.innerHTML = `
        <div style="padding: 10px 0;">
          <div style="font-size: 3.5rem; margin-bottom: 10px;">🎉🍫</div>
          <span class="quiz-step-badge">KẾT QUẢ ĐỀ XUẤT HOÀN HẢO CHO BẠN</span>
          <h3 style="font-size: 1.8rem; margin-bottom: 8px;">"${matchedItem.name}"</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 20px;">${matchReason}</p>
          
          <div style="background: var(--bg-surface-elevated); border: 1px solid var(--gold-primary); border-radius: var(--radius-md); padding: 20px; display: flex; align-items: center; gap: 20px; text-align: left; margin-bottom: 24px;">
            <img src="${matchedItem.image}" alt="${matchedItem.name}" style="width: 90px; height: 90px; object-fit: cover; border-radius: var(--radius-sm);" onerror="this.onerror=null; this.src='assets/images/placeholder.jpg';">
            <div>
              <div style="color: var(--gold-light); font-weight: 700;">${matchedItem.badge}</div>
              <div style="font-size: 0.85rem; color: var(--text-muted); margin: 4px 0;">${matchedItem.origin} • ${matchedItem.cocoa}% Cacao</div>
              <div style="font-size: 1.15rem; font-weight: 800; color: var(--gold-light);">${formatCurrency(matchedItem.price)}</div>
            </div>
          </div>

          <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
            <button type="button" class="btn-primary ${!currentUser ? 'btn-buy-locked' : ''}" data-action="buy" data-id="${matchedItem.id}" style="width: auto; padding: 10px 22px; display: inline-flex; align-items: center; gap: 6px; border: none; cursor: pointer;">
              ${currentUser ? '🛒 Đặt Mua Socola Này Ngay' : '🔒 Đăng Nhập Để Đặt Mua'}
            </button>
            <button class="btn-secondary" id="btnQuizViewDetail" style="padding: 10px 22px;">
              🔍 Xem Chi Tiết Ngay
            </button>
            <button class="btn-secondary" id="btnQuizRestart">
              🔄 Làm Lại
            </button>
            <button class="btn-secondary" id="btnSwitchToCandyQuiz">
              🍬 Thử Trắc Nghiệm Kẹo
            </button>
          </div>
        </div>
      `;

      document.getElementById('btnQuizViewDetail')?.addEventListener('click', () => {
        closeModal(elements.quizModal);
        openDetailModal(matchedItem.id);
      });

      document.getElementById('btnQuizRestart')?.addEventListener('click', () => startQuiz('chocolate'));
      document.getElementById('btnSwitchToCandyQuiz')?.addEventListener('click', () => startQuiz('candy'));
    }
  }

  // =========================================================================
  // MODAL UTILITIES
  // =========================================================================
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // =========================================================================
  // TOAST UTILITIES
  // =========================================================================
  function showToast(message, type = 'info') {
    if (!elements.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span>${type === 'warning' ? '⚠️' : '✨'}</span>
      <span>${message}</span>
    `;

    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  function formatCurrency(num) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
  }

  function resetFilters() {
    state.searchQuery = '';
    state.categoryFilter = 'all';
    state.cocoaFilter = 'all';
    state.priceFilter = 'all';
    state.sortMode = 'rating';
    state.showOnlyWishlist = false;

    if (elements.searchInput) elements.searchInput.value = '';
    if (elements.clearSearchBtn) elements.clearSearchBtn.style.display = 'none';
    if (elements.sortSelect) elements.sortSelect.value = 'rating';
    if (elements.cocoaFilterSelect) elements.cocoaFilterSelect.value = 'all';
    if (elements.priceFilterSelect) elements.priceFilterSelect.value = 'all';
    renderCategoryPills();
    renderChocolates();
    showToast('Đã đặt lại tất cả bộ lọc về mặc định.');
  }

  // =========================================================================
  // EVENT BINDINGS
  // =========================================================================
  function bindEvents() {
    // Search input
    if (elements.searchInput) {
      elements.searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        if (elements.clearSearchBtn) {
          elements.clearSearchBtn.style.display = state.searchQuery ? 'block' : 'none';
        }
        renderChocolates();
      });
    }

    if (elements.clearSearchBtn) {
      elements.clearSearchBtn.addEventListener('click', () => {
        state.searchQuery = '';
        elements.searchInput.value = '';
        elements.clearSearchBtn.style.display = 'none';
        renderChocolates();
      });
    }

    // Ranking mode switcher
    elements.rankingModeSwitch?.addEventListener('click', (e) => {
      const btn = e.target.closest('.mode-btn');
      if (btn && btn.dataset.mode) {
        setRankingMode(btn.dataset.mode);
      }
    });

    // Nav candies link
    elements.navCandiesLink?.addEventListener('click', (e) => {
      setRankingMode('candy');
      document.getElementById('rankings')?.scrollIntoView({ behavior: 'smooth' });
    });

    document.querySelectorAll('[data-nav-mode="chocolate"]').forEach(link => {
      link.addEventListener('click', () => {
        setRankingMode('chocolate');
      });
    });

    // Buy Guide Header Button
    elements.navBuyGuideBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(elements.buyGuideModal);
    });

    // Selects
    elements.sortSelect?.addEventListener('change', (e) => {
      state.sortMode = e.target.value;
      renderChocolates();
    });

    elements.cocoaFilterSelect?.addEventListener('change', (e) => {
      state.cocoaFilter = e.target.value;
      renderChocolates();
    });

    elements.priceFilterSelect?.addEventListener('change', (e) => {
      state.priceFilter = e.target.value;
      renderChocolates();
    });

    elements.resetFiltersBtn?.addEventListener('click', resetFilters);

    // Wishlist Header Button
    elements.wishlistBtn?.addEventListener('click', () => {
      state.showOnlyWishlist = !state.showOnlyWishlist;
      if (state.showOnlyWishlist) {
        showToast(`Đang lọc ${state.wishlist.length} sản phẩm trong danh sách yêu thích.`);
      } else {
        showToast('Đang hiển thị toàn bộ danh sách socola.');
      }
      renderChocolates();
    });

    // Card Delegate Clicks (Favorites, Compare, Detail)
    elements.chocolateGrid?.addEventListener('click', (e) => {
      const buyBtn = e.target.closest('[data-action="buy"]');
      if (buyBtn) {
        handleBuyProduct(buyBtn.dataset.id);
        return;
      }

      const favBtn = e.target.closest('[data-action="fav"]');
      if (favBtn) {
        toggleWishlist(favBtn.dataset.id);
        return;
      }

      const compareBtn = e.target.closest('[data-action="compare"]');
      if (compareBtn) {
        toggleCompare(compareBtn.dataset.id);
        return;
      }

      const detailBtn = e.target.closest('[data-action="detail"]');
      if (detailBtn) {
        openDetailModal(detailBtn.dataset.id);
        return;
      }
    });

    // Global Buy button handler (for cards, modals, compare table, quiz results)
    document.addEventListener('click', (e) => {
      const buyBtn = e.target.closest('[data-action="buy"]');
      if (buyBtn && !elements.chocolateGrid?.contains(buyBtn)) {
        handleBuyProduct(buyBtn.dataset.id);
      }
    });

    document.getElementById('cancelOrderBtn')?.addEventListener('click', () => {
      document.getElementById('mockOrderModal')?.classList.remove('active');
    });

    document.getElementById('modalQuickGuestLoginBtn')?.addEventListener('click', () => {
      if (typeof loginUser === 'function') {
        loginUser('khach@chocorank.com', '123456');
        document.getElementById('authRequiredModal')?.classList.remove('active');
        if (typeof renderAuthHeader === 'function') renderAuthHeader();
        renderChocolates();
        showToast('Đã kích hoạt tài khoản Khách VIP! Giờ bạn có thể đặt mua bất kỳ món nào.', 'success');
      }
    });

    // Custom Event from modal compare button
    document.addEventListener('toggle-compare-from-modal', (e) => {
      toggleCompare(e.detail);
    });

    // Comparison Tray Actions
    elements.openCompareBtn?.addEventListener('click', openCompareModal);
    elements.clearCompareBtn?.addEventListener('click', clearCompare);

    // Quiz Buttons
    elements.startQuizBtn?.addEventListener('click', () => startQuiz('chocolate'));
    elements.startQuizHeroBtn?.addEventListener('click', () => startQuiz('chocolate'));
    elements.startCandyQuizBtn?.addEventListener('click', () => startQuiz('candy'));
    elements.startCandyQuizHeroBtn?.addEventListener('click', () => startQuiz('candy'));

    // Creative Eating Styles Filter Tabs
    elements.stylesFilterTabs?.addEventListener('click', (e) => {
      const btn = e.target.closest('.style-tab-btn');
      if (btn && btn.dataset.styleFilter) {
        elements.stylesFilterTabs.querySelectorAll('.style-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.eatingStyleFilter = btn.dataset.styleFilter;
        renderEatingStyles();
      }
    });

    // Random Eating Style Button
    elements.randomEatingStyleBtn?.addEventListener('click', handleRandomEatingStyle);

    // Authenticity Tabs Switcher (Socola vs Kẹo)
    elements.authGuideTabs?.addEventListener('click', (e) => {
      const btn = e.target.closest('.auth-tab-btn');
      if (btn && btn.dataset.authTarget) {
        switchAuthGuide(btn.dataset.authTarget);
      }
    });

    // Detective Quiz Case Filter Pills
    document.getElementById('quizCaseFilter')?.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-case-filter]');
      if (btn) {
        document.querySelectorAll('#quizCaseFilter button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderAuthenticityCases(btn.dataset.caseFilter);
      }
    });

    // Modal Quiz Tabs Switcher
    elements.modalQuizTabs?.addEventListener('click', (e) => {
      const btn = e.target.closest('.quiz-tab-btn');
      if (btn && btn.dataset.quiz) {
        startQuiz(btn.dataset.quiz);
      }
    });

    // Close Modals
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal-overlay');
        closeModal(modal);
      });
    });

    // Click outside modal card to close
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          closeModal(overlay);
        }
      });
    });

    // Theme Toggle
    elements.themeToggleBtn?.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      elements.themeToggleBtn.textContent = newTheme === 'light' ? '☀️' : '🌙';
      showToast(newTheme === 'light' ? 'Đã chuyển sang giao diện Sáng' : 'Đã chuyển sang giao diện Tối Sang Trọng');
    });
  }

  // Run
  init();
});

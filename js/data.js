/**
 * CHOCOLATE DATASET - DỮ LIỆU THỐNG KÊ VÀ ĐÁNH GIÁ SOCOLA
 * Dữ liệu chi tiết về các dòng socola ngon nhất và đáng mua nhất thế giới & Việt Nam.
 */

// Biến toàn cục chứa dữ liệu 20 sản phẩm socola & kẹo thượng hạng
var CHOCOLATE_DATA = [
  {
    id: "marou-daklak-70",
    productType: "chocolate",
    name: "Marou Đắk Lắk 70% Single Origin",
    brand: "Marou Faiseurs de Chocolat",
    origin: "Việt Nam 🇻🇳",
    category: "artisanal",
    categoryName: "Socola Nghệ Nhân (Bean-to-Bar)",
    cocoa: 70,
    price: 135000,
    weight: "80g",
    priceTier: "Tầm trung (Mid-Range)",
    priceTierKey: "mid",
    image: "assets/images/marou_daklak.jpg",
    badge: "🏆 Top 1 Bean-to-Bar Việt Nam",
    badgeType: "gold",
    rank: 1,
    scores: {
      overall: 9.8,
      taste: 9.9,
      value: 9.6,
      texture: 9.7,
      aroma: 9.9,
      bitterness: 75,
      sweetness: 35,
      meltRate: 90
    },
    reviewsCount: 1420,
    tastingNotes: ["Mâm xôi rừng", "Hạt dẻ rang", "Gỗ thông ấm", "Vị chua thanh tự nhiên"],
    description: "Tuyệt tác socola thủ công từ vùng cao nguyên đất đỏ Đắk Lắk, được New York Times ca ngợi là 'loại socola tinh tế và lôi cuốn nhất thế giới'. Hạt cacao được lên men tự nhiên, không pha tạp bơ thực vật hay hương liệu công nghiệp.",
    pros: [
      "Hương vị nguyên bản, đa tầng phức hợp cực kỳ độc đáo",
      "Đạt nhiều giải thưởng danh giá của Viện Socola Quốc Tế (London)",
      "Bao bì hoa văn cung đình in lụa thủ công sang trọng"
    ],
    cons: [
      "Có vị chua trái cây tự nhiên đặc trưng của cacao lên men, người thích ngọt sẽ cần làm quen"
    ],
    pairing: ["Cà phê pha phin / Espresso", "Rượu vang đỏ Syrah", "Trà ô long cao cấp"],
    recommendedFor: "Người sành socola nguyên bản, thích hương vị thanh tao, tìm quà tặng đặc sản Việt Nam đẳng cấp quốc tế."
  },
  {
    id: "royce-nama-au-lait",
    productType: "chocolate",
    name: "Royce' Nama Chocolate - Au Lait",
    brand: "Royce' Confect",
    origin: "Nhật Bản 🇯🇵",
    category: "nama",
    categoryName: "Socola Tươi (Nama Chocolate)",
    cocoa: 48,
    price: 290000,
    weight: "Hộp 20 viên (190g)",
    priceTier: "Cao cấp (Premium)",
    priceTierKey: "high",
    image: "assets/images/royce_nama_au_lait.jpg",
    badge: "👑 Vua Socola Tươi Tan Chảy",
    badgeType: "gold",
    rank: 2,
    scores: {
      overall: 9.9,
      taste: 10.0,
      value: 8.9,
      texture: 10.0,
      aroma: 9.8,
      bitterness: 40,
      sweetness: 65,
      meltRate: 100
    },
    reviewsCount: 3890,
    tastingNotes: ["Kem sữa tươi Hokkaido", "Bột cacao nhung mịn", "Rượu mùi Cherry Marnier dịu", "Vani kem"],
    description: "Được mệnh danh là biểu tượng socola tươi đỉnh cao của châu Á. Sự kết hợp kỳ diệu giữa bột cacao đắng mịn phủ ngoài và hỗn hợp kem tươi hảo hạng của vùng Hokkaido khiến từng viên socola tan ngay tức thì khi vừa chạm đầu lưỡi.",
    pros: [
      "Độ mềm mịn số 1 thế giới, cảm giác tan chảy tuyệt đỉnh",
      "Vị ngọt thanh dịu hòa quyện cùng béo thơm của sữa tươi",
      "Đóng gói kèm muỗng cắt tinh tế, hoàn hảo làm quà tặng người yêu"
    ],
    cons: [
      "Cần bảo quản lạnh dưới 10°C liên tục, dễ chảy khi mang ngoài trời"
    ],
    pairing: ["Trà xanh Sencha", "Trà sữa nóng", "Cà phê Cappuccino"],
    recommendedFor: "Người thích cảm giác mềm mướt tan chảy, các cặp đôi, tín đồ ẩm thực Nhật Bản."
  },
  {
    id: "lindt-excellence-85",
    productType: "chocolate",
    name: "Lindt Excellence 85% Cacao Extra Dark",
    brand: "Lindt & Sprüngli",
    origin: "Thụy Sĩ 🇨🇭",
    category: "dark",
    categoryName: "Socola Đen Thượng Hạng",
    cocoa: 85,
    price: 95000,
    weight: "100g",
    priceTier: "Tiết kiệm / Đáng Mua Nhất (Best Value)",
    priceTierKey: "low",
    image: "assets/images/lindt_excellence_85.jpg",
    badge: "⭐ Đáng Mua Nhất Cho Sức Khỏe",
    badgeType: "silver",
    rank: 3,
    scores: {
      overall: 9.6,
      taste: 9.5,
      value: 9.9,
      texture: 9.6,
      aroma: 9.5,
      bitterness: 85,
      sweetness: 18,
      meltRate: 85
    },
    reviewsCount: 5210,
    tastingNotes: ["Cacao đậm sâu", "Gỗ mộc khô", "Khói nhẹ", "Hạt vani tự nhiên"],
    description: "Thước đo chuẩn mực cho dòng socola đen cao cấp toàn cầu từ các bậc thầy Maitre Chocolatier Thụy Sĩ từ năm 1845. Nồng độ 85% cacao mang lại hương vị mạnh mẽ nhưng được tinh chỉnh cực mịn nhờ kỹ thuật đảo trộn Conching độc quyền.",
    pros: [
      "Tỉ lệ giá trị / giá tiền (P/P) vô đối, dễ tìm mua tại mọi siêu thị",
      "Lượng đường cực thấp, giàu flavonoid chống oxy hóa và hỗ trợ tim mạch",
      "Độ mượt mà vượt trội so với các loại 85% cacao thông thường"
    ],
    cons: [
      "Vị đắng đậm, chỉ hợp với người đã quen hoặc chuộng socola đắng"
    ],
    pairing: ["Espresso nóng không đường", "Hạt óc chó / Hạnh nhân", "Rượu Bourbon"],
    recommendedFor: "Người ăn kiêng Keto, giảm cân, tập gym, dân văn phòng cần tỉnh táo, người mê vị đắng sâu."
  },
  {
    id: "godiva-gold-collection",
    productType: "chocolate",
    name: "Godiva Gold Ballotin Luxury Assortment",
    brand: "Godiva Chocolatier",
    origin: "Bỉ 🇧🇪",
    category: "praline",
    categoryName: "Hộp Quà Praline Hoàng Gia",
    cocoa: 55,
    price: 680000,
    weight: "Hộp 8 viên nghệ thuật",
    priceTier: "Xa xỉ (Luxury Gift)",
    priceTierKey: "high",
    image: "assets/images/godiva_gold.jpg",
    badge: "💎 Biểu Tượng Quà Tặng Hoàng Gia",
    badgeType: "gold",
    rank: 4,
    scores: {
      overall: 9.7,
      taste: 9.8,
      value: 8.4,
      texture: 9.8,
      aroma: 9.7,
      bitterness: 50,
      sweetness: 60,
      meltRate: 95
    },
    reviewsCount: 2150,
    tastingNotes: ["Praline hạt phỉ caramel", "Ganache socola đen 72%", "Vani Madagascar", "Bơ béo mượt"],
    description: "Nhà cung cấp socola chính thức cho Hoàng gia Bỉ. Hộp quà Ballotin ánh vàng kinh điển chứa đựng những viên socola nghệ thuật được tạo tác thủ công với nhân ganache mịn như lụa và praline hạt phỉ thơm lừng.",
    pros: [
      "Đẳng cấp quà tặng số 1 thế giới, bao bì hộp vàng thắt nơ sang trọng bậc nhất",
      "Hương vị đa dạng từ nhân hạt dẻ giòn, kẹo dẻo caramel tới ganache đen đắng",
      "Chất lượng bơ cacao tinh khiết 100% không pha tạp"
    ],
    cons: [
      "Giá thành phân khúc cao cấp xa xỉ"
    ],
    pairing: ["Rượu Champagne Brut", "Trà Bá tước Earl Grey", "Rượu vang Port"],
    recommendedFor: "Biếu tặng đối tác quan trọng, dịp lễ tết, kỷ niệm tình yêu đẳng cấp."
  },
  {
    id: "tonys-caramel-sea-salt",
    productType: "chocolate",
    name: "Tony's Chocolonely 32% Milk Caramel Sea Salt",
    brand: "Tony's Chocolonely",
    origin: "Hà Lan 🇳🇱",
    category: "milk",
    categoryName: "Socola Sữa Độc Bản",
    cocoa: 32,
    price: 140000,
    weight: "Thanh siêu dày 180g",
    priceTier: "Tầm trung - Siêu đáng tiền",
    priceTierKey: "mid",
    image: "assets/images/tonys_caramel.jpg",
    badge: "🌟 Đáng Đồng Tiền Bát Gạo Nhất",
    badgeType: "silver",
    rank: 5,
    scores: {
      overall: 9.5,
      taste: 9.7,
      value: 9.8,
      texture: 9.4,
      aroma: 9.3,
      bitterness: 20,
      sweetness: 72,
      meltRate: 88
    },
    reviewsCount: 4600,
    tastingNotes: ["Muối biển nổ giòn", "Kẹo toffee caramel dẻo", "Sữa béo bão hòa", "Bơ cacao nguyên chất"],
    description: "Cơn sốt toàn cầu đến từ Hà Lan với triết lý socola công bằng 100% không bóc lột nông dân cacao. Thanh socola chia ô không đều nhau tượng trưng cho sự bất bình đẳng trong ngành, vị mặn của muối biển hòa quyện ngọt béo tạo nên vị ngon bùng nổ.",
    pros: [
      "Khối lượng 180g cực kỳ dày dặn, ăn thỏa thích",
      "Vị muối biển tương phản ngọt caramel xuất sắc, không hề bị ngấy",
      "Cam kết 100% Fairtrade nhân văn và bền vững"
    ],
    cons: [
      "Thanh socola dày và cứng, hơi khó bẻ cho người thích miếng mỏng"
    ],
    pairing: ["Sữa tươi lạnh", "Cà phê Latte", "Bia đen Stout"],
    recommendedFor: "Người mê vị béo ngọt mặn đan xen, thích ăn vặt, giới trẻ cá tính."
  },
  {
    id: "ferrero-rocher-gold",
    productType: "chocolate",
    name: "Ferrero Rocher Hazelnut Pralines",
    brand: "Ferrero Group",
    origin: "Ý 🇮🇹",
    category: "praline",
    categoryName: "Socola Hạt Phỉ Hoàng Gia",
    cocoa: 42,
    price: 155000,
    weight: "Hộp 16 viên (200g)",
    priceTier: "Tiết kiệm / Đáng Mua Nhất (Best Value)",
    priceTierKey: "low",
    image: "assets/images/ferrero_rocher.jpg",
    badge: "🔥 Bán Chạy Nhất Thế Giới",
    badgeType: "bronze",
    rank: 6,
    scores: {
      overall: 9.4,
      taste: 9.5,
      value: 9.9,
      texture: 9.7,
      aroma: 9.4,
      bitterness: 25,
      sweetness: 75,
      meltRate: 92
    },
    reviewsCount: 8900,
    tastingNotes: ["Hạt phỉ rang giòn", "Kem chocolate hạt dẻ Nutella", "Vỏ bánh quế xốp", "Socola sữa vụn hạt"],
    description: "Loại socola phổ biến nhất hành tinh vào mỗi dịp Giáng sinh và Valentine. Cấu trúc 4 tầng hoàn hảo: hạt phỉ Piedmont giòn nguyên hạt ở trung tâm, bao bọc bởi kem chocolate mượt mà, lớp bánh quế giòn rụm và áo ngoài bởi socola sữa rắc hạt phỉ giã nhỏ.",
    pros: [
      "Kết cấu giòn tan đa tầng nhai cực đã tai và thơm bùi",
      "Giá thành cực tốt, thiết kế giấy bạc vàng bắt mắt làm quà tặng",
      "Phù hợp với khẩu vị của mọi lứa tuổi từ trẻ em đến người lớn"
    ],
    cons: [
      "Độ ngọt tương đối cao đối với người ăn kiêng"
    ],
    pairing: ["Trà đen Ceylon", "Sữa hạt hạnh nhân", "Kem vani"],
    recommendedFor: "Gia đình, liên hoan tiệc tùng, quà tặng phổ thông ai cũng yêu thích."
  },
  {
    id: "valrhona-guanaja-70",
    productType: "chocolate",
    name: "Valrhona Guanaja 70% Dark Grand Cru",
    brand: "Valrhona",
    origin: "Pháp 🇫🇷",
    category: "artisanal",
    categoryName: "Socola Grand Cru Đầu Bếp",
    cocoa: 70,
    price: 210000,
    weight: "Thanh 70g",
    priceTier: "Cao cấp (Premium)",
    priceTierKey: "high",
    image: "assets/images/valrhona_guanaja.jpg",
    badge: "👨‍🍳 Tuyệt Tác Đầu Bếp Michelin",
    badgeType: "gold",
    rank: 7,
    scores: {
      overall: 9.8,
      taste: 9.9,
      value: 8.8,
      texture: 9.9,
      aroma: 10.0,
      bitterness: 75,
      sweetness: 28,
      meltRate: 94
    },
    reviewsCount: 1680,
    tastingNotes: ["Hương hoa khô", "Vị đắng quý phái", "Gỗ sồi ấm", "Trái cây sấy khô"],
    description: "Được sáng tạo năm 1986 bởi Valrhona, Guanaja là dòng socola 70% cacao đầu tiên trên thế giới mở ra kỷ nguyên socola đắng cao cấp. Đây là bí quyết đằng sau những món tráng miệng tại các nhà hàng đạt sao Michelin trên khắp 5 châu lục.",
    pros: [
      "Độ đắng thanh lịch, không hề gắt, hậu vị kéo dài đến vài phút",
      "Khả năng nhũ hóa và ứng dụng làm bánh/mousse vô đối",
      "Nguyên liệu hạt cacao quý hiếm tuyển chọn từ vùng Caribe"
    ],
    cons: [
      "Giá thành cao tính theo trọng lượng 70g"
    ],
    pairing: ["Rượu vang đỏ Bordeaux / Pinot Noir", "Whisky khói Islay", "Cà phê Cold Brew"],
    recommendedFor: "Chuyên gia ẩm thực, thợ làm bánh cao cấp, người tìm kiếm trải nghiệm socola tinh hoa."
  },
  {
    id: "marou-baria-76",
    productType: "chocolate",
    name: "Marou Bà Rịa 76% Single Origin",
    brand: "Marou Faiseurs de Chocolat",
    origin: "Việt Nam 🇻🇳",
    category: "artisanal",
    categoryName: "Socola Nghệ Nhân (Bean-to-Bar)",
    cocoa: 76,
    price: 135000,
    weight: "80g",
    priceTier: "Tầm trung (Mid-Range)",
    priceTierKey: "mid",
    image: "assets/images/marou_baria.jpg",
    badge: "🌶️ Nốt Hương Trái Cây Độc Bản",
    badgeType: "silver",
    rank: 8,
    scores: {
      overall: 9.7,
      taste: 9.8,
      value: 9.5,
      texture: 9.6,
      aroma: 9.8,
      bitterness: 80,
      sweetness: 25,
      meltRate: 89
    },
    reviewsCount: 1250,
    tastingNotes: ["Trái cây nhiệt đới lên men", "Cam thảo thảo mộc", "Vị chua chanh dây thanh", "Cacao đất đỏ"],
    description: "Hạt cacao từ những vườn nông hộ nhỏ lẻ tại vùng Bà Rịa, hấp thụ ánh nắng duyên hải và thổ nhưỡng đặc thù tạo nên nốt hương trái cây bùng nổ mãnh liệt, độ chua sáng sủa và hậu vị sâu lắng khó quên.",
    pros: [
      "Dải hương hoa quả nhiệt đới độc nhất vô nhị không tìm thấy ở socola công nghiệp",
      "Mẫu bao bì màu đỏ son ánh vàng cực kỳ tinh xảo",
      "Hàm lượng dinh dưỡng và chất chống oxy hóa dồi dào"
    ],
    cons: [
      "Vị chua thanh khá rõ rệt, cần người am hiểu thưởng thức"
    ],
    pairing: ["Trà lài (Jasmine)", "Rượu Rum ủ thùng gỗ sồi", "Cà phê pour-over Arabica"],
    recommendedFor: "Người đam mê văn hóa ẩm thực bản địa, thích trải nghiệm socola Specialty cao cấp."
  },
  {
    id: "royce-nama-matcha",
    productType: "chocolate",
    name: "Royce' Nama Chocolate - Maccha Green Tea",
    brand: "Royce' Confect",
    origin: "Nhật Bản 🇯🇵",
    category: "white",
    categoryName: "Socola Tươi Trà Xanh Kyoto",
    cocoa: 32,
    price: 290000,
    weight: "Hộp 20 viên (190g)",
    priceTier: "Cao cấp (Premium)",
    priceTierKey: "high",
    image: "assets/images/royce_nama_matcha.jpg",
    badge: "🍵 Đệ Nhất Socola Trà Xanh",
    badgeType: "gold",
    rank: 9,
    scores: {
      overall: 9.7,
      taste: 9.8,
      value: 8.8,
      texture: 9.9,
      aroma: 9.7,
      bitterness: 45,
      sweetness: 55,
      meltRate: 100
    },
    reviewsCount: 2980,
    tastingNotes: ["Bột trà xanh Uji Kyoto", "Bơ cacao trắng thơm béo", "Kem tươi Hokkaido", "Chát nhẹ hậu ngọt sâu"],
    description: "Tuyệt tác giao thoa giữa bơ cacao trắng thượng hạng, kem sữa tươi Nhật Bản và bột trà xanh Matcha Uji lừng danh Kyoto. Vị chát thanh thoát ban đầu chuyển hóa mượt mà thành vị ngọt béo dịu dàng lưu luyến nơi cổ họng.",
    pros: [
      "Hương trà xanh tự nhiên 100% cực kỳ đậm vị và thanh khiết",
      "Độ tan chảy mềm mịn trứ danh của dòng Nama Chocolate",
      "Màu xanh ngọc bích sang trọng, không chứa phẩm màu hóa học"
    ],
    cons: [
      "Yêu cầu bảo quản đông/mát nghiêm ngặt"
    ],
    pairing: ["Trà xanh Genmaicha (trà gạo rang)", "Nước khoáng có ga lạnh"],
    recommendedFor: "Hội ghiền Matcha Nhật, người thích vị thanh nhẹ không quá đắng cũng không quá ngấy."
  },
  {
    id: "guylian-sea-shells",
    productType: "chocolate",
    name: "Guylian The Original Belgian Sea Shells",
    brand: "Guylian Chocolaterie",
    origin: "Bỉ 🇧🇪",
    category: "praline",
    categoryName: "Socola Vỏ Sò Praline Cổ Điển",
    cocoa: 44,
    price: 240000,
    weight: "Hộp 250g (22 viên)",
    priceTier: "Tầm trung (Mid-Range)",
    priceTierKey: "mid",
    image: "assets/images/guylian_seashells.jpg",
    badge: "🐚 Biểu Tượng Vỏ Sò Praline Bỉ",
    badgeType: "bronze",
    rank: 10,
    scores: {
      overall: 9.3,
      taste: 9.4,
      value: 9.2,
      texture: 9.5,
      aroma: 9.2,
      bitterness: 35,
      sweetness: 68,
      meltRate: 91
    },
    reviewsCount: 3100,
    tastingNotes: ["Hạt phỉ rang kiểu Bỉ", "Bơ sữa cẩm thạch", "Caramel béo ngậy", "Vani tự nhiên"],
    description: "Những chiếc vỏ sò và hải mã bằng socola cẩm thạch vân trắng - nâu trứ danh được tạo ra tại Sint-Niklaas (Bỉ) từ năm 1958. Bí quyết nằm ở công thức nhân praline hạt phỉ rang trong những chiếc chảo đồng truyền thống.",
    pros: [
      "Tạo hình vỏ sò đại dương tuyệt mỹ đầy tính nghệ thuật",
      "Nhân praline thơm bùi đậm đà tan chảy êm ái",
      "Được làm hoàn toàn từ 100% bơ cacao nguyên chất"
    ],
    cons: [
      "Vị ngọt béo khá đượm, nên dùng kèm trà nóng"
    ],
    pairing: ["Trà đen Bá tước", "Cà phê Americano nóng", "Rượu vang tráng miệng"],
    recommendedFor: "Làm quà tặng gia đình, người yêu thích socola ngọt béo hạt phỉ kiểu châu Âu."
  },
  {
    id: "ghirardelli-intense-72",
    productType: "chocolate",
    name: "Ghirardelli Intense Dark 72% Twilight Delight",
    brand: "Ghirardelli Chocolate Company",
    origin: "Mỹ 🇺🇸",
    category: "dark",
    categoryName: "Socola Đen Cân Bằng Chuẩn Mỹ",
    cocoa: 72,
    price: 120000,
    weight: "100g",
    priceTier: "Tầm trung (Mid-Range)",
    priceTierKey: "mid",
    image: "assets/images/ghirardelli_72.jpg",
    badge: "⚡ Cân Bằng Đậm Đà Chuẩn Mỹ",
    badgeType: "silver",
    rank: 11,
    scores: {
      overall: 9.3,
      taste: 9.3,
      value: 9.4,
      texture: 9.3,
      aroma: 9.2,
      bitterness: 72,
      sweetness: 36,
      meltRate: 87
    },
    reviewsCount: 2750,
    tastingNotes: ["Cherry đen", "Mận chín ngâm", "Khói gỗ sồi nhẹ", "Cacao nồng nàn"],
    description: "Đến từ thương hiệu socola danh tiếng San Francisco từ năm 1852. Dòng 72% Twilight Delight là điểm giao thoa hoàn hảo giữa vị đắng sâu sắc của cacao rang xay kỹ lưỡng và các nốt hương trái cây sẫm màu thanh khiết.",
    pros: [
      "Độ đắng 72% rất dễ làm quen, không bị chua gắt hay quá đắng chát",
      "Từng miếng socola mỏng dễ bẻ rắc trên bánh hoặc thưởng thức từng miếng nhỏ",
      "Chất lượng ổn định của một trong những thương hiệu lâu đời nhất nước Mỹ"
    ],
    cons: [
      "Hương vị thiên về phong cách công nghiệp cao cấp, ít nốt hương hoang dã như socola nghệ nhân"
    ],
    pairing: ["Cà phê đen đá", "Rượu vang đỏ Cabernet Sauvignon", "Phô mai Brie"],
    recommendedFor: "Người mới bắt đầu chuyển từ socola sữa sang socola đen, người thích vị đắng dịu ngọt ngào."
  },
  {
    id: "toblerone-swiss-milk",
    productType: "chocolate",
    name: "Toblerone Swiss Milk Chocolate with Honey & Almond",
    brand: "Mondelez / Toblerone",
    origin: "Thụy Sĩ 🇨🇭",
    category: "milk",
    categoryName: "Socola Sữa Mật Ong Hạnh Nhân",
    cocoa: 35,
    price: 55000,
    weight: "100g",
    priceTier: "Tiết kiệm / Bình dân (Budget)",
    priceTierKey: "low",
    image: "assets/images/toblerone_swiss.jpg",
    badge: "🏔️ Huyền Thoại Núi Tuyết Thụy Sĩ",
    badgeType: "bronze",
    rank: 12,
    scores: {
      overall: 9.2,
      taste: 9.3,
      value: 9.8,
      texture: 9.0,
      aroma: 9.1,
      bitterness: 25,
      sweetness: 80,
      meltRate: 85
    },
    reviewsCount: 11200,
    tastingNotes: ["Mật ong hoa dại", "Kẹo hạnh nhân nougat giòn dẻo", "Sữa bò tươi vùng Alps"],
    description: "Biểu tượng đỉnh núi Matterhorn của dãy Alps hùng vĩ. Với thiết kế tam giác huyền thoại từ năm 1908, Toblerone chinh phục hàng trăm triệu người nhờ kẹo nougat hạnh nhân mật ong dẻo giòn vui miệng ẩn trong socola sữa Thụy Sĩ mịn màng.",
    pros: [
      "Mức giá cực kỳ bình dân, mua được ở bất cứ đâu",
      "Kẹo nougat nhai dẻo dẻo giòn giòn siêu gây nghiện",
      "Thanh tam giác tiện lợi dễ bẻ từng khía"
    ],
    cons: [
      "Ngọt nhiều, kẹo dính răng nếu ăn quá nhanh"
    ],
    pairing: ["Sữa nóng", "Trà xanh không đường", "Bánh quy nhạt"],
    recommendedFor: "Học sinh, sinh viên, ăn vặt nạp năng lượng tức thì khi leo núi dã ngoại."
  },

  // =========================================================================
  // TOP CÁC LOẠI KẸO NGON NHẤT & ĐÁNG MUA NHẤT THẾ GIỚI & VIỆT NAM
  // =========================================================================
  {
    id: "haribo-goldbears",
    productType: "candy",
    name: "Kẹo Dẻo Haribo Goldbären (Goldbears)",
    brand: "Haribo",
    origin: "Đức 🇩🇪",
    category: "candy-gummy",
    categoryName: "Kẹo Dẻo Trái Cây (Gummy)",
    candyFeature: "Nước Ép Trái Cây Thật",
    cocoa: 0,
    price: 42000,
    weight: "Gói 80g / 200g",
    priceTier: "Tiết kiệm / Đáng Mua Nhất (Best Value)",
    priceTierKey: "low",
    image: "assets/images/haribo_goldbears.jpg",
    badge: "👑 Vua Kẹo Dẻo Số 1 Thế Giới",
    badgeType: "gold",
    rank: 1,
    scores: {
      overall: 9.8,
      taste: 9.9,
      value: 9.9,
      texture: 9.9,
      aroma: 9.6,
      bitterness: 0,
      sweetness: 60,
      meltRate: 75
    },
    reviewsCount: 15400,
    tastingNotes: ["Dâu tây mọng", "Táo xanh giòn", "Chanh vàng chua ngọt", "Mâm xôi rừng", "Dứa ngọt lịm", "Cam tươi"],
    description: "Biểu tượng kẹo dẻo nổi tiếng nhất mọi thời đại được sáng chế tại Bonn (Đức) từ năm 1922. Chú gấu vàng huyền thoại làm từ nước ép trái cây cô đặc tự nhiên, độ dai dẻo đàn hồi hoàn hảo không dính răng, chinh phục hàng trăm triệu người mê kẹo khắp năm châu.",
    pros: [
      "Độ dai dẻo chuẩn mực không bị bở hay quá cứng, nhai cực đã miệng",
      "6 vị trái cây tự nhiên không chứa màu nhân tạo độc hại",
      "Mức giá cực kỳ bình dân, dễ tìm mua tại mọi siêu thị và cửa hàng tiện lợi"
    ],
    cons: [
      "Nhai nhiều có thể hơi mỏi cơ hàm đối với người quen ăn kẹo mềm"
    ],
    pairing: ["Trà đào lạnh", "Nước ép táo", "Trà hoa cúc"],
    recommendedFor: "Mọi lứa tuổi, ăn vặt khi xem phim, học tập, lái xe cần tập trung hoặc tụ tập bạn bè."
  },
  {
    id: "werthers-original-caramel",
    productType: "candy",
    name: "Kẹo Bơ Cứng Werther's Original Cream Candies",
    brand: "August Storck KG",
    origin: "Đức 🇩🇪",
    category: "candy-caramel",
    categoryName: "Kẹo Bơ & Toffee Caramel",
    candyFeature: "Bơ Kem Sữa Tươi Truyền Thống",
    cocoa: 0,
    price: 58000,
    weight: "Gói 135g (Khoảng 25 viên)",
    priceTier: "Tiết kiệm / Đáng Mua Nhất (Best Value)",
    priceTierKey: "low",
    image: "assets/images/werthers_caramel.jpg",
    badge: "🧈 Huyền Thoại Kẹo Bơ Đức 1903",
    badgeType: "gold",
    rank: 2,
    scores: {
      overall: 9.7,
      taste: 9.8,
      value: 9.7,
      texture: 9.8,
      aroma: 9.9,
      bitterness: 5,
      sweetness: 68,
      meltRate: 92
    },
    reviewsCount: 12100,
    tastingNotes: ["Bơ tươi béo ngậy", "Đường mía thắng caramel", "Kem sữa đặc hảo hạng", "Muối tinh dịu nhẹ"],
    description: "Tuyệt tác kẹo bơ từ ngôi làng nhỏ Werther (Đức) ra đời năm 1903. Công thức gia truyền sử dụng bơ thật và kem sữa tươi nguyên chất nấu chậm, tạo nên viên kẹo vàng óng ánh, láng mịn tan dần trong khoang miệng để lại hậu vị béo thơm khó cưỡng.",
    pros: [
      "Hương thơm bơ caramel tự nhiên cực kỳ quý phái và đậm đà",
      "Bề mặt viên kẹo láng mịn tuyệt đối, ngậm tan êm ái",
      "Bao bì từng viên tiện lợi, thích hợp để bàn làm việc tiếp khách"
    ],
    cons: [
      "Vị ngọt tương đối đượm, người kiêng đường nên dùng lượng vừa phải"
    ],
    pairing: ["Cà phê đen nóng", "Trà mạn Earl Grey", "Sữa tươi ấm"],
    recommendedFor: "Dân văn phòng, người lớn tuổi, fan ruột của vị bơ caramel truyền thống châu Âu."
  },
  {
    id: "ricola-original-herb",
    productType: "candy",
    name: "Kẹo Ngậm Thảo Dược Ricola Original Herb Drops",
    brand: "Ricola AG",
    origin: "Thụy Sĩ 🇨🇭",
    category: "candy-herbal",
    categoryName: "Kẹo Thảo Dược & Ngậm Dịu Họng",
    candyFeature: "13 Loại Thảo Dược Núi Alps",
    cocoa: 0,
    price: 48000,
    weight: "Hộp thiếc 50g / Gói 100g",
    priceTier: "Tiết kiệm / Bình Dân (Budget)",
    priceTierKey: "low",
    image: "assets/images/ricola_herb.jpg",
    badge: "🌿 Thảo Dược Vàng Dịu Họng Sảng Khoái",
    badgeType: "gold",
    rank: 3,
    scores: {
      overall: 9.7,
      taste: 9.6,
      value: 9.8,
      texture: 9.7,
      aroma: 10.0,
      bitterness: 20,
      sweetness: 45,
      meltRate: 80
    },
    reviewsCount: 9800,
    tastingNotes: ["Bạc hà cay thanh", "Cỏ xạ hương ấm", "Cỏ xô thơm (Sage)", "Bạc hà chanh", "Cỏ thi thanh lọc"],
    description: "Sự kết hợp kỳ diệu của 13 loại thảo mộc tự nhiên được trồng hoàn toàn hữu cơ trên những sườn đồi núi tuyết Thụy Sĩ. Vị ngọt thanh mát, the nhẹ tự nhiên giúp làm dịu tức thì cảm giác rát họng, thông mũi và mang lại hơi thở thơm tho sảng khoái.",
    pros: [
      "Làm dịu họng và thông mũi cực kỳ hiệu quả, bảo vệ cổ họng cho ca sĩ/giáo viên",
      "Không chứa màu và hương liệu nhân tạo, thành phần thảo mộc hữu cơ",
      "Vị ngọt dịu nhẹ, không bị gắt cổ như các loại kẹo ngậm thông thường"
    ],
    cons: [
      "Hương thảo mộc đặc trưng, người không quen vị the mát cần chút thời gian làm quen"
    ],
    pairing: ["Nước ấm", "Trà mật ong gừng", "Trà hoa cúc nóng"],
    recommendedFor: "Giáo viên, ca sĩ, nhân viên tư vấn, người bị ho khan, người tìm kiếm kẹo bổ dưỡng cho cổ họng."
  },
  {
    id: "cavendish-harvey-fruit",
    productType: "candy",
    name: "Kẹo Trái Cây Thủy Tinh Cavendish & Harvey Mixed Drops",
    brand: "Cavendish & Harvey",
    origin: "Đức 🇩🇪",
    category: "candy-fruit",
    categoryName: "Kẹo Trái Cây Cao Cấp Hộp Thiếc",
    candyFeature: "Nước Ép Trái Cây Phủ Đường Bột",
    cocoa: 0,
    price: 68000,
    weight: "Hộp thiếc vàng 200g",
    priceTier: "Tầm trung (Mid-Range)",
    priceTierKey: "mid",
    image: "assets/images/cavendish_harvey.jpg",
    badge: "💎 Biểu Tượng Kẹo Thủy Tinh Hoàng Gia",
    badgeType: "silver",
    rank: 4,
    scores: {
      overall: 9.6,
      taste: 9.7,
      value: 9.6,
      texture: 9.5,
      aroma: 9.8,
      bitterness: 5,
      sweetness: 62,
      meltRate: 85
    },
    reviewsCount: 7600,
    tastingNotes: ["Anh đào đen (Black Cherry)", "Bưởi hồng mọng nước", "Chanh vàng zesty", "Cam ngọt chín mọng", "Lê xanh thanh mát"],
    description: "Hộp thiếc vàng ánh kim sang trọng của thương hiệu kẹo thủ công Đức lừng danh. Từng viên kẹo trong suốt lấp lánh như những viên ngọc thủy tinh, được áo một lớp đường bột trắng mịn chống dính, giữ trọn vẹn vị nước ép hoa quả tự nhiên bùng nổ.",
    pros: [
      "Hộp thiếc sang trọng đẳng cấp, dùng làm quà biếu tặng hoặc để trên ô tô rất lịch sự",
      "Viên kẹo trong vắt ánh thủy tinh, nước ép trái cây thật ngọt thanh mát",
      "Khối lượng 200g đầy đặn, bảo quản kín giữ hương vị cực lâu"
    ],
    cons: [
      "Kẹo kích thước hơi to, trẻ nhỏ ngậm cần có sự chú ý của người lớn"
    ],
    pairing: ["Trà sen Tây Hồ", "Trà đen tuyết Shan", "Nước khoáng có ga"],
    recommendedFor: "Để xe ô tô, bàn lễ tân công ty, phòng khách gia đình, quà tặng dịp lễ Tết."
  },
  {
    id: "morinaga-hi-chew",
    productType: "candy",
    name: "Kẹo Nhai Trái Cây Morinaga Hi-Chew Sensation",
    brand: "Morinaga & Co.",
    origin: "Nhật Bản 🇯🇵",
    category: "candy-gummy",
    categoryName: "Kẹo Sữa Mềm & Trái Cây",
    candyFeature: "Công Nghệ Nhồi Nhân Đôi Độc Quyền",
    cocoa: 0,
    price: 32000,
    weight: "Thanh 57g (10 viên)",
    priceTier: "Tiết kiệm / Đáng Mua Nhất (Best Value)",
    priceTierKey: "low",
    image: "assets/images/hichew_fruit.jpg",
    badge: "🍓 Đệ Nhất Kẹo Nhai Trái Cây Nhật Bản",
    badgeType: "gold",
    rank: 5,
    scores: {
      overall: 9.6,
      taste: 9.8,
      value: 9.7,
      texture: 9.8,
      aroma: 9.6,
      bitterness: 0,
      sweetness: 65,
      meltRate: 82
    },
    reviewsCount: 8900,
    tastingNotes: ["Nho tím Kyoho chín mọng", "Dâu tây Tochigi thơm lừng", "Xoài nhiệt đới chín cây", "Táo xanh Nagano thanh mát"],
    description: "Cơn sốt kẹo nhai số 1 Nhật Bản do nhà sáng lập Taichiro Morinaga phát minh để người Nhật có thể nhai kẹo nuốt an toàn thay vì bã kẹo cao su. Cấu trúc 2 tầng độc đáo: lớp kẹo trắng sữa mềm bọc ngoài lõi trái cây cô đặc bung tỏa nước ép khi nhai.",
    pros: [
      "Độ nhai dai mềm 'chewy' siêu đã miệng, càng nhai càng thơm béo",
      "Mùi hương trái cây đậm vị tự nhiên như đang cắn quả tươi",
      "Viên kẹo bọc giấy từng viên tiện lợi, bỏ túi mang đi học/đi làm dễ dàng"
    ],
    cons: [
      "Rất dễ gây nghiện, khó dừng lại ở một vài viên"
    ],
    pairing: ["Trà sữa Oolong", "Sữa đậu nành ướp lạnh", "Nước chanh mát"],
    recommendedFor: "Học sinh, sinh viên, giới trẻ thích kẹo dẻo mềm thơm bùng nổ vị giác."
  },
  {
    id: "mms-peanut-candy",
    productType: "candy",
    name: "Kẹo Socola Đậu Phộng M&M's Peanut Candies",
    brand: "Mars Wrigley",
    origin: "Mỹ 🇺🇸",
    category: "candy-nut",
    categoryName: "Kẹo Hạt Giòn Bọc Đường",
    candyFeature: "Đậu Phộng Rang Giòn Bọc Socola",
    cocoa: 25,
    price: 35000,
    weight: "Gói 90g",
    priceTier: "Tiết kiệm / Bình Dân (Budget)",
    priceTierKey: "low",
    image: "assets/images/mms_peanut.jpg",
    badge: "🥜 Kẹo Đậu Phộng Bán Chạy Nhất Hành Tinh",
    badgeType: "silver",
    rank: 6,
    scores: {
      overall: 9.5,
      taste: 9.6,
      value: 9.8,
      texture: 9.7,
      aroma: 9.3,
      bitterness: 15,
      sweetness: 70,
      meltRate: 88
    },
    reviewsCount: 16800,
    tastingNotes: ["Hạt lạc rang giòn bùi", "Socola sữa béo ngậy", "Vỏ đường giòn rụm đa sắc màu"],
    description: "Khẩu hiệu kinh điển 'Chỉ tan trong miệng, không tan trên tay' đã làm nên lịch sử ngành kẹo thế giới từ năm 1941. Viên đậu phộng hảo hạng rang thơm phức được bọc lớp socola sữa mượt mà và áo lớp vỏ kẹo giòn tan rực rỡ sắc màu vui nhộn.",
    pros: [
      "Cảm giác cắn vỡ lớp vỏ giòn rụm kết hợp đậu phộng bùi béo ăn cực cuốn",
      "Không lo bị chảy dính tay khi cầm ở nhiệt độ phòng",
      "Thương hiệu toàn cầu gắn liền với tuổi thơ của hàng trăm triệu người"
    ],
    cons: [
      "Lượng calo và độ ngọt tương đối cao nếu ăn cả gói lớn"
    ],
    pairing: ["Sữa tươi không đường", "Bắp rang bơ", "Cà phê Americano đá"],
    recommendedFor: "Món ăn vặt khi xem phim rạp, tiệc sinh nhật bạn bè, dã ngoại cuối tuần."
  },
  {
    id: "keo-dua-sap-bentre",
    productType: "candy",
    name: "Kẹo Dừa Sáp Nước Cốt Dừa Bến Tre Thượng Hạng",
    brand: "Đặc Sản Xứ Dừa Bến Tre",
    origin: "Việt Nam 🇻🇳",
    category: "candy-traditional",
    categoryName: "Kẹo Đặc Sản Dân Gian Truyền Thống",
    candyFeature: "100% Nước Cốt Dừa & Dừa Sáp Tươi",
    cocoa: 0,
    price: 65000,
    weight: "Hộp 300g (Khoảng 35 viên)",
    priceTier: "Tiết kiệm / Đáng Mua Nhất (Best Value)",
    priceTierKey: "low",
    image: "assets/images/keo_dua_bentre.jpg",
    badge: "🥥 Tinh Hoa Đặc Sản Xứ Dừa Bến Tre",
    badgeType: "gold",
    rank: 7,
    scores: {
      overall: 9.6,
      taste: 9.8,
      value: 9.9,
      texture: 9.5,
      aroma: 9.9,
      bitterness: 0,
      sweetness: 65,
      meltRate: 90
    },
    reviewsCount: 5400,
    tastingNotes: ["Cơm dừa sáp dẻo quánh", "Nước cốt dừa béo ngậy", "Mạch nha lúa mì dẻo thơm", "Cơm sầu riêng / lá dứa thoang thoảng"],
    description: "Đặc sản quốc hồn quốc túy của vùng đất phù sa Bến Tre. Kẹo được sên thủ công từ nước cốt dừa tươi mới vắt kết hợp cơm dừa sáp béo ngậy và mạch nha thiên nhiên. Từng viên kẹo bọc bánh tráng mỏng tan mềm dẻo ngậm vào béo thơm nức mũi.",
    pros: [
      "Độ béo ngậy tự nhiên 100% từ dừa sáp, không dùng chất béo chuyển hóa công nghiệp",
      "Bọc giấy bánh tráng ăn liền truyền thống dẻo dai vui miệng",
      "Mức giá quá hời cho một hộp 300g làm quà biếu đặc sản quê hương"
    ],
    cons: [
      "Ăn nhiều liên tục dễ bị no ngấy do độ béo đậm đặc của nước cốt dừa"
    ],
    pairing: ["Trà xanh Thái Nguyên nóng", "Trà Ô long", "Nước trà cung đình"],
    recommendedFor: "Thưởng thức cùng trà nóng đàm đạo, quà biếu người thân bạn bè quốc tế, tín đồ vị dừa."
  },
  {
    id: "keo-cu-do-hatinh",
    productType: "candy",
    name: "Kẹo Cu Đơ Hà Tĩnh Mật Mía Gừng Cay Giòn Rụm",
    brand: "Làng Nghề Truyền Thống Hương Sơn",
    origin: "Việt Nam 🇻🇳",
    category: "candy-traditional",
    categoryName: "Kẹo Đặc Sản Dân Gian Truyền Thống",
    candyFeature: "Mật Mía Đậm Đặc & Gừng Già Cay Ấm",
    cocoa: 0,
    price: 55000,
    weight: "Tập 5 chiếc lớn (Khoảng 450g)",
    priceTier: "Tiết kiệm / Bình Dân (Budget)",
    priceTierKey: "low",
    image: "assets/images/keo_cudo_hatinh.jpg",
    badge: "🥜 Đệ Nhất Kẹo Lạc Mật Mía Bắc Trung Bộ",
    badgeType: "bronze",
    rank: 8,
    scores: {
      overall: 9.4,
      taste: 9.6,
      value: 10.0,
      texture: 9.4,
      aroma: 9.8,
      bitterness: 10,
      sweetness: 58,
      meltRate: 70
    },
    reviewsCount: 4300,
    tastingNotes: ["Mật mía Nghệ Tĩnh nồng nàn", "Lạc nhân (đậu phộng) giòn bùi", "Gừng tươi cay nồng ấm bụng", "Bánh tráng nướng vừng thơm lừng"],
    description: "Món kẹo dân dã đậm đà tình quê xứ Nghệ ra đời từ thế kỷ trước. Sự hòa quyện thần sầu giữa mật mía cô đặc thơm ngát, vị cay xè của gừng già thái lát và những hạt lạc giòn bùi được kẹp chặt giữa hai lớp bánh tráng vừng nướng giòn tan trên than hồng.",
    pros: [
      "Vị cay ấm của gừng kết hợp mật mía ngọt đậm và lạc bùi, ăn mùa lạnh cực kỳ ấm người",
      "Bánh tráng giòn rụm nhai đã tai, tỉ lệ giá trị / khối lượng vô đối (450g chỉ 55k)",
      "Nguyên liệu 100% tự nhiên không chất bảo quản"
    ],
    cons: [
      "Kẹo dẻo dính chắc và cứng giòn, cần cắn khéo léo"
    ],
    pairing: ["Bát chè xanh (nước chè tươi) nóng hổi đậm đà", "Trà đắng", "Trà sen"],
    recommendedFor: "Những ngày trời se lạnh, uống chè xanh cùng gia đình bạn bè, quà tặng đậm chất dân dã."
  }

];

// DỮ LIỆU THỐNG KÊ THỊ TRƯỜNG & THỊ HIẾU NGƯỜI DÙNG
const STATS_DATA = {
  totalAnalyzed: 12,
  averageRating: 9.55,
  totalVotes: "48,500+",
  topValuePick: "Lindt Excellence 85% & Tony's Chocolonely",
  topLuxuryPick: "Godiva Gold & Royce' Nama",
  topArtisanPick: "Marou Đắk Lắk & Valrhona Guanaja",
  
  // Tỉ lệ ưa chuộng theo dòng socola (%)
  categoryDistribution: [
    { label: "Socola Đen (Dark 70-85%)", percentage: 44, color: "#5c3a21" },
    { label: "Socola Sữa & Praline Hạt", percentage: 32, color: "#b87333" },
    { label: "Socola Tươi (Nama)", percentage: 18, color: "#4a7c59" },
    { label: "Socola Trắng (White)", percentage: 6, color: "#d4af37" }
  ],

  // Phân bổ nồng độ Cacao được mua nhiều nhất
  cocoaDistribution: [
    { range: "< 50% (Ngọt & Béo)", percentage: 30 },
    { range: "50% - 70% (Cân Bằng)", percentage: 22 },
    { range: "70% - 85% (Chuẩn Gu Sành)", percentage: 38 },
    { range: "> 85% (Đắng Thuần Khiết)", percentage: 10 }
  ],

  // Thủ phủ socola được yêu thích nhất
  originRankings: [
    { country: "Bỉ (Belgium) 🇧🇪", score: 98, note: "Thủ phủ praline & tay nghề thủ công bậc thầy" },
    { country: "Thụy Sĩ (Switzerland) 🇨🇭", score: 96, note: "Cái nôi socola sữa & kỹ thuật conching mịn màng" },
    { country: "Nhật Bản (Japan) 🇯🇵", score: 95, note: "Đỉnh cao socola tươi Nama & biến tấu Matcha" },
    { country: "Việt Nam 🇻🇳", score: 94, note: "Ngôi sao mới thế giới với Bean-to-Bar hương vị trái cây" },
    { country: "Pháp (France) 🇫🇷", score: 93, note: "Tiêu chuẩn khắt khe cho giới đầu bếp Michelin" }
  ]
};

// CÂU HỎI TRẮC NGHIỆM VỊ GIÁC (TASTE QUIZ)
const TASTE_QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Bạn thích cảm nhận vị socola như thế nào trong khoang miệng?",
    options: [
      { text: "Đắng sâu, ít ngọt, thơm nồng vị hạt cacao nguyên bản", target: "dark" },
      { text: "Mềm mịn mát lạnh, tan chảy tức thì như nhung", target: "nama" },
      { text: "Giòn rụm bùi bùi, ngập tràn hạt phỉ và nhân thơm béo", target: "praline" },
      { text: "Ngọt ngào, béo ngậy mùi sữa và caramel muối biển", target: "milk" }
    ]
  },
  {
    id: 2,
    question: "Mục đích chính của bạn khi tìm mua socola lần này là gì?",
    options: [
      { text: "Ăn kiêng, tập gym, chăm sóc sức khỏe & sự tỉnh táo", target: "health" },
      { text: "Làm quà biếu đối tác, kỷ niệm sang trọng quý phái", target: "luxury" },
      { text: "Thưởng thức gu sành điệu, khám phá hương vị đạt giải quốc tế", target: "artisan" },
      { text: "Ăn vặt giải tỏa stress, nhâm nhi cùng bạn bè với mức giá hời", target: "budget" }
    ]
  },
  {
    id: 3,
    question: "Mức ngân sách bạn muốn chi trả cho một thanh/hộp socola?",
    options: [
      { text: "Tiết kiệm, siêu hợp lý (Dưới 100.000đ)", target: "low" },
      { text: "Tầm trung chất lượng cao (100.000đ - 250.000đ)", target: "mid" },
      { text: "Cao cấp & Xa xỉ không ngại chi (Trên 250.000đ)", target: "high" }
    ]
  }
];

// CÂU HỎI TRẮC NGHIỆM TÌM LOẠI KẸO HỢP GU NHẤT (CANDY QUIZ)
const CANDY_QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Bạn thích cảm nhận kết cấu của viên kẹo trong miệng như thế nào?",
    options: [
      { text: "Dẻo dai đàn hồi, nhai sần sật nảy vị trái cây cực vui miệng", target: "gummy" },
      { text: "Kẹo cứng láng mịn, ngậm tan từ từ béo ngậy mùi bơ kem caramel", target: "caramel" },
      { text: "Thanh mát the dịu, thông mũi mát họng, sảng khoái hơi thở tức thì", target: "herbal" },
      { text: "Bùi béo giòn rụm hoặc dẻo quánh hương vị dừa sáp, mật mía dân dã", target: "traditional" }
    ]
  },
  {
    id: 2,
    question: "Hương vị nào kích thích vị giác của bạn mãnh liệt nhất?",
    options: [
      { text: "Nước ép trái cây cô đặc tự nhiên (nho, dâu, cam, táo chín)", target: "fruit" },
      { text: "Bơ kem béo ngậy nấu chậm cùng caramel truyền thống", target: "butter" },
      { text: "Thảo mộc tự nhiên núi tuyết, bạc hà cay mát thanh khiết", target: "herb" },
      { text: "Đậu phộng bùi béo bọc socola hoặc mật mía gừng già cay ấm", target: "nut" }
    ]
  },
  {
    id: 3,
    question: "Mục đích hoặc hoàn cảnh bạn muốn thưởng thức kẹo nhất là gì?",
    options: [
      { text: "Ăn vặt giải tỏa căng thẳng khi học tập, làm việc hoặc xem phim", target: "snack" },
      { text: "Làm dịu họng, chống khàn tiếng, bảo vệ giọng nói khi giao tiếp nhiều", target: "throat" },
      { text: "Để ô tô, phòng khách đón tiếp khách quý sang trọng, lịch thiệp", target: "luxury" },
      { text: "Nhâm nhi cùng tách trà xanh nóng, đàm đạo sum vầy cùng người thân", target: "tea" }
    ]
  }
];

// =========================================================================
// BỘ DỮ LIỆU: CÁC KIỂU ĂN SOCOLA VÀ KẸO ĐỘC ĐÁO & BÙNG NỔ VỊ GIÁC
// =========================================================================
const EATING_STYLES_DATA = [
  {
    id: "milk-dip-warm",
    category: "milk-dip",
    categoryName: "Chấm Sữa & Fondue",
    title: "Chấm Sữa Tươi Nóng & Sữa Đặc Béo Ngậy",
    subtitle: "Sự hòa quyện giữa vị đắng thanh tao và sữa béo ngậy tan chảy trên đầu lưỡi",
    icon: "🥛",
    difficulty: "Cực dễ • 2 phút",
    badge: "⭐ Kiểu Ăn Kinh Điển",
    description: "Một cách ăn phổ biến tại các quán cafe Paris & Vienna: Hâm nóng sữa tươi nguyên kem (hoặc sữa hạt óc chó/hạnh nhân) đến khoảng 65°C - 70°C. Nhúng ngập thanh socola đen vào cốc sữa trong 10-15 giây rồi rút ra cắn ngay; hoặc chấm miếng socola đen đắng trực tiếp vào chén sữa đặc hay kem tươi whipping cream.",
    ingredients: [
      "1-2 thanh socola đen nồng độ cao (Marou 70%, Lindt 85% hoặc Ghirardelli 72%)",
      "150ml sữa tươi nguyên kem không đường (hâm nóng 70°C)",
      "1 chén nhỏ sữa đặc có đường hoặc sốt caramel béo"
    ],
    steps: [
      "Bước 1: Hâm nóng ly sữa tươi nguyên kem trong lò vi sóng 45 giây hoặc đun ấm trên bếp.",
      "Bước 2: Cầm thanh socola đen nhúng ngập 1/2 vào ly sữa nóng trong 10-15 giây.",
      "Bước 3: Rút thanh socola ra: Lớp ngoài mềm tan dẻo quánh, bên trong vẫn giữ nguyên độ giòn 'tách' cực kỳ đã miệng!",
      "Bước 4: Nhấp ngay một ngụm sữa ấm vừa thấm hương bơ cacao thơm lừng."
    ],
    proTip: "Nếu thích ngọt đậm đà, hãy chấm một góc socola đen đắng vào sữa đặc Ông Thọ trước khi nhúng sữa nóng. Vị đắng gắt bị vô hiệu hóa hoàn toàn, chỉ còn lại sự ngọt béo nhung lụa.",
    compatibleProductNames: ["Marou Đắk Lắk 70%", "Lindt Excellence 85%", "Ghirardelli 72%"],
    compatibleProductIds: ["marou-daklak-70", "lindt-85", "ghirardelli-72"]
  },
  {
    id: "juice-infused-gummy",
    category: "juice-drink",
    categoryName: "Nước Ép & Mocktail",
    title: "Kẹo Dẻo Thả Nước Ép Trái Cây & Soda Sủi Bọt",
    subtitle: "Kẹo hút no nước ép căng mọng, cắn ngập miệng nổ tung vị chua ngọt sảng khoái",
    icon: "🍹",
    difficulty: "Siêu dễ • 15 phút ngâm",
    badge: "🔥 Hot Trend Giới Trẻ",
    description: "Kẹo dẻo gelatin có đặc tính hút chất lỏng và trương nở gấp đôi kích thước ban đầu. Khi thả kẹo gấu hoặc kẹo mềm vào nước ép cam tươi, nước ép dưa hấu hoặc Sprite/Soda đá lạnh, kẹo sẽ ngậm no nước ép trái cây, tạo cảm giác mọng nước cắn ngập chân răng cực kỳ lạ miệng!",
    ingredients: [
      "8-10 chú kẹo dẻo Haribo Goldbears hoặc kẹo dẻo trái cây",
      "200ml nước ép cam tươi vắt nguyên chất (hoặc nước ép dưa hấu, nước ép bưởi)",
      "100ml soda sủi bọt hoặc Sprite ướp lạnh",
      "Vài viên đá bi lạnh và 1 nhánh lá bạc hà"
    ],
    steps: [
      "Bước 1: Cho các viên kẹo dẻo gấu Haribo nhiều màu sắc vào đáy ly thủy tinh.",
      "Bước 2: Rót nước ép cam tươi và soda lạnh ngập qua mặt kẹo.",
      "Bước 3: Đặt ly vào ngăn mát tủ lạnh từ 15 đến 30 phút để kẹo dẻo hút nước ép phồng to căng mọng.",
      "Bước 4: Thêm đá viên và thưởng thức bằng muỗng: Cắn vào viên kẹo để cảm nhận nước ép trào ra cùng kết cấu dai giòn sần sật!"
    ],
    proTip: "Dùng nước ép bưởi hồng hoặc cam đỏ có vị chua nhẹ để cân bằng độ ngọt tự nhiên của kẹo dẻo Haribo, giúp bạn ăn hoài không ngán.",
    compatibleProductNames: ["Kẹo Dẻo Haribo Goldbears", "Kẹo Trái Cây Cavendish & Harvey"],
    compatibleProductIds: ["haribo-goldbears", "cavendish-fruit"]
  },
  {
    id: "frozen-juice-candy",
    category: "cold-dessert",
    categoryName: "Ăn Kèm Kem & Ướp Lạnh",
    title: "Kẹo Dẻo Ngâm Nước Nho Ướp Đá Buốt Răng",
    subtitle: "Biến kẹo dẻo thành những viên ngọc thạch đông đá the buốt tê đầu lưỡi ngày hè",
    icon: "❄️",
    difficulty: "Dễ làm • Để tủ đông 3 giờ",
    badge: "❄️ Đỉnh Cao Giải Nhiệt Hè",
    description: "Công thức biến tấu viral trên TikTok: Kẹo dẻo trái cây được ngâm ngập trong nước ép nho đen có ga hoặc mocktail việt quất trong 6 tiếng, sau đó chắt ráo và cấp đông trong ngăn đá. Kết quả là những viên kẹo băng dẻo buốt, dai sần sật như thạch ngọc bích mát lạnh.",
    ingredients: [
      "1 gói kẹo dẻo Haribo hoặc kẹo mềm trái cây",
      "250ml nước ép nho đỏ hoặc nước việt quất sủi bọt",
      "Hộp nhựa đậy kín có nắp"
    ],
    steps: [
      "Bước 1: Rải đều kẹo dẻo vào hộp, đổ ngập nước ép nho rồi cất tủ mát 4-6 tiếng.",
      "Bước 2: Vớt kẹo ra rây lọc cho ráo bớt nước (kẹo lúc này đã to gấp rưỡi).",
      "Bước 3: Xếp kẹo vào khay chống dính, cho vào ngăn đá tủ lạnh 3-4 tiếng.",
      "Bước 4: Lấy ra ăn ngay khi còn lớp băng mỏng: Vị ngọt nho lạnh buốt tan giòn trên đầu lưỡi!"
    ],
    proTip: "Với người lớn, bạn có thể thay thế nước nho bằng một chút rượu vang trắng sủi bọt (Prosecco) để tạo nên món tráng miệng tiệc tùng sang chảnh.",
    compatibleProductNames: ["Kẹo Dẻo Haribo Goldbears"],
    compatibleProductIds: ["haribo-goldbears"]
  },
  {
    id: "smores-croffle-melt",
    category: "bake-melt",
    categoryName: "Nướng Chảy & Kẹp Bánh",
    title: "Nướng Chảy Kẹp Bánh Quy & Bánh Sừng Bò Waffle (S'mores)",
    subtitle: "Dòng nham thạch socola nóng chảy dẻo quánh giữa hai lớp bánh giòn tan",
    icon: "🍪",
    difficulty: "3 phút nướng",
    badge: "🔥 Đậm Đà Béo Ngậy",
    description: "Món tráng miệng kinh điển kiểu Mỹ được nâng cấp lên chuẩn thượng hạng: Kẹp thanh socola caramel muối biển Tony's Chocolonely hoặc Guylian Praline cùng 1 viên kẹo marshmallow giữa 2 lớp bánh quy bơ mặn (hoặc bánh croffle nóng). Nướng nhiệt nhẹ để socola và kẹo bông chảy tràn kéo sợi.",
    ingredients: [
      "2-3 ô socola bẻ thanh (Tony's Caramel Muối Biển hoặc Guylian Sò Biển)",
      "2 lát bánh quy bơ giòn mặn (Cracker hoặc Biscoff)",
      "1 viên kẹo bông dẻo Marshmallow to bản",
      "Bột quế hoặc bột cacao rắc trang trí"
    ],
    steps: [
      "Bước 1: Đặt 1 lát bánh quy xuống đĩa, đặt viên marshmallow và thanh socola lên trên.",
      "Bước 2: Úp lát bánh quy thứ 2 lên tạo thành chiếc bánh kẹp sandwich.",
      "Bước 3: Cho vào lò vi sóng quay 20 giây ở nhiệt vừa (hoặc nướng nồi chiên không dầu 160°C trong 2 phút).",
      "Bước 4: Ép nhẹ cho socola và kẹo bông dẻo quánh trào ra ngoài rìa bánh rồi thưởng thức ngay khi còn bốc khói ngào ngạt!"
    ],
    proTip: "Vị mặn của muối biển trong thanh Tony's hoặc vị hạt phỉ bùi của Guylian sẽ bùng nổ hương thơm gấp 3 lần khi được kích nhiệt nóng chảy.",
    compatibleProductNames: ["Tony's Chocolonely Caramel Sea Salt", "Guylian Seashells Praline"],
    compatibleProductIds: ["tonys-caramel-sea-salt", "guylian-seashells"]
  },
  {
    id: "nama-affogato",
    category: "tea-coffee",
    categoryName: "Trà & Cà Phê Thượng Hạng",
    title: "Affogato Socola Tươi Nama Rót Cà Phê Espresso Nóng",
    subtitle: "Lớp kem tươi Hokkaido tan hòa cùng dòng cà phê Espresso đậm đặc bốc khói",
    icon: "☕",
    difficulty: "Dễ làm • 1 phút",
    badge: "👑 Chuẩn Thượng Lưu",
    description: "Socola tươi Nama của Nhật Bản chứa tới 25% kem tươi Hokkaido nguyên chất nên có nhiệt độ tan chảy rất thấp (dưới 23°C). Khi rót 1 shot Espresso hoặc Americano nóng hổi lên viên Nama, bạn sẽ có một ly Cafe Mocha hoàng gia sánh mịn không cần dùng thêm siro hay sữa đặc.",
    ingredients: [
      "2-3 viên socola tươi Royce' Nama Chocolate (vị Au Lait hoặc Matcha)",
      "1 ly cà phê Espresso đậm đặc hoặc 50ml cà phê pha phin nóng hổi",
      "1 ly thủy tinh miệng rộng chân thấp"
    ],
    steps: [
      "Bước 1: Lấy 2 viên Royce' Nama lạnh trực tiếp từ tủ bảo quản đặt vào đáy ly.",
      "Bước 2: Chiết xuất 1 shot cà phê Espresso hoặc pha 1 phin cà phê nguyên chất nóng sôi.",
      "Bước 3: Rót từ từ dòng cà phê nóng chảy tràn qua mặt viên socola tươi.",
      "Bước 4: Dùng thìa nhỏ khuấy nhẹ 3 vòng: Viên Nama sẽ mềm chảy như bơ kem, tạo nên lớp crema cà phê socola béo ngậy ngất ngây."
    ],
    proTip: "Nếu dùng Nama Matcha trà xanh, hãy kết hợp với cà phê Cold Brew ủ lạnh để tạo nên phân tầng 2 màu xanh - nâu sang trọng tuyệt đẹp.",
    compatibleProductNames: ["Royce' Nama Chocolate Au Lait", "Royce' Nama Chocolate Matcha"],
    compatibleProductIds: ["royce-nama-au-lait", "royce-nama-matcha"]
  },
  {
    id: "fruit-fondue",
    category: "milk-dip",
    categoryName: "Chấm Sữa & Fondue",
    title: "Lẩu Fondue Socola Nhúng Dâu Tây & Trái Cây Tươi Mọng",
    subtitle: "Dòng thác socola ấm nóng bao bọc lấy quả dâu chua ngọt căng mọng",
    icon: "🍓",
    difficulty: "5 phút chuẩn bị",
    badge: "💖 Tiệc Ngọt Lãng Mạn",
    description: "Nghi thức ẩm thực Thụy Sĩ nổi tiếng: Socola đen nung chảy cùng một thìa bơ cacao trên ngọn nến liu riu. Dùng nĩa xiên dâu tây Đà Lạt, chuối tiêu, kiwi hoặc kẹo dẻo nhúng ngập vào chén socola ấm nóng, sau đó nhúng lướt qua tô nước đá để tạo thành lớp vỏ giòn rụm bên ngoài!",
    ingredients: [
      "100g socola đen Lindt Swiss Classic hoặc Marou Bà Rịa 76%",
      "20ml kem tươi whipping cream (hoặc 1 thìa bơ lạt)",
      "Trái cây tươi: Dâu tây, chuối thái khoanh, nho không hạt, kẹo dẻo",
      "1 tô nước đá lạnh"
    ],
    steps: [
      "Bước 1: Bẻ vụn socola vào bát sứ, thêm kem tươi và đun cách thủy trên nồi nước sôi cho tan chảy bóng mượt.",
      "Bước 2: Chuẩn bị que xiên các loại dâu tây và hoa quả tươi đã lau khô ráo nước.",
      "Bước 3: Xiên dâu tây nhúng ngập vào chén socola ấm nóng, xoay tròn que nĩa.",
      "Bước 4: Nhúng nhanh trái dâu vừa áo socola vào tô nước đá trong 3 giây: Lớp vỏ socola đông cứng giòn tan ngay lập tức!"
    ],
    proTip: "Luôn thấm thật khô bề mặt quả dâu trước khi nhúng, giọt nước đọng sẽ làm lớp phủ socola bị vón cục và mất độ bóng gương.",
    compatibleProductNames: ["Lindt Swiss Classic Dark", "Marou Bà Rịa 76%", "Godiva Gold Ballotin"],
    compatibleProductIds: ["lindt-swiss-dark", "marou-baria-76", "godiva-gold-box"]
  },
  {
    id: "crunchy-icecream-topping",
    category: "cold-dessert",
    categoryName: "Ăn Kèm Kem & Ướp Lạnh",
    title: "Bẻ Vụn Trộn Kem Vani, Yaourt & Sinh Tố Bơ Giòn Tan",
    subtitle: "Cắn trúng hạt đậu giòn rụm và socola giòn lạnh giữa lớp kem béo mịn mượt mà",
    icon: "🍨",
    difficulty: "1 phút làm liền",
    badge: "⭐ Topping Gây Nghiện",
    description: "Sự kết hợp tương phản tuyệt đỉnh giữa nhiệt độ và kết cấu nhai: Dùng kẹp hoặc dao đập thô kẹo sỏi M&M Peanut hoặc kẹo Cu Đơ đậu phộng giòn rụm, rắc ngập tràn lên mặt ly kem dừa, kem vani Pháp hoặc tô sữa chua Hy Lạp / yến mạch buổi sáng.",
    ingredients: [
      "1 gói kẹo sỏi socola M&M's Peanut hoặc 1 miếng kẹo Cu Đơ Hà Tĩnh",
      "2 viên kem vani hoặc kem dừa béo ngậy",
      "1 hũ sữa chua Hy Lạp hoặc 1 ly sinh tố bơ đặc",
      "1 thìa mật ong nguyên chất"
    ],
    steps: [
      "Bước 1: Múc 2 viên kem lạnh hoặc 1 chén sữa chua Hy Lạp sánh mịn ra đĩa tráng miệng.",
      "Bước 2: Bỏ kẹo M&M hoặc kẹo Cu Đơ vào túi zip, dùng cán dao gõ nhẹ tạo thành các mảnh vụn kích thước khác nhau.",
      "Bước 3: Rải đều mảnh vụn kẹo đậu phộng socola lên đỉnh đồi kem.",
      "Bước 4: Thưởng thức: Từng muỗng kem mát lạnh xen lẫn những vụn kẹo giòn tan rôm rốp kích thích thính giác và vị giác tối đa!"
    ],
    proTip: "Kẹo Cu Đơ Hà Tĩnh với vị gừng già cay ấm và mật mía dẻo quánh khi ăn cùng kem vani lạnh sẽ tạo nên sự hòa quyện 'băng hỏa tương phùng' độc nhất vô nhị.",
    compatibleProductNames: ["Kẹo Sỏi M&M's Peanut", "Kẹo Cu Đơ Cầu Phủ Hà Tĩnh", "Ferrero Rocher"],
    compatibleProductIds: ["mms-peanut-candies", "keo-cudo-hatinh", "ferrero-rocher"]
  },
  {
    id: "tea-candies-pairing",
    category: "tea-coffee",
    categoryName: "Trà & Cà Phê Thượng Hạng",
    title: "Kẹo Dừa Sáp & Cu Đơ Thưởng Thức Cùng Trà Xanh / Trà Sen Nóng",
    subtitle: "Hơi nóng trà quý làm tan chảy vị béo dừa sáp, để lại hậu vị ngọt thanh sâu lắng",
    icon: "🍵",
    difficulty: "Tao nhã • 3 phút pha trà",
    badge: "☕ Tinh Hoa Trà Đạo",
    description: "Nghệ thuật ẩm thực trà đạo Việt Nam: Kẹo dừa Bến Tre và kẹo Cu Đơ vốn có vị ngọt đậm của đường thốt nốt, mật mía và béo của dừa đậu phộng. Khi kết hợp với ngụm trà xanh Tân Cương chát nhẹ hoặc trà sen Tây Hồ nóng bỏng, vị chát của trà trung hòa độ ngọt ngay lập tức, kích hoạt hậu vị béo ngậy ngọt hậu lưu luyến trong vòm họng.",
    ingredients: [
      "2-3 viên Kẹo Dừa Sáp Bến Tre hoặc vài lát Kẹo Cu Đơ Hà Tĩnh",
      "1 ấm trà xanh Thái Nguyên hoặc Trà Sen Cổ Thụ pha nước sôi 85°C - 90°C",
      "Bộ chén trà gốm sứ mộc mạc"
    ],
    steps: [
      "Bước 1: Hãm ấm trà xanh nguyên búp trong 3 phút, rót ra chén tống rồi chia đều ra các chén quân.",
      "Bước 2: Đặt viên kẹo dừa sáp lên đầu lưỡi, ngậm nhẹ để vị béo mạch nha bắt đầu thấm dần.",
      "Bước 3: Khi kẹo chuẩn bị mềm tan, nhấp ngay một ngụm trà sen nóng hổi ngậm trong khoang miệng 2 giây.",
      "Bước 4: Nuốt chậm rãi: Vị chát thanh của trà hòa tan lớp béo ngọt của kẹo dừa thành một dòng suối hương vị thanh tao ấm áp lan tỏa khắp lồng ngực."
    ],
    proTip: "Đừng nhai nuốt vội viên kẹo! Hãy để nhiệt lượng ấm nóng của dòng nước trà tự do làm tan chảy lớp dừa béo sáp theo cách tự nhiên nhất.",
    compatibleProductNames: ["Kẹo Dừa Bến Tre Sáp", "Kẹo Cu Đơ Cầu Phủ Hà Tĩnh"],
    compatibleProductIds: ["keo-dua-bentre", "keo-cudo-hatinh"]
  },
  {
    id: "michelin-sea-salt-spice",
    category: "gourmet-twist",
    categoryName: "Biến Tấu Michelin",
    title: "Socola Đen Chấm Muối Biển Maldon, Tiêu Hồng & Ớt Khô",
    subtitle: "Bí quyết nếm thử đẳng cấp của các đầu bếp sao Michelin trên thế giới",
    icon: "🧂",
    difficulty: "1 phút trải nghiệm",
    badge: "✨ Phong Cách Michelin",
    description: "Khoa học vị giác chứng minh: Ion Natri trong muối biển có khả năng ức chế các thụ thể vị đắng trên lưỡi, đồng thời kích thích các thụ thể cảm thụ vị ngọt tự nhiên của bơ cacao. Khi rắc vài tinh thể muối biển giòn to bản cùng tiêu hồng hoặc ớt bột hun khói lên thanh socola đen 70%-85%, toàn bộ nốt hương hoa quả rừng và gỗ thơm sẽ bung tỏa dữ dội.",
    ingredients: [
      "Vài thanh socola đen nguyên bản Marou Đắk Lắk 70% hoặc Lindt 85%",
      "Một nhúm muối biển hạt to (muối hầm Maldon hoặc muối hồng Himalaya)",
      "Vài hạt tiêu hồng đập dập nhẹ hoặc một chút bột ớt paprika hun khói"
    ],
    steps: [
      "Bước 1: Bẻ một miếng socola đen nguyên chất đặt lên đĩa phẳng.",
      "Bước 2: Dùng đầu ngón tay rắc nhẹ 2-3 hạt muối biển to bản lên mặt thanh socola.",
      "Bước 3: Rắc thêm một xíu hạt tiêu hồng hoặc vụn ớt khô hun khói.",
      "Bước 4: Đặt miếng socola lên lưỡi và ép nhẹ lên vòm miệng: Tinh thể muối giòn tan nổ lách tách trước, đánh thức mọi giác quan đón nhận dòng cacao tan chảy sau đó."
    ],
    proTip: "Kiểu ăn này cực kỳ hợp khi kết hợp cùng 1 ly rượu vang đỏ Syrah hoặc Cabernet Sauvignon đậm đà trong các bữa tiệc tối sang trọng.",
    compatibleProductNames: ["Marou Đắk Lắk 70%", "Lindt Excellence 85%", "Marou Bà Rịa 76%"],
    compatibleProductIds: ["marou-daklak-70", "lindt-85", "marou-baria-76"]
  },
  {
    id: "ricola-herbal-tea",
    category: "juice-drink",
    categoryName: "Nước Ép & Mocktail",
    title: "Kẹo Thảo Mộc Thả Trà Đào Cam Sả / Nước Ấm Dịu Họng",
    subtitle: "Biến kẹo ngậm thành thức uống thảo dược thanh nhiệt, thông mũi sảng khoái tức thì",
    icon: "🌿",
    difficulty: "2 phút pha chế",
    badge: "🌿 Detox Mát Họng",
    description: "Thay vì chỉ ngậm thông thường, người dân vùng núi Alps Thụy Sĩ có thói quen thả viên kẹo thảo dược Ricola vào tách nước ấm hoặc ly trà đào cam sả. 13 loại thảo mộc quý cùng tinh dầu bạc hà sẽ khuếch tán trong làn nước ấm nóng, tạo nên tách trà thảo dược thanh khiết làm êm dịu thanh quản và thông thoáng đường thở.",
    ingredients: [
      "1-2 viên kẹo ngậm Ricola Swiss Herb Drops",
      "1 túi lọc trà đào hoặc trà hoa cúc / trà sả tươi",
      "200ml nước nóng 80°C",
      "1 lát cam tươi và 1 nhánh sả đập dập"
    ],
    steps: [
      "Bước 1: Hãm túi lọc trà đào trong ly nước nóng khoảng 2 phút.",
      "Bước 2: Thả trực tiếp 1-2 viên kẹo thảo mộc Ricola vào ly trà còn nóng.",
      "Bước 3: Dùng muỗng khuấy nhẹ trong 1 phút cho viên kẹo tan dần và tỏa hương bạc hà thảo dược ngào ngạt.",
      "Bước 4: Thêm lát cam tươi và sả đập dập, nhấp từng ngụm ấm để cảm nhận cổ họng được làm dịu và thông thoáng tức thì."
    ],
    proTip: "Uống vào buổi sáng sớm hoặc những ngày thời tiết trở lạnh sẽ giúp giữ ấm thanh quản, phòng ngừa cảm cúm và làm ấm giọng nói tuyệt vời.",
    compatibleProductNames: ["Kẹo Thảo Mộc Ricola Swiss Herb Drops"],
    compatibleProductIds: ["ricola-herb-drops"]
  }
];

// =========================================================================
// BỘ DỮ LIỆU: TÌNH HUỐNG THẨM ĐỊNH SOCOLA & KẸO THẬT - GIẢ (INTERACTIVE QUIZ)
// =========================================================================
const AUTHENTICITY_CASES_DATA = [
  {
    id: "case-melting",
    category: "chocolate",
    title: "Thanh socola để nhiệt độ phòng 36°C ngày hè mà cả ngày không hề chảy mềm?",
    hint: "Nhiệt độ ngoài trời và trong phòng đang rất oi bức...",
    correctAnswer: "fake",
    verdictTitle: "❌ KẾT LUẬN: ĐÂY LÀ SOCOLA HỢP CHẤT (GIẢ BƠ CACAO)",
    explanation: "Bơ cacao nguyên chất trong socola thật có nhiệt độ tan chảy sinh học rất thấp: đúng bằng 34°C - 36°C (thân nhiệt con người). Khi thời tiết trên 30°C, socola thật chắc chắn phải bắt đầu mềm và chảy dẻo. Nếu thanh socola để ở 36°C mà vẫn cứng đơ, chứng tỏ nó được làm từ Dầu Cọ Hydro Hóa (CBS/CBR) có nhiệt độ nóng chảy lên tới 42°C - 45°C. Ăn loại này sẽ để lại lớp màng dầu dính nhớp như sáp nến trong cổ họng và gây tăng cholesterol xấu (trans fat)!",
    proTip: "Socola thật bắt buộc phải bảo quản mát từ 16°C – 20°C. Nếu người bán khẳng định 'socola để nhiệt độ ngoài trời 38°C không bao giờ chảy', hãy cẩn trọng!"
  },
  {
    id: "case-fat-bloom",
    category: "chocolate",
    title: "Mở thanh socola thấy xuất hiện một lớp màng váng mỏng màu trắng bạc trên bề mặt?",
    hint: "Liệu đây có phải là nấm mốc làm hỏng socola không?",
    correctAnswer: "real",
    verdictTitle: "✅ KẾT LUẬN: ĐÂY LÀ DẤU HIỆU CỦA SOCOLA THẬT (HIỆN TƯỢNG NỞ HOA BƠ - FAT BLOOM)",
    explanation: "Nhiều người lầm tưởng lớp váng trắng này là mốc và vội vàng vứt đi, nhưng thực chất đây là 'Fat Bloom' – bằng chứng thép chứng minh socola chứa 100% Bơ Cacao Nguyên Chất! Khi gặp sự thay đổi nhiệt độ đột ngột (đang để tủ lạnh rồi mang ra ngoài nóng), các tinh thể bơ cacao tự nhiên tan nhẹ rồi tái kết tinh lại trên bề mặt tạo thành màng trắng bạc. Socola hoàn toàn an toàn và ngon miệng, chỉ cần làm ấm nhẹ là lớp hoa bơ sẽ biến mất.",
    proTip: "Socola giả (làm từ dầu cọ) sẽ không bao giờ bị hiện tượng Fat Bloom nở hoa bơ vì trong thành phần hoàn toàn không có bơ cacao tinh khiết."
  },
  {
    id: "case-gummy-water",
    category: "candy",
    title: "Thả viên kẹo dẻo hoa quả vào ly nước ấm, chỉ 2 phút sau nước biến thành màu xanh lè đục ngầu?",
    hint: "Quan sát màu nước và trạng thái tan rã của viên kẹo...",
    correctAnswer: "fake",
    verdictTitle: "❌ KẾT LUẬN: KẸO DẺO PHẨM MÀU HÓA CHẤT / KÉM CHẤT LƯỢNG",
    explanation: "Kẹo dẻo cao cấp đạt chuẩn quốc tế (như Haribo Goldbears) sử dụng nước ép trái cây và rau củ cô đặc tự nhiên (chiết xuất cà rốt, củ dền, tảo xoắn spirulina) liên kết bền vững với gelatin thực phẩm sạch. Khi ngâm nước ấm, kẹo sẽ hút nước nở phồng to ra và tan từ từ, nước ngâm vẫn giữ được độ trong. Ngược lại, kẹo dẻo nhái dùng phẩm màu công nghiệp Azo tổng hợp rẻ tiền (E102, E133) và gelatin bẩn sẽ nhả màu loang lổ ngay lập tức, làm nước đục ngầu và có mùi hóa chất nồng nặc.",
    proTip: "Tránh cho trẻ nhỏ ăn các loại kẹo dẻo trôi nổi không rõ nguồn gốc nhả màu nhanh vào nước, vì phẩm màu công nghiệp có thể gây tăng động và kích ứng tiêu hóa."
  },
  {
    id: "case-coconut-candy",
    category: "candy",
    title: "Viên kẹo dừa thơm nức mùi vani, nhưng ngậm thì cứng đơ, nhai dính chặt răng và ngọt rát cổ họng?",
    hint: "Kẹo dừa chuẩn truyền thống Bến Tre có cảm giác ăn thế nào?",
    correctAnswer: "fake",
    verdictTitle: "❌ KẾT LUẬN: KẸO DỪA GIẢ PHA BỘT NĂNG & HƯƠNG LIỆU NHÂN TẠO",
    explanation: "Kẹo dừa Bến Tre truyền thống chuẩn chính hãng được nấu từ 100% nước cốt dừa sáp tươi nguyên chất và mạch nha nếp thơm. Mùi thơm của kẹo thật rất thoang thoảng dịu nhẹ tự nhiên của cơm dừa, kết cấu dẻo mềm mịn màng, khi ăn tan êm dịu trên đầu lưỡi và TUYỆT ĐỐI KHÔNG DÍNH CHẶT RĂNG. Kẹo dừa nhái bị pha rất nhiều bột năng, đường cát rẻ tiền và hương dừa nhân tạo gắt nồng để hạ giá thành, khiến kẹo cứng đơ, ăn dính bết răng và ngọt khé cổ họng.",
    proTip: "Hãy chọn kẹo dừa của các cơ sở uy tín có đóng dấu chỉ dẫn địa lý Bến Tre, bao bì ghi rõ thành phần cốt dừa tươi trên 50%."
  },
  {
    id: "case-butter-candy",
    category: "candy",
    title: "Viên kẹo bơ caramel ngậm xong để lại một lớp màng mỡ đông ngấy nhờn trong khoang miệng?",
    hint: "Quan sát cảm giác sau khi ngậm tan viên kẹo bơ...",
    correctAnswer: "fake",
    verdictTitle: "❌ KẾT LUẬN: KẸO BƠ NHÁI LÀM TỪ MỠ THỰC VẬT HYDRO HÓA (SHORTENING)",
    explanation: "Kẹo bơ cao cấp chính hãng (như Werther's Original của Đức) được nấu từ Bơ Kem Sữa Tươi Thật (Real Butter & Fresh Cream) kết hợp với đường nâu và muối biển. Bơ sữa động vật tan chảy hoàn hảo ở nhiệt độ miệng (37°C), để lại dư vị ngọt bùi béo ngậy êm dịu và sạch sẽ. Kẹo bơ rẻ tiền hoặc hàng nhái sử dụng Shortening công nghiệp và dầu cọ hydro hóa để tạo độ béo giả tạo. Loại mỡ này có điểm nóng chảy cao hơn nhiệt độ cơ thể, khi ăn xong sẽ đông lại thành lớp màng sáp ngấy ngợp bao phủ niêm mạc lưỡi!",
    proTip: "Kiểm tra nhãn phụ: Kẹo xịn luôn có chữ 'Bơ kem sữa tươi (Butter/Cream)' chiếm tỉ lệ cao, kẹo nhái thường ghi 'Shortening / Dầu cọ / Bột béo tổng hợp'."
  },
  {
    id: "case-tin-candy",
    category: "candy",
    title: "Mở hộp kẹo trái cây thủy tinh hộp thiếc thấy phủ một lớp bột phấn trắng mỏng bao quanh viên kẹo?",
    hint: "Liệu đây có phải là kẹo bị hỏng mốc đường không?",
    correctAnswer: "real",
    verdictTitle: "✅ KẾT LUẬN: ĐÂY LÀ KẸO TRÁI CÂY CAO CẤP CHÍNH HÃNG (LỚP PHẤN ĐƯỜNG ICING CHỐNG DÍNH)",
    explanation: "Kẹo trái cây thủy tinh cao cấp xuất xứ Châu Âu (như Cavendish & Harvey Đức) luôn được rắc một lớp đường bột phấn mịn (Icing Sugar) tự nhiên bao bọc bên ngoài. Lớp phấn này có tác dụng hút ẩm và chống cho các viên kẹo không bị dính vào nhau trong quá trình vận chuyển đường dài. Khi ngậm vào, lớp phấn tan trước tạo vị ngọt mát nhẹ, sau đó đến cốt kẹo trong suốt như ngọc bích bung tỏa vị nước ép hoa quả đậm đà. Ngược lại, kẹo nhái không có công nghệ này sẽ bị chảy nước dính bết thành một tảng đặc quánh dưới đáy hộp!",
    proTip: "Hộp thiếc chính hãng Cavendish & Harvey được dập nổi hoa văn quả vàng kim sắc sảo, có niêm phong màng nhôm vàng sáng bóng bảo vệ độ giòn tươi của kẹo."
  }
];

// Gán vào window để các tệp script khác dễ dàng truy cập đồng bộ
if (typeof window !== 'undefined') {
  window.CHOCOLATE_DATA = CHOCOLATE_DATA;
  window.STATS_DATA = STATS_DATA;
  window.TASTE_QUIZ_QUESTIONS = TASTE_QUIZ_QUESTIONS;
  window.CANDY_QUIZ_QUESTIONS = CANDY_QUIZ_QUESTIONS;
  window.EATING_STYLES_DATA = EATING_STYLES_DATA;
  window.AUTHENTICITY_CASES_DATA = AUTHENTICITY_CASES_DATA;
}


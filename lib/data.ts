export type CategoryId =
  | "promo"
  | "terdekat"
  | "terlaris"
  | "jajanan"
  | "minuman"
  | "healthy"

export type VariantGroup = {
  id: string
  label: string
  required: boolean
  options: { id: string; label: string; priceDelta: number }[]
}

export type AddOn = {
  id: string
  label: string
  price: number
}

export type FoodItem = {
  id: string
  name: string
  restaurant: string
  cuisine: string
  image: string
  deliveryTime: string
  rating: number
  reviews: number
  distanceKm: number
  originalPrice: number
  price: number
  calories: number
  description: string
  categories: CategoryId[]
  variants: VariantGroup[]
  addOns: AddOn[]
}

export const categories: { id: CategoryId; label: string; icon: string }[] = [
  { id: "promo", label: "Promo Hari Ini", icon: "tag" },
  { id: "terdekat", label: "Terdekat", icon: "map-pin" },
  { id: "terlaris", label: "Terlaris", icon: "flame" },
  { id: "jajanan", label: "Jajanan Lokal", icon: "cookie" },
  { id: "minuman", label: "Minuman Segar", icon: "cup-soda" },
  { id: "healthy", label: "Healthy Food", icon: "salad" },
]

const spicyLevels: VariantGroup = {
  id: "spicy",
  label: "Level Pedas",
  required: true,
  options: [
    { id: "original", label: "Original", priceDelta: 0 },
    { id: "sedang", label: "Sedang", priceDelta: 0 },
    { id: "pedas", label: "Pedas Mampus", priceDelta: 3000 },
  ],
}

const sugarLevels: VariantGroup = {
  id: "sugar",
  label: "Level Gula",
  required: true,
  options: [
    { id: "normal", label: "Normal", priceDelta: 0 },
    { id: "less", label: "Less Sugar", priceDelta: 0 },
    { id: "nosugar", label: "Tanpa Gula", priceDelta: 0 },
  ],
}

const drinkAddOns: AddOn[] = [
  { id: "boba", label: "+ Boba", price: 5000 },
  { id: "extra-shot", label: "+ Extra Shot Espresso", price: 6000 },
]

const mealAddOns: AddOn[] = [
  { id: "telur", label: "+ Extra Telur", price: 4000 },
  { id: "esteh", label: "+ Es Teh", price: 5000 },
  { id: "kerupuk", label: "+ Kerupuk", price: 3000 },
]

export const foods: FoodItem[] = [
  {
    id: "ayam-geprek-mozzarella",
    name: "Ayam Geprek Mozzarella",
    restaurant: "Geprek Juara",
    cuisine: "Ayam & Sambal",
    image: "/food/ayam-geprek-mozzarella.png",
    deliveryTime: "15-20 min",
    rating: 4.8,
    reviews: 2143,
    distanceKm: 1.2,
    originalPrice: 38000,
    price: 25000,
    calories: 620,
    description:
      "Ayam goreng crispy digeprek dengan sambal bawang pedas, dilumuri keju mozzarella meleleh. Disajikan dengan nasi hangat.",
    categories: ["promo", "terlaris", "terdekat"],
    variants: [spicyLevels],
    addOns: mealAddOns,
  },
  {
    id: "es-kopi-susu-gula-aren",
    name: "Es Kopi Susu Gula Aren",
    restaurant: "Kopi Senja",
    cuisine: "Coffee & Drinks",
    image: "/food/es-kopi-susu-gula-aren.png",
    deliveryTime: "10-15 min",
    rating: 4.9,
    reviews: 5310,
    distanceKm: 0.8,
    originalPrice: 22000,
    price: 18000,
    calories: 180,
    description:
      "Espresso pilihan dipadu susu segar dan manis legit gula aren asli. Nikmat disajikan dingin dengan es batu.",
    categories: ["promo", "minuman", "terlaris", "terdekat"],
    variants: [sugarLevels],
    addOns: drinkAddOns,
  },
  {
    id: "dimsum-ayam",
    name: "Dimsum Ayam Komplit",
    restaurant: "Dimsum Sumit",
    cuisine: "Chinese & Dimsum",
    image: "/food/dimsum-ayam.png",
    deliveryTime: "20-25 min",
    rating: 4.7,
    reviews: 1876,
    distanceKm: 2.4,
    originalPrice: 30000,
    price: 21000,
    calories: 340,
    description:
      "Siomay ayam udang lembut dikukus sempurna, disajikan dengan saus cabai spesial. Isi 4 potong.",
    categories: ["jajanan", "terlaris"],
    variants: [],
    addOns: [{ id: "saus", label: "+ Extra Saus", price: 2000 }],
  },
  {
    id: "nasi-rendang-padang",
    name: "Nasi Rendang Padang",
    restaurant: "RM Salero Minang",
    cuisine: "Masakan Padang",
    image: "/food/nasi-rendang-padang.png",
    deliveryTime: "25-30 min",
    rating: 4.9,
    reviews: 3421,
    distanceKm: 3.1,
    originalPrice: 45000,
    price: 33000,
    calories: 780,
    description:
      "Rendang daging sapi empuk dimasak berjam-jam dengan rempah khas Padang. Disajikan dengan nasi dan sayur.",
    categories: ["terlaris"],
    variants: [],
    addOns: [
      { id: "telur", label: "+ Telur Balado", price: 6000 },
      { id: "kerupuk", label: "+ Kerupuk Kulit", price: 4000 },
    ],
  },
  {
    id: "nasi-goreng-kampung",
    name: "Nasi Goreng Kampung",
    restaurant: "Warung Bang Jaya",
    cuisine: "Masakan Rumahan",
    image: "/food/nasi-goreng-kampung.png",
    deliveryTime: "15-20 min",
    rating: 4.6,
    reviews: 1542,
    distanceKm: 1.7,
    originalPrice: 28000,
    price: 20000,
    calories: 560,
    description:
      "Nasi goreng kampung dengan bumbu terasi, ayam suwir, dan telur mata sapi. Ditemani kerupuk dan acar.",
    categories: ["promo", "terdekat"],
    variants: [spicyLevels],
    addOns: mealAddOns,
  },
  {
    id: "salad-buah-segar",
    name: "Salad Buah Segar",
    restaurant: "Fresh Corner",
    cuisine: "Healthy & Fresh",
    image: "/food/salad-buah-segar.png",
    deliveryTime: "10-15 min",
    rating: 4.8,
    reviews: 987,
    distanceKm: 1.0,
    originalPrice: 32000,
    price: 24000,
    calories: 290,
    description:
      "Potongan buah segar pilihan dengan saus yogurt, mayo, dan taburan keju. Segar dan menyehatkan.",
    categories: ["healthy", "terdekat"],
    variants: [
      {
        id: "dressing",
        label: "Pilihan Saus",
        required: true,
        options: [
          { id: "yogurt", label: "Yogurt", priceDelta: 0 },
          { id: "mayo", label: "Mayo Keju", priceDelta: 0 },
          { id: "madu", label: "Madu Lemon", priceDelta: 2000 },
        ],
      },
    ],
    addOns: [{ id: "granola", label: "+ Granola", price: 5000 }],
  },
  {
    id: "thai-tea",
    name: "Thai Tea Original",
    restaurant: "Teh Time",
    cuisine: "Coffee & Drinks",
    image: "/food/thai-tea.png",
    deliveryTime: "10-15 min",
    rating: 4.5,
    reviews: 2210,
    distanceKm: 0.9,
    originalPrice: 20000,
    price: 15000,
    calories: 220,
    description:
      "Teh Thailand creamy dengan susu segar dan es batu melimpah. Manisnya pas, bikin nagih.",
    categories: ["promo", "minuman", "terdekat"],
    variants: [sugarLevels],
    addOns: drinkAddOns,
  },
  {
    id: "martabak-manis",
    name: "Martabak Manis Coklat Keju",
    restaurant: "Martabak Bangka 88",
    cuisine: "Jajanan Malam",
    image: "/food/martabak-manis.png",
    deliveryTime: "25-30 min",
    rating: 4.7,
    reviews: 1699,
    distanceKm: 2.9,
    originalPrice: 55000,
    price: 42000,
    calories: 950,
    description:
      "Martabak manis tebal lembut dengan topping coklat, keju parut, dan susu kental manis. Porsi jumbo.",
    categories: ["jajanan"],
    variants: [
      {
        id: "topping",
        label: "Topping",
        required: true,
        options: [
          { id: "coklat-keju", label: "Coklat Keju", priceDelta: 0 },
          { id: "kacang", label: "Kacang Coklat", priceDelta: 0 },
          { id: "redvelvet", label: "Red Velvet", priceDelta: 5000 },
        ],
      },
    ],
    addOns: [{ id: "toblerone", label: "+ Toblerone", price: 10000 }],
  },
  {
    id: "sate-ayam-madura",
    name: "Sate Ayam Madura",
    restaurant: "Sate Cak Ndut",
    cuisine: "Sate & Grill",
    image: "/food/sate-ayam-madura.png",
    deliveryTime: "20-25 min",
    rating: 4.8,
    reviews: 2765,
    distanceKm: 2.1,
    originalPrice: 35000,
    price: 27000,
    calories: 480,
    description:
      "10 tusuk sate ayam bumbu kacang khas Madura, dibakar dengan arang. Disajikan dengan lontong dan acar.",
    categories: ["terlaris"],
    variants: [
      {
        id: "carb",
        label: "Pilihan Karbo",
        required: true,
        options: [
          { id: "lontong", label: "Lontong", priceDelta: 0 },
          { id: "nasi", label: "Nasi Putih", priceDelta: 0 },
        ],
      },
    ],
    addOns: [{ id: "sate-extra", label: "+ 5 Tusuk", price: 13000 }],
  },
  {
    id: "bakso-urat-jumbo",
    name: "Bakso Urat Jumbo",
    restaurant: "Bakso Pak Kumis",
    cuisine: "Bakso & Mie",
    image: "/food/bakso-urat-jumbo.png",
    deliveryTime: "15-20 min",
    rating: 4.7,
    reviews: 3102,
    distanceKm: 1.5,
    originalPrice: 30000,
    price: 23000,
    calories: 520,
    description:
      "Bakso urat jumbo dengan kuah kaldu sapi gurih, mie kuning, bihun, dan taburan bawang goreng.",
    categories: ["terlaris", "terdekat", "promo"],
    variants: [spicyLevels],
    addOns: [
      { id: "bakso-tambah", label: "+ Bakso Urat", price: 8000 },
      { id: "pangsit", label: "+ Pangsit Goreng", price: 5000 },
    ],
  },
  {
    id: "gado-gado",
    name: "Gado-Gado Jakarta",
    restaurant: "Fresh Corner",
    cuisine: "Healthy & Fresh",
    image: "/food/gado-gado.png",
    deliveryTime: "15-20 min",
    rating: 4.6,
    reviews: 842,
    distanceKm: 1.0,
    originalPrice: 28000,
    price: 22000,
    calories: 410,
    description:
      "Aneka sayuran rebus, tahu, tempe, dan telur disiram bumbu kacang gurih. Sehat dan mengenyangkan.",
    categories: ["healthy", "terdekat"],
    variants: [spicyLevels],
    addOns: [{ id: "telur", label: "+ Telur", price: 4000 }],
  },
  {
    id: "mie-ayam-ceker",
    name: "Mie Ayam Ceker Special",
    restaurant: "Mie Ayam Pak Djo",
    cuisine: "Bakso & Mie",
    image: "/food/mie-ayam-ceker.png",
    deliveryTime: "15-20 min",
    rating: 4.7,
    reviews: 2087,
    distanceKm: 1.3,
    originalPrice: 27000,
    price: 20000,
    calories: 540,
    description:
      "Mie ayam kenyal dengan ayam kecap gurih, ceker empuk, sawi hijau, dan taburan bawang goreng. Ditemani kuah kaldu bening.",
    categories: ["terlaris", "terdekat", "promo"],
    variants: [spicyLevels],
    addOns: [
      { id: "ceker-extra", label: "+ Ceker", price: 6000 },
      { id: "pangsit", label: "+ Pangsit Rebus", price: 5000 },
    ],
  },
  {
    id: "soto-ayam-lamongan",
    name: "Soto Ayam Lamongan",
    restaurant: "Soto Cak Har",
    cuisine: "Masakan Rumahan",
    image: "/food/soto-ayam-lamongan.png",
    deliveryTime: "20-25 min",
    rating: 4.8,
    reviews: 1764,
    distanceKm: 2.2,
    originalPrice: 30000,
    price: 24000,
    calories: 430,
    description:
      "Soto ayam kuah kuning hangat dengan suwiran ayam, soun, telur, tauge, dan taburan koya gurih. Disajikan dengan nasi.",
    categories: ["terlaris", "healthy"],
    variants: [],
    addOns: [
      { id: "nasi", label: "+ Nasi Putih", price: 4000 },
      { id: "telur", label: "+ Telur Rebus", price: 4000 },
    ],
  },
  {
    id: "matcha-latte",
    name: "Iced Matcha Latte",
    restaurant: "Kopi Senja",
    cuisine: "Coffee & Drinks",
    image: "/food/matcha-latte.png",
    deliveryTime: "10-15 min",
    rating: 4.6,
    reviews: 1893,
    distanceKm: 0.8,
    originalPrice: 28000,
    price: 22000,
    calories: 210,
    description:
      "Matcha premium Jepang dikocok dengan susu segar dan es. Creamy, earthy, dan menyegarkan sepanjang hari.",
    categories: ["minuman", "promo", "terdekat"],
    variants: [sugarLevels],
    addOns: drinkAddOns,
  },
  {
    id: "pisang-goreng-keju",
    name: "Pisang Goreng Keju Coklat",
    restaurant: "Martabak Bangka 88",
    cuisine: "Jajanan Malam",
    image: "/food/pisang-goreng-keju.png",
    deliveryTime: "15-20 min",
    rating: 4.7,
    reviews: 1320,
    distanceKm: 2.9,
    originalPrice: 25000,
    price: 18000,
    calories: 480,
    description:
      "Pisang goreng crispy disiram coklat leleh, taburan keju, dan susu kental manis. Isi 5 potong, cocok buat cemilan.",
    categories: ["jajanan", "promo"],
    variants: [
      {
        id: "topping",
        label: "Topping",
        required: true,
        options: [
          { id: "coklat-keju", label: "Coklat Keju", priceDelta: 0 },
          { id: "greentea", label: "Green Tea", priceDelta: 0 },
          { id: "tiramisu", label: "Tiramisu", priceDelta: 4000 },
        ],
      },
    ],
    addOns: [{ id: "keju-extra", label: "+ Extra Keju", price: 4000 }],
  },
  {
    id: "ayam-bakar-taliwang",
    name: "Ayam Bakar Taliwang",
    restaurant: "Taliwang Lombok",
    cuisine: "Ayam & Sambal",
    image: "/food/ayam-bakar-taliwang.png",
    deliveryTime: "25-30 min",
    rating: 4.9,
    reviews: 2456,
    distanceKm: 3.4,
    originalPrice: 42000,
    price: 32000,
    calories: 690,
    description:
      "Ayam bakar khas Lombok dengan bumbu pedas manis meresap, dibakar sempurna. Disajikan dengan nasi, plecing kangkung, dan sambal.",
    categories: ["terlaris"],
    variants: [spicyLevels],
    addOns: [
      { id: "nasi", label: "+ Nasi Putih", price: 4000 },
      { id: "plecing", label: "+ Plecing Kangkung", price: 8000 },
    ],
  },
  {
    id: "jus-alpukat-coklat",
    name: "Jus Alpukat Coklat",
    restaurant: "Fresh Corner",
    cuisine: "Healthy & Fresh",
    image: "/food/jus-alpukat-coklat.png",
    deliveryTime: "10-15 min",
    rating: 4.8,
    reviews: 1145,
    distanceKm: 1.0,
    originalPrice: 26000,
    price: 20000,
    calories: 320,
    description:
      "Alpukat mentega segar diblender halus dengan susu, disiram coklat kental. Creamy, mengenyangkan, dan bikin segar.",
    categories: ["minuman", "healthy", "terdekat"],
    variants: [sugarLevels],
    addOns: [{ id: "coklat-extra", label: "+ Extra Coklat", price: 3000 }],
  },
]

export function formatIDR(value: number): string {
  return "Rp " + value.toLocaleString("id-ID")
}

export type UserProfile = {
  name: string
  phone: string
  email: string
  avatar: string
}

export const defaultUser: UserProfile = {
  name: "Andini Pratama",
  phone: "+62 812-3456-7890",
  email: "andini.pratama@email.com",
  avatar: "AP",
}

export const avatarChoices: { id: string; label: string; color: string }[] = [
  { id: "AP", label: "Hijau", color: "bg-emerald-500" },
  { id: "AP2", label: "Oranye", color: "bg-orange-500" },
  { id: "AP3", label: "Biru", color: "bg-sky-500" },
  { id: "AP4", label: "Ungu", color: "bg-violet-500" },
  { id: "AP5", label: "Merah", color: "bg-rose-500" },
  { id: "AP6", label: "Kuning", color: "bg-amber-500" },
]

export type AddressLabel = "Rumah" | "Kantor" | "Lainnya"

export type SavedAddress = {
  id: string
  label: AddressLabel
  recipient: string
  detail: string
  note?: string
}

export const defaultAddresses: SavedAddress[] = [
  {
    id: "home",
    label: "Rumah",
    recipient: "Andini Pratama",
    detail: "Jl. Sudirman No. 12, Jakarta Pusat",
    note: "Pagar hijau, sebelah warung kopi",
  },
  {
    id: "office",
    label: "Kantor",
    recipient: "Andini Pratama",
    detail: "Monas Building Lt. 8, Jl. Medan Merdeka, Jakarta",
    note: "Titip ke resepsionis lobby",
  },
  {
    id: "kos",
    label: "Lainnya",
    recipient: "Andini Pratama",
    detail: "Kos Melati, Jl. Kebon Kacang IV No. 5, Jakarta",
  },
]

export type AppNotification = {
  id: string
  type: "order" | "promo" | "info"
  title: string
  body: string
  time: string
  unread: boolean
}

export const defaultNotifications: AppNotification[] = [
  {
    id: "n1",
    type: "order",
    title: "Driver sedang menuju lokasimu!",
    body: "Budi Santoso (B 1234 XYZ) akan tiba dalam 8 menit. Siapkan pesananmu ya.",
    time: "2 menit lalu",
    unread: true,
  },
  {
    id: "n2",
    type: "promo",
    title: "Voucher Diskon 50% untukmu!",
    body: "Pakai kode GREEN50 untuk potongan hingga Rp 25.000. Berlaku sampai malam ini.",
    time: "1 jam lalu",
    unread: true,
  },
  {
    id: "n3",
    type: "order",
    title: "Pesanan sedang disiapkan",
    body: "Ayam Geprek Mozzarella dari Geprek Juara sedang dimasak oleh resto.",
    time: "3 jam lalu",
    unread: false,
  },
  {
    id: "n4",
    type: "promo",
    title: "Gratis Ongkir Sepuasnya!",
    body: "Nikmati gratis ongkir tanpa minimum order setiap hari Jumat. Yuk pesan sekarang!",
    time: "Kemarin",
    unread: false,
  },
  {
    id: "n5",
    type: "info",
    title: "GreenBite Points bertambah 120",
    body: "Terima kasih sudah pesan! Tukarkan poinmu dengan voucher menarik.",
    time: "2 hari lalu",
    unread: false,
  },
]

export type PastOrder = {
  id: string
  items: string
  restaurant: string
  image: string
  total: number
  date: string
  status: "Selesai" | "Diproses" | "Dibatalkan"
}

export const pastOrders: PastOrder[] = [
  {
    id: "GB-240912",
    items: "Ayam Geprek Mozzarella, Es Kopi Susu",
    restaurant: "Geprek Juara",
    image: "/food/ayam-geprek-mozzarella.png",
    total: 51000,
    date: "Hari ini, 12:30",
    status: "Diproses",
  },
  {
    id: "GB-240908",
    items: "Nasi Rendang Padang, Es Teh",
    restaurant: "RM Salero Minang",
    image: "/food/nasi-rendang-padang.png",
    total: 38000,
    date: "20 Sep 2026, 19:15",
    status: "Selesai",
  },
  {
    id: "GB-240901",
    items: "Sate Ayam Madura (2x)",
    restaurant: "Sate Cak Ndut",
    image: "/food/sate-ayam-madura.png",
    total: 54000,
    date: "18 Sep 2026, 20:40",
    status: "Selesai",
  },
  {
    id: "GB-240822",
    items: "Bakso Urat Jumbo, Es Jeruk",
    restaurant: "Bakso Pak Kumis",
    image: "/food/bakso-urat-jumbo.png",
    total: 31000,
    date: "15 Sep 2026, 13:05",
    status: "Selesai",
  },
]

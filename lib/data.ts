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
]

export function formatIDR(value: number): string {
  return "Rp " + value.toLocaleString("id-ID")
}

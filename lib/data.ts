export interface Product {
  id: string
  name: string
  description: string
  price: number
  oldPrice?: number
  category: string
  rating: number
  reviews: number
  inStock: boolean
  isNew?: boolean
  discount?: number
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Смартфон Samsung Galaxy S23',
    description: 'Флагманский смартфон с мощным процессором и отличной камерой',
    price: 79999,
    oldPrice: 89999,
    category: 'electronics',
    rating: 4.7,
    reviews: 128,
    inStock: true,
    isNew: true,
    discount: 11
  },
  {
    id: '2',
    name: 'Джинсы классические',
    description: 'Удобные джинсы из качественного денима',
    price: 3499,
    category: 'clothing',
    rating: 4.3,
    reviews: 89,
    inStock: true
  },
  {
    id: '3',
    name: 'Кофемашина DeLonghi',
    description: 'Автоматическая кофемашина для приготовления эспрессо',
    price: 29999,
    oldPrice: 34999,
    category: 'home',
    rating: 4.8,
    reviews: 45,
    inStock: true,
    discount: 14
  },
  {
    id: '4',
    name: 'Крем для лица',
    description: 'Увлажняющий крем с гиалуроновой кислотой',
    price: 1999,
    category: 'beauty',
    rating: 4.5,
    reviews: 156,
    inStock: false
  },
  {
    id: '5',
    name: 'Наушники Sony WH-1000XM5',
    description: 'Беспроводные наушники с шумоподавлением',
    price: 29999,
    category: 'electronics',
    rating: 4.9,
    reviews: 234,
    inStock: true,
    isNew: true
  },
  {
    id: '6',
    name: 'Футболка хлопковая',
    description: 'Мягкая футболка из 100% хлопка',
    price: 1299,
    category: 'clothing',
    rating: 4.2,
    reviews: 67,
    inStock: true
  },
  {
    id: '7',
    name: 'Пылесос Dyson V15',
    description: 'Беспроводной пылесос с лазерной системой обнаружения пыли',
    price: 59999,
    category: 'home',
    rating: 4.7,
    reviews: 89,
    inStock: true
  },
  {
    id: '8',
    name: 'Набор косметики',
    description: 'Полный набор косметики для ухода за кожей',
    price: 4999,
    category: 'beauty',
    rating: 4.4,
    reviews: 112,
    inStock: true
  }
]

export const categories = [
  {
    id: "electronics",
    name: "Электроника",
    count: 45,
    about: "Смартфоны, ноутбуки, аксессуары и умные гаджеты для дома и работы",
  },
  {
    id: "clothing",
    name: "Одежда",
    count: 120,
    about: "Мужская и женская одежда на каждый день, для работы и отдыха",
  },
  {
    id: "home",
    name: "Для дома",
    count: 78,
    about: "Товары для уюта, кухни, интерьера и организации пространства",
  },
  {
    id: "beauty",
    name: "Красота",
    count: 56,
    about: "Косметика, уход за кожей, волосами и аксессуары для красоты",
  },
  {
    id: "sports",
    name: "Спорт",
    count: 34,
    about: "Спортивная одежда, инвентарь и товары для активного образа жизни",
  },
  {
    id: "books",
    name: "Книги",
    count: 89,
    about: "Художественная литература, учебные пособия и книги для развития",
  },
];

export interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
  createdAt: string
  orders: number
  totalSpent: number
}


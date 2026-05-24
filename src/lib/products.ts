import strawberry from "@/assets/p-strawberry.jpg";
import avocado from "@/assets/p-avocado.jpg";
import milk from "@/assets/p-milk.jpg";
import bread from "@/assets/p-bread.jpg";
import catFruits from "@/assets/cats/fruits.png";
import catVegetables from "@/assets/cats/vegetables.png";
import catDairy from "@/assets/cats/dairy.png";
import catSnacks from "@/assets/cats/snacks.png";
import catBeverages from "@/assets/cats/beverages.png";
import catBakery from "@/assets/cats/bakery.png";
import catFrozen from "@/assets/cats/frozen.png";
import catHousehold from "@/assets/cats/household.png";

export type Product = {
  id: string;
  name: string;
  origin: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  badge?: string;
};

export const products: Product[] = [
  {
    id: "ruby-strawberry",
    name: "Ruby Strawberries",
    origin: "250g · Hydro-Farm 12",
    price: 8.5,
    oldPrice: 11,
    rating: 4.9,
    reviews: 128,
    image: strawberry,
    category: "Fruits",
    badge: "Flash Sale",
  },
  {
    id: "hass-avocado",
    name: "Hass Reserve Avocado",
    origin: "1pc · California",
    price: 4.5,
    rating: 4.8,
    reviews: 312,
    image: avocado,
    category: "Fruits",
    badge: "Peak Fresh",
  },
  {
    id: "a2-milk",
    name: "A2 Heritage Milk",
    origin: "500ml · Grass-fed",
    price: 6.2,
    oldPrice: 7.5,
    rating: 4.7,
    reviews: 87,
    image: milk,
    category: "Dairy",
  },
  {
    id: "sourdough",
    name: "36-Hour Sourdough",
    origin: "600g · Wild Yeast",
    price: 9.0,
    rating: 5.0,
    reviews: 204,
    image: bread,
    category: "Bakery",
    badge: "Buy 1 Get 1",
  },
  {
    id: "rainbow-carrots",
    name: "Rainbow Heritage Carrots",
    origin: "500g · Volcanic Soil",
    price: 7.0,
    rating: 4.6,
    reviews: 56,
    image: avocado,
    category: "Vegetables",
  },
  {
    id: "mission-figs",
    name: "Mission Figs",
    origin: "250g · Late Summer",
    price: 12,
    rating: 4.9,
    reviews: 41,
    image: strawberry,
    category: "Fruits",
  },
  {
    id: "olive-oil",
    name: "Arbequina Olive Oil",
    origin: "500ml · First Press",
    price: 34,
    rating: 4.9,
    reviews: 167,
    image: milk,
    category: "Pantry",
    badge: "Weekend Deal",
  },
  {
    id: "ciabatta",
    name: "Tuscan Ciabatta",
    origin: "400g · Stone Oven",
    price: 7.5,
    rating: 4.8,
    reviews: 73,
    image: bread,
    category: "Bakery",
  },
];

export const categories = [
  { name: "Fruits", count: 48, color: "from-rose-500/40 to-rose-500/0", image: catFruits },
  { name: "Vegetables", count: 62, color: "from-emerald-500/40 to-emerald-500/0", image: catVegetables },
  { name: "Dairy", count: 24, color: "from-sky-500/40 to-sky-500/0", image: catDairy },
  { name: "Snacks", count: 35, color: "from-amber-500/40 to-amber-500/0", image: catSnacks },
  { name: "Beverages", count: 41, color: "from-violet-500/40 to-violet-500/0", image: catBeverages },
  { name: "Bakery", count: 18, color: "from-orange-500/40 to-orange-500/0", image: catBakery },
  { name: "Frozen", count: 22, color: "from-cyan-500/40 to-cyan-500/0", image: catFrozen },
  { name: "Household", count: 53, color: "from-fuchsia-500/40 to-fuchsia-500/0", image: catHousehold },
];

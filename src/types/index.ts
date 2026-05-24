export interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  isAvailable: boolean;
  ingredients?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface MenuResponse {
  items: MenuItem[];
  pagination: Pagination;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  _id: string;
  customerName: string;
  phone: string;
  address: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'delivered' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface Reservation {
  _id: string;
  customerName: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  createdAt: string;
}

export interface Review {
  _id: string;
  customerName: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  createdAt: string;
}

export type CategoryType =
  | 'starters'
  | 'salads'
  | 'burgers'
  | 'pizza'
  | 'main-courses'
  | 'pasta'
  | 'beer-snacks'
  | 'desserts'
  | 'breakfast';

export const CATEGORY_LABELS: Record<CategoryType, string> = {
  starters: 'Starters',
  salads: 'Salads',
  burgers: 'Burgers',
  pizza: 'Pizza',
  'main-courses': 'Main Courses',
  pasta: 'Pasta',
  'beer-snacks': 'Beer Snacks',
  desserts: 'Desserts',
  breakfast: 'Breakfast',
};

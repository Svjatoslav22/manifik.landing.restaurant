import { MenuResponse, MenuItem, Order, Reservation, Review } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
}

// Menu API
export async function getMenu(
  category?: string,
  page: number = 1,
  limit: number = 12
): Promise<MenuResponse> {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  params.append('page', page.toString());
  params.append('limit', limit.toString());

  return fetchAPI<MenuResponse>(`/api/menu?${params.toString()}`);
}

export async function getCategories(): Promise<string[]> {
  const response = await fetchAPI<{ categories: string[] }>('/api/menu/categories');
  return response.categories;
}

export async function getMenuItem(id: string): Promise<MenuItem> {
  return fetchAPI<MenuItem>(`/api/menu/${id}`);
}

// Orders API
export async function createOrder(orderData: {
  customerName: string;
  phone: string;
  address: string;
  items: Array<{ menuItemId: string; name: string; price: number; quantity: number }>;
  notes?: string;
}): Promise<Order> {
  return fetchAPI<Order>('/api/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
}

export async function getOrder(id: string): Promise<Order> {
  return fetchAPI<Order>(`/api/orders/${id}`);
}

// Reservations API
export async function createReservation(reservationData: {
  customerName: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
}): Promise<Reservation> {
  return fetchAPI<Reservation>('/api/reservations', {
    method: 'POST',
    body: JSON.stringify(reservationData),
  });
}

// Reviews API
export async function getReviews(): Promise<Review[]> {
  const response = await fetchAPI<{ reviews: Review[] }>('/api/reviews');
  return response.reviews;
}

export async function createReview(reviewData: {
  customerName: string;
  rating: number;
  comment: string;
}): Promise<{ message: string }> {
  return fetchAPI<{ message: string }>('/api/reviews', {
    method: 'POST',
    body: JSON.stringify(reviewData),
  });
}

// Seed API (for development)
export async function seedDatabase(): Promise<{ message: string; count: number }> {
  return fetchAPI<{ message: string; count: number }>('/api/seed', {
    method: 'POST',
  });
}

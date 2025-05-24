const API_BASE_URL = 'https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1';

export interface Meal {
  id: string;
  meal: string; // название блюда
  category: string;
  area: string;
  instructions: string;
  img: string; // URL изображения
  price: number;
  quantity?: number; // для корзины
}

export interface CartItem extends Meal {
  quantity: number;
}

export interface Order {
  id: string;
  items: Meal[];
  total: number;
  status: string;
}

export const fetchMeals = async (): Promise<Meal[]> => {
  const response = await fetch(`${API_BASE_URL}/meals`);
  if (!response.ok) {
    throw new Error('Failed to fetch meals');
  }
  return response.json();
};

export const fetchOrders = async (): Promise<Order[]> => {
  const response = await fetch(`${API_BASE_URL}/orders`);
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  return response.json();
};

export const createOrder = async (order: Omit<Order, 'id'>): Promise<Order> => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });
  if (!response.ok) {
    throw new Error('Failed to create order');
  }
  return response.json();
}; 
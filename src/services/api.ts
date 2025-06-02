export const API_BASE_URL = 'https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1';

export interface Meal {
  id: string;
  meal: string;
  category: string;
  area: string;
  instructions: string;
  description: string;
  img: string;
  price: number;
  quantity?: number;
}

export const createOrder = async (order: {
  userId: string;
  items: Array<Meal & { quantity: number }>;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered' | 'cancelled';
}): Promise<{
  id: string;
  userId: string;
  items: Array<Meal & { quantity: number }>;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered' | 'cancelled';
  createdAt: string;
}> => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...order,
      createdAt: new Date().toISOString(),
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to create order');
  }
  return response.json();
}; 
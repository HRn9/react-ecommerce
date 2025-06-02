import { Meal } from '../services/api';

export interface CartItem extends Meal {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
} 
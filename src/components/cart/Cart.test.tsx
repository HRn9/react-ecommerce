import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Cart from './Cart';
import { RootState } from '../../store';
import { Meal } from '../../services/api';

const mockStore = configureStore<RootState>([]);

describe('Cart Component', () => {
  let store: ReturnType<typeof mockStore>;

  const mockMeal: Meal = {
    id: '1',
    meal: 'Test Meal',
    category: 'Test Category',
    area: 'Test Area',
    instructions: 'Test Instructions',
    description: 'Test Description',
    img: 'test.jpg',
    price: 10
  };

  const getInitialState = (cartItems: Array<Meal & { quantity: number }> = []) => ({
    cart: {
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    },
    orders: {
      orders: [],
      loading: false,
      error: null
    },
    auth: {
      user: null,
      loading: false,
      error: null
    }
  } as RootState);

  beforeEach(() => {
    store = mockStore(getInitialState());
  });

  const renderCart = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </Provider>
    );
  };

  it('renders cart component with empty cart', () => {
    renderCart();
    expect(screen.getByText('🛒 Cart')).toBeInTheDocument();
    expect(screen.queryByText(/[0-9]+/)).not.toBeInTheDocument();
  });

  it('displays correct item count when cart has items', () => {
    store = mockStore(getInitialState([
      { ...mockMeal, quantity: 2 },
      { ...mockMeal, id: '2', quantity: 3 }
    ]));

    renderCart();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('has correct link to cart page', () => {
    renderCart();
    const cartLink = screen.getByRole('link');
    expect(cartLink).toHaveAttribute('href', '/cart');
  });

  it('applies correct styles', () => {
    renderCart();
    const cartLink = screen.getByRole('link');
    const cartContainer = cartLink.parentElement;

    // Check if container has relative positioning
    expect(cartContainer).toHaveStyle({ position: 'relative' });

    // Check if link has correct text decoration and color
    expect(cartLink).toHaveStyle({
      textDecoration: 'none',
      color: '#666'
    });
  });

  it('updates count when cart items change', () => {
    // Initial render with empty cart
    renderCart();
    expect(screen.queryByText(/[0-9]+/)).not.toBeInTheDocument();

    // Update store with items
    store = mockStore(getInitialState([{ ...mockMeal, quantity: 1 }]));

    // Re-render with new store state
    renderCart();
    expect(screen.getByText('1')).toBeInTheDocument();
  });
}); 
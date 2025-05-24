import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Cart from './Cart';
import cartReducer from '../../store/slices/cartSlice';

const mockCartItems = [
  {
    id: '1',
    name: 'Test Meal',
    price: 10,
    quantity: 2,
    image: 'test.jpg',
    description: 'Test description'
  }
];

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      cart: cartReducer
    },
    preloadedState: {
      cart: {
        items: mockCartItems,
        total: 20,
        ...initialState
      }
    }
  });
};

describe('Cart Component', () => {
  it('renders cart items correctly', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    expect(screen.getByText('Test Meal')).toBeInTheDocument();
    expect(screen.getByText('$20.00')).toBeInTheDocument();
  });

  it('updates quantity when increment button is clicked', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const incrementButton = screen.getByRole('button', { name: '+' });
    fireEvent.click(incrementButton);

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('updates quantity when decrement button is clicked', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const decrementButton = screen.getByRole('button', { name: '-' });
    fireEvent.click(decrementButton);

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('removes item when quantity reaches zero', () => {
    const store = createMockStore({
      items: [{ ...mockCartItems[0], quantity: 1 }]
    });
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const decrementButton = screen.getByRole('button', { name: '-' });
    fireEvent.click(decrementButton);

    expect(screen.queryByText('Test Meal')).not.toBeInTheDocument();
  });

  it('displays empty cart message when no items', () => {
    const store = createMockStore({ items: [] });
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });
}); 
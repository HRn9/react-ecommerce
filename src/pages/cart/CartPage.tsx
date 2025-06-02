import React from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../store';
import { Meal } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../store/slices/ordersSlice';
import { clearCart } from '../../store/slices/cartSlice';

interface CartItem extends Meal {
  quantity: number;
}

const CartContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 1.5rem;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.h3`
  margin: 0 0 0.5rem;
  color: #333;
  font-size: 1.2rem;
`;

const ItemPrice = styled.div`
  color: #ff6b6b;
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const QuantityButton = styled.button`
  background: #f5f5f5;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  color: #333;

  &:hover {
    background: #e0e0e0;
  }
`;

const Quantity = styled.span`
  font-size: 1.1rem;
  color: #333;
  min-width: 30px;
  text-align: center;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ff6b6b;
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1.2rem;
  transition: color 0.3s;

  &:hover {
    color: #ff5252;
  }
`;

const Total = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: right;
`;

const TotalAmount = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff5252;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const EmptyCartText = styled.p`
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);
  const { loading, error } = useAppSelector((state) => state.orders);
  const navigate = useNavigate();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }

    try {
      await dispatch(createOrder()).unwrap();
      dispatch(clearCart());
      navigate('/orders');
    } catch (error) {
      console.error('Failed to create order:', error);
    }
  };

  if (items.length === 0) {
    return (
      <CartContainer>
        <EmptyCart>
          <EmptyCartText>Your cart is empty</EmptyCartText>
          <p>Add some delicious items to your cart!</p>
        </EmptyCart>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <Title>Your Cart</Title>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      {items.map((item: CartItem) => (
        <CartItem key={item.id}>
          <ItemImage src={item.img} alt={item.meal} />
          <ItemDetails>
            <ItemName>{item.meal}</ItemName>
            <ItemPrice>${(item.price * item.quantity).toFixed(2)}</ItemPrice>
            <QuantityControls>
              <QuantityButton>-</QuantityButton>
              <Quantity>{item.quantity}</Quantity>
              <QuantityButton>+</QuantityButton>
            </QuantityControls>
          </ItemDetails>
          <RemoveButton>×</RemoveButton>
        </CartItem>
      ))}
      <Total>
        <TotalAmount>Total: ${total.toFixed(2)}</TotalAmount>
        <CheckoutButton onClick={handleCheckout} disabled={loading}>
          {loading ? 'Creating Order...' : user ? 'Place Order' : 'Login to Order'}
        </CheckoutButton>
      </Total>
    </CartContainer>
  );
};

export default CartPage; 
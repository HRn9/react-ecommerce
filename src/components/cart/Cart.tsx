import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector } from '../../store';

const CartContainer = styled.div`
  position: relative;
`;

const CartLink = styled(Link)`
  text-decoration: none;
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s;

  &:hover {
    color: #ff6b6b;
  }
`;

const CartCount = styled.span`
  background-color: #ff6b6b;
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
  position: absolute;
  top: -8px;
  right: -8px;
`;

const Cart: React.FC = () => {
  const { items } = useAppSelector((state) => state.cart);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContainer>
      <CartLink to="/cart">
        🛒 Cart
        {itemCount > 0 && <CartCount>{itemCount}</CartCount>}
      </CartLink>
    </CartContainer>
  );
};

export default Cart; 
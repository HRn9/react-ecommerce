import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store';
import { useAuth } from '../../../hooks/useAuth';

const HeaderContainer = styled.header`
  background-color: #1a1a1a;
  color: white;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  
  &:hover {
    color: #ff6b6b;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  a {
    color: white;
    text-decoration: none;
    font-size: 1rem;
    transition: color 0.3s ease;
    
    &:hover {
      color: #ff6b6b;
    }
  }
`;

const CartButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  transition: color 0.3s ease;
  position: relative;
  
  &:hover {
    color: #ff6b6b;
  }

  svg {
    width: 1.2rem;
    height: 1.2rem;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #ff6b6b;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
  min-width: 20px;
  padding: 2px;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #ff6b6b;
  }
`;

interface HeaderProps {
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const cartItems = useAppSelector(state => state.cart.items);
  const cartItemsCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">FoodDelivery</Logo>
        <Nav>
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          {user && <Link to="/orders">Orders</Link>}
          <CartButton onClick={onCartClick}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M6 16C5.44772 16 5 16.4477 5 17C5 17.5523 5.44772 18 6 18C6.55228 18 7 17.5523 7 17C7 16.4477 6.55228 16 6 16Z" fill="currentColor"/>
              <path d="M14 16C13.4477 16 13 16.4477 13 17C13 17.5523 13.4477 18 14 18C14.5523 18 15 17.5523 15 17C15 16.4477 14.5523 16 14 16Z" fill="currentColor"/>
              <path d="M2 2H3.5L5.68 13.39C5.7716 13.8722 6.1703 14.25 6.66 14.25H15.25C15.7407 14.25 16.1394 13.8722 16.231 13.39L17.5 6.25H4.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {cartItemsCount > 0 && <CartBadge>{cartItemsCount}</CartBadge>}
          </CartButton>
          {user ? (
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header; 
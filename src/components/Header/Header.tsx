import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { logout } from '../../store/slices/authSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100vw;
  margin: 0;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #ff6b6b;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
    font-size: 0.9rem;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  
  &:hover {
    color: #ff6b6b;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1rem;
    flex-wrap: wrap;
  }
`;

const CartButton = styled.button`
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #333;
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #ff6b6b;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #ff6b6b;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.875rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const UserName = styled.span`
  font-weight: 500;
  color: #333;
`;

const UserStatus = styled.span`
  color: #666;
  font-size: 0.75rem;
`;

const AuthButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ff5252;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.875rem;
  }
`;

const PhoneContainer = styled.div`
  position: relative;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
`;

const PhoneLink = styled.a`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  
  &:hover {
    color: #ff6b6b;
  }
`;

const Tooltip = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #333;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  opacity: ${props => props.$isVisible ? 1 : 0};
  visibility: ${props => props.$isVisible ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  margin-top: 0.5rem;
  z-index: 1000;
  
  &:before {
    content: '';
    position: absolute;
    top: -5px;
    right: 10px;
    border-width: 0 5px 5px 5px;
    border-style: solid;
    border-color: transparent transparent #333 transparent;
  }
`;

interface HeaderProps {
  onCartClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItemsCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  const handleAuthAction = async () => {
    if (isAuthenticated) {
      // Logout
      try {
        await signOut(auth);
        dispatch(logout());
        navigate('/');
      } catch (error) {
        console.error('Logout error:', error);
      }
    } else {
      // Go to login
      navigate('/login');
    }
  };

  const handleCartClick = () => {
    if (onCartClick) {
      onCartClick();
    }
  };

  return (
    <HeaderContainer>
      <Logo to="/">FoodDelivery</Logo>
      
      <Nav>
        <NavLink to="/menu">Menu</NavLink>
        {isAuthenticated && <NavLink to="/orders">Orders</NavLink>}
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </Nav>

      <RightSection>
        <CartButton onClick={handleCartClick}>
          🛒
          {cartItemsCount > 0 && <CartBadge>{cartItemsCount}</CartBadge>}
        </CartButton>

        <UserSection>
          {isAuthenticated && user && (
            <UserInfo>
              <UserName>{user.displayName || user.email}</UserName>
              <UserStatus>Logged in</UserStatus>
            </UserInfo>
          )}
          
          <AuthButton onClick={handleAuthAction}>
            {isAuthenticated ? 'Logout' : 'Login'}
          </AuthButton>
        </UserSection>

        <PhoneContainer
          onMouseEnter={() => setIsTooltipVisible(true)}
          onMouseLeave={() => setIsTooltipVisible(false)}
        >
          <PhoneLink href="tel:+1234567890">📞</PhoneLink>
          <Tooltip $isVisible={isTooltipVisible}>
            +1 (234) 567-890
          </Tooltip>
        </PhoneContainer>
      </RightSection>
    </HeaderContainer>
  );
};

export default Header; 
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../hooks/useAuth';
import { useAppSelector, useAppDispatch } from '../../store';
import { Meal } from '../../services/api';
import { clearUser } from '../../store/slices/authSlice';

interface CartItem extends Meal {
  quantity: number;
}

const HeaderContainer = styled.header`
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #666;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #ff6b6b;
  }

  &.active {
    color: #ff6b6b;
  }
`;

const AuthButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #ff6b6b;
  }
`;

const CartButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-weight: 500;
  transition: color 0.3s ease;

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
  top: -5px;
  right: -5px;
`;

const CartDropdown = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  min-width: 300px;
  display: ${props => props.$isOpen ? 'block' : 'none'};
  z-index: 1000;
  margin-top: 0.5rem;
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
`;

const CartTitle = styled.h3`
  margin: 0;
  color: #333;
  font-size: 1.1rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0.25rem;
  font-size: 1.2rem;
  line-height: 1;
  transition: color 0.3s ease;

  &:hover {
    color: #ff6b6b;
  }
`;

const CartItems = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 1rem;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const CartItemImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
`;

const CartItemDetails = styled.div`
  flex: 1;
`;

const CartItemName = styled.div`
  font-weight: 500;
  color: #333;
  margin-bottom: 0.25rem;
`;

const CartItemPrice = styled.div`
  color: #666;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const QuantityButton = styled.button`
  background: #f5f5f5;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  color: #333;
  transition: background-color 0.3s ease;

  &:hover {
    background: #e0e0e0;
  }
`;

const Quantity = styled.span`
  font-size: 0.9rem;
  color: #333;
  min-width: 20px;
  text-align: center;
`;

const CartTotal = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
`;

const CheckoutButton = styled(Link)`
  background-color: #ff6b6b;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s ease;
  display: block;
  text-align: center;
  margin-top: 1rem;

  &:hover {
    background-color: #ff5252;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  color: #666;
`;

const Header: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, total } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { logout: authLogout } = useAuth();
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await authLogout();
      dispatch(clearUser());
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">Food Delivery</Logo>
        <NavLinks>
          <NavLink to="/menu">Menu</NavLink>
          {user && <NavLink to="/orders">Orders</NavLink>}
          <CartButton onClick={() => setIsCartOpen(!isCartOpen)}>
            Cart
            {itemCount > 0 && <CartCount>{itemCount}</CartCount>}
          </CartButton>
          <CartDropdown ref={cartRef} $isOpen={isCartOpen}>
            <CartHeader>
              <CartTitle>Your Cart</CartTitle>
              <CloseButton onClick={() => setIsCartOpen(false)}>×</CloseButton>
            </CartHeader>
            {items.length > 0 ? (
              <>
                <CartItems>
                  {items.map((item) => (
                    <CartItem key={item.id}>
                      <CartItemImage src={item.img} alt={item.meal} />
                      <CartItemDetails>
                        <CartItemName>{item.meal}</CartItemName>
                        <CartItemPrice>
                          <span>${item.price}</span>
                          <QuantityControls>
                            <QuantityButton>-</QuantityButton>
                            <Quantity>{item.quantity}</Quantity>
                            <QuantityButton>+</QuantityButton>
                          </QuantityControls>
                        </CartItemPrice>
                      </CartItemDetails>
                    </CartItem>
                  ))}
                </CartItems>
                <CartTotal>
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </CartTotal>
                <CheckoutButton to="/cart">
                  {user ? 'Checkout' : 'Login to Checkout'}
                </CheckoutButton>
              </>
            ) : (
              <EmptyCart>
                <p>Your cart is empty</p>
                <p>Add some delicious items to your cart!</p>
              </EmptyCart>
            )}
          </CartDropdown>
          {user ? (
            <AuthButton onClick={handleLogout}>Logout</AuthButton>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header; 
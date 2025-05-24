import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import styled from 'styled-components';
import Cart from '../cart/Cart';
import CartButton from '../cart/CartButton';
import { useAuth } from '../../hooks/useAuth';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background-color: #333;
  color: white;
  padding: 1rem 0;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  a {
    color: white;
    text-decoration: none;
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem 0;
  background-color: #f5f5f5;
`;

const Footer = styled.footer`
  background-color: #333;
  color: white;
  padding: 1.5rem 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
`;

const LogoutButton = styled.button`
  color: white;
  cursor: pointer;
  font-size: 1rem;
`;

const Layout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { logout } = useAuth();

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <LayoutContainer>
      <Header>
        <HeaderContent>
          <Nav>
            <Link to="/">Home</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/order">Order</Link>
          </Nav>
          <Nav>
            <CartButton onClick={handleCartToggle} />
            <LogoutButton onClick={logout}>Logout</LogoutButton>
          </Nav>
        </HeaderContent>
      </Header>
      <Main>
        <Outlet />
      </Main>
      <Footer>
        <FooterContent>
          © {new Date().getFullYear()} React E-commerce. All rights reserved.
        </FooterContent>
      </Footer>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </LayoutContainer>
  );
};

export default Layout; 
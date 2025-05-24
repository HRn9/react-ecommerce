import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterWrapper = styled.div`
  width: 100%;
  background-color: #333;
  color: white;
`;

const FooterContainer = styled.footer`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const FooterSection = styled.div`
  h3 {
    margin-bottom: 1rem;
    font-size: 1.2rem;

    @media (max-width: 768px) {
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }
  }

  p {
    @media (max-width: 768px) {
      font-size: 0.9rem;
      margin-bottom: 0.25rem;
    }
  }
`;

const FooterLink = styled.a`
  color: #fff;
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;
  cursor: pointer;
  
  &:hover {
    color: #ff6b6b;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
  }
`;

const FooterNavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;
  cursor: pointer;
  
  &:hover {
    color: #ff6b6b;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterContent>
          <FooterSection>
            <h3>About Us</h3>
            <p>Delivering the best food experience since 2024. We connect you with amazing restaurants and ensure fresh, hot meals arrive at your doorstep.</p>
          </FooterSection>
          <FooterSection>
            <h3>Quick Links</h3>
            <FooterNavLink to="/menu">Menu</FooterNavLink>
            <FooterNavLink to="/about">About</FooterNavLink>
            <FooterNavLink to="/contact">Contact</FooterNavLink>
            <FooterNavLink to="/orders">Orders</FooterNavLink>
          </FooterSection>
          <FooterSection>
            <h3>Support</h3>
            <FooterLink href="tel:+1234567890">Customer Service</FooterLink>
            <FooterLink href="mailto:support@fooddelivery.com">Email Support</FooterLink>
            <FooterLink href="/contact">Help Center</FooterLink>
            <FooterNavLink to="/contact">Report an Issue</FooterNavLink>
          </FooterSection>
        </FooterContent>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default Footer; 
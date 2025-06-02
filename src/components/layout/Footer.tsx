import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #1a1a1a;
  color: #fff;
  padding: 1.5rem 0;
  text-align: center;
  font-size: 0.9rem;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      © 2024 FoodDelivery. All rights reserved.
    </FooterContainer>
  );
};

export default Footer; 
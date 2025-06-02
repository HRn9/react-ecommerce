import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store';

const MainContent = styled.div`
  flex: 1;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 140px);
`;

const HeroSection = styled.section`
  flex: 1;
  min-height: calc(100vh - 140px);
  background-image: url('/images/hero-bg.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
  padding: 0 2rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  gap: 0.5rem;
`;

const PlaceOrderButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);

  &:hover {
    background-color: #ff5252;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
`;

const Home: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    navigate('/menu');
  };

  return (
    <MainContent>
      <HeroSection>
        <HeroContent>
          <Title>Delicious Food Delivered To Your Door</Title>
          <Subtitle>Choose from our wide selection of dishes and enjoy a great meal at home</Subtitle>
          <RatingContainer>
            {[...Array(5)].map((_, index) => (
              <svg key={index} width="24" height="24" viewBox="0 0 24 24" fill="#ffd700" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
            ))}
          </RatingContainer>
          <PlaceOrderButton onClick={handlePlaceOrder}>
            {user ? 'Place an Order' : 'Browse Menu'}
          </PlaceOrderButton>
        </HeroContent>
      </HeroSection>
    </MainContent>
  );
};

export default Home; 
import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../hooks/useAuth';
import AppContainer from '../../components/layout/AppContainer';
import { Title, Subtitle, Card, Grid, colors, typography } from '../../styles/common';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Cart from '../../components/cart/Cart';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem 0;
`;

const HeroSection = styled.div`
  background-image: url('/images/hero-bg.jpg');
  background-size: cover;
  background-position: center;
  padding: 4rem 0;
  color: white;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: white;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: white;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 0.5rem;
`;

const StarIcon = styled(FaStar)`
  color: #ffd700;
  font-size: 1.5rem;
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

const AdvantagesSection = styled.section`
  padding: 4rem 0;
  background-color: #f5f5f5;
`;

const AdvantageCard = styled(Card)`
  text-align: center;
  padding: 2rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const AdvantageIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const AdvantageTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${colors.primary};
`;

const AdvantageDescription = styled.p`
  color: ${colors.text};
  line-height: 1.6;
`;

const Home: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isCartVisible, setIsCartVisible] = useState(false);

  const handlePlaceOrder = () => {
    navigate('/menu');
  };

  const handleCartClick = () => {
    setIsCartVisible(!isCartVisible);
  };

  return (
    <PageContainer>
      <Header onCartClick={handleCartClick} />
      <MainContent>
        <HeroSection>
          <HeroContent>
            <HeroTitle>Welcome to Our Restaurant</HeroTitle>
            <HeroSubtitle>Discover the best food and drinks</HeroSubtitle>
            <RatingContainer>
              {[...Array(5)].map((_, index) => (
                <StarIcon key={index} />
              ))}
            </RatingContainer>
            <PlaceOrderButton onClick={handlePlaceOrder}>
              {user ? 'Place an Order' : 'Browse Menu'}
            </PlaceOrderButton>
          </HeroContent>
        </HeroSection>
        <AdvantagesSection>
          <AppContainer>
            <Grid>
              <AdvantageCard>
                <AdvantageIcon>🚚</AdvantageIcon>
                <AdvantageTitle>Fast Delivery</AdvantageTitle>
                <AdvantageDescription>
                  Get your food delivered quickly and hot within 30 minutes
                </AdvantageDescription>
              </AdvantageCard>
              <AdvantageCard>
                <AdvantageIcon>🍽️</AdvantageIcon>
                <AdvantageTitle>Fresh Food</AdvantageTitle>
                <AdvantageDescription>
                  We use only the freshest ingredients from local suppliers
                </AdvantageDescription>
              </AdvantageCard>
              <AdvantageCard>
                <AdvantageIcon>⭐</AdvantageIcon>
                <AdvantageTitle>Best Quality</AdvantageTitle>
                <AdvantageDescription>
                  5-star rated restaurant with exceptional customer service
                </AdvantageDescription>
              </AdvantageCard>
            </Grid>
          </AppContainer>
        </AdvantagesSection>
      </MainContent>
      {isCartVisible && <Cart onClose={() => setIsCartVisible(false)} />}
      <Footer />
    </PageContainer>
  );
};

export default Home; 
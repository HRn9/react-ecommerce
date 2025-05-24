import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Cart from '../components/cart/Cart';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: #f5f5f5;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 3rem;
  color: #333;
  font-size: 2.5rem;
`;

const AboutSection = styled.section`
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: #ff6b6b;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

const SectionText = styled.p`
  line-height: 1.8;
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

const StatCard = styled.div`
  text-align: center;
  padding: 1.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #ff6b6b;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #666;
  font-weight: 500;
`;

const TeamSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const TeamMember = styled.div`
  text-align: center;
  padding: 1.5rem;
  background: #f9f9f9;
  border-radius: 8px;
`;

const MemberName = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
`;

const MemberRole = styled.p`
  color: #ff6b6b;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const MemberDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const AboutPage: React.FC = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);

  const handleCartClick = () => {
    setIsCartVisible(!isCartVisible);
  };

  return (
    <PageContainer>
      <Header onCartClick={handleCartClick} />
      <MainContent>
        <ContentWrapper>
          <Title>About FoodDelivery</Title>
          
          <AboutSection>
            <SectionTitle>Our Story</SectionTitle>
            <SectionText>
              Founded in 2024, FoodDelivery started with a simple mission: to bring the best culinary experiences 
              directly to your doorstep. What began as a small local delivery service has grown into a comprehensive 
              food delivery platform, connecting food lovers with exceptional restaurants and talented chefs.
            </SectionText>
            <SectionText>
              We believe that great food brings people together, and everyone deserves access to quality meals, 
              regardless of their location or schedule. Our platform features carefully curated restaurants, 
              ensuring that every meal delivered meets our high standards for taste, quality, and freshness.
            </SectionText>
          </AboutSection>

          <AboutSection>
            <SectionTitle>Our Mission</SectionTitle>
            <SectionText>
              To revolutionize the food delivery experience by connecting communities with exceptional culinary 
              experiences, supporting local restaurants, and delivering not just food, but moments of joy and 
              satisfaction to every customer.
            </SectionText>
            
            <StatsGrid>
              <StatCard>
                <StatNumber>500+</StatNumber>
                <StatLabel>Partner Restaurants</StatLabel>
              </StatCard>
              <StatCard>
                <StatNumber>50,000+</StatNumber>
                <StatLabel>Happy Customers</StatLabel>
              </StatCard>
              <StatCard>
                <StatNumber>200,000+</StatNumber>
                <StatLabel>Orders Delivered</StatLabel>
              </StatCard>
              <StatCard>
                <StatNumber>30 min</StatNumber>
                <StatLabel>Average Delivery Time</StatLabel>
              </StatCard>
            </StatsGrid>
          </AboutSection>

          <AboutSection>
            <SectionTitle>Our Team</SectionTitle>
            <SectionText>
              Our dedicated team works around the clock to ensure your food delivery experience is exceptional. 
              From our tech team constantly improving our platform to our customer service representatives ready 
              to help, we're committed to serving you better.
            </SectionText>
            
            <TeamSection>
              <TeamMember>
                <MemberName>Sarah Johnson</MemberName>
                <MemberRole>Head Chef Partner</MemberRole>
                <MemberDescription>
                  With over 15 years of culinary experience, Sarah ensures all our partner restaurants 
                  meet the highest quality standards.
                </MemberDescription>
              </TeamMember>
              <TeamMember>
                <MemberName>Mike Chen</MemberName>
                <MemberRole>Operations Director</MemberRole>
                <MemberDescription>
                  Mike oversees our delivery operations, making sure your food arrives hot, fresh, 
                  and on time, every time.
                </MemberDescription>
              </TeamMember>
              <TeamMember>
                <MemberName>Lisa Rodriguez</MemberName>
                <MemberRole>Customer Experience Manager</MemberRole>
                <MemberDescription>
                  Lisa leads our customer service team, ensuring every interaction exceeds expectations 
                  and resolves any issues quickly.
                </MemberDescription>
              </TeamMember>
            </TeamSection>
          </AboutSection>
        </ContentWrapper>
      </MainContent>
      {isCartVisible && <Cart onClose={() => setIsCartVisible(false)} />}
      <Footer />
    </PageContainer>
  );
};

export default AboutPage; 
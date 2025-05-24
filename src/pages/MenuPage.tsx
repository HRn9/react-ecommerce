import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useDispatch } from 'react-redux';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Cart from '../components/cart/Cart';
import { Meal } from '../services/api';
import useFetch from '../hooks/useFetch';
import { addToCart } from '../store/slices/cartSlice';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 1rem;
  width: 100%;
  background-color: #f5f5f5;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const FiltersSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ $active: boolean }>`
  padding: 0.75rem 1.5rem;
  border: 2px solid #ff6b6b;
  border-radius: 25px;
  background-color: ${props => props.$active ? '#ff6b6b' : 'white'};
  color: ${props => props.$active ? 'white' : '#ff6b6b'};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #ff6b6b;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
`;

const ResultsCount = styled.span`
  color: #666;
  font-size: 1rem;
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
  }
`;

const MenuItem = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${MenuItem}:hover & {
    transform: scale(1.05);
  }
`;

const ItemContent = styled.div`
  padding: 1.5rem;
`;

const ItemName = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  color: #333;
`;

const ItemCategory = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: #ff6b6b;
  color: white;
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const ItemDescription = styled.p`
  color: #666;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const ItemPrice = styled.div`
  font-weight: bold;
  color: #ff6b6b;
  font-size: 1.125rem;
  margin-bottom: 1rem;
`;

const SeeMoreButton = styled.button`
  display: block;
  margin: 2rem auto;
  padding: 0.75rem 1.5rem;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);

  &:hover {
    background-color: #ff5252;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
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
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 2rem;
  text-align: center;
  color: #ff6b6b;
`;

const RetryButton = styled.button`
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ff5252;
  }
`;

type Category = 'All' | 'Breakfast' | 'Dinner' | 'Dessert';

const MenuPage: React.FC = () => {
  const dispatch = useDispatch();
  const ITEMS_PER_PAGE = 6;
  
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [displayedMeals, setDisplayedMeals] = useState<Meal[]>([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const { data: meals, loading, error } = useFetch<Meal[]>('https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals');

  // Фильтруем блюда по категории
  const filteredMeals = React.useMemo(() => {
    if (!meals) return [];
    if (selectedCategory === 'All') return meals;
    return meals.filter(meal => meal.category === selectedCategory);
  }, [meals, selectedCategory]);

  React.useEffect(() => {
    if (filteredMeals.length > 0) {
      setDisplayedMeals(filteredMeals.slice(0, ITEMS_PER_PAGE));
    }
  }, [filteredMeals]);

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleSeeMore = () => {
    const nextItems = filteredMeals.slice(
      displayedMeals.length,
      displayedMeals.length + ITEMS_PER_PAGE
    );
    setDisplayedMeals([...displayedMeals, ...nextItems]);
  };

  const handleAddToCart = (meal: Meal) => {
    dispatch(addToCart(meal));
  };

  const handleCartClick = () => {
    setIsCartVisible(!isCartVisible);
  };

  if (loading) {
    return (
      <PageContainer>
        <Header onCartClick={handleCartClick} />
        <MainContent>
          <ContentWrapper>
            <LoadingContainer>Loading menu...</LoadingContainer>
          </ContentWrapper>
        </MainContent>
        <Footer />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Header onCartClick={handleCartClick} />
        <MainContent>
          <ContentWrapper>
            <ErrorContainer>
              <p>Failed to load meals. Please try again.</p>
              <RetryButton onClick={() => window.location.reload()}>
                Retry
              </RetryButton>
            </ErrorContainer>
          </ContentWrapper>
        </MainContent>
        <Footer />
      </PageContainer>
    );
  }

  const categories: Category[] = ['All', 'Breakfast', 'Dinner', 'Dessert'];

  return (
    <PageContainer>
      <Header onCartClick={handleCartClick} />
      <MainContent>
        <ContentWrapper>
          <FiltersSection>
            {categories.map(category => (
              <FilterButton
                key={category}
                $active={selectedCategory === category}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </FilterButton>
            ))}
          </FiltersSection>

          <ResultsHeader>
            <ResultsCount>
              Showing {displayedMeals.length} of {filteredMeals.length} dishes
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            </ResultsCount>
          </ResultsHeader>

          <MenuGrid>
            {displayedMeals.map((meal) => (
              <MenuItem key={meal.id}>
                <ItemImage src={meal.img} alt={meal.meal} />
                <ItemContent>
                  <ItemCategory>{meal.category}</ItemCategory>
                  <ItemName>{meal.meal}</ItemName>
                  <ItemDescription>{meal.instructions.substring(0, 150)}...</ItemDescription>
                  <ItemPrice>${meal.price.toFixed(2)}</ItemPrice>
                  <AddToCartButton onClick={() => handleAddToCart(meal)}>
                    Add to Cart
                  </AddToCartButton>
                </ItemContent>
              </MenuItem>
            ))}
          </MenuGrid>
          
          {filteredMeals.length > displayedMeals.length && (
            <SeeMoreButton onClick={handleSeeMore}>
              See More ({filteredMeals.length - displayedMeals.length} remaining)
            </SeeMoreButton>
          )}
        </ContentWrapper>
      </MainContent>
      
      {isCartVisible && <Cart onClose={() => setIsCartVisible(false)} />}
      <Footer />
    </PageContainer>
  );
};

export default MenuPage; 
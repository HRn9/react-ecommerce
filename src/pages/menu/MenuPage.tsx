import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAppDispatch } from '../../store';
import { Meal, API_BASE_URL } from '../../services/api';
import useFetch from '../../hooks/useFetch';
import { addToCart } from '../../store/slices/cartSlice';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const MenuContainer = styled.div`
  min-height: calc(100vh - 140px);
  background-color: #f5f5f5;
  padding: 0;
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
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
  }
`;

const MenuItem = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ItemContent = styled.div`
  padding: 1rem;
`;

const ItemTitle = styled.h3`
  margin: 0 0 0.5rem;
  color: #333;
`;

const ItemDescription = styled.p`
  color: #666;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const ItemPrice = styled.div`
  color: #ff6b6b;
  font-weight: bold;
  font-size: 1.2rem;
`;

const AddButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff5252;
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
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [visibleItems, setVisibleItems] = useState(6);
  
  const { data: meals, loading, error, refetch } = useFetch<Meal[]>(`${API_BASE_URL}/meals`);

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleSeeMore = () => {
    setVisibleItems(prev => prev + 6);
  };

  const handleAddToCart = (meal: Meal) => {
    const action = addToCart(meal);
    dispatch(action);
  };

  const filteredMeals = meals?.filter(meal => 
    selectedCategory === 'All' || meal.category === selectedCategory
  ) || [];

  const displayedMeals = filteredMeals.slice(0, visibleItems);
  const hasMoreMeals = visibleItems < filteredMeals.length;

  if (loading) {
    return <LoadingContainer>Loading menu...</LoadingContainer>;
  }

  if (error) {
    return (
      <ErrorContainer>
        <div>Failed to load menu. Please try again.</div>
        <RetryButton onClick={() => refetch()}>Retry</RetryButton>
      </ErrorContainer>
    );
  }

  return (
    <MenuContainer>
      <ContentWrapper>
        <FiltersSection>
          <FilterButton 
            $active={selectedCategory === 'All'} 
            onClick={() => handleCategoryChange('All')}
          >
            All
          </FilterButton>
          <FilterButton 
            $active={selectedCategory === 'Breakfast'} 
            onClick={() => handleCategoryChange('Breakfast')}
          >
            Breakfast
          </FilterButton>
          <FilterButton 
            $active={selectedCategory === 'Dinner'} 
            onClick={() => handleCategoryChange('Dinner')}
          >
            Dinner
          </FilterButton>
          <FilterButton 
            $active={selectedCategory === 'Dessert'} 
            onClick={() => handleCategoryChange('Dessert')}
          >
            Dessert
          </FilterButton>
        </FiltersSection>

        <ResultsHeader>
          <ResultsCount>
            {filteredMeals.length} {filteredMeals.length === 1 ? 'item' : 'items'} found
          </ResultsCount>
        </ResultsHeader>

        <MenuGrid>
          {displayedMeals.map(meal => (
            <MenuItem key={meal.id}>
              <ItemImage src={meal.img} alt={meal.meal} />
              <ItemContent>
                <ItemTitle>{meal.meal}</ItemTitle>
                <ItemDescription>{meal.description}</ItemDescription>
                <ItemPrice>${meal.price.toFixed(2)}</ItemPrice>
                <AddButton onClick={() => handleAddToCart(meal)}>
                  Add to Cart
                </AddButton>
              </ItemContent>
            </MenuItem>
          ))}
        </MenuGrid>

        {hasMoreMeals && (
          <AddButton onClick={handleSeeMore}>
            See More
          </AddButton>
        )}
      </ContentWrapper>
    </MenuContainer>
  );
};

export default MenuPage; 
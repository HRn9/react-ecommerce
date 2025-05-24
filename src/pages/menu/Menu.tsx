import { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../store';
import { addItem } from '../../store/slices/cartSlice';
import AppContainer from '../../components/layout/AppContainer';
import { Title, Card, Button, Grid, colors, spacing } from '../../styles/common';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity?: number;
}

const MenuCard = styled(Card)`
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-6px);
  }
`;

const MenuImage = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
  border-radius: 12px;
`;

const MenuContent = styled.div`
  padding: ${spacing.md};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MenuName = styled.h3`
  font-size: 1.6rem;
  color: ${colors.text.primary};
  margin-bottom: 0.7rem;
  font-weight: 700;
`;

const MenuDescription = styled.p`
  color: ${colors.text.secondary};
  margin-bottom: 1.2rem;
  line-height: 1.7;
  text-align: center;
  font-size: 1.1rem;
`;

const MenuPrice = styled.div`
  font-size: 1.25rem;
  color: ${colors.text.primary};
  font-weight: bold;
  margin-bottom: 1.2rem;
`;

// Temporary mock data
const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Classic Burger',
    description: 'Juicy beef patty with fresh vegetables and special sauce',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: '2',
    name: 'Margherita Pizza',
    description: 'Traditional pizza with tomato sauce, mozzarella, and basil',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: '3',
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with Caesar dressing and croutons',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
];

const Menu = () => {
  const [menuItems] = useState<MenuItem[]>(mockMenuItems);
  const dispatch = useAppDispatch();

  const handleAddToCart = (item: MenuItem) => {
    dispatch(addItem({ ...item, quantity: 1 }));
  };

  return (
    <AppContainer>
      <Title>Our Menu</Title>
      <Grid>
        {menuItems.map((item) => (
          <MenuCard key={item.id}>
            <MenuImage src={item.image} alt={item.name} />
            <MenuContent>
              <MenuName>{item.name}</MenuName>
              <MenuDescription>{item.description}</MenuDescription>
              <MenuPrice>${item.price.toFixed(2)}</MenuPrice>
              <Button onClick={() => handleAddToCart(item)}>
                Add to Cart
              </Button>
            </MenuContent>
          </MenuCard>
        ))}
      </Grid>
    </AppContainer>
  );
};

export default Menu; 
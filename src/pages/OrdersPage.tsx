import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { setOrders, setLoading, setError } from '../store/slices/ordersSlice';
import { Order } from '../store/slices/ordersSlice';
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
  margin-bottom: 2rem;
  color: #333;
`;

const OrdersGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const OrderCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
`;

const OrderId = styled.div`
  font-weight: 500;
  color: #333;
`;

const OrderDate = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const OrderStatus = styled.span<{ status: Order['status'] }>`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  background-color: ${({ status }) => {
    switch (status) {
      case 'pending': return '#ffc107';
      case 'confirmed': return '#17a2b8';
      case 'preparing': return '#fd7e14';
      case 'delivered': return '#28a745';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  }};
  color: white;
`;

const OrderItems = styled.div`
  margin-bottom: 1rem;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f5f5f5;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  object-fit: cover;
  margin-right: 1rem;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const ItemMeta = styled.div`
  color: #666;
  font-size: 0.875rem;
`;

const OrderTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  font-weight: 500;
  color: #333;
`;

const EmptyContainer = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const EmptyMessage = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1rem;
`;

const SubMessage = styled.p`
  color: #999;
  margin-bottom: 2rem;
`;

const BrowseMenuButton = styled.button`
  padding: 1rem 2rem;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ff5252;
    transform: translateY(-2px);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff5252;
  }
`;

const OrdersPage: React.FC = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading, error } = useSelector((state: RootState) => state.orders);
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleCartClick = () => {
    setIsCartVisible(!isCartVisible);
  };

  const handleBrowseMenu = () => {
    navigate('/menu');
  };

  const fetchOrders = async () => {
    if (!isAuthenticated || !user) return;

    dispatch(setLoading(true));
    try {
      const response = await fetch('https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/orders');
      if (response.ok) {
        const allOrders = await response.json();
        // Фильтруем заказы для текущего пользователя
        const userOrders = allOrders.filter((order: Order) => order.userId === user.uid);
        dispatch(setOrders(userOrders));
      } else {
        throw new Error('Failed to fetch orders');
      }
    } catch (error) {
      dispatch(setError('Failed to load orders'));
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [isAuthenticated, user]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isAuthenticated) {
    return (
      <PageContainer>
        <Header onCartClick={handleCartClick} />
        <MainContent>
          <ContentWrapper>
            <Title>My Orders</Title>
            <EmptyContainer>
              <EmptyMessage>Please login to view your orders</EmptyMessage>
              <BrowseMenuButton onClick={() => navigate('/login')}>
                Login
              </BrowseMenuButton>
            </EmptyContainer>
          </ContentWrapper>
        </MainContent>
        {isCartVisible && <Cart onClose={() => setIsCartVisible(false)} />}
        <Footer />
      </PageContainer>
    );
  }

  if (loading) {
    return (
      <PageContainer>
        <Header onCartClick={handleCartClick} />
        <MainContent>
          <ContentWrapper>
            <Title>My Orders</Title>
            <LoadingContainer>Loading your orders...</LoadingContainer>
          </ContentWrapper>
        </MainContent>
        {isCartVisible && <Cart onClose={() => setIsCartVisible(false)} />}
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
            <Title>My Orders</Title>
            <ErrorContainer>
              <p>{error}</p>
              <RetryButton onClick={fetchOrders}>
                Try Again
              </RetryButton>
            </ErrorContainer>
          </ContentWrapper>
        </MainContent>
        {isCartVisible && <Cart onClose={() => setIsCartVisible(false)} />}
        <Footer />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header onCartClick={handleCartClick} />
      <MainContent>
        <ContentWrapper>
          <Title>My Orders ({orders.length})</Title>
          
          {orders.length === 0 ? (
            <EmptyContainer>
              <EmptyMessage>You don't have any orders yet</EmptyMessage>
              <SubMessage>Place your first order from our delicious menu!</SubMessage>
              <BrowseMenuButton onClick={handleBrowseMenu}>
                Browse Menu
              </BrowseMenuButton>
            </EmptyContainer>
          ) : (
            <OrdersGrid>
              {orders.map((order) => (
                <OrderCard key={order.id}>
                  <OrderHeader>
                    <div>
                      <OrderId>Order #{order.id.slice(-6)}</OrderId>
                      <OrderDate>{formatDate(order.createdAt)}</OrderDate>
                    </div>
                    <OrderStatus status={order.status}>{order.status}</OrderStatus>
                  </OrderHeader>
                  
                  <OrderItems>
                    {order.items.map((item, index) => (
                      <OrderItem key={index}>
                        <ItemImage src={item.img} alt={item.meal} />
                        <ItemDetails>
                          <ItemName>{item.meal}</ItemName>
                          <ItemMeta>
                            Qty: {item.quantity} × ${item.price.toFixed(2)}
                          </ItemMeta>
                        </ItemDetails>
                      </OrderItem>
                    ))}
                  </OrderItems>
                  
                  <OrderTotal>
                    <span>Total:</span>
                    <span>${order.total.toFixed(2)}</span>
                  </OrderTotal>
                </OrderCard>
              ))}
            </OrdersGrid>
          )}
        </ContentWrapper>
      </MainContent>
      {isCartVisible && <Cart onClose={() => setIsCartVisible(false)} />}
      <Footer />
    </PageContainer>
  );
};

export default OrdersPage; 
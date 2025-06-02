import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../store';
import { fetchOrders } from '../../store/slices/ordersSlice';
import { Order } from '../../store/slices/ordersSlice';

const OrdersContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
`;

const OrderCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  overflow: hidden;
`;

const OrderHeader = styled.div`
  padding: 1rem;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OrderId = styled.div`
  font-weight: 500;
  color: #333;
`;

const OrderDate = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const OrderStatus = styled.div<{ $status: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  background-color: ${props => {
    switch (props.$status) {
      case 'pending':
        return '#fff3cd';
      case 'completed':
        return '#d4edda';
      case 'cancelled':
        return '#f8d7da';
      default:
        return '#e2e3e5';
    }
  }};
  color: ${props => {
    switch (props.$status) {
      case 'pending':
        return '#856404';
      case 'completed':
        return '#155724';
      case 'cancelled':
        return '#721c24';
      default:
        return '#383d41';
    }
  }};
`;

const OrderItems = styled.div`
  padding: 1rem;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 1rem;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const ItemQuantity = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const ItemPrice = styled.div`
  color: #ff6b6b;
  font-weight: 500;
`;

const OrderTotal = styled.div`
  padding: 1rem;
  background: #f8f9fa;
  border-top: 1px solid #eee;
  text-align: right;
  font-weight: bold;
  color: #333;
`;

const EmptyOrders = styled.div`
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const EmptyOrdersText = styled.p`
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 1rem;
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
  text-align: center;
  padding: 2rem;
  color: #dc3545;
  font-size: 1.1rem;
`;

const SortContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
`;

const SortButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: ${props => props.$active ? '#ff6b6b' : 'white'};
  color: ${props => props.$active ? 'white' : '#333'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #ff6b6b;
    background-color: ${props => props.$active ? '#ff6b6b' : '#fff5f5'};
  }
`;

const OrdersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { orders, loading, error } = useAppSelector((state) => state.orders);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const sortedOrders = [...orders].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  if (loading) {
    return <LoadingContainer>Loading orders...</LoadingContainer>;
  }

  if (error) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }

  if (orders.length === 0) {
    return (
      <OrdersContainer>
        <EmptyOrders>
          <EmptyOrdersText>You haven't placed any orders yet</EmptyOrdersText>
          <p>Start by adding some items to your cart!</p>
        </EmptyOrders>
      </OrdersContainer>
    );
  }

  return (
    <OrdersContainer>
      <Title>Your Orders</Title>
      <SortContainer>
        <SortButton
          $active={sortOrder === 'newest'}
          onClick={() => setSortOrder('newest')}
        >
          Newest First
        </SortButton>
        <SortButton
          $active={sortOrder === 'oldest'}
          onClick={() => setSortOrder('oldest')}
        >
          Oldest First
        </SortButton>
      </SortContainer>
      {sortedOrders.map((order) => (
        <OrderCard key={order.id}>
          <OrderHeader>
            <OrderId>Order #{order.id}</OrderId>
            <OrderDate>
              {new Date(order.createdAt).toLocaleDateString()}
            </OrderDate>
            <OrderStatus $status={order.status}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </OrderStatus>
          </OrderHeader>
          <OrderItems>
            {order.items.map((item) => (
              <OrderItem key={item.id}>
                <ItemImage src={item.img} alt={item.meal} />
                <ItemDetails>
                  <ItemName>{item.meal}</ItemName>
                  <ItemQuantity>Quantity: {item.quantity}</ItemQuantity>
                </ItemDetails>
                <ItemPrice>${(item.price * item.quantity).toFixed(2)}</ItemPrice>
              </OrderItem>
            ))}
          </OrderItems>
          <OrderTotal>Total: ${order.total.toFixed(2)}</OrderTotal>
        </OrderCard>
      ))}
    </OrdersContainer>
  );
};

export default OrdersPage; 
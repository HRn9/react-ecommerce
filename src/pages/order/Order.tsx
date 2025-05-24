import { useState } from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../store';
import { clearCart } from '../../store/slices/cartSlice';
import AppContainer from '../../components/layout/AppContainer';

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const OrderFormContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const FieldsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  width: 100%;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 1rem;
  width: 100%;
`;

const OrderSummaryCard = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  width: 100%;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
  width: 100%;
`;

const OrderTotal = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: 1rem;
  width: 100%;
`;

const SummaryTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 2rem;

  &:hover {
    background-color: #444;
  }
`;

const Order = () => {
  const dispatch = useAppDispatch();
  const { items, total } = useAppSelector((state) => state.cart);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Order submitted:', { items, total, ...formData });
    dispatch(clearCart());
  };

  if (items.length === 0) {
    return (
      <AppContainer>
        <Title>Your Order</Title>
        <p style={{ fontSize: '1.3rem', textAlign: 'center' }}>
          Your cart is empty. Please add some items to your cart first.
        </p>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <Title>Your Order</Title>
      
      <OrderFormContainer>
        <form onSubmit={handleSubmit}>
          <FieldsContainer>
            <FormGroup>
              <Label htmlFor="name">Full Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="address">Address</Label>
              <Input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="city">City</Label>
              <Input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </FieldsContainer>

          <OrderSummaryCard>
            <SummaryTitle>Order Summary</SummaryTitle>
            {items.map((item) => (
              <OrderItem key={item.id}>
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </OrderItem>
            ))}
            <OrderTotal>
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </OrderTotal>
          </OrderSummaryCard>

          <Button type="submit">
            Place Order
          </Button>
        </form>
      </OrderFormContainer>
    </AppContainer>
  );
};

export default Order; 

import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { setError } from '../store/slices/authSlice';
import { RootState } from '../store/store';
import { createDemoUser } from '../utils/createDemoUser';
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
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f5f5f5;
`;

const LoginForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #ff6b6b;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff5252;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  margin-top: 1rem;
  text-align: center;
`;

const DemoCredentials = styled.div`
  background: #f0f8ff;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: #333;
`;

const DemoTitle = styled.div`
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #ff6b6b;
`;

const CreateUserButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 0.5rem;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { error, loading } = useSelector((state: RootState) => state.auth);

  const from = location.state?.from?.pathname || '/';

  const handleCartClick = () => {
    setIsCartVisible(!isCartVisible);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(from, { replace: true });
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'An error occurred'));
    }
  };

  const handleDemoLogin = () => {
    setEmail('demo@fooddelivery.com');
    setPassword('demo123');
  };

  const handleCreateDemoUser = async () => {
    setIsCreatingUser(true);
    try {
      await createDemoUser();
      alert('Demo user created successfully! You can now login with demo@fooddelivery.com / demo123');
    } catch (error) {
      if (error instanceof Error && error.message.includes('email-already-in-use')) {
        alert('Demo user already exists! You can login with demo@fooddelivery.com / demo123');
      } else {
        alert('Failed to create demo user. Please try again.');
        console.error('Error creating demo user:', error);
      }
    } finally {
      setIsCreatingUser(false);
    }
  };

  return (
    <PageContainer>
      <Header onCartClick={handleCartClick} />
      <MainContent>
        <LoginForm onSubmit={handleSubmit}>
          <Title>Login</Title>
          
          <DemoCredentials>
            <DemoTitle>Demo Credentials:</DemoTitle>
            <div>Email: demo@fooddelivery.com</div>
            <div>Password: demo123</div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button type="button" onClick={handleDemoLogin} style={{
                flex: 1,
                padding: '0.25rem 0.5rem',
                background: '#ff6b6b',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.75rem'
              }}>
                Fill Demo Data
              </button>
              <CreateUserButton 
                type="button" 
                onClick={handleCreateDemoUser}
                disabled={isCreatingUser}
                style={{ flex: 1 }}
              >
                {isCreatingUser ? 'Creating...' : 'Create Demo User'}
              </CreateUserButton>
            </div>
          </DemoCredentials>

          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </SubmitButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </LoginForm>
      </MainContent>
      {isCartVisible && <Cart onClose={() => setIsCartVisible(false)} />}
      <Footer />
    </PageContainer>
  );
};

export default LoginPage; 
import { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../hooks/useAuth';
import Error from '../../components/ui/Error';
import AppContainer from '../../components/layout/AppContainer';
import { Title, FormGroup, Label, Input, Button, colors, spacing } from '../../styles/common';

const LoginContainer = styled.div`
  background-color: ${colors.background.white};
  padding: ${spacing.xl} ${spacing.lg};
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  width: 100%;
  max-width: 420px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};

  @media (max-width: 480px) {
    padding: ${spacing.md} ${spacing.xs};
    max-width: 98vw;
    border-radius: 8px;
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <AppContainer>
      <LoginContainer>
        <form onSubmit={handleSubmit}>
          <Title>Login</Title>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
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
              autoComplete="current-password"
            />
          </FormGroup>
          <Button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          {error && <Error message={error} />}
        </form>
      </LoginContainer>
    </AppContainer>
  );
};

export default Login;
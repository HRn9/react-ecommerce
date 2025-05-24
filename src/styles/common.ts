import styled from 'styled-components';

// Colors
export const colors = {
  primary: '#FF4B2B',
  primaryHover: '#FF6B4B',
  primaryDark: '#E63E1F',
  text: {
    primary: '#222',
    secondary: '#666',
    light: '#999',
  },
  background: {
    main: '#f5f5f5',
    card: '#fafbfc',
    white: '#fff',
  },
  border: '#ddd',
  disabled: '#ccc',
};

// Typography
export const typography = {
  h1: {
    fontSize: '2.5rem',
    fontWeight: 700,
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 700,
  },
  h3: {
    fontSize: '1.6rem',
    fontWeight: 600,
  },
  body: {
    fontSize: '1.15rem',
    lineHeight: 1.6,
  },
  small: {
    fontSize: '1rem',
    lineHeight: 1.5,
  },
};

// Spacing
export const spacing = {
  xs: '0.5rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '2.5rem',
  xxl: '3rem',
};

// Common Components
export const Title = styled.h1`
  font-size: ${typography.h1.fontSize};
  color: ${colors.text.primary};
  margin-bottom: ${spacing.lg};
  text-align: center;
  font-weight: ${typography.h1.fontWeight};
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

export const Subtitle = styled.p`
  font-size: ${typography.body.fontSize};
  color: ${colors.text.secondary};
  margin-bottom: ${spacing.sm};
  text-align: center;
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

export const Card = styled.div`
  background: ${colors.background.card};
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  padding: ${spacing.lg} ${spacing.md};
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Button = styled.button`
  width: 100%;
  padding: 1.1rem 0;
  background-color: ${colors.primary};
  color: white;
  border: none;
  border-radius: 10px;
  font-size: ${typography.body.fontSize};
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.primaryHover};
  }
  &:disabled {
    background-color: ${colors.text.light};
    cursor: not-allowed;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 1.1rem 1rem;
  border: 1.5px solid ${colors.border};
  border-radius: 8px;
  font-size: ${typography.body.fontSize};
  background: ${colors.background.card};
  color: ${colors.text.primary};
  transition: border 0.2s;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    background: ${colors.background.white};
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.7rem;
  color: ${colors.text.secondary};
  font-size: ${typography.body.fontSize};
  font-weight: 500;
`;

export const FormGroup = styled.div`
  margin-bottom: ${spacing.md};
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
`;

// Grid
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${spacing.xxl};
  margin-top: ${spacing.xl};
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${spacing.lg};
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: ${spacing.md};
  }
`; 
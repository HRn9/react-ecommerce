import styled from 'styled-components';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  padding: ${({ size }) => {
    switch (size) {
      case 'small': return '0.5rem 1rem';
      case 'large': return '1rem 2rem';
      default: return '0.75rem 1.5rem';
    }
  }};
  font-size: ${({ size }) => {
    switch (size) {
      case 'small': return '0.875rem';
      case 'large': return '1.25rem';
      default: return '1rem';
    }
  }};
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
  
  ${({ variant }) => {
    switch (variant) {
      case 'secondary':
        return `
          background-color: #6c757d;
          color: white;
          &:hover {
            background-color: #5a6268;
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          border: 2px solid #ff6b6b;
          color: #ff6b6b;
          &:hover {
            background-color: #ff6b6b;
            color: white;
          }
        `;
      default:
        return `
          background-color: #ff6b6b;
          color: white;
          &:hover {
            background-color: #ff5252;
          }
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Button = ({ children, ...props }: ButtonProps) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button; 
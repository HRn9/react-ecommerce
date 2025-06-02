import styled from 'styled-components';
import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: string;
  elevation?: 'none' | 'small' | 'medium' | 'large';
}

const StyledCard = styled.div<CardProps>`
  background: white;
  border-radius: 12px;
  padding: ${({ padding }) => padding || '1.5rem'};
  box-shadow: ${({ elevation }) => {
    switch (elevation) {
      case 'small':
        return '0 2px 4px rgba(0, 0, 0, 0.1)';
      case 'medium':
        return '0 4px 8px rgba(0, 0, 0, 0.1)';
      case 'large':
        return '0 8px 16px rgba(0, 0, 0, 0.1)';
      default:
        return 'none';
    }
  }};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: ${({ elevation }) => elevation !== 'none' ? 'translateY(-4px)' : 'none'};
    box-shadow: ${({ elevation }) => {
      switch (elevation) {
        case 'small':
          return '0 4px 8px rgba(0, 0, 0, 0.15)';
        case 'medium':
          return '0 8px 16px rgba(0, 0, 0, 0.15)';
        case 'large':
          return '0 16px 24px rgba(0, 0, 0, 0.15)';
        default:
          return 'none';
      }
    }};
  }
`;

const Card = ({ children, ...props }: CardProps) => {
  return <StyledCard {...props}>{children}</StyledCard>;
};

export default Card; 
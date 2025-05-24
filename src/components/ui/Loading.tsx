import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  gap: 1rem;
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 3px solid #e5e7eb;
  border-top: 3px solid #333;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const LoadingText = styled.p`
  font-size: 1rem;
  margin: 0;
`;

interface LoadingProps {
  text?: string;
}

const Loading = ({ text = 'Loading...' }: LoadingProps) => {
  return (
    <LoadingContainer role="status" aria-label="Loading">
      <Spinner />
      <LoadingText>{text}</LoadingText>
    </LoadingContainer>
  );
};

export default Loading; 
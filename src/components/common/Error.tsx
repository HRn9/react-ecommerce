import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  text-align: center;
`;

const ErrorIcon = styled.div`
  font-size: 4rem;
  color: #dc2626;
  margin-bottom: 1.5rem;
`;

const ErrorMessage = styled.p`
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  max-width: 600px;
`;

const RetryButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #333;
  color: white;
  font-size: 1rem;
  cursor: pointer;
`;

interface ErrorProps {
  message?: string;
  onRetry?: () => void;
}

const Error = ({ message = 'Something went wrong', onRetry }: ErrorProps) => {
  return (
    <ErrorContainer role="alert">
      <ErrorIcon aria-hidden="true">⚠️</ErrorIcon>
      <ErrorMessage>{message}</ErrorMessage>
      {onRetry && (
        <RetryButton onClick={onRetry}>
          Try Again
        </RetryButton>
      )}
    </ErrorContainer>
  );
};

export default Error; 
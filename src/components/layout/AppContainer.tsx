import styled from 'styled-components';
import { ReactNode, CSSProperties } from 'react';

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: calc(100vh - 160px); // Учитываем высоту header и footer
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

interface AppContainerProps {
  children: ReactNode;
  style?: CSSProperties;
}

const AppContainer = ({ children, style }: AppContainerProps) => (
  <Container style={style}>{children}</Container>
);

export default AppContainer; 
import styled from 'styled-components';
import { ReactNode, CSSProperties } from 'react';
import { colors, spacing } from '../../styles/common';

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 160px); // Учитываем высоту header и footer
`;

interface AppContainerProps {
  children: ReactNode;
  style?: CSSProperties;
}

const AppContainer = ({ children, style }: AppContainerProps) => <Container style={style}>{children}</Container>;

export default AppContainer; 
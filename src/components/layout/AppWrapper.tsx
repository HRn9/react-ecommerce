import styled from 'styled-components';
import { ReactNode } from 'react';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  width: 100%;
`;

interface AppWrapperProps {
  children: ReactNode;
}

const AppWrapper = ({ children }: AppWrapperProps) => <Wrapper>{children}</Wrapper>;

export default AppWrapper; 
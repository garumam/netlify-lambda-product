import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  background: ${(props) => props.theme.bgSecondaryColor};
  padding: ${(props) => props.theme.paddingDefault};
`;

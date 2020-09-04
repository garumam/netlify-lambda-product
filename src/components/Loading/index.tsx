import React from 'react';

import { Container, Spin } from './styles';

interface ExpectedProps {
  loading: boolean;
}

const Loading: React.FC<ExpectedProps> = ({ loading }) => {
  return (
    <Container style={!loading ? { opacity: 0, pointerEvents: 'none' } : null}>
      <Spin>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </Spin>
    </Container>
  );
};

export default Loading;

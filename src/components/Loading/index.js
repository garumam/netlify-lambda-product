import React from 'react';

import { Container, Spin } from './styles';

function Loading({ loading }) {
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
}

export default Loading;

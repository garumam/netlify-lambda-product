import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { SiMarketo } from 'react-icons/si';
import { store } from '../../global/cartStore';

import { Container, CartNotification, Logo } from './styles';

function Header() {
  const history = useHistory();
  const { state } = useContext(store);

  const goTo = (path: string) => {
    history.push(path);
  };

  return (
    <Container>
      <Logo
        onClick={() => {
          goTo('/');
        }}
      >
        <SiMarketo />
        <h1>arketE</h1>
      </Logo>
      <CartNotification
        title="Ir para o carrinho!"
        onClick={() => {
          goTo('/cart');
        }}
      >
        <span>{state.length}</span>
        <FaShoppingCart />
      </CartNotification>
    </Container>
  );
}

export default Header;

import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { store } from '../../global/cartStore';

import { Container, CartNotification } from './styles';

function Header() {
  const history = useHistory();
  const { state } = useContext(store);

  const handleCartClick = () => {
    history.push('/cart');
  };

  return (
    <Container>
      <CartNotification onClick={handleCartClick}>
        <span>{state.length}</span>
        <FaShoppingCart />
      </CartNotification>
    </Container>
  );
}

export default Header;

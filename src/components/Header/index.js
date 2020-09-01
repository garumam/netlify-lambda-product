import React, { useContext } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaShoppingCart } from 'react-icons/fa';
import { store } from '../../global/cartStore';

import { Container, CartNotification } from './styles';

function Header() {
  const { state } = useContext(store);

  // useEffect(() => {
  //   dispatch(cartActions.ADD('123'));
  //   dispatch(cartActions.ADD('123'));
  //   setTimeout(() => {
  //     dispatch(cartActions.REMOVE('123'));
  //   }, 5000);
  // }, []);

  return (
    <Container>
      <GiHamburgerMenu />
      <CartNotification>
        <span>{state.length}</span>
        <FaShoppingCart />
      </CartNotification>
    </Container>
  );
}

export default Header;

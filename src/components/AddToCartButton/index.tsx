import React, { useMemo, useContext } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { MdRemoveShoppingCart } from 'react-icons/md';
import { store, cartActions } from '../../global/cartStore';

import { Container } from './styles';

interface ExpectedProps {
  productId: string;
}

const AddToCartButton: React.FC<ExpectedProps> = ({ productId }) => {
  const { state: cartState, dispatch } = useContext(store);

  const isActive = useMemo(() => {
    return cartState.some((id) => id === productId);
  }, [cartState]);

  const handleCartStore = () => {
    const action = isActive
      ? cartActions.REMOVE(productId)
      : cartActions.ADD(productId);

    dispatch(action);
  };

  return (
    <Container
      title="Adicionar/Remover do carrinho!"
      onClick={handleCartStore}
      className={isActive && 'active'}
    >
      {isActive ? <MdRemoveShoppingCart /> : <FaCartPlus />}
    </Container>
  );
};

export default AddToCartButton;

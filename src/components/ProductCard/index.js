import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';
import { MdRemoveShoppingCart } from 'react-icons/md';
import { store, cartActions } from '../../global/cartStore';

import { Container, PurchaseButton, AddToCartButton } from './styles';

function ProductCard(props) {
  const { state: cartState, dispatch } = useContext(store);
  const { product } = props;

  const isActive = useMemo(() => {
    return cartState.some((id) => id === product.id);
  }, [cartState]);

  const handleClick = () => {
    const action = isActive
      ? cartActions.REMOVE(product.id)
      : cartActions.ADD(product.id);

    dispatch(action);
  };

  return (
    <Container>
      <img src={`${product.picture}?${product.id}`} alt={product.name} />
      <Link to={`/product/${product.id}`}>{product.name}</Link>
      <span>{product.price}</span>
      <PurchaseButton>Comprar</PurchaseButton>
      <AddToCartButton onClick={handleClick} className={isActive && 'active'}>
        {isActive ? <MdRemoveShoppingCart /> : <FaCartPlus />}
      </AddToCartButton>
    </Container>
  );
}

export default ProductCard;

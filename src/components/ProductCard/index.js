import React, { useContext, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';
import { MdRemoveShoppingCart } from 'react-icons/md';
import { store, cartActions } from '../../global/cartStore';
import { toRealFormat } from '../../utils/formatPrice';

import { Container, PurchaseButton, AddToCartButton } from './styles';

function ProductCard(props) {
  const history = useHistory();
  const { state: cartState, dispatch } = useContext(store);
  const { product } = props;

  const isActive = useMemo(() => {
    return cartState.some((id) => id === product.id);
  }, [cartState]);

  const handleCartStore = () => {
    const action = isActive
      ? cartActions.REMOVE(product.id)
      : cartActions.ADD(product.id);

    dispatch(action);
  };

  const handlePurchase = () => {
    if (!isActive) dispatch(cartActions.ADD(product.id));
    history.push('/cart');
  };

  const productRoute = `/product/${product.id}`;

  return (
    <Container>
      <img
        onClick={() => {
          history.push(productRoute);
        }}
        src={`${product.picture}?${product.id}`}
        alt={product.name}
      />
      <Link to={productRoute}>{product.name}</Link>
      <span>{toRealFormat(product.price)}</span>
      <PurchaseButton onClick={handlePurchase}>Comprar</PurchaseButton>
      <AddToCartButton
        onClick={handleCartStore}
        className={isActive && 'active'}
      >
        {isActive ? <MdRemoveShoppingCart /> : <FaCartPlus />}
      </AddToCartButton>
    </Container>
  );
}

export default ProductCard;

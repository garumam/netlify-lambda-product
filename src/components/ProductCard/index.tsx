import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { store, cartActions } from '../../global/cartStore';
import { toRealFormat } from '../../utils/formatPrice';
import AddToCartButton from '../AddToCartButton';
import { IProduct } from '../../interfaces/IProduct';

import { Container } from './styles';

interface ExpectedProps {
  product: IProduct;
}

const ProductCard: React.FC<ExpectedProps> = ({ product }) => {
  const { dispatch } = useContext(store);
  const history = useHistory();

  const handlePurchase = () => {
    dispatch(cartActions.ADD(product.id));
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
      <button title="Página de compra!" onClick={handlePurchase}>
        Comprar
      </button>
      <AddToCartButton productId={product.id} />
    </Container>
  );
};

export default ProductCard;

import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import AddToCartButton from '../../components/AddToCartButton';
import { toRealFormat } from '../../utils/formatPrice';
import { store, cartActions } from '../../global/cartStore';
import api from '../../services/api';

import { Container, ProductContainer, ProductDetail } from './styles';

function ProductInfo() {
  const [product, setProduct] = useState({});
  const { dispatch } = useContext(store);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    let isDestroyed = false;
    async function getProduct() {
      const res = await api.get('/products-show', {
        params: {
          id,
        },
      });

      if (!isDestroyed) {
        setProduct(res.data.product);
      }
    }

    getProduct();

    return () => {
      isDestroyed = true;
    };
  }, []);

  const handlePurchase = () => {
    dispatch(cartActions.ADD(id));
    history.push('/cart');
  };

  return (
    <Container>
      <ProductContainer>
        <h2>{product?.name} sadas sad asd</h2>
        <img src={product?.picture} alt={product?.name} />
        <span>{toRealFormat(product?.price ?? 0)}</span>
        <button title="Página de compra!" onClick={handlePurchase}>
          Comprar
        </button>
        <AddToCartButton productId={id} />
      </ProductContainer>
      <ProductDetail>
        <h3>Detalhes do Produto</h3>
        <p>{product?.detail}</p>
      </ProductDetail>
    </Container>
  );
}

export default ProductInfo;

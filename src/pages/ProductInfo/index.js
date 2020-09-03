import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import AddToCartButton from '../../components/AddToCartButton';
import { toRealFormat } from '../../utils/formatPrice';
import { store, cartActions } from '../../global/cartStore';
import api from '../../services/api';
import Loading from '../../components/Loading';

import { Container, ProductContainer, ProductDetail } from './styles';

function ProductInfo() {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { dispatch } = useContext(store);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    let isDestroyed = false;
    setIsLoading(true);
    async function getProduct() {
      try {
        const res = await api.get('/products-show', {
          params: {
            id,
          },
        });

        if (!isDestroyed) {
          setProduct(res.product);
        }
      } catch (error) {
        alert(error);
      }
      if (!isDestroyed) setIsLoading(false);
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
      <Loading loading={isLoading} />
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

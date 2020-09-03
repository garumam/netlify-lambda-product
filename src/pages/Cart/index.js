import React, { useContext, useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { TiArrowBack } from 'react-icons/ti';
import { MdAttachMoney } from 'react-icons/md';
import { store, cartActions } from '../../global/cartStore';
import { store as notifyStore } from '../../global/notificationStore';
import api from '../../services/api';
import { toRealFormat } from '../../utils/formatPrice';
import CartItem from '../../components/CartItem';
import Loading from '../../components/Loading';

import { Container, ButtonGroup } from './styles';

function Cart() {
  const history = useHistory();
  const { state: cartState, dispatch } = useContext(store);
  const notify = useContext(notifyStore);

  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isDestroyed = false;
    setIsLoading(true);
    async function getProductsInCart() {
      try {
        const res = await api.post('/products-by-ids', {
          productIds: cartState,
        });

        if (!isDestroyed) {
          setProducts(res.products.map((p) => ({ ...p, reservedQtd: 0 })));
        }
      } catch (error) {
        notify.ERROR(error, 5);
      }
      if (!isDestroyed) setIsLoading(false);
    }
    getProductsInCart();

    return () => {
      isDestroyed = true;
    };
  }, []);

  const handleRemoveFromCart = (id) => {
    dispatch(cartActions.REMOVE(id));
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleReservedQtd = (id, reservedQtd) => {
    const updatedProducts = products.map((p) => {
      if (p.id === id) {
        p.reservedQtd = reservedQtd;
      }
      return p;
    });

    setProducts(updatedProducts);
  };

  const cartTotalPrice = useMemo(() => {
    return products?.reduce((prev, current) => {
      return prev + parseFloat(current.price * current.reservedQtd);
    }, 0);
  }, [products]);

  const goToProductList = () => {
    history.push('/');
  };

  const handlePurchase = async () => {
    const purchaseProducts = products
      ?.filter((p) => p.reservedQtd > 0)
      .map((p) => ({
        name: p.name,
        code: p.id,
        qtd: p.reservedQtd,
      }));

    if (purchaseProducts.length < 1) {
      notify.MESSAGE('Selecione a quantidade para cada produto!', 5);
    } else {
      setIsLoading(true);
      try {
        const res = await api.post('/sales-store', {
          products: purchaseProducts,
        });

        dispatch(cartActions.CLEARALL());
        goToProductList();
        notify.MESSAGE(res.message, 5);
      } catch (error) {
        notify.ERROR(error, 5);
      }
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loading loading={isLoading} />
      <h2>{toRealFormat(cartTotalPrice ?? 0)}</h2>
      <ButtonGroup>
        <button title="Escolher mais produtos!" onClick={goToProductList}>
          <TiArrowBack />
        </button>
        <button title="Efetuar a compra!" onClick={handlePurchase}>
          <MdAttachMoney />
        </button>
      </ButtonGroup>
      <ul>
        {products?.map((product) => (
          <CartItem
            key={product.id}
            product={product}
            handleRemove={() => handleRemoveFromCart(product.id)}
            handleReservedQtd={(qtd) => handleReservedQtd(product.id, qtd)}
          />
        ))}
      </ul>
    </Container>
  );
}

export default Cart;

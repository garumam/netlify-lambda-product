import React, { useContext, useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { TiArrowBack } from 'react-icons/ti';
import { MdAttachMoney } from 'react-icons/md';
import { store, cartActions } from '../../global/cartStore';
import api from '../../services/api';
import { toRealFormat } from '../../utils/formatPrice';
import CartItem from '../../components/CartItem';

import { Container, ButtonGroup } from './styles';

function Cart() {
  const history = useHistory();
  const { state: cartState, dispatch } = useContext(store);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProductsInCart() {
      const res = await api.post('/products-by-ids', {
        productIds: cartState,
      });

      setProducts(res.data.products.map((p) => ({ ...p, reservedQtd: 0 })));
    }
    getProductsInCart();
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
    return products.reduce((prev, current) => {
      return prev + parseFloat(current.price * current.reservedQtd);
    }, 0);
  }, [products]);

  const goToProductList = () => {
    history.push('/');
  };

  const handlePurchase = async () => {
    const purchaseProducts = products
      .filter((p) => p.reservedQtd > 0)
      .map((p) => ({
        name: p.name,
        code: p.id,
        qtd: p.reservedQtd,
      }));

    if (purchaseProducts.length < 1) {
      alert('Selecione a quantidade para cada produto!');
    } else {
      const res = await api.post('/sales-store', {
        products: purchaseProducts,
      });

      dispatch(cartActions.CLEARALL());
      goToProductList();
      alert(res.data.message);
    }
  };

  return (
    <Container>
      <h2>{toRealFormat(cartTotalPrice)}</h2>
      <ButtonGroup>
        <button onClick={goToProductList}>
          <TiArrowBack />
        </button>
        <button onClick={handlePurchase}>
          <MdAttachMoney />
        </button>
      </ButtonGroup>
      <ul>
        {products.map((product) => (
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

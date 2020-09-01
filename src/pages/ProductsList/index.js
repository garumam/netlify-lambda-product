import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import ProductCard from '../../components/ProductCard';

import { Container } from './styles';

function ProductsList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const res = await api.get('/products-all');
      setProducts(res.data.products);
    }
    getProducts();
  }, []);
  //<Link to="/product">Produto</Link>
  return (
    <Container>
      <ul>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </Container>
  );
}

export default ProductsList;

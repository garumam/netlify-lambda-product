import React, { useEffect, useState } from 'react';
import api from '../../services/api';
// import { Container } from './styles';

function ProductsList() {
  const [products, setProducts] = useState([]);
  console.log('ENTROU');
  useEffect(() => {
    async function getProducts() {
      const res = await api.get('/.netlify/functions/products-all');
      setProducts(res.data.products);
    }
    getProducts();
  }, []);

  return (
    <div>
      <h1>Lista de produtos</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsList;
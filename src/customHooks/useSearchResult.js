import { useState, useEffect } from 'react';
import api from '../services/api';

export function useSearchResult(search = '') {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    let isDestroyed = false;

    async function getProducts() {
      const res = await api.get('/products-all', {
        params: {
          search,
        },
      });
      if (!isDestroyed) setProducts(res.data.products);
    }
    getProducts();

    return () => {
      isDestroyed = true;
    };
  }, [search]);

  return products;
}

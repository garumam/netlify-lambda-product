import { useState, useEffect } from 'react';
import api from '../services/api';

export function useSearchResult(search = '') {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isDestroyed = false;
    setIsLoading(true);
    async function getProducts() {
      try {
        const res = await api.get('/products-all', {
          params: {
            search,
          },
        });
        if (!isDestroyed) setProducts(res.products);
      } catch (error) {
        alert(error);
      }
      if (!isDestroyed) setIsLoading(false);
    }
    getProducts();

    return () => {
      isDestroyed = true;
    };
  }, [search]);

  return [products, isLoading];
}

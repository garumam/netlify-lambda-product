import { useState, useEffect, useContext } from 'react';
import { store } from '../global/notificationStore';
import api from '../services/api';

export function useSearchResult(search = '') {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const notify = useContext(store);

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
        if (!isDestroyed) {
          setProducts(res.products);
          setIsLoading(false);
        }
      } catch (error) {
        notify.ERROR(error, 3);
      }
    }
    getProducts();

    return () => {
      isDestroyed = true;
    };
  }, [search]);

  return [products, isLoading];
}

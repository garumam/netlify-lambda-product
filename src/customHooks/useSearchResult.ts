import { useState, useEffect, useContext } from 'react';
import { store } from '../global/notificationStore';
import api from '../services/api';
import { IProduct } from '../interfaces/IProduct';

interface ApiRes {
  products: IProduct[];
}

export function useSearchResult(search = ''): [IProduct[] | null, boolean] {
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const notify = useContext(store);

  useEffect(() => {
    let isDestroyed = false;
    setIsLoading(true);
    async function getProducts() {
      try {
        const res: ApiRes = await api.get('/products-all', {
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

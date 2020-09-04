import { IProduct } from '../interfaces/IProduct';

export function calculateTotalPriceOfProducts(products: IProduct[]) {
  return products?.reduce((prev, current) => {
    return prev + Number(current.price * current.reservedQtd);
  }, 0);
}

export function prepareProductsToFetch(products: IProduct[]) {
  return products
    ?.filter((p) => p.reservedQtd > 0)
    .map((p) => ({
      name: p.name,
      code: p.id,
      qtd: p.reservedQtd,
    }));
}

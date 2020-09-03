export function calculateTotalPriceOfProducts(products) {
  return products?.reduce((prev, current) => {
    return prev + parseFloat(current.price * current.reservedQtd);
  }, 0);
}

export function prepareProductsToFetch(products) {
  return products
    ?.filter((p) => p.reservedQtd > 0)
    .map((p) => ({
      name: p.name,
      code: p.id,
      qtd: p.reservedQtd,
    }));
}

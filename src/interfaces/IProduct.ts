export interface IProduct {
  id: string;
  name: string;
  picture: string;
  price: number;
  qtd: number;
  detail: string;
  reservedQtd?: number;
}

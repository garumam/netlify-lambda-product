import api from '../services/api';
import { ProductDTO } from '../DTO/ProductDTO';

export default class ProductApiAdapter {
  static async notifyProductContextWithCodeAndQtd(code: string, qtd: number) {
    return api.put('/.netlify/functions/products-store', { code, qtd });
  }

  static async createProductInProductContext(product: ProductDTO) {
    const res = await api.put('/.netlify/functions/products-store', product);
    return {
      code: res.data.code,
    };
  }
}

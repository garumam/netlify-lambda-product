import api from '../services/api';
import { ProductParams } from '../../utils/CustomInterfaces';

export default class ProductApiAdapter {
  static async notifyProductContextWithCodeAndQtd(code: string, qtd: number) {
    return api.put('/.netlify/functions/products-store', { code, qtd });
  }

  static async createProductInProductContext(product: ProductParams) {
    const res = await api.put('/.netlify/functions/products-store', product);
    return {
      code: res.data.code,
    };
  }
}

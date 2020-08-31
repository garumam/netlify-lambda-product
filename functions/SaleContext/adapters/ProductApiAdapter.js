const api = require('../services/api');

module.exports = class ProductApiAdapter {
  static async notifyProductContextWithCodeAndQtd(code, qtd) {
    return api.put('/.netlify/functions/products-store', { code, qtd });
  }

  static async createProductInProductContext(product) {
    const res = await api.put('/.netlify/functions/products-store', product);
    return {
      code: res.data.code
    }
  }
}
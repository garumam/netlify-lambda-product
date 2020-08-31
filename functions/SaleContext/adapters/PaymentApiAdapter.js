const api = require('../services/api');

module.exports = class PaymentApiAdapter {
  static async getStatusFromPaymentContext() {
    const res = await api.get('/.netlify/functions/payment-store');

    return {
      status: res.data.status
    }
  }
}
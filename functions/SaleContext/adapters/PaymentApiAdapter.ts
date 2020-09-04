import api from '../services/api';

type ValidStatus = 'pending' | 'approved' | 'disapproved';

export default class PaymentApiAdapter {
  static async getStatusFromPaymentContext() {
    const res = await api.get('/.netlify/functions/payment-store');
    return {
      status: res.data.status as ValidStatus,
    };
  }
}

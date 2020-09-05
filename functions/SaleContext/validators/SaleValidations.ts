import Yup from '../services/yup';
import { ProductsToReserve } from '../models/Sale';
import { ReturnType } from './CommonInterfaces';

interface ProductsFormatOfRequest {
  products: ProductsToReserve[];
}

class SaleValidations {
  async store(params: ProductsFormatOfRequest): Promise<ReturnType> {
    try {
      const paramsSchema = Yup.object().shape<ProductsFormatOfRequest>({
        products: Yup.array()
          .of(
            Yup.object().shape<ProductsToReserve>({
              name: Yup.string().min(1).trim().defined().label('Nome'),
              code: Yup.string().min(1).trim().defined().label('Código'),
              qtd: Yup.number()
                .integer()
                .positive()
                .min(1)
                .defined()
                .label('Quantidade'),
            })
          )
          .min(1)
          .strict(true)
          .defined()
          .label('Produtos'),
      });

      paramsSchema.validateSync(params, { abortEarly: false });
      return { error: false, messages: [] };
    } catch (err) {
      return { error: true, messages: err.errors };
    }
  }

  async show(id: string): Promise<ReturnType> {
    try {
      const paramsSchema = Yup.string()
        .uuid()
        .defined()
        .label('Código da venda');

      paramsSchema.validateSync(id, { abortEarly: false });
      return { error: false, messages: [] };
    } catch (err) {
      return { error: true, messages: err.errors };
    }
  }
}

export default new SaleValidations();

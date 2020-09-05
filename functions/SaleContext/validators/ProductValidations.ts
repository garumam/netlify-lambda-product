import Yup from '../services/yup';
import { ReturnType } from './CommonInterfaces';
import { ProductDTO } from '../DTO/ProductDTO';

interface ProductParams extends Omit<ProductDTO, 'code'> {}

class ProductValidations {
  async store(params: ProductParams): Promise<ReturnType> {
    try {
      const paramsSchema = Yup.object().shape<ProductParams>({
        name: Yup.string().min(1).trim().defined().label('Nome'),
        detail: Yup.string().min(1).trim().defined().label('Detalhe'),
        qtd: Yup.number()
          .integer()
          .positive()
          .min(1)
          .defined()
          .label('Quantidade'),
        price: Yup.number().positive().moreThan(0).defined().label('Preço'),
        picture: Yup.string().url().defined().label('Imagem'),
      });

      paramsSchema.validateSync(params, { abortEarly: false });
      return { error: false, messages: [] };
    } catch (err) {
      return { error: true, messages: err.errors };
    }
  }
}

export default new ProductValidations();

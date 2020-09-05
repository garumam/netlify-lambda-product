import { isValidObjectId } from 'mongoose';
import Yup from '../services/yup';
import { ProductDTO } from '../DTO/ProductDTO';

interface ParamFormatOfAllMethod {
  search: string;
}

interface ParamFormatGetByIds {
  productIds: string[];
}

export interface ReturnType {
  error: boolean;
  messages?: string[];
}

class ProductValidations {
  async store(params: ProductDTO): Promise<ReturnType> {
    try {
      const paramsSchema = Yup.object().shape<ProductDTO>({
        code: Yup.string()
          .test({
            name: 'isValidObjectId',
            message: '${path} inválido',
            test: (value) => isValidObjectId(value),
          })
          .label('Código'),
        name: Yup.string()
          .min(1)
          .trim()
          .when('code', (code, schema) => {
            return code ? schema : schema.defined();
          })
          .label('Nome'),
        detail: Yup.string()
          .min(1)
          .trim()
          .when('code', (code, schema) => {
            return code ? schema : schema.defined();
          })
          .label('Detalhe'),
        qtd: Yup.number()
          .integer()
          .positive()
          .min(1)
          .when('code', (code, schema) => {
            return code ? schema : schema.defined();
          })
          .label('Quantidade'),
        price: Yup.number()
          .positive()
          .moreThan(0)
          .when('code', (code, schema) => {
            return code ? schema : schema.defined();
          })
          .label('Preço'),
        picture: Yup.string()
          .url()
          .when('code', (code, schema) => {
            return code ? schema : schema.defined();
          })
          .label('Imagem'),
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
        .test({
          name: 'isValidObjectId',
          message: '${path} do produto inválido',
          test: (value) => isValidObjectId(value),
        })
        .defined()
        .label('Código');

      paramsSchema.validateSync(id, { abortEarly: false });
      return { error: false, messages: [] };
    } catch (err) {
      return { error: true, messages: err.errors };
    }
  }

  async getByIds(params: ParamFormatGetByIds): Promise<ReturnType> {
    try {
      const paramsSchema = Yup.object().shape<ParamFormatGetByIds>({
        productIds: Yup.array()
          .of(
            Yup.string()
              .test({
                name: 'isValidObjectId',
                message: '${path} do produto inválido',
                test: (value) => isValidObjectId(value),
              })
              .label('Código')
          )
          .strict(true)
          .min(1)
          .defined()
          .label('Lista de produtos'),
      });

      paramsSchema.validateSync(params, { abortEarly: false });
      return { error: false, messages: [] };
    } catch (err) {
      return { error: true, messages: err.errors };
    }
  }

  async all(query: ParamFormatOfAllMethod): Promise<ReturnType> {
    try {
      const paramsSchema = Yup.object().shape<ParamFormatOfAllMethod>({
        search: Yup.string().strict(true).nullable(false).label('A pesquisa'),
      });

      paramsSchema.validateSync(query, { abortEarly: false });
      return { error: false, messages: [] };
    } catch (err) {
      return { error: true, messages: err.errors };
    }
  }
}

export default new ProductValidations();

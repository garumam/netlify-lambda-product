import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    default: '${path} é inválido',
    required: '${path} é um campo obrigatório',
    //@ts-ignore
    defined: '${path} precisa ser definido',
    notType: '${path} precisa ser do tipo ${type}',
  },
  string: {
    min: '${path} deve ter pelo menos ${min} caracteres',
    url: '${path} deve ter um formato de URL válida',
    trim: '${path} não deve conter espaços no início ou no fim.',
    uuid: '${path} inválido.',
  },
  number: {
    min: '${path} deve ser no mínimo ${min}',
    positive: '${path} deve ser um número posítivo',
    integer: '${path} deve ser um número inteiro',
    moreThan: '${path} deve ser maior que ${value}',
  },
  array: {
    min: '${path} deve ter no mínimo ${min} itens',
  },
});

export default Yup;

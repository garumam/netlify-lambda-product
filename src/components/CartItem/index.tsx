import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import { toRealFormat } from '../../utils/formatPrice';
import { IProduct } from '../../interfaces/IProduct';

import { Container, QtdFieldSet } from './styles';

interface ExpectedProps {
  product: IProduct;
  handleRemove(): void;
  handleReservedQtd(qtd: number): void;
}

const CartItem: React.FC<ExpectedProps> = ({
  product,
  handleRemove,
  handleReservedQtd,
}) => {
  const history = useHistory();
  const [qtd, setQtd] = useState('');

  const handleQtdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newQtd = Number(e.target.value.trim());

    if (!(newQtd >= 0 && newQtd <= product.qtd)) {
      newQtd = product.qtd;
    }

    handleReservedQtd(newQtd);
    setQtd(newQtd.toString());
  };

  return (
    <Container>
      <MdClose title="Remover do carrinho!" onClick={handleRemove} />
      <img
        onClick={() => {
          history.push(`/product/${product.id}`);
        }}
        src={`${product.picture}?${product.id}`}
        alt={product.name}
      />
      <Link to={`/product/${product.id}`}>{product.name}</Link>
      <span>
        <small>Preço(un.) </small>
        {toRealFormat(product.price)}
      </span>
      {product.qtd > 0 ? (
        <QtdFieldSet>
          <label>Qtd:</label>
          <input
            onChange={handleQtdChange}
            type="number"
            value={qtd}
            placeholder="0"
          />
        </QtdFieldSet>
      ) : (
        <p>Produto indisponível</p>
      )}
      <h3>
        <small>Total </small>
        {toRealFormat(product.price * product.reservedQtd)}
      </h3>
    </Container>
  );
};

export default CartItem;

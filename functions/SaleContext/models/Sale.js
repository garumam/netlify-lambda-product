const Sequelize = require('sequelize');
const Product = require('./Product');
const HC = require('../../utils/http-code');

class Sale extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        total_price: Sequelize.DECIMAL(10, 2),
      },
      {
        sequelize,
        tableName: 'sales',
        modelName: 'Sale',
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Product, { foreignKey: 'sale_id', as: 'products' });
    this.hasOne(models.Payment, { foreignKey: 'sale_id', as: 'payment' });
  }

  async reserveProducts({ productsList, transaction }) {
    this.reservedProducts = [];

    for (const product of productsList) {
      const products = await Product.findAll({
        where: {
          code: product.code,
          sale_id: null,
        },
        raw: true,
        transaction,
      });

      const getQtdErrorObject = (availableQtd) => {
        return {
          statusCode: HC.ERROR.NOTACCEPTABLE,
          body: JSON.stringify({
            error: `${product.name || 'Sem nome'} - qtd pedida: ${
              product.qtd
            } qtd disponível: ${availableQtd}`,
          }),
        };
      };

      if (products.length < product.qtd) {
        await transaction.rollback();
        return getQtdErrorObject(products.length);
      }

      const productsToReserve = products.slice(0, product.qtd);

      const [numberOfUpdatedRows] = await Product.update(
        { sale_id: this.id },
        {
          transaction,
          where: {
            id: productsToReserve.map((p) => p.id),
            sale_id: null,
          },
        }
      );

      if (Number(numberOfUpdatedRows) !== Number(product.qtd)) {
        await transaction.rollback();
        return getQtdErrorObject(numberOfUpdatedRows);
      }

      product.qtd = products.length - product.qtd;

      this.reservedProducts = [...this.reservedProducts, ...productsToReserve];
    }

    return this;
  }

  updateTotalPriceOfReservedProducts() {
    this.total_price = this.reservedProducts.reduce((prev, current) => {
      return prev + parseFloat(current.price);
    }, 0);

    return this;
  }

  async cancelProductReservation({ transaction }) {
    await Product.bulkCreate(
      this.reservedProducts.map((p) => ({
        name: p.name,
        price: p.price,
        code: p.code,
      })),
      { transaction }
    );
  }
}

module.exports = Sale;

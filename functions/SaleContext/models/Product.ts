import { Sequelize, Model, DataTypes, Optional } from 'sequelize';

interface ProductAttributes {
  id: number;
  code: string;
  name: string;
  price: number;
  sale_id: string;
}

interface ProductCreationAttributes
  extends Optional<ProductAttributes, 'id' | 'sale_id'> {}

class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes {
  public id: number;
  public code: string;
  public name: string;
  public price: number;
  public sale_id: string;

  public readonly created_at: Date;
  public readonly updated_at: Date;

  static initModel(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: DataTypes.STRING,
        code: DataTypes.STRING,
        price: DataTypes.DECIMAL(10, 2),
        sale_id: DataTypes.UUID,
      },
      {
        sequelize,
        tableName: 'products',
        modelName: 'Product',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Sale, { foreignKey: 'sale_id' });
  }
}

export default Product;

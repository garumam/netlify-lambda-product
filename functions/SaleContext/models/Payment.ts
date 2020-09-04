import { Sequelize, Model, DataTypes, Optional } from 'sequelize';

interface PaymentAttributes {
  id: string;
  status: string;
  sale_id: string;
}

interface PaymentCreationAttributes extends Optional<PaymentAttributes, 'id'> {}

class Payment
  extends Model<PaymentAttributes, PaymentCreationAttributes>
  implements PaymentAttributes {
  public id: string;
  public status: string;
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
        status: {
          type: DataTypes.ENUM,
          values: ['pending', 'approved', 'disapproved'],
          defaultValue: 'pending',
        },
        sale_id: DataTypes.UUID,
      },
      {
        sequelize,
        tableName: 'payments',
        modelName: 'Payment',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Sale, { foreignKey: 'sale_id' });
  }
}

export default Payment;

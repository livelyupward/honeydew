import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define(
    'status',
    {
      status_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      status_name: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  );
};

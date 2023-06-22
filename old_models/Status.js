import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define(
    'status',
    {
      status_name: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  );
};

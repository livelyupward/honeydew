import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define(
    'board',
    {
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  );
};

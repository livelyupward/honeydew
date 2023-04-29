import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define(
    'task',
    {
      task_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      task_title: {
        type: DataTypes.STRING,
      },
      task_content: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  );
};

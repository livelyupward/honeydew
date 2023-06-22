import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define(
    'task',
    {
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

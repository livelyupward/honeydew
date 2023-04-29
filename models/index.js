import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import TaskModel from './Task.js';
import StatusModel from './Status.js';
import BoardModel from './Board.js';
import UserModel from './User.js';
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mariadb',
  logging: false,
});

const database = {};
database.sequelize = sequelize;

database.tasks = TaskModel(sequelize);
database.statuses = StatusModel(sequelize);
database.boards = BoardModel(sequelize);
database.users = UserModel(sequelize);

database.boards.belongsTo(database.users, { as: 'user', foreignKey: 'user_id' });
database.tasks.belongsTo(database.users, { as: 'user', foreignKey: 'user_id' });
database.tasks.belongsTo(database.boards, { as: 'board', foreignKey: 'board_id' });
database.statuses.belongsTo(database.boards, { as: 'board', foreignKey: 'board_id' });
database.tasks.belongsTo(database.statuses, { as: 'status', foreignKey: 'status_id' });

export default database;

import { Pool } from 'pg';
import connectionString from './config';

const pool = new Pool({
  connectionString,
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 2000,
  max: 5,
  min: 4,
});

// const sequelize = new Sequelize(connectionString, {
//   dialect: 'postgres',
// });

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   });

export default pool;

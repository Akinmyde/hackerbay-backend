import pool from '../config/connection';

const dropTables = 'DROP TABLE IF EXISTS Users CASCADE;';

const tableUsers = `CREATE TABLE Users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(250) NOT NULL,
    registered TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
    updateOn TIMESTAMP DEFAULT NULL,
    lastLogin TIMESTAMP DEFAULT NULL);`;

const migrate = async () => {
  const client = await pool.connect();
  try {
    await client.query(dropTables);
    await client.query(tableUsers);
  } catch (err) {
    throw new Error(err);
  } finally {
    await client.release();
  }
};

migrate();

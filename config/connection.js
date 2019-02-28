import { Pool } from 'pg';
import connectionString from './config';

const pool = new Pool({
  connectionString,
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 2000,
  max: 5,
  min: 4,
});

export default pool;

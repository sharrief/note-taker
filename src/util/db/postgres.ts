import { Pool } from 'pg';
/**
 * pg uses environment variables for config
 * @var PGHOST The host of the pg server
 * @var PGPORT The port the pg server is listening on
 * @var PGUSER The username for the pg server connection
 * @var PGPASSWORD The user password for the pg server connection
 * @var PGDATABASE The database to connect to
 */
async function getConnection() {
  return new Pool();
}

export default getConnection;

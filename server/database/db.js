const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: '9GHgH3MN1JXgfHMErdeg',
    host: 'containers-us-west-12.railway.app',
    port: 6321,
    database: 'railway'
});

module.exports = pool;
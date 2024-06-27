// models/db.js

const sql = require('mssql');

const config = {
  server: '43.240.9.60', // Server IP or hostname
  port: 1433, // Default port for SQL Server
  authentication: {
    type: 'default',
    options: {
      userName: 'sa',
      password: 'SaAdmin@123'
    }
  },
  options: {
    encrypt: false, // Use this if you're connecting to Azure SQL
    database: 'SND2324',
    trustServerCertificate: true // Set this to true if you're using self-signed certificates
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('Database Connection Failed! Bad Config: ', err);
    throw err;
  });

module.exports = {
  sql,
  poolPromise
};

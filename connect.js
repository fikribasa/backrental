require('dotenv').config();
const mysql = require ('mysql');

const dbConfig = mysql.createConnection ({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'rentaldvd',
});

dbConfig.connect (error => {
  if (error) throw error;
});

module.exports = dbConfig;

// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  db_URI: process.env.DB_URI
};
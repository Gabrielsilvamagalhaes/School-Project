const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  dialect: process.env.DATABASE_DIALECT,
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    'createdAt': 'created_at',
    'updatedAt': 'updated_at'
  },
  dialectOptions: {
    timezone: "America/Sao_Paulo",
  },
  timezone: "America/Sao_Paulo",
};

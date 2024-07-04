'use strict';
//Usando o commonjs porque o sequeulize-cli não suporta o import
const bcrypt = require('bcryptjs');
//Usando seeds para o sequelize inserir esses dados no db automaticament
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async function (queryInterface, Sequelize) {
    queryInterface.bulkInsert(
      'users', //Nome da tabela no db
      [
        {
          name: 'Roberto',
          email: 'roberto@gmail.com',
          password_hash: await bcrypt.hash('123456', 8), //Senha criptografada
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Carlos',
          email: 'carlos@gmail.com',
          password_hash: await bcrypt.hash('123456', 8), //Senha criptografada
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Leandro',
          email: 'leandro@gmail.com',
          password_hash: await bcrypt.hash('123456', 8), //Senha criptografada
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },
};

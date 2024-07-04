'use strict';

//Criando migration para fazer alteração na coluna email da tabela students

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.changeColumn(
      'students',
      'email',
      {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      });
  },

  async down (queryInterface, Sequelize) {}
};

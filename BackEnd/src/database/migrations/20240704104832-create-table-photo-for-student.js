'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('photos', {
       id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
       },
       originalname: {
        type: Sequelize.STRING,
        allowNull: false,
       },
       filename: {
        type: Sequelize.STRING,
        allowNull: false,
       },
       //Inserindo relação de one-to-one com a tabela students
       student_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'students',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
       },
       created_at: {
        type: Sequelize.DATE,
        allowNull: false,
       },
       updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
       },
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('photos');
  }
};

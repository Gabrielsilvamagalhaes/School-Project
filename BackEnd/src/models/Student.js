import { Sequelize, DataTypes, Model } from 'sequelize';


// Model definition

export default class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        // Model attributes are defined here
        name: {
          type: DataTypes.STRING,
          // allowNull defaults to true
        },
        lastName: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
        },
        age: {
          type: DataTypes.INTEGER,
        },
        weight: {
          type: DataTypes.FLOAT,
        },
        height: {
          type: DataTypes.FLOAT,
        },
      },
      {
        sequelize, // We need to pass the connection instance
        modelName: 'Student', // We need to choose the model name
        tableName: 'students', // Ensure table name is correct
        underscored: false,
      });
      return this;
  }

}

// Model associations

import { Sequelize, DataTypes, Model } from 'sequelize';


// Model definition

export default class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        // Model attributes are defined here
        name: {
          type: DataTypes.STRING,
          validate: {
            len: {
              args: [3, 255],
              msg: 'Name must have between 3 and 255 characters',
            },
          },
          // allowNull defaults to true
        },
        lastName: {
          type: DataTypes.STRING,
          validate: {
            len: {
              args: [3, 255],
              msg: 'Last name must have between 3 and 255 characters',
            },
          },
        },
        email: {
          type: DataTypes.STRING,
          unique: {
            msg: 'Email already registered',
          },
          validate: {
            isEmail: {
              msg: 'Invalid email',
            },
          },
        },
        age: {
          type: DataTypes.INTEGER,
          validate: {
            isInt: {
              msg: 'Age must be an integer',
            },
            min: 5,
            max: 100,
          },
        },
        weight: {
          type: DataTypes.FLOAT,
          validate: {
            isFloat: {
              msg: 'Weight must be a float',
            },
          }
        },
        height: {
          type: DataTypes.FLOAT,
          validate: {
            isFloat: {
              msg: 'Height must be a float',
            },
          }
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
  // Model associations
  static associate(models) {
    this.hasMany(models.Photo, { foreignKey: 'student_id', as: 'photos' });
  }

}


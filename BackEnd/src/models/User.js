import { Sequelize, DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';


// Model definition

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        // Model attributes are defined here
        name: {
          type: DataTypes.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Name must have between 3 and 255 characters',
            },
            // allowNull defaults to true
          },
          email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
              isEmail: {
                msg: 'Invalid email',
              },
            },
          },
          password_hash: {
            type: DataTypes.STRING,
          },
          pasword: {
            type: DataTypes.VIRTUAL,
            validate: {
              len: {
                args: [6, 50],
                msg: 'Password must have between 6 and 50 characters',
              },
            },
          },

        },
      },
      {
        sequelize, // We need to pass the connection instance
        modelName: 'User', // We need to choose the model name
        tableName: 'users', // Ensure table name is correct
        underscored: false,
      });

      this.addHook('beforeSave', async (user) => {
        if (user.password) {
          user.password_hash = await bcrypt.hash(user.password, 8);
        }
      });

    return this;
  }

}

// Model associations

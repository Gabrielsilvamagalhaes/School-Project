import { Sequelize, DataTypes, Model } from 'sequelize';
import app from '../config/app';


// Model definition

export default class Photo extends Model {
  static init(sequelize) {
    super.init(
      {
        // atributos do model
        originalname: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: {
              msg: 'Originalname cannot be empty',
            },
          },
          // allowNull por padrão é true
        },
        filename: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: {
              msg: 'Filename cannot be empty',
            },
          },
        },
        url: {
          type: DataTypes.VIRTUAL,
          get() {
            return `${app.url}/images/${this.getDataValue('filename')}`
          }
        }
      },
      {
        sequelize, // Passar a instância de conexão
        modelName: 'Photo', // Precisa esolher um nome para o model
        tableName: 'photos', // Nome da tabela no database
        underscored: false,
      });
      return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, {
      foreignKey: 'student_id',
    });
  }

}

// Model associations

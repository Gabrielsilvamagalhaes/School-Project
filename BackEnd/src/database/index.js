import { Sequelize } from "sequelize";
import databaseConfig from "../config/database";
import Student from "../models/Student";
import User from "../models/User";
import Photo from "../models/Photo";

const models = [Student, User, Photo];

const sequelize = new Sequelize(databaseConfig);

models.forEach((model) => model.init(sequelize));
models.forEach((model) => model.associate && model.associate(sequelize.models));

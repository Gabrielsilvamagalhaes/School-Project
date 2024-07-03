import { Sequelize } from "sequelize";
import databaseConfig from "../config/database";
import Student from "../models/student";

const models = [Student];

const sequelize = new Sequelize(databaseConfig);

models.forEach((model) => model.init(sequelize));
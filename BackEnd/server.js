import  dotenv  from 'dotenv';
dotenv.config();
import './src/config/database';
import express from 'express';
import routes from './src/routes/home';
const app = express();

//Config response for forms and others
app.use(express.urlencoded({ extended: true }));
//Config response for jsons
app.use(express.json());
app.use(routes);


app.listen(3000, () => {
  console.log('Hello');
});

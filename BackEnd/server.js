import  dotenv  from 'dotenv';
dotenv.config();
import './src/database';
import express from 'express';
import homeRoutes from './src/routes/home';
import userRoutes from './src/routes/userRouter';
const app = express();

//Config response for forms and others
app.use(express.urlencoded({ extended: true }));
//Config response for jsons
app.use(express.json());
app.use(homeRoutes);
app.use(userRoutes);


app.listen(3000, () => {
  console.log('Server is up and running on port 3000');
});

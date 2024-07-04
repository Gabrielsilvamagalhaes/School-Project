import  dotenv  from 'dotenv';
dotenv.config();
import './src/database';
import express from 'express';
import homeRoutes from './src/routes/homeRouter';
import userRoutes from './src/routes/userRouter';
import studentRoutes from './src/routes/studentRouter';
import tokenRoutes from './src/routes/tokenRouter';

const app = express();

//Config response for forms and others
app.use(express.urlencoded({ extended: true }));
//Config response for jsons
app.use(express.json());
app.use(homeRoutes);
app.use(userRoutes);
app.use(studentRoutes);
app.use(tokenRoutes);


app.listen(3000, () => {
  console.log('Server is up and running on port 3000');
});

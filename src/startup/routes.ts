import express from 'express';
import home from '../routes/home';
import authentication from '../routes/authentication';
import user from '../routes/user';
import post from '../routes/post';
import { jwt } from '../middleware/jwt';
import errorMiddleware from '../middleware/error'; // Renamed import
import { response } from '../middleware/response';

export const setRoutes = (app: express.Application) => {
  const cors = require('cors');

  app.use(express.json({ limit: '50mb' }));

  app.use(response);

  app.use(jwt);
  app.use(cors({
    origin: ["http://localhost:3000",'https://uvw-case-study-frontend.onrender.com'], // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization',"x-auth-token"], // Specify allowed headers
  }));
  app.use('/', home);
  app.use('/authentication/', authentication);
  app.use('/user/',user)
  app.use('/post/',post)
  app.use(errorMiddleware);
  app.use(express.urlencoded({ extended: true }));  
};

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { studentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('PH University!');
});

// global error handler
app.use(globalErrorHandler);

export default app;

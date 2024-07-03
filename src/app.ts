import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';
const app: Application = express();

// parser
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

//application route
app.use('/api/v1', router);

// test
// const test = async (req: Request, res: Response) => {
//   Promise.reject();
// };
// app.get('/test', test);

app.get('/', (req: Request, res: Response) => {
  res.send('PH University!');
});

// global error handler
app.use(globalErrorHandler);

// not found route
app.use(notFound);

export default app;

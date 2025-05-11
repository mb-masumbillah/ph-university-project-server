import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './middleware/globalErrolHandler';
import notFound from './middleware/notFound';
import router from './router';
import cookieParser from 'cookie-parser';

const app: Application = express();

// perser
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

// Application Routes
app.use('/api/v1', router);

app.get('/', async (_req: Request, res: Response) => {
  // Promise.reject() // test server off asynchronous
  res.send('project 2 server');
});

// global error
app.use(globalErrorHandler);

// api not found
app.use(notFound);

export default app;

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './middleware/globalErrolHandler';
import notFound from './middleware/notFound';
import router from './router';

const app: Application = express();

// perser
app.use(express.json());
app.use(cors());

// Application Routes
app.use('/api/v1', router);


app.get('/', (_req: Request, res: Response) => {
  res.send('project 2 server');
});

// global error
app.use(globalErrorHandler);

// api not found
app.use(notFound)

export default app;

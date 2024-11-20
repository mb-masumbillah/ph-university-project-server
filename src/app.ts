import express, { Request, Response } from 'express';
import cors from 'cors';
import { StudentRoute } from './app/modules/student/student.route';

const app = express();

// perser
app.use(express.json());
app.use(cors());

// Application Routes
app.use('/api/v1/students', StudentRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('project 2 server');
});

export default app;

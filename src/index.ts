import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import taskRoutes from './routes/taskRoutes';
import {errorHandler} from './middlewares/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/tasks', taskRoutes);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.json({ message: "API is running!" });
});

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
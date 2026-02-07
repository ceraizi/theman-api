import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import taskRoutes from './routes/taskRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.json({ message: "API is running!" });
});

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
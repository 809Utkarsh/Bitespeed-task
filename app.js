import express from 'express';
import dotenv from 'dotenv';
import identifyRoutes from './routes/identify.routes.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/', identifyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

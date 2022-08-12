import express from 'express';
import dotenv from 'dotenv';
import { PORT } from './utils/constants/contants';

dotenv.config();

const app = express();

app.listen(PORT, () => console.log(`server is listening on ${PORT}`));

import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/post';
import commentRoutes from './routes/comment';
import errorHandler from './middleware/errorHandler';
import { AppDataSource } from './data-source';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

app.use(errorHandler);

AppDataSource.initialize()
	.then(() => {
		app.listen(process.env.PORT || 3002, () => {
			console.log(`Server is running on port ${process.env.PORT}`);
		});
	})
	.catch((error) => console.log(error));

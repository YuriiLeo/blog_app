import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Post } from './entity/Post';
import { Comment } from './entity/Comment';
import { CreatePostTable1680000000000 } from './migration/1680000000000-CreatePostTable';
import { CreateCommentTable1680000000001 } from './migration/1680000000001-CreateCommentTable';
import { CommentSubscriber } from './subscriber/CommentSubscriber';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.NEXT_PUBLIC_DATABASE_HOST,
	port: Number(process.env.NEXT_PUBLIC_DATABASE_PORT),
	username: process.env.NEXT_PUBLIC_DATABASE_USER,
	password: process.env.NEXT_PUBLIC_DATABASE_PASSWORD,
	database: process.env.NEXT_PUBLIC_DATABASE_NAME,
	synchronize: true,
	logging: false,
	entities: [Post, Comment],
	migrations: [CreatePostTable1680000000000, CreateCommentTable1680000000001],
	subscribers: [CommentSubscriber],
});

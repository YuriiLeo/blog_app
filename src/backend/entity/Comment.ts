import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Post } from './Post';

@Entity()
export class Comment {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	content: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@ManyToOne(() => Post, (post) => post.comments)
	post: Post;

	constructor(init?: Partial<Comment>) {
		Object.assign(this, init);
	}
}

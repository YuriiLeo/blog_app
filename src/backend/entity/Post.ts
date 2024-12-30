import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Comment } from './Comment';

@Entity()
export class Post {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	content: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@OneToMany(() => Comment, (comment) => comment.post, { onDelete: 'CASCADE' })
	comments: Comment[];

	constructor(init?: Partial<Post>) {
		Object.assign(this, init);
	}
}

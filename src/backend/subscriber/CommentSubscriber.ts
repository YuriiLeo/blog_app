import {
	EntitySubscriberInterface,
	EventSubscriber,
	InsertEvent,
	UpdateEvent,
	RemoveEvent,
} from 'typeorm';
import { Comment } from '../entity/Comment';

@EventSubscriber()
export class CommentSubscriber implements EntitySubscriberInterface<Comment> {
	listenTo() {
		return Comment;
	}

	beforeInsert(event: InsertEvent<Comment>) {
		console.log(`BEFORE COMMENT INSERTED: `, event.entity);
	}

	beforeUpdate(event: UpdateEvent<Comment>) {
		console.log(`BEFORE COMMENT UPDATED: `, event.entity);
	}

	beforeRemove(event: RemoveEvent<Comment>) {
		console.log(`BEFORE COMMENT REMOVED: `, event.entity);
	}
}

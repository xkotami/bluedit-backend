import { Post } from './post';
import { User } from './user';
import { Comment as CommentType } from '../types/index';
import { User as UserPrisma, Post as PostPrisma,  Comment as CommentPrisma, Community as CommunityPrisma} from '@prisma/client';


export class Comment{
    readonly id?: number;
    readonly text: string;
    readonly createdAt: Date;
    readonly points: number;
    readonly createdBy: User;
    readonly parent?: Comment;

    constructor(comment: CommentType) {
        this.id = comment.id;
        this.text = comment.text;
        this.createdAt = comment.createdAt;
        this.points = comment.points;
        this.createdBy = comment.createdBy;
        this.parent = comment.parent;
    }

    static from({id, text, createdAt, points, createdBy, parent}: CommentPrisma & {
        createdBy: UserPrisma,
        parent?: CommentPrisma & {
            createdBy: UserPrisma,
        }
    }): Comment {
        return new Comment({
            id,
            text,
            createdAt,
            points,
            createdBy: User.from(createdBy),
            parent: parent ? Comment.from(parent) : undefined,
        })
    }


}
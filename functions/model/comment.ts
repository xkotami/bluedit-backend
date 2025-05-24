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
    readonly replies: Comment[];
    readonly parent?: Comment;

    constructor(comment: Comment) {
        this.id = comment.id;
        this.text = comment.text;
        this.createdAt = comment.createdAt;
        this.points = comment.points;
        this.createdBy = comment.createdBy;
        this.replies = comment.replies;
        this.parent = comment.parent;
    }

    static from(comment: CommentPrisma & {
        createdBy: UserPrisma,
        parent?: (CommentPrisma & {
            createdBy: UserPrisma,
        }) | null,
        replies?: (CommentPrisma & {
            createdBy: UserPrisma,
        })[]
    }): Comment {
        return new Comment({
            id: comment.id,
            text: comment.text,
            createdAt: comment.createdAt,
            points: comment.points,
            createdBy: User.from(comment.createdBy),
            replies: comment.replies ? comment.replies.map(reply => Comment.from(reply)) : [],
            parent: comment.parent ? Comment.from(comment.parent) : undefined
        });
    }
}

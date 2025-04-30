import { User } from './user';
import { Community } from './community';
import {Post as PostType} from '../types/index';
import {Comment} from './comment';
import { Post as PostPrisma, User as UserPrisma, Community as CommunityPrisma, Comment as CommentPrisma} from '@prisma/client';

export class Post {
    readonly id?: number;
    readonly user: User;
    readonly comments: Comment[];

    constructor(post: PostType) {
        this.id = post.id;
        this.user = post.user;
        this.comments = post.comments;
    }

    static from ({id, comments, user}: PostPrisma & {
        comments: (CommentPrisma & {
            createdBy: UserPrisma,
            parent?: CommentPrisma & {
                createdBy: UserPrisma,
            }
        })[],
        community: CommunityPrisma,
        user: UserPrisma}): Post {
        return new Post({
            id,
            user: User.from(user),
            comments: comments.map(comment => Comment.from(comment))
        })
    }
}
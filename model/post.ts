import { User } from './user';
import {Post as PostType} from '../types/index';
import {Comment} from './comment';
import { Post as PostPrisma, User as UserPrisma, Community as CommunityPrisma, Comment as CommentPrisma} from '@prisma/client';

export class Post {
    readonly id?: number;
    readonly title: string;
    readonly content?: string;
    readonly user: User;
    readonly comments: Comment[];

    constructor(post: Post) {
        this.id = post.id;
        this.title = post.title;
        this.content = post.content;
        this.user = post.user;
        this.comments = post.comments;
    }

    static from(post: PostPrisma & {
        user: UserPrisma,
        comments: (CommentPrisma & {
            createdBy: UserPrisma,
            parent?: (CommentPrisma & {
                createdBy: UserPrisma,
                replies?: (CommentPrisma & {
                    createdBy: UserPrisma
                })[]
            }) | null,
            replies?: (CommentPrisma & {
                createdBy: UserPrisma,
                replies?: (CommentPrisma & {
                    createdBy: UserPrisma
                })[]
            })[]
        })[]
    }): Post {
        return new Post({
            id: post.id,
            title: post.title,
            content: post.content,
            user: User.from(post.user),
            comments: post.comments.map(comment => Comment.from(comment))
        });
    }
}
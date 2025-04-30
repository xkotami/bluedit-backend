import { Post } from './post';
import { User } from './user';
import {Community as CommunityType} from '../types/index';
import { User as UserPrisma, Post as PostPrisma, Community as CommunityPrisma, Comment as CommentPrisma} from '@prisma/client';


export class Community {
    readonly id?: number;
    readonly name: string;
    readonly description: string;
    readonly posts: Post[];
    readonly users: User[];

    constructor(community: CommunityType) {
        this.id = community.id;
        this.name = community.name;
        this.description = community.description;
        this.posts = community.posts;
        this.users = community.users;
    }

    static from({id, posts, users, name, description}: CommunityPrisma & {
        posts: (PostPrisma & {
            comments: CommentPrisma[],
            user: UserPrisma;
            community: CommunityPrisma;
        })[],
        users: UserPrisma[]}): Community {
        return new Community({
            id,
            name,
            description,
            posts: posts.map(post => Post.from(post)),
            users: users.map(user => User.from(user))
        })
    }
}
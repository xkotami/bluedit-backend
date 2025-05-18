import { Post } from './post';
import { User } from './user';
import { User as UserPrisma, Post as PostPrisma, Community as CommunityPrisma, Comment as CommentPrisma } from '@prisma/client';

export class Community {
    readonly id?: number;
    readonly name: string;
    readonly description: string;
    readonly posts: Post[];
    readonly users: User[];
    readonly createdAt: Date;

    constructor(community: Community) {
        this.id = community.id;
        this.name = community.name;
        this.description = community.description;
        this.posts = community.posts;
        this.users = community.users;
        this.createdAt = community.createdAt;
    }

    static from(community: CommunityPrisma & {
        posts?: (PostPrisma & {
            comments: (CommentPrisma & {
                createdBy: UserPrisma,
                parent?: (CommentPrisma & {
                    createdBy: UserPrisma
                }) | null,
                replies?: (CommentPrisma & {
                    createdBy: UserPrisma
                })[]
            })[],
            user: UserPrisma,
            community: CommunityPrisma
        })[],
        users?: UserPrisma[]
    }): Community {
        return new Community({
            id: community.id,
            name: community.name,
            description: community.description,
            posts: community.posts?.map(post => Post.from(post)) || [],
            users: community.users?.map(user => User.from(user)) || [],
            createdAt: community.createdAt
        });
    }
}
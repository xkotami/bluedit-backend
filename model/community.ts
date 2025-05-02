import { Post } from './post';
import { User } from './user';
import { User as UserPrisma, Post as PostPrisma, Community as CommunityPrisma, Comment as CommentPrisma } from '@prisma/client';

export class Community {
    readonly id?: number;
    readonly name: string;
    readonly description: string;
    readonly posts: Post[];
    readonly users: User[];

    constructor(community: Community) {
        this.validate(community);
        this.id = community.id;
        this.name = community.name;
        this.description = community.description;
        this.posts = community.posts;
        this.users = community.users;
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
            validate(community: Community): void {
            },
            id: community.id,
            name: community.name,
            description: community.description,
            posts: community.posts?.map(post => Post.from(post)) || [],
            users: community.users?.map(user => User.from(user)) || []
        });
    }

    validate(community: Community) {
        if (!community.description) throw new Error('ERROR_DESCRIPTION_NOT_PRESENT');
        if (!community.name) throw new Error('ERROR_NAME_NOT_PRESENT');
    }
}
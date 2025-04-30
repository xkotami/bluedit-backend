import { Post } from './post';
import { Community } from './community';
import { User as UserType} from '../types/index';
import { User as UserPrisma, Post as PostPrisma, Community as CommunityPrisma, Comment as CommentPrisma} from '@prisma/client';

export class User {
    readonly id?: number;
    readonly username: string;
    readonly email: string;
    readonly points: number;
    readonly password: string;

    constructor(user: UserType) {
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.points = user.points;
        this.password = user.password;
    }

    static from({id, username, email, points,  password}: UserPrisma ): User {
        return new User({
            id,
            username,
            email,
            points,
            password
        })
    }

}
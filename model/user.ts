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

    constructor(user: User) {
        this.validate(user);
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.points = user.points;
        this.password = user.password;
    }

    static from({id, username, email, points,  password}: UserPrisma ): User {
        return new User({
            validate(user: User): void {
            },
            id,
            username,
            email,
            points,
            password
        })
    }

    validate(user: User): void {
        // Validate email contains '@' and '.'
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(user.email)) {
            throw new Error('ERROR_INVALID_EMAIL_FORMAT');
        }
        if (!user.email) throw new Error('ERROR_EMAIL_IS_NULL');
        if (!user.password) throw new Error('ERROR_PASSWORD_IS_NULL');
    }
}
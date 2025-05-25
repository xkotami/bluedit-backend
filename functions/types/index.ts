export type User = {
    id?: number;
    username: string;
    email: string;
    points: number;
    password: string;
}


export type Post = {
    id?: number;
    user: User;
    comments: Comment[];
    createdAt: Date;
}

export type Community = {
    id?: number;
    posts: Post[];
    users: User[];
    name: string;
    description: string;
    createdAt: Date;
}

export type Comment = {
    id?: number;
    text: string;
    createdAt: Date;
    points: number;
    createdBy: User;
    parent?: Comment;
}

export type CommentInput = {
    text: string;
    userId?: number;
    postId: number;
}

export type ReplyInput = {
    text: string;
    userId: number;
    postId: number;
    parentId: number;
}

export type PostInput = {
    title: string;
    content: string;
    userId: number;
    communityId: number;
}

export type UserInput = {
    username: string;
    email: string;
    password: string;
}

export type CommunityInput = {
    name: string;
    description: string;
}

export type JWTPayload = {
    email: string;
    userId?: number;
}

export type Login = {
    email: string;
    password: string;
}

export type Register = {
    username: string;
    email: string;
    password: string;
}

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
}

export type Community = {
    id?: number;
    posts: Post[];
    users: User[];
    name: string;
    description: string;
}

export type Comment = {
    id?: number;
    text: string;
    createdAt: Date;
    points: number;
    createdBy: User;
    parent?: Comment;
}
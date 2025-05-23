"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const user_1 = require("./user");
const comment_1 = require("./comment");
class Post {
    constructor(post) {
        this.id = post.id;
        this.title = post.title;
        this.content = post.content;
        this.user = post.user;
        this.comments = post.comments;
        this.createdAt = post.createdAt;
    }
    static from(post) {
        return new Post({
            id: post.id,
            title: post.title,
            content: post.content,
            user: user_1.User.from(post.user),
            comments: post.comments.map(comment => comment_1.Comment.from(comment)),
            createdAt: post.createdAt,
        });
    }
}
exports.Post = Post;

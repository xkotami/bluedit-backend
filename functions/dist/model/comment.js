"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const user_1 = require("./user");
class Comment {
    constructor(comment) {
        this.id = comment.id;
        this.text = comment.text;
        this.createdAt = comment.createdAt;
        this.points = comment.points;
        this.createdBy = comment.createdBy;
        this.replies = comment.replies;
        this.parent = comment.parent;
    }
    static from(comment) {
        return new Comment({
            id: comment.id,
            text: comment.text,
            createdAt: comment.createdAt,
            points: comment.points,
            createdBy: user_1.User.from(comment.createdBy),
            replies: comment.replies ? comment.replies.map(reply => Comment.from(reply)) : [],
            parent: comment.parent ? Comment.from(comment.parent) : undefined
        });
    }
}
exports.Comment = Comment;

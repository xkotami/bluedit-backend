"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(user) {
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.points = user.points;
        this.password = user.password;
    }
    static from({ id, username, email, points, password }) {
        return new User({
            id,
            username,
            email,
            points,
            password
        });
    }
}
exports.User = User;

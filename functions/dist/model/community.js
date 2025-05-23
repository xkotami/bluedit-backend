"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Community = void 0;
const post_1 = require("./post");
const user_1 = require("./user");
class Community {
    constructor(community) {
        this.validate(community);
        this.id = community.id;
        this.name = community.name;
        this.description = community.description;
        this.posts = community.posts;
        this.users = community.users;
        this.createdAt = community.createdAt;
    }
    static from(community) {
        var _a, _b;
        return new Community({
            validate(community) {
            },
            id: community.id,
            name: community.name,
            description: community.description,
            posts: ((_a = community.posts) === null || _a === void 0 ? void 0 : _a.map(post => post_1.Post.from(post))) || [],
            users: ((_b = community.users) === null || _b === void 0 ? void 0 : _b.map(user => user_1.User.from(user))) || [],
            createdAt: community.createdAt
        });
    }
    validate(community) {
        //if (!community.description) throw new Error('ERROR_DESCRIPTION_NOT_PRESENT');
        //if (!community.name) throw new Error('ERROR_NAME_NOT_PRESENT');
    }
}
exports.Community = Community;

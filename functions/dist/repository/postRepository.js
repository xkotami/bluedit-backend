"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./database"));
const post_1 = require("../model/post");
const getAllPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield database_1.default.post.findMany({
            include: {
                user: true,
                community: true,
                comments: {
                    include: {
                        createdBy: true,
                        parent: {
                            include: {
                                createdBy: true
                            }
                        },
                        replies: {
                            include: {
                                createdBy: true
                            }
                        }
                    }
                }
            }
        });
        return posts.map(post => post_1.Post.from(post));
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const createPost = (input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield database_1.default.post.create({
            data: {
                title: input.title,
                content: input.content,
                user: {
                    connect: {
                        id: input.userId
                    }
                },
                community: {
                    connect: {
                        id: input.communityId
                    }
                }
            },
            include: {
                user: true,
                community: true,
                comments: {
                    include: {
                        createdBy: true,
                        parent: {
                            include: {
                                createdBy: true
                            }
                        },
                        replies: {
                            include: {
                                createdBy: true
                            }
                        }
                    }
                }
            }
        });
        return post_1.Post.from(post);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const findPostById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield database_1.default.post.findUnique({
            where: {
                id: id
            },
            include: {
                user: true,
                community: true,
                comments: {
                    include: {
                        createdBy: true,
                        parent: {
                            include: {
                                createdBy: true
                            }
                        },
                        replies: {
                            include: {
                                createdBy: true
                            }
                        }
                    }
                }
            }
        });
        if (post) {
            return post_1.Post.from(post);
        }
        else {
            throw new Error("ERROR_POST_NOT_FOUND");
        }
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const getAllPostsOfCommunity = (communityId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield database_1.default.post.findMany({
            where: {
                communityId
            },
            include: {
                user: true,
                community: true,
                comments: {
                    include: {
                        createdBy: true,
                        parent: {
                            include: {
                                createdBy: true
                            }
                        },
                        replies: {
                            include: {
                                createdBy: true
                            }
                        }
                    }
                }
            }
        });
        return posts.map(post => { post_1.Post.from(post); });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.default = {
    getAllPosts,
    createPost,
    findPostById,
    getAllPostsOfCommunity,
};

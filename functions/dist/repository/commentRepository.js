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
const comment_1 = require("../model/comment");
const getAllComments = () => __awaiter(void 0, void 0, void 0, function* () {
    const comments = yield database_1.default.comment.findMany({
        include: {
            parent: {
                include: {
                    createdBy: true
                }
            },
            createdBy: true
        }
    });
    return comments.map(comment => {
        var _a;
        const parent = (_a = comment.parent) !== null && _a !== void 0 ? _a : undefined;
        return comment_1.Comment.from(Object.assign(Object.assign({}, comment), { parent }));
    });
});
const createComment = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield database_1.default.comment.create({
        data: {
            text: input.text,
            post: {
                connect: {
                    id: input.postId
                }
            },
            createdBy: {
                connect: {
                    id: input.userId
                }
            }
        },
        include: {
            parent: {
                include: {
                    createdBy: true
                }
            },
            createdBy: true
        }
    });
    return comment_1.Comment.from(comment);
});
const getCommentsByPost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield database_1.default.comment.findMany({
            where: {
                post: {
                    id: id
                }
            },
            include: {
                parent: {
                    include: {
                        createdBy: true
                    }
                },
                createdBy: true
            }
        });
        return comments.map(comment => {
            var _a;
            const parent = (_a = comment.parent) !== null && _a !== void 0 ? _a : undefined;
            return comment_1.Comment.from(Object.assign(Object.assign({}, comment), { parent }));
        });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const findCommentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield database_1.default.comment.findUnique({
            where: {
                id: id
            },
            include: {
                parent: {
                    include: {
                        createdBy: true
                    }
                },
                createdBy: true
            }
        });
        if (comment) {
            return comment_1.Comment.from(comment);
        }
        else {
            throw new Error("ERROR_COMMENT_NOT_FOUND");
        }
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const findCommentsByUserId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield database_1.default.comment.findMany({
            where: {
                createdBy: {
                    id: id
                }
            },
            include: {
                parent: {
                    include: {
                        createdBy: true
                    }
                },
                createdBy: true
            }
        });
        return comments.map(comment => {
            var _a;
            const parent = (_a = comment.parent) !== null && _a !== void 0 ? _a : undefined;
            return comment_1.Comment.from(Object.assign(Object.assign({}, comment), { parent }));
        });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.default = {
    getAllComments,
    createComment,
    findCommentById,
    findCommentsByUserId,
    getCommentsByPost
};

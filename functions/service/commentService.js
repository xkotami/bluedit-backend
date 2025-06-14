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
const commentRepository_1 = __importDefault(require("../repository/commentRepository"));
const postRepository_1 = __importDefault(require("../repository/postRepository"));
const userRepository_1 = __importDefault(require("../repository/userRepository"));
const jwt_1 = __importDefault(require("../util/jwt"));
const getAllCommentsByUser = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decodedToken = jwt_1.default.validateToken(token);
        if (!decodedToken.userId) {
            throw new Error("ERROR_INVALID_TOKEN");
        }
        else {
            return yield commentRepository_1.default.findCommentsByUserId(decodedToken.userId);
        }
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const getCommentsByPost = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(yield postRepository_1.default.findPostById(postId)))
            throw new Error("ERROR_INVALID_POST");
        const comments = yield commentRepository_1.default.getCommentsByPost(postId);
        if (!comments)
            throw new Error("ERROR_INVALID");
        return comments;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const createComment = (input, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decodedToken = jwt_1.default.validateToken(token);
        if (!decodedToken) {
            throw new Error("ERROR_INVALID_TOKEN");
        }
        if (!(yield postRepository_1.default.findPostById(input.postId)))
            throw new Error("ERROR_INVALID_POST");
        return yield commentRepository_1.default.createComment({ text: input.text, userId: decodedToken.userId, postId: input.postId });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const findCommentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield commentRepository_1.default.findCommentById(id);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const createReply = (input, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decodedToken = jwt_1.default.validateToken(token);
        if (!decodedToken) {
            throw new Error("ERROR_INVALID_TOKEN");
        }
        if (!input.userId)
            throw new Error("ERROR_INVALID_USER");
        if (!input.postId)
            throw new Error("ERROR_INVALID_POST");
        if (!input.parentId)
            throw new Error("ERROR_INVALID_POST");
        if (!(yield postRepository_1.default.findPostById(input.postId)))
            throw new Error("ERROR_INVALID_POST");
        if (!(yield commentRepository_1.default.findCommentById(input.parentId)))
            throw new Error("ERROR_INVALID_COMMENT");
        return yield commentRepository_1.default.createReply(input);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const voting = (commentId, upvote, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decodedToken = jwt_1.default.validateToken(token);
        if (!decodedToken)
            throw new Error("ERROR_INVALID_TOKEN");
        const comment = yield commentRepository_1.default.findCommentById(commentId);
        if (!comment)
            throw new Error("ERROR_INVALID_COMMENT");
        if (upvote) {
            yield userRepository_1.default.addPoints(comment.createdBy.id);
            return yield commentRepository_1.default.upvote(commentId);
        }
        else {
            yield userRepository_1.default.removePoints(comment.createdBy.id);
            return yield commentRepository_1.default.downvote(commentId);
        }
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.default = {
    getAllCommentsByUser,
    createComment,
    findCommentById,
    getCommentsByPost,
    voting,
    createReply
};

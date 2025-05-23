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
exports.default = {
    getAllCommentsByUser,
    createComment,
    findCommentById,
    getCommentsByPost,
};

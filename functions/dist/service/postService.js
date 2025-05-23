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
const postRepository_1 = __importDefault(require("../repository/postRepository"));
const jwt_1 = __importDefault(require("../util/jwt"));
const getAllPosts = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        jwt_1.default.validateToken(token);
        return yield postRepository_1.default.getAllPosts();
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const createPost = (input, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(token);
        const decodedToken = jwt_1.default.validateToken(token);
        const newInput = { title: input.title, content: input.content, userId: decodedToken.userId, communityId: input.communityId };
        return yield postRepository_1.default.createPost(newInput);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const findPostById = (id, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        jwt_1.default.validateToken(token);
        return yield postRepository_1.default.findPostById(parseInt(id));
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const getAllPostsOfCommunity = (communityId, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        jwt_1.default.validateToken(token);
        return yield postRepository_1.default.getAllPostsOfCommunity(parseInt(communityId));
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

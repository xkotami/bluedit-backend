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
const communityRepository_1 = __importDefault(require("../repository/communityRepository"));
const jwt_1 = __importDefault(require("../util/jwt"));
const getAllCommunities = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield communityRepository_1.default.getAllCommunities();
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const createCommunity = (input, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield communityRepository_1.default.createCommunity(input);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const findCommunityById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield communityRepository_1.default.findCommunityById(id);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const getCommunitiesByTokenUserId = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decodedToken = jwt_1.default.validateToken(token);
        return yield communityRepository_1.default.getCommunitiesByUserId(decodedToken.userId);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const joinCommunityByToken = (token, communityId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decodedToken = jwt_1.default.validateToken(token);
        if (!(yield communityRepository_1.default.findCommunityById(communityId)))
            throw new Error("ERROR_COMMUNITY_NOT_FOUND");
        if (yield communityRepository_1.default.getUserInCommunity(decodedToken.userId, communityId)) {
            throw new Error("ERROR_USER_ALREADY_JOINED");
        }
        else {
            return yield communityRepository_1.default.joinCommunity(decodedToken.userId, communityId);
        }
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const leaveCommunityByToken = (token, communityId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decodedToken = jwt_1.default.validateToken(token);
        if (!(yield communityRepository_1.default.findCommunityById(communityId)))
            throw new Error("ERROR_COMMUNITY_NOT_FOUND");
        if (yield communityRepository_1.default.getUserInCommunity(decodedToken.userId, communityId)) {
            return yield communityRepository_1.default.leaveCommunity(decodedToken.userId, communityId);
        }
        else {
            throw new Error("ERROR_USER_NOT_IN_COMMUNITY");
        }
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const findCommunityByPostId = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield communityRepository_1.default.findCommunityByPostId(postId);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.default = {
    getAllCommunities,
    createCommunity,
    findCommunityById,
    findCommunityByPostId,
    getCommunitiesByTokenUserId,
    joinCommunityByToken,
    leaveCommunityByToken
};

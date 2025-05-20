import communityDb from '../repository/communityRepository';
import {CommunityInput} from "../types";
import jwt from "../util/jwt";

const getAllCommunities = async (token: string) => {
    try {
        return await communityDb.getAllCommunities();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const createCommunity = async (input: CommunityInput, token: string) => {
    try {
        return await communityDb.createCommunity(input);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const findCommunityById = async (id: number) => {
    try {
        return await communityDb.findCommunityById(id);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getCommunitiesByTokenUserId = async (token: string) => {
    try {
        const decodedToken = jwt.validateToken(token);

        return await communityDb.getCommunitiesByUserId(decodedToken.userId!);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const joinCommunityByToken = async (token: string, communityId: number) => {
    try {
        const decodedToken = jwt.validateToken(token);
        if (!await communityDb.findCommunityById(communityId)) throw new Error("ERROR_COMMUNITY_NOT_FOUND");
        if (await communityDb.getUserInCommunity(decodedToken.userId!, communityId)) {
            throw new Error("ERROR_USER_ALREADY_JOINED")
        } else {
            return await communityDb.joinCommunity(decodedToken.userId!, communityId);
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const leaveCommunityByToken = async (token: string, communityId: number) => {
    try {
        const decodedToken = jwt.validateToken(token);
        if (!await communityDb.findCommunityById(communityId)) throw new Error("ERROR_COMMUNITY_NOT_FOUND");
        if (await communityDb.getUserInCommunity(decodedToken.userId!, communityId)) {
            return await communityDb.leaveCommunity(decodedToken.userId!, communityId);
        } else {
            throw new Error("ERROR_USER_NOT_IN_COMMUNITY")
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const findCommunityByPostId = async (postId: number) => {
    try {
        return await communityDb.findCommunityByPostId(postId);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {
    getAllCommunities,
    createCommunity,
    findCommunityById,
    findCommunityByPostId,
    getCommunitiesByTokenUserId,
    joinCommunityByToken,
    leaveCommunityByToken
}
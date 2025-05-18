import communityDb from '../repository/communityRepository';
import {CommunityInput} from "../types";

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
}
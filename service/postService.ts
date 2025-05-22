import { Post } from '../model/post';
import postDb from '../repository/postRepository';
import {PostInput} from "../types";
import jwt from "../util/jwt";

const getAllPosts = async (): Promise<Post[]> => {
    try {
        return await postDb.getAllPosts();
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const createPost = async (input: PostInput, token: string) => {
    try {
        console.log(token)
        const decodedToken = jwt.validateToken(token);
        const newInput: PostInput = {title: input.title, content: input.content, userId: decodedToken.userId!, communityId: input.communityId};
        return await postDb.createPost(newInput);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const findPostById = async (id: string) => {
    try {
        return await postDb.findPostById(parseInt(id))
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getAllPostsOfCommunity = async (communityId: string) => {
    try {
        return await postDb.getAllPostsOfCommunity(parseInt(communityId))
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {
    getAllPosts,
    createPost,
    findPostById,
    getAllPostsOfCommunity,
}
import { Post } from '../model/post';
import postDb from '../repository/postRepository';
import {PostInput} from "../types";

const getAllPosts = async (): Promise<Post[]> => await postDb.getAllPosts();

const createPost = async (input: PostInput, token: string) => {
    try {
        return await postDb.createPost(input);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const findPostById = async (id: string, token: string) => {
    try {
        return await postDb.findPostById(parseInt(id))
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export default {
    getAllPosts,
    createPost,
    findPostById
}
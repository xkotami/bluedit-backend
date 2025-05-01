import commentDb from '../repository/commentRepository'
import {CommentInput} from "../types";

const getAllComments = async (token: string) => {
    try {
        return await commentDb.getAllComments();
    } catch (error) {
        console.log(error);
    }
}

const createComment = async (input: CommentInput, token: string) => {
    try {
        return await commentDb.createComment(input);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const findCommentById = async (id: number) => {
    try {
        return await commentDb.findCommentById(id);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {
    getAllComments,
    createComment,
    findCommentById,
}
import commentDb from '../repository/commentRepository'
import postDb from '../repository/postRepository'
import { CommentInput, ReplyInput } from '../types';
import jwt from "../util/jwt";

const getAllComments = async () => {
    try {
        return await commentDb.getAllComments();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getAllCommentsByUser = async (userId: number) => {
    try {
        return await commentDb.findCommentsByUserId(userId);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getCommentsByPost = async (postId: number) => {
    try {
        if (! await postDb.findPostById(postId)) throw new Error("ERROR_INVALID_POST");
        const comments = await commentDb.getCommentsByPost(postId);
        if (!comments) throw new Error("ERROR_INVALID");
        return comments;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const createComment = async (input: CommentInput, token: string) => {
    try {
        const decodedToken = jwt.validateToken(token);
        if (!decodedToken) {
            throw new Error("ERROR_INVALID_TOKEN");
        }

        if (!input.userId) throw new Error("ERROR_INVALID_USER");
        if (!input.postId) throw new Error("ERROR_INVALID_POST");

        if (! await postDb.findPostById(input.postId)) throw new Error("ERROR_INVALID_POST");
        return await commentDb.createComment({text: input.text, userId: decodedToken.userId as number, postId: input.postId});
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const createReply = async (input: ReplyInput, token: string) => {
    try {
        const decodedToken = jwt.validateToken(token);
        if (!decodedToken) {
            throw new Error("ERROR_INVALID_TOKEN");
        }

        if (!input.userId) throw new Error("ERROR_INVALID_USER");
        if (!input.postId) throw new Error("ERROR_INVALID_POST");
        if (!input.parentId) throw new Error("ERROR_INVALID_POST");

        if (! await postDb.findPostById(input.postId)) throw new Error("ERROR_INVALID_POST");
        if (! await commentDb.findCommentById(input.parentId)) throw new Error("ERROR_INVALID_COMMENT");

        return await commentDb.createReply(input);
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

const voting = async (commentId: number, upvote: boolean, token: string) => {
    try {
        const decodedToken = jwt.validateToken(token);
        if (!decodedToken) throw new Error("ERROR_INVALID_TOKEN");
        if (!await commentDb.findCommentById(commentId)) throw new Error("ERROR_INVALID_COMMENT");
        if (upvote) {
            return await commentDb.upvote(commentId);
        } else {
            return await commentDb.downvote(commentId);
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {
    getAllComments,
    getAllCommentsByUser,
    createComment,
    createReply,
    findCommentById,
    getCommentsByPost,
    voting
}
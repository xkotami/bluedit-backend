import database from "./database";
import {Comment} from "../model/comment"
import {CommentInput} from "../types";

const getAllComments = async () => {
    const comments = await database.comment.findMany({
        include: {
            parent: {
                include: {
                    createdBy: true
                }
            },
            createdBy: true
        }
    })

    return comments.map(comment => {
        const parent = comment.parent ?? undefined;
        return Comment.from({ ...comment, parent });})
}

const createComment = async (input: CommentInput) => {
    const comment = await database.comment.create({
        data: {
            text: input.text,
            post: {
                connect: {
                    id: input.postId
                }
            },
            createdBy: {
                connect: {
                    id: input.userId
                }
            }
        },
        include: {
            parent: {
                include: {
                    createdBy: true
                }
            },
            createdBy: true
        }
    })
    return Comment.from(comment);
}

const getCommentsByPost = async (id: number) => {
    try {
        const comments = await database.comment.findMany({
            where: {
                post: {
                    id: id
                }
            },
            include: {
                parent: {
                    include: {
                        createdBy: true
                    }
                },
                createdBy: true
            }
        })
        return comments.map(comment => {
            const parent = comment.parent ?? undefined;
            return Comment.from({ ...comment, parent });})
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const findCommentById = async (id: number) => {
    try {
        const comment = await database.comment.findUnique({
            where: {
                id: id
            },
            include: {
                parent: {
                    include: {
                        createdBy: true
                    }
                },
                createdBy: true
            }
        })
        if (comment) {
            return Comment.from(comment);
        } else {
            throw new Error("ERROR_COMMENT_NOT_FOUND")
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const findCommentsByUserId = async (id: number) => {
    try{
        const comments = await database.comment.findMany({
            where: {
                createdBy: {
                    id: id
                }
            },
            include: {
                parent: {
                    include: {
                        createdBy: true
                    }
                },
                createdBy: true
            }
        })
        return comments.map(comment => {
            const parent = comment.parent ?? undefined;
            return Comment.from({ ...comment, parent });})
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {
    getAllComments,
    createComment,
    findCommentById,
    findCommentsByUserId,
    getCommentsByPost
}
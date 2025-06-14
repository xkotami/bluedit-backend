import database from "./database";
import {Comment} from "../model/comment"
import { CommentInput, ReplyInput } from '../types';

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

const createReply = async (input: ReplyInput) => {
    const comment = await database.comment.create({
        data: {
            text: input.text,
            post: {
                connect: {
                    id: input.postId
                }
            },
            parent: {
                connect: {
                    id: input.parentId
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

const getCommentsByPost = async (postId: number) => {
    try {
        const comments = await database.comment.findMany({
            where: { postId },
            include: {
                createdBy: true,
                parent: true, // Needed to check parentId
            },
            orderBy: { createdAt: 'asc' } // Optional, for ordering
        });

        const buildTree = (flatComments: typeof comments) => {
            const map: Record<number, any> = {};
            const roots: any[] = [];

            // Prepare map and initialize replies array
            flatComments.forEach(comment => {
                map[comment.id] = { ...comment, replies: [] };
            });

            flatComments.forEach(comment => {
                if (comment.parentId) {
                    const parent = map[comment.parentId];
                    if (parent) {
                        parent.replies.push(map[comment.id]);
                    }
                } else {
                    roots.push(map[comment.id]);
                }
            });

            return roots;
        };

        const tree = buildTree(comments);
        return tree.map(c => Comment.from(c));
    } catch (error) {
        console.log(error);
        throw error;
    }
};

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

const upvote = async(id: number) => {
    const comment = await database.comment.update({
        where: {
            id: id
        },
        data: {
            points: {
                increment: 1
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

const downvote = async(id: number) => {
    const comment = await database.comment.update({
        where: {
            id: id
        },
        data: {
            points: {
                increment: -1
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

export default {
    getAllComments,
    createComment,
    createReply,
    findCommentById,
    findCommentsByUserId,
    getCommentsByPost,
    upvote,
    downvote
}
import database from "./database";
import {Comment} from "../model/comment"

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

export default {
    getAllComments,
}
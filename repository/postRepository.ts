import database from "./database";
import {Post} from "../model/post";

const getAllPosts = async () => {
    const posts = await database.post.findMany({
        include: {
            comments: {
                include: {
                    parent: true,
                    createdBy: true,
                }
            },
            user: true,
            community: true
        }
    })
    return posts.map(post => Post.from(post))
}

export default {
    getAllPosts
}
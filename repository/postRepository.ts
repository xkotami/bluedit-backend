import database from "./database";
import {Post} from "../model/post";

const getAllPosts = async () => {
    const posts = await database.post.findMany({
        include: {
            user: true,
            community: true,
            comments: {
                include: {
                    createdBy: true,
                    parent: {
                        include: {
                            createdBy: true
                        }
                    },
                    replies: {
                        include: {
                            createdBy: true
                        }
                    }
                }
            }
        }
    });
    return posts.map(post => Post.from(post));
}

export default {
    getAllPosts
}
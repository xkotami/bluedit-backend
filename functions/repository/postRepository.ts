import database from "./database";
import {Post} from "../model/post";
import {PostInput} from "../types";

const getAllPosts = async () => {
    try{
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
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const createPost = async (input: PostInput) => {
    try{
        const post = await database.post.create({
            data: {
                title: input.title,
                content: input.content,
                user: {
                    connect: {
                        id: input.userId
                    }
                },
                community: {
                    connect: {
                        id: input.communityId
                    }
                }
            },
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
        })
        return Post.from(post);
    } catch(error) {
        console.log(error);
        throw error;
    }
}

const findPostById = async (id: number) => {
    try {
        const post = await database.post.findUnique({
            where: {
                id: id
            },
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
        })
        if (post){
            return Post.from(post);
        } else {
            throw new Error("ERROR_POST_NOT_FOUND");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getAllPostsOfCommunity = async (communityId: number) => {
    try {
        const posts = await database.post.findMany({
            where: {
                communityId
            },
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
        })
        return posts.map(post => {Post.from(post)})
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
import database from "./database";
import {Community} from "../model/community";
import {CommunityInput} from "../types";

const getAllCommunities = async () => {
    const communities = await database.community.findMany({
        include: {
            posts: {
                include: {
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
                    },
                    user: true,
                    community: true
                }
            },
            users: true
        }
    });
    return communities.map(community => Community.from(community));
}

const createCommunity = async (input: CommunityInput) => {
    try {
        const community = await database.community.create({
            data: {
                name: input.name,
                description: input.description,
            },
            include: {
                posts: {
                    include: {
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
                        },
                        user: true,
                        community: true
                    }
                },
                users: true
            }
        })

        return Community.from(community);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const findCommunityById = async (id: number) => {
    try {
        const community = await database.community.findUnique({
            where: {
                id: id
            },
            include: {
                posts: {
                    include: {
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
                        },
                        user: true,
                        community: true
                    }
                },
                users: true
            }
        })
        if (community) {
            return Community.from(community);
        } else {
            throw new Error("ERROR_COMMUNITY_NOT_FOUND")
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {
    getAllCommunities,
    createCommunity,
    findCommunityById
}


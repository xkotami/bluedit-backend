import database from "./database";
import {Community} from "../model/community";

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

export default {
    getAllCommunities
}


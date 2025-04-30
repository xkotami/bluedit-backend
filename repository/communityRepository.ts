import database from "./database";
import {Community} from "../model/community";

const getAllCommunities = async () => {
    try {
        const communities = await database.community.findMany({
            include: {
                posts: {
                    include: {
                        comments: true,
                        user: true,
                        community: true
                    }
                },
                users: true
            }
        })

        return communities.map(community => Community.from(community))
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {
    getAllCommunities
}


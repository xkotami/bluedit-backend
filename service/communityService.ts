import communityDb from '../repository/communityRepository';

const getAllCommunities = async (token: string) => {
    try {
        return await communityDb.getAllCommunities()
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {
    getAllCommunities
}
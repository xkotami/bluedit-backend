import commentDb from '../repository/communityRepository'

const getAllComments = async (token: string) => {
    try {
        return await commentDb.getAllCommunities();
    } catch (error) {
        console.log(error);
    }
}

export default {
    getAllComments,
}
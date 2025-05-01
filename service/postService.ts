import { Post } from '../model/post';
import postDb from '../repository/postRepository';

const getAllPosts = async (): Promise<Post[]> => await postDb.getAllPosts();

export default {
    getAllPosts,
}
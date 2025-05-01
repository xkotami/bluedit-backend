import express, {NextFunction, Request, Response} from 'express';
import postService from '../service/postService'

const postRouter = express.Router();

postRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await postService.getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
});

export default postRouter
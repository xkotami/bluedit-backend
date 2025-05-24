import express, {response} from "express";
import commentService from "../service/commentService";
import { CommentInput, ReplyInput } from '../types';

const commentRouter = express.Router();

/**
 * @swagger
 * /comment:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve all comments
 *     description: Fetches all comments from the database. Requires proper authentication token.
 *     tags:
 *       - Comments
 *     responses:
 *       200:
 *         description: Successfully retrieved all comments.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     description: The comment ID.
 *                     example: 1
 *                   content:
 *                     type: string
 *                     description: The content of the comment.
 *                     example: "This is a comment."
 *                   postId:
 *                     type: number
 *                     description: The ID of the post this comment belongs to.
 *                     example: 101
 *                   userId:
 *                     type: number
 *                     description: The ID of the user who created the comment.
 *                     example: 5
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "An unexpected error occurred."
 */
commentRouter.get("/", async (req, res, next) => {
    try{
        const response = await commentService.getAllComments();
        res.status(200).json(response);
    } catch(error: any) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
});

commentRouter.get("/user/:id", async (req, res, next) => {
    try{
        const id = parseInt(req.params.id);
        const response = await commentService.getAllCommentsByUser(id);
        res.status(200).json(response);
    } catch(error: any) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
});

/**
 * @swagger
 * /comment:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new comment
 *     description: Adds a new comment to a post. Requires valid input and an authorization token.
 *     tags:
 *       - Comments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *               - userId
 *               - postId
 *             properties:
 *               text:
 *                 type: string
 *                 description: The content text of the comment.
 *               postId:
 *                 type: integer
 *                 description: The ID of the post being commented on.
 *     responses:
 *       200:
 *         description: The comment was created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID of the created comment.
 *                 text:
 *                   type: string
 *                 userId:
 *                   type: integer
 *                 postId:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Timestamp when the comment was created.
 *       400:
 *         description: Bad request. Invalid input data.
 *       401:
 *         description: Unauthorized. Token is invalid or missing.
 *       500:
 *         description: Internal server error.
 */
commentRouter.post("/", async (req, res, next) => {
    try {
        const token = req.headers.authorization!.split(" ")[1];
        const input = req.body.input as CommentInput;
        const response = await commentService.createComment(input, token);
        res.status(200).json(response);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

commentRouter.post("/reply", async (req, res, next) => {
    try {
        const token = req.headers.authorization!.split(" ")[1];
        const input = req.body.input as ReplyInput;
        const response = await commentService.createReply(input, token);
        res.status(200).json(response);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /comment/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve a comment by ID
 *     description: Fetches the details of a specific comment from the system using its unique ID.
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the comment to retrieve.
 *     responses:
 *       200:
 *         description: Comment details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique ID of the comment.
 *                 content:
 *                   type: string
 *                   description: The content of the comment.
 *                 userId:
 *                   type: integer
 *                   description: The ID of the user who created this comment.
 *                 postId:
 *                   type: integer
 *                   description: The ID of the post this comment is associated with.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp when the comment was created.
 *       400:
 *         description: Bad request. Invalid comment ID format.
 *       404:
 *         description: Comment not found with the given ID.
 *       500:
 *         description: Internal server error.
 */
commentRouter.get("/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const response = await commentService.findCommentById(id);
        res.status(200).json(response);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
        next(error);
    }
});

/**
 * @swagger
 * /comment/post/{id}:
 *   get:
 *     summary: Retrieve comments for a specific post
 *     description: Fetches all comments associated with a given post ID.
 *     tags:
 *       - Comments
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the post for which to fetch comments
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of comments for the specified post
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The unique ID of the comment
 *                   postId:
 *                     type: integer
 *                     description: The ID of the post the comment belongs to
 *                   userId:
 *                     type: integer
 *                     description: The ID of the user who created the comment
 *                   text:
 *                     type: string
 *                     description: The content of the comment
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Timestamp when the comment was created
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *     security:
 *       - bearerAuth: []
 */
commentRouter.get("/post/:id", async (req, res, next) => {
    try {
        const response = await commentService.getCommentsByPost(parseInt(req.params.id));
        res.status(200).json(response);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
})

export default commentRouter
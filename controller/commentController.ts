import express from "express";
import commentService from "../service/commentService";

const commentRouter = express.Router();

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Retrieve all comments
 *     description: Fetches all comments from the database. Requires proper authentication token.
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Bearer token for authentication. Provide it as "Bearer <token>".
 *         schema:
 *           type: string
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
        const response = await commentService.getAllComments("token");
        res.status(200).json(response);
    } catch(error: any) {
        console.log(error);
        res.status(500).json({message: error.message});
        next(error);
    }

});

export default commentRouter
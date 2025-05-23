"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postService_1 = __importDefault(require("../service/postService"));
const postRouter = express_1.default.Router();
/**
 * @swagger
 * /post:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve all posts
 *     description: Fetches a list of all posts available in the system.
 *     tags:
 *       - Posts
 *     responses:
 *       200:
 *         description: A list of posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The unique ID of the post.
 *                   title:
 *                     type: string
 *                     description: The title of the post.
 *                   content:
 *                     type: string
 *                     description: The body/content of the post.
 *                   userId:
 *                     type: integer
 *                     description: The ID of the user who created the post.
 *                   communityId:
 *                     type: integer
 *                     description: Optional ID of the community the post belongs to. Null if not part of a community.
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Timestamp when the post was created.
 *       500:
 *         description: Internal server error.
 */
postRouter.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const response = yield postService_1.default.getAllPosts(token);
        res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}));
/**
 * @swagger
 * /post:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new post
 *     description: Adds a new post to the system. Authorization token may be required depending on implementation.
 *     tags:
 *       - Posts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - userId
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the post.
 *               content:
 *                 type: string
 *                 description: The body/content of the post.
 *               userId:
 *                 type: integer
 *                 description: The ID of the user creating the post.
 *               communityId:
 *                 type: integer
 *                 description: Optional ID of the community the post should belong to.
 *     responses:
 *       200:
 *         description: The post was created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID of the created post.
 *                 title:
 *                   type: string
 *                   description: Title of the post.
 *                 content:
 *                   type: string
 *                   description: Content of the post.
 *                 userId:
 *                   type: integer
 *                   description: ID of the user who created the post.
 *                 communityId:
 *                   type: integer
 *                   description: Optional community ID if it belongs to one.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Timestamp when the post was created.
 *       400:
 *         description: Bad request. Invalid input data.
 *       401:
 *         description: Unauthorized. Token is invalid or missing.
 *       500:
 *         description: Internal server error.
 */
postRouter.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const input = req.body;
        const response = yield postService_1.default.createPost(input, token);
        res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}));
/**
 * @swagger
 * /post/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve a post by ID
 *     description: Fetches details of a specific post from the system using its unique ID. Requires an authorization token.
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the post to retrieve.
 *     responses:
 *       200:
 *         description: Post details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique ID of the post.
 *                 title:
 *                   type: string
 *                   description: The title of the post.
 *                 content:
 *                   type: string
 *                   description: The content of the post.
 *                 userId:
 *                   type: integer
 *                   description: The ID of the user who created the post.
 *                 communityId:
 *                   type: integer
 *                   description: Optional community ID if the post belongs to one.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Timestamp when the post was created.
 *       400:
 *         description: Bad request. Invalid post ID format.
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *       404:
 *         description: Post not found with the specified ID.
 *       500:
 *         description: Internal server error.
 */
postRouter.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const id = req.params.id;
        const response = yield postService_1.default.findPostById(id, token);
        res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}));
postRouter.get('/community/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const communityId = req.params.id;
        const response = yield postService_1.default.getAllPostsOfCommunity(communityId, "token");
        res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        next(error);
        res.status(500).json({ message: error.message });
    }
}));
exports.default = postRouter;

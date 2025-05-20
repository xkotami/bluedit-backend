import express, {NextFunction, response} from "express";
import communityService from "../service/communityService";
import {CommunityInput} from "../types";

const communityRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /community:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve all communities
 *     description: Fetches a list of all the communities. Requires a valid authorization token.
 *     tags:
 *       - Communities
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: A bearer token for authentication (e.g., "Bearer token").
 *     responses:
 *       200:
 *         description: A list of communities.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The unique ID of the community.
 *                   name:
 *                     type: string
 *                     description: The name of the community.
 *                   description:
 *                     type: string
 *                     description: A brief description of the community.
 *                   adminId:
 *                     type: integer
 *                     description: The ID of the community admin.
 *       500:
 *         description: Internal server error.
 */
communityRouter.get("/", async (req, res, next) => {
    try {
        const response = await communityService.getAllCommunities("token");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/**
 * @swagger
 * /community/user:
 *   get:
 *     summary: Retrieve communities for the user based on token
 *     description: Fetches a list of communities associated with the user ID extracted from the provided bearer token.
 *     tags:
 *       - Communities
 *     responses:
 *       200:
 *         description: A list of communities for the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The unique ID of the community
 *                   name:
 *                     type: string
 *                     description: The name of the community
 *                   description:
 *                     type: string
 *                     description: A brief description of the community
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Timestamp when the community was created
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
communityRouter.get("/user", async (req, res, next) => {
    try {
        const token = req.headers.authorization!.split(" ")[1];
        const response = communityService.getCommunitiesByTokenUserId(token);
        res.status(200).json(response);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
})

/**
 * @swagger
 * /community:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new community
 *     description: Creates a new community in the database. Requires valid input and an authorization token.
 *     tags:
 *       - Communities
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the community.
 *               description:
 *                 type: string
 *                 description: A short description of the community.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: A bearer token for authentication (e.g., "Bearer token").
 *     responses:
 *       200:
 *         description: The community was created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID of the created community.
 *                 name:
 *                   type: string
 *                   description: Name of the community.
 *                 description:
 *                   type: string
 *                   description: Description of the community.
 *       400:
 *         description: Bad request. Invalid input data.
 *       401:
 *         description: Unauthorized. Token is invalid or missing.
 *       500:
 *         description: Internal server error.
 */
communityRouter.post("/", async (req, res, next) => {
    try {
        const input: CommunityInput = req.body as CommunityInput;
        const response = await communityService.createCommunity(input, "token");
        res.status(200).json(response);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /community/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve a community by ID
 *     description: Fetches details of a specific community from the system using its unique ID.
 *     tags:
 *       - Communities
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the community to retrieve.
 *     responses:
 *       200:
 *         description: Community details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique ID of the community.
 *                 name:
 *                   type: string
 *                   description: The name of the community.
 *                 description:
 *                   type: string
 *                   description: A brief description of the community.
 *       400:
 *         description: Bad request. Invalid community ID format.
 *       404:
 *         description: Community not found with the given ID.
 *       500:
 *         description: Internal server error.
 */
communityRouter.get("/:id", async (req, res, next) => {
    try {
        const id: number = parseInt(req.params.id);
        const response = await communityService.findCommunityById(id);
        res.status(200).json(response);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /community/join/{id}:
 *   put:
 *     summary: Join a community using a token
 *     description: Allows a user to join a specific community based on the provided token and community ID.
 *     tags:
 *       - Communities
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the community to join
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully joined the community
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique ID of the community
 *                 name:
 *                   type: string
 *                   description: The name of the community
 *                 description:
 *                   type: string
 *                   description: A brief description of the community
 *                 users:
 *                   type: array
 *                   description: A list of users in the community
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The unique ID of the user
 *                       name:
 *                         type: string
 *                         description: The name of the user
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
communityRouter.put("/join/:id", async (req, res, next) => {
    try {
        const token = req.headers.authorization!.split(" ")[1];
        const response = await communityService.joinCommunityByToken(token, parseInt(req.params.id));
        res.status(200).json(response);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
})

/**
 * @swagger
 * /community/leave/{id}:
 *   put:
 *     summary: Leave a community using a token
 *     description: Allows a user to leave a specific community based on the provided token and community ID.
 *     tags:
 *       - Communities
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the community to leave
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully left the community
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique ID of the community
 *                 name:
 *                   type: string
 *                   description: The name of the community
 *                 description:
 *                   type: string
 *                   description: A brief description of the community
 *                 users:
 *                   type: array
 *                   description: A list of users in the community
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The unique ID of the user
 *                       name:
 *                         type: string
 *                         description: The name of the user
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

communityRouter.put("/leave/:id", async (req, res, next) => {
    try {
        const token = req.headers.authorization!.split(" ")[1];
        const response = await communityService.leaveCommunityByToken(token, parseInt(req.params.id));
        res.status(200).json(response);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
})

communityRouter.get("/post/:id", async (req, res, next) => {
    try {
        const postId: number = parseInt(req.params.id);
        const response = await communityService.findCommunityByPostId(postId);
        res.status(200).json(response);
    } catch (error: any) {
        console.log(error);
        next(error);
        res.status(500).json({ message: error.message });
    }
});

export default communityRouter;
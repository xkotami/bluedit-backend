import express, {response} from "express";
import userService from "../service/userService";
import {UserInput} from "../types";

const userRouter = express.Router();

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Retrieve all users
 *     description: Fetches a list of all users in the system. Requires a valid authorization token.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: A bearer token for authentication (e.g., "Bearer token").
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   points:
 *                     type: integer
 *                     description: Number of points the user has accumulated.
 *       500:
 *         description: Internal server error.
 */
userRouter.get("/", async (req, res, next) => {
    try {
        const response = await userService.getAllUsers("token");
        res.status(200).json(response);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
});

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user in the database. Requires a valid request body.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 points:
 *                   type: integer
 *                   description: Initial value of points, default is 0.
 *       400:
 *         description: Bad request. Invalid input data.
 *       500:
 *         description: Internal server error.
 */
userRouter.post("/", async (req, res, next) => {
    try {
        const input: UserInput = req.body as UserInput;
        console.log(input);
        const response = await userService.createUser(input, "token");
        res.status(201).json(response);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
});

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     description: Fetches details of a specific user from the system using their user ID. Requires an authorization token.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the user to retrieve.
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: A bearer token for authentication (e.g., "Bearer token").
 *     responses:
 *       200:
 *         description: User details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique ID of the user.
 *                 username:
 *                   type: string
 *                   description: The username of the user.
 *                 email:
 *                   type: string
 *                   description: The email of the user.
 *                 points:
 *                   type: integer
 *                   description: The current points of the user.
 *       400:
 *         description: Bad request. Invalid user ID.
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *       404:
 *         description: User not found with the given ID.
 *       500:
 *         description: Internal server error.
 */
userRouter.get("/:id", async (req, res, next) => {
    try {
        const id: number = parseInt(req.params.id);
        const response = await userService.findUserById(id, "token");
        res.status(200).json(response);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
});

export default userRouter
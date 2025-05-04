import express, {response} from "express";
import userService from "../service/userService";
import {Login, Register, UserInput} from "../types";

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

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: User login endpoint
 *     description: Endpoint for user login. Accepts user credentials and returns a token upon successful login.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for accessing protected routes.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR..."
 *       401:
 *         description: Invalid credentials or token-related error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ERROR_INVALID_TOKEN"
 *       500:
 *         description: Server error or token generation failure
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ERROR_GENERATING_TOKEN"
 */
userRouter.post("/login", async (req, res, next) => {
    try {
        const response = await userService.login(req.body as Login);
        res.status(200).json(response);
    } catch (error: any) {
        console.log(error);
        if (error.message === "ERROR_GENERATING_TOKEN") {
            res.status(500).json({message: error.message});
        } else if (error.message === "ERROR_INVALID_TOKEN") {
            res.status(401).json({message: error.message});
        } else {
            res.status(500).json({message: error.message});
        }

    }
});

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: User registration endpoint
 *     description: Endpoint for user registration. Accepts user details and creates a new user.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for the new user.
 *                 example: "johndoe"
 *               email:
 *                 type: string
 *                 description: The email address for the new user.
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 description: The password for the new user.
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique ID of the newly registered user.
 *                   example: "64c3a5e3382c9e0039b8f238"
 *       400:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ERROR_USER_ALREADY_EXISTS"
 *       500:
 *         description: Server error during registration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
userRouter.post('/register', async (req, res, next) => {
    try {
        const input: Register = req.body as Register;
        const response = await userService.register(input);
        res.status(200).json(response);
    } catch (error: any) {
        console.log(error);
        if (error.message === "ERROR_USER_ALREADY_EXISTS") {
            res.status(400).json({message: error.message});
        } else {
            res.status(500).json({message: error.message});
        }
    }
});

export default userRouter
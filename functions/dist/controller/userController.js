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
const userService_1 = __importDefault(require("../service/userService"));
const userRouter = express_1.default.Router();
/**
 * @swagger
 * /user:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve all users
 *     description: Fetches a list of all users in the system. Requires a valid authorization token.
 *     tags:
 *       - Users
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
userRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const response = yield userService_1.default.getAllUsers(token);
        res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}));
/**
 * @swagger
 * /user/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
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
userRouter.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const id = parseInt(req.params.id);
        const response = yield userService_1.default.findUserById(id, token);
        res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}));
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
userRouter.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield userService_1.default.login(req.body);
        res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        if (error.message === "ERROR_GENERATING_TOKEN") {
            res.status(500).json({ message: error.message });
        }
        else if (error.message === "ERROR_INVALID_TOKEN") {
            res.status(401).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: error.message });
        }
    }
}));
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
userRouter.post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const input = req.body;
        const response = yield userService_1.default.register(input);
        res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        if (error.message === "ERROR_USER_ALREADY_EXISTS") {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: error.message });
        }
    }
}));
exports.default = userRouter;

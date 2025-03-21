/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: Unique identifier for the user.
 *         username:
 *           type: string
 *           description: The username of the user.
 *         balance:
 *           type: number
 *           description: The user's balance.
 *         library:
 *           type: object
 *           description: The user's library object.
 *           additionalProperties: true
 *         profile:
 *           type: object
 *           description: The user's profile object.
 *           additionalProperties: true
 *         purchases:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Purchase'
 *           description: List of the user's purchases.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the user was created.
 */

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Endpoints related to user operations.
 */

import express, {NextFunction, Request, Response} from 'express';
import userService from '../service/user';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all users.
 *     tags:
 *      - Users
 *     responses:
 *       200:
 *         description: A list of all users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve a user by their ID.
 *     tags:
 *      - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: The user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 */
userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (isNaN(Number(id))) {
            return res.status(400).json({ error: 'Invalid `id` parameter' });
        }

        const user = await userService.getUserById(Number(id));
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});


/**
 * @swagger
 * /users/{username}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve a user by their username.
 *     tags:
 *      - Users
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 */
userRouter.get('/name/:username', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username } = req.params;

        if (!username || username.trim() === '') {
            return res.status(400).json({ error: 'Invalid `username` parameter' });
        }

        const user = await userService.getUserByUsername(String(username));
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

export { userRouter };

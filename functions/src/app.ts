import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import commentRouter from "./controller/commentController";
import communityRouter from "./controller/communityController";
import postRouter from "./controller/postController";
import userRouter from "./controller/userController";
import {expressjwt} from "express-jwt";

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
 app.use(
     expressjwt({
         secret: process.env.JWT_SECRET || 'default',
         algorithms: ["HS256"],
     }).unless({
         path: ['/api-docs', /^\/api-docs\/.*/, '/user/login', '/status', '/user/register']
     }))
app.use('/comment', commentRouter);
app.use('/community', communityRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Bluedit API',
            version: '1.0.0',
        },
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT" // Not required but recommended for clarity
            }
        }
    },
    apis: ['./controller/*Controller.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

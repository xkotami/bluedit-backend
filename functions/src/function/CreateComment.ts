import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import commentService from "../service/commentService";
import {CommentInput} from "../types";

export async function CreateComment(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http POST request received at "${request.url}"`);

    try {
        const authHeader = request.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return {
                status: 401,
                jsonBody: { message: "Missing or invalid Authorization header" }
            };
        }

        const token = authHeader.split(" ")[1];
        const input = await request.json() as CommentInput;
        const response = await commentService.createComment(input, token);

        return {
            status: 200,
            jsonBody: response
        };
    } catch (error: any) {
        context.log("Error creating comment:", error);
        return {
            status: 500,
            jsonBody: {
                message: error.message || "Internal Server Error"
            }
        };
    }
}

app.http('CreateComment', {
    route: "comments",
    methods: ['POST'],
    authLevel: 'anonymous', // Or 'function', or 'user'
    handler: CreateComment
});

console.log("CreateComment Azure Function registered!");

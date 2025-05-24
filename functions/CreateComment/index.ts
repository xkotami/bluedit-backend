import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import commentService from "../service/commentService";
import { CommentInput } from "../types";

const CreateComment = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log(`Http POST request received at "${req.url}"`);

    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            context.res = {
                status: 401,
                body: { message: "Missing or invalid Authorization header" }
            };
            return;
        }

        const token = authHeader.split(" ")[1];
        const input = req.body as CommentInput;
        const response = await commentService.createComment(input, token);

        context.res = {
            status: 200,
            body: response
        };
    } catch (error: any) {
        context.log("Error creating comment:", error);
        context.res = {
            status: 500,
            body: {
                message: error.message || "Internal Server Error"
            }
        };
    }
};

export default CreateComment;

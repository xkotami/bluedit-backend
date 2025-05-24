import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import postService from "../service/postService";
import { PostInput } from "../types";

export default async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            context.res = {
                status: 401,
                body: { message: "Missing or invalid Authorization header" }
            };
            return;
        }

        const token = authHeader.split(" ")[1];
        const input = req.body as PostInput;
        const response = await postService.createPost(input, token);

        context.res = {
            status: 200,
            body: response
        };
    } catch (error: any) {
        context.log("Error creating post:", error);
        context.res = {
            status: 500,
            body: {
                message: error.message || "Internal server error (post)"
            }
        };
    }
}

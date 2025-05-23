import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import commentService from "../service/commentService"; // Adjust the import path if needed

export async function GetCommentsByPost(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http GET request received at "${request.url}"`);

    try {
        const postIdParam = request.params.id;

        if (!postIdParam || isNaN(Number(postIdParam))) {
            return {
                status: 400,
                jsonBody: { message: "Invalid post ID" }
            };
        }

        const postId = parseInt(postIdParam, 10);
        const response = await commentService.getCommentsByPost(postId);

        return {
            status: 200,
            jsonBody: response
        };
    } catch (error: any) {
        context.log("Error fetching comments by post ID:", error);
        return {
            status: 500,
            jsonBody: {
                message: error.message || "Internal Server Error"
            }
        };
    }
}

app.http('GetCommentsByPost', {
    route: "comments/post/{id}",
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: GetCommentsByPost
});


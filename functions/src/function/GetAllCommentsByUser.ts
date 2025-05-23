import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import commentService from "../service/commentService"; // Adjust path if needed

export async function GetAllCommentsByUser(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http GET request received at "${request.url}"`);

    try {
        const authHeader = request.headers.get("authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return {
                status: 401,
                jsonBody: { message: "Missing or invalid Authorization header" }
            };
        }

        const token = authHeader.split(" ")[1];
        const response = await commentService.getAllCommentsByUser(token);

        return {
            status: 200,
            jsonBody: response
        };
    } catch (error: any) {
        context.log("Error fetching user comments:", error);
        return {
            status: 500,
            jsonBody: {
                message: error.message || "Internal Server Error(GetAllCommentsByUser)"
            }
        };
    }
}

app.http('GetAllCommentsByUser', {
    route: "comments",
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: GetAllCommentsByUser
});


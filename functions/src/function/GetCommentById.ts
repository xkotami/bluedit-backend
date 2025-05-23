import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import commentService from "../service/commentService";

export async function GetCommentById(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http GET request received at "${request.url}"`);

    try {
        const idParam = request.params.id;

        if (!idParam || isNaN(Number(idParam))) {
            return {
                status: 400,
                jsonBody: { message: "Invalid comment ID" }
            };
        }

        const id = parseInt(idParam, 10);
        const response = await commentService.findCommentById(id);

        return {
            status: 200,
            jsonBody: response
        };
    } catch (error: any) {
        context.log("Error fetching comment by ID:", error);
        return {
            status: 500,
            jsonBody: {
                message: error.message || "Internal Server Error"
            }
        };
    }
}

app.http('GetCommentById', {
    route: "comments/{id}",
    methods: ['GET'],
    authLevel: 'anonymous', // Or 'function' if you want to restrict access
    handler: GetCommentById
});

console.log("GetCommentById Azure Function registered!");

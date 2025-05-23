import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import postService from "../service/postService";

export async function GetAllPosts(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
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
        const response = await postService.getAllPosts(token);

        return {
            status: 200,
            jsonBody: response
        };
    } catch (error: any) {
        context.log("Error fetching posts:", error);
        return {
            status: 500,
            jsonBody: { message: error.message }
        };
    }
}

app.http('GetAllPosts', {
    route: "posts",
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: GetAllPosts
});

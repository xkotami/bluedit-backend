import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import postService from "../service/postService"; 

export async function GetPostById(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {

    try {
        const authHeader = request.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return {
                status: 401,
                jsonBody: { message: "Missing or invalid Authorization header" }
            };
        }

        const token = authHeader.split(" ")[1];

        const idParam = request.params.id;

        if (!idParam || isNaN(Number(idParam))) {
            return {
                status: 400,
                jsonBody: { message: "Invalid post ID" }
            };
        }
        const id: string = request.params.id; 
        const response = await postService.findPostById(id,token);

        return {
            status: 200,
            jsonBody: response
        };
    } catch (error: any) {
        context.log("Error fetching post by ID:", error);
        return {
            status: 500,
            jsonBody: {
                message: error.message || "Internal Server Error(post)"
            }
        };
    }
}

app.http('GetPostById', {
    route: "posts/{id}",
    methods: ['GET'],
    authLevel: 'anonymous', 
    handler: GetPostById
});


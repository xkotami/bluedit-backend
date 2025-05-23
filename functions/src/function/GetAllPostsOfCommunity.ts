import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import postService from "../service/postService"; 

export async function GetAllPostsOfCommunity(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
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

        const communityId = request.params.id;

        if (!communityId) {
            return {
                status: 400,
                jsonBody: { message: "Community ID is required" }
            };
        }

    

        const response = await postService.getAllPostsOfCommunity(communityId, token);

        return {
            status: 200,
            jsonBody: response
        };
    } catch (error: any) {
        context.log("Error fetching posts of community:", error);
        return {
            status: 500,
            jsonBody: {
                message: error.message || "Internal Server Error"
            }
        };
    }
}

app.http('GetAllPostsOfCommunity', {
    route: "post/community/{id}",
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: GetAllPostsOfCommunity
});


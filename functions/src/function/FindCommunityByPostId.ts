import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import communityService from "../service/communityService";

export async function FindCommunityByPostId(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
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
        const response = await communityService.findCommunityByPostId(postId);

        return {
            status: 200,
            jsonBody: response
        };
    } catch (error: any) {
        context.log("Error fetching community by post ID:", error);
        return {
            status: 500,
            jsonBody: {
                message: error.message || "Internal Server Error"
            }
        };
    }
}

app.http('FindCommunityByPostId', {
    route: "community/post/{id}",
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: FindCommunityByPostId
});


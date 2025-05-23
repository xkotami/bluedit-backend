import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import communityService from "../service/communityService"; // Adjust the path if needed

export async function JoinCommunityByToken(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http PUT request received at "${request.url}"`);

    try {
        const authHeader = request.headers.get("authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return {
                status: 401,
                jsonBody: { message: "Missing or invalid Authorization header" }
            };
        }

        const token = authHeader.split(" ")[1];
        const communityIdParam = request.params.id;

        if (!communityIdParam || isNaN(Number(communityIdParam))) {
            return {
                status: 400,
                jsonBody: { message: "Invalid community ID" }
            };
        }

        const communityId = parseInt(communityIdParam, 10);
        const response = await communityService.joinCommunityByToken(token, communityId);

        return {
            status: 200,
            jsonBody: response
        };
    } catch (error: any) {
        context.log("Error joining community:", error);
        return {
            status: 500,
            jsonBody: {
                message: error.message || "Internal Server Error(JoinCommunityByToken"
            }
        };
    }
}

app.http('JoinCommunityByToken', {
    route: "community/join/{id}",
    methods: ['PUT'],
    authLevel: 'anonymous',
    handler: JoinCommunityByToken
});


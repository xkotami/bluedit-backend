import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import communityService from "../service/communityService"; 

export async function getCommunitiesByTokenUserId(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
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
        const response = await communityService.getCommunitiesByTokenUserId(token);

        return {
            status: 200,
            jsonBody: response
        };
    } catch (error: any) {
        context.log("Error fetching communities for user:", error);
        return {
            status: 500,
            jsonBody: {
                message: error.message || "Internal Server Error"
            }
        };
    }
}

app.http('getCommunitiesByTokenUserId', {
    route: "community/user",
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: getCommunitiesByTokenUserId
});


import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import communityService from "../service/communityService"; 

export async function GetCommunityById(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {

    try {
        const idParam = request.params.id;

        if (!idParam || isNaN(Number(idParam))) {
            return {
                status: 400,
                jsonBody: { message: "Invalid comment ID" }
            };
        }

        const id = parseInt(idParam, 10);
        const response = await communityService.findCommunityById(id);

        return {
            status: 200,
            jsonBody: response
        };
    } catch (error: any) {
        context.log("Error fetching comment by ID:", error);
        return {
            status: 500,
            jsonBody: {
                message: error.message || "Internal Server Error(community)"
            }
        };
    }
}

app.http('GetCommunityById', {
    route: "communities/{id}",
    methods: ['GET'],
    authLevel: 'anonymous', 
    handler: GetCommunityById
});


import {app,HttpResponseInit,InvocationContext,HttpRequest} from "@azure/functions";
import userService from "../service/userService";

export async function GetUserById(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {

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
                jsonBody: { message: "Invalid user ID" }
            };
        }

        const id = parseInt(idParam, 10);
        const response = await userService.findUserById(id,token);

        return {
            status: 200,
            jsonBody: response
        };
    } catch (error: any) {
        context.log("Error fetching user by ID:", error);
        return {
            status: 500,
            jsonBody: {
                message: error.message || "Internal Server Error(user)"
            }
        };
    }
}

app.http('GetUserById', {
    route: "users/{id}",
    methods: ['GET'],
    authLevel: 'anonymous', 
    handler: GetUserById
});


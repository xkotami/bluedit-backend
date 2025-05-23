import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import userService from "../service/userService"; 
export async function GetUsers(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {

    try {
        const authHeader = request.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return {
                status: 401,
                jsonBody: { message: "Missing or invalid Authorization header" }
            };
        }

        const token = authHeader.split(" ")[1];

        const users = await userService.getAllUsers(token); 
        return {
            status: 200,
            jsonBody: users
        };
    } catch (error: any) {
        context.log("Error fetching users:", error);
        return {
            status: 500,
            jsonBody: {
                message: error.message || "Internal Server Error(users)"
            }
        };
    }
}

app.http('GetUsers', {
    route: "users",
    methods: ['GET'],
    authLevel: 'anonymous', 
    handler: GetUsers
});


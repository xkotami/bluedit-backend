import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import userService from "../service/userService"; 
import type { Login } from "../types"; 

export async function UserLogin(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http POST request received at "${request.url}"`);

    try {
        const body = await request.json() as Login;

        const response = await userService.login(body);

        return {
            status: 200,
            jsonBody: response
        };
    } catch (error: any) {
        context.log("Login error:", error);

        if (error.message === "ERROR_GENERATING_TOKEN") {
            return {
                status: 500,
                jsonBody: { message: error.message }
            };
        } else if (error.message === "ERROR_INVALID_TOKEN") {
            return {
                status: 401,
                jsonBody: { message: error.message }
            };
        } else {
            return {
                status: 500,
                jsonBody: { message: error.message }
            };
        }
    }
}

app.http('UserLogin', {
    route: "user/login",
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: UserLogin
});


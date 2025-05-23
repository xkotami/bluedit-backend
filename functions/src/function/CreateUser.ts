import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import userService from "../service/userService";
import type { Register } from "../types";

export async function UserRegister(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http POST request received at "${request.url}"`);

    try {
        const input = await request.json() as Register;
        const response = await userService.register(input);

        return {
            status: 200,
            jsonBody: response
        };
    } catch (error: any) {
        context.log("Registration error:", error);

        if (error.message === "ERROR_USER_ALREADY_EXISTS") {
            return {
                status: 400,
                jsonBody: { message: error.message }
            };
        }

        return {
            status: 500,
            jsonBody: { message: error.message }
        };
    }
}

app.http('UserRegister', {
    route: "user/register",
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: UserRegister
});

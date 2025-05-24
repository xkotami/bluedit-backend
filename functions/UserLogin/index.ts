import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import userService from "../service/userService"; 
import type { Login } from "../types"; 

const UserLogin: AzureFunction = async function (context: Context, req: HttpRequest) {
    context.log(`Http POST request received at "${req.url}"`);

    try {
        const body = req.body as Login;

        const response = await userService.login(body);

        context.res = {
            status: 200,
            body: response
        };
    } catch (error: any) {
        context.log("Login error:", error);

        if (error.message === "ERROR_GENERATING_TOKEN") {
            context.res = {
                status: 500,
                body: { message: error.message }
            };
        } else if (error.message === "ERROR_INVALID_TOKEN") {
            context.res = {
                status: 401,
                body: { message: error.message }
            };
        } else {
            context.res = {
                status: 500,
                body: { message: error.message }
            };
        }
    }
};

export default UserLogin;

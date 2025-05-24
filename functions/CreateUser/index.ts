import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import userService from "../service/userService";
import type { Register } from "../types";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log(`Http POST request received at "${req.url}"`);

    try {
        const input = req.body as Register;
        const response = await userService.register(input);

        context.res = {
            status: 200,
            body: response
        };
    } catch (error: any) {
        context.log("Registration error:", error);

        if (error.message === "ERROR_USER_ALREADY_EXISTS") {
            context.res = {
                status: 400,
                body: { message: error.message }
            };
            return;
        }

        context.res = {
            status: 500,
            body: { message: error.message }
        };
    }
};

export default httpTrigger;

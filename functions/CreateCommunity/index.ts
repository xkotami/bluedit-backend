import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import communityService from "../service/communityService";
import { CommunityInput } from "../types";

export default async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            context.res = {
                status: 401,
                body: { message: "Missing or invalid Authorization header" }
            };
            return;
        }

        const token = authHeader.split(" ")[1];
        const input = req.body as CommunityInput;
        const response = await communityService.createCommunity(input, token);

        context.res = {
            status: 200,
            body: response
        };
    } catch (error: any) {
        context.log("Error creating community:", error);
        context.res = {
            status: 500,
            body: {
                message: error.message || "Internal server error (community)"
            }
        };
    }
}

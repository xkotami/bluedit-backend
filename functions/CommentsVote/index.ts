import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import commentService from "../service/commentService"; 
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log(`Http POST request received at "${req.url}"`);

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

        const { commentId, upvote } = req.body;

        if (!commentId || typeof upvote !== "boolean") {
            context.res = {
                status: 400,
                body: { message: "Request body must include 'commentId' and 'upvote' (boolean)" }
            };
            return;
        }

        const result = await commentService.voting(commentId, upvote, token);

        context.res = {
            status: 200,
            body: { message: "Vote processed successfully", result }
        };
    } catch (error: any) {
        context.log("Error processing vote:", error);
        context.res = {
            status: 500,
            body: {
                message: error.message || "Internal Server Error (Voting)"
            }
        };
    }
};

export default httpTrigger;

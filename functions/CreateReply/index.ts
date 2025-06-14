import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import commentService from "../service/commentService";
import { ReplyInput } from "../types";

const CreateReply: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log(`Http POST request received at "${req.url}"`);

    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            context.res = {
                status: 401,
                body: { message: "Missing or invalid Authorization header" }
            };
            return;
        }

        const token = authHeader.split(" ")[1];
        const input = req.body as ReplyInput;
        const response = await commentService.createReply(input, token);

        context.res = {
            status: 200,
            body: response
        };
    } catch (error: any) {
        context.log("Error creating reply:", error);
        context.res = {
            status: 500,
            body: {
                message: error.message || "Internal Server Error"
            }
        };
    }
};

export default CreateReply;

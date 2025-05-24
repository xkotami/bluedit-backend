import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import postService from "../service/postService";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
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
    const idParam = context.bindingData.id;

    if (!idParam || isNaN(Number(idParam))) {
      context.res = {
        status: 400,
        body: { message: "Invalid post ID" }
      };
      return;
    }

    const response = await postService.findPostById(idParam, token);

    context.res = {
      status: 200,
      body: response
    };
  } catch (error: any) {
    context.log("Error fetching post by ID:", error);
    context.res = {
      status: 500,
      body: {
        message: error.message || "Internal Server Error (post)"
      }
    };
  }
};

export default httpTrigger;

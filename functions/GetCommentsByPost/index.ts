import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import commentService from "../service/commentService"; // Adjust path if needed

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log(`Http GET request received at "${req.url}"`);

  try {
    const postIdParam = req.params?.id;

    if (!postIdParam || isNaN(Number(postIdParam))) {
      context.res = {
        status: 400,
        body: { message: "Invalid post ID" }
      };
      return;
    }

    const postId = parseInt(postIdParam, 10);
    const response = await commentService.getCommentsByPost(postId);

    context.res = {
      status: 200,
      body: response
    };
  } catch (error: any) {
    context.log("Error fetching comments by post ID:", error);
    context.res = {
      status: 500,
      body: {
        message: error.message || "Internal Server Error"
      }
    };
  }
};

export default httpTrigger;

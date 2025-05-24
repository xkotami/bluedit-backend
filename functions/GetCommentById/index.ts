import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import commentService from "../service/commentService"; // Adjust path if needed

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log(`Http GET request received at "${req.url}"`);

  try {
    const idParam = req.params?.id;

    if (!idParam || isNaN(Number(idParam))) {
      context.res = {
        status: 400,
        body: { message: "Invalid comment ID" },
      };
      return;
    }

    const id = parseInt(idParam, 10);
    const response = await commentService.findCommentById(id);

    context.res = {
      status: 200,
      body: response,
    };
  } catch (error: any) {
    context.log("Error fetching comment by ID:", error);
    context.res = {
      status: 500,
      body: {
        message: error.message || "Internal Server Error",
      },
    };
  }
};

export default httpTrigger;

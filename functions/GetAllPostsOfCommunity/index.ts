import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import postService from "../service/postService"; // Adjust the path if needed

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log(`Http GET request received at "${req.url}"`);

  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      context.res = {
        status: 401,
        body: { message: "Missing or invalid Authorization header" },
      };
      return;
    }

    const token = authHeader.split(" ")[1];
    const communityId = req.params?.id;

    if (!communityId) {
      context.res = {
        status: 400,
        body: { message: "Community ID is required" },
      };
      return;
    }

    const response = await postService.getAllPostsOfCommunity(communityId, token);

    context.res = {
      status: 200,
      body: response,
    };
  } catch (error: any) {
    context.log("Error fetching posts of community:", error);
    context.res = {
      status: 500,
      body: { message: error.message || "Internal Server Error" },
    };
  }
};

export default httpTrigger;

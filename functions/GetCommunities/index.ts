import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import communityService from "../service/communityService";

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
        body: { message: "Missing or invalid Authorization header" }
      };
      return;
    }

    const token = authHeader.split(" ")[1];
    const communities = await communityService.getAllCommunities(token);

    context.res = {
      status: 200,
      body: communities
    };
  } catch (error: any) {
    context.log("Error fetching communities:", error);
    context.res = {
      status: 500,
      body: {
        message: error.message || "Internal Server Error (community)"
      }
    };
  }
};

export default httpTrigger;

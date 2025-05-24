import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import communityService from "../service/communityService";

const LeaveCommunityByToken: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log(`Http PUT request received at "${req.url}"`);

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
    const communityIdParam = req.params.id;

    if (!communityIdParam || isNaN(Number(communityIdParam))) {
      context.res = {
        status: 400,
        body: { message: "Invalid community ID" },
      };
      return;
    }

    const communityId = parseInt(communityIdParam, 10);
    const response = await communityService.leaveCommunityByToken(token, communityId);

    context.res = {
      status: 200,
      body: response,
    };
  } catch (error: any) {
    context.log.error("Error leaving community:", error);
    context.res = {
      status: 500,
      body: {
        message: error.message || "Internal Server Error",
      },
    };
  }
};

export default LeaveCommunityByToken;

import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import communityService from "../service/communityService";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const idParam = context.bindingData.id;

    if (!idParam || isNaN(Number(idParam))) {
      context.res = {
        status: 400,
        body: { message: "Invalid community ID" }
      };
      return;
    }

    const id = parseInt(idParam, 10);
    const response = await communityService.findCommunityById(id);

    context.res = {
      status: 200,
      body: response
    };
  } catch (error: any) {
    context.log("Error fetching community by ID:", error);
    context.res = {
      status: 500,
      body: {
        message: error.message || "Internal Server Error (community)"
      }
    };
  }
};

export default httpTrigger;

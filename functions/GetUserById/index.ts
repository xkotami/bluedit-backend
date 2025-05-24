import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import userService from "../service/userService";

const GetUserById: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
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
    const idParam = req.params.id;

    if (!idParam || isNaN(Number(idParam))) {
      context.res = {
        status: 400,
        body: { message: "Invalid user ID" },
      };
      return;
    }

    const id = parseInt(idParam, 10);
    const response = await userService.findUserById(id, token);

    context.res = {
      status: 200,
      body: response,
    };
  } catch (error: any) {
    context.log.error("Error fetching user by ID:", error);
    context.res = {
      status: 500,
      body: {
        message: error.message || "Internal Server Error(user)",
      },
    };
  }
};

export default GetUserById;

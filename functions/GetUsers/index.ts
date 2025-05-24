import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import userService from "../service/userService";

const GetUsers: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
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
    const users = await userService.getAllUsers(token);

    context.res = {
      status: 200,
      body: users,
    };
  } catch (error: any) {
    context.log.error("Error fetching users:", error);
    context.res = {
      status: 500,
      body: {
        message: error.message || "Internal Server Error(users)",
      },
    };
  }
};

export default GetUsers;

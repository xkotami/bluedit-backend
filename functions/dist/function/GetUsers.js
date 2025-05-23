"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUsers = GetUsers;
const functions_1 = require("@azure/functions");
const userService_1 = __importDefault(require("../service/userService"));
function GetUsers(request, context) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authHeader = request.headers.get("authorization");
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return {
                    status: 401,
                    jsonBody: { message: "Missing or invalid Authorization header" }
                };
            }
            const token = authHeader.split(" ")[1];
            const users = yield userService_1.default.getAllUsers(token);
            return {
                status: 200,
                jsonBody: users
            };
        }
        catch (error) {
            context.log("Error fetching users:", error);
            return {
                status: 500,
                jsonBody: {
                    message: error.message || "Internal Server Error(users)"
                }
            };
        }
    });
}
functions_1.app.http('GetUsers', {
    route: "users",
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: GetUsers
});

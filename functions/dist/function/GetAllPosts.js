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
exports.GetAllPosts = GetAllPosts;
const functions_1 = require("@azure/functions");
const postService_1 = __importDefault(require("../service/postService"));
function GetAllPosts(request, context) {
    return __awaiter(this, void 0, void 0, function* () {
        context.log(`Http GET request received at "${request.url}"`);
        try {
            const authHeader = request.headers.get("authorization");
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return {
                    status: 401,
                    jsonBody: { message: "Missing or invalid Authorization header" }
                };
            }
            const token = authHeader.split(" ")[1];
            const response = yield postService_1.default.getAllPosts(token);
            return {
                status: 200,
                jsonBody: response
            };
        }
        catch (error) {
            context.log("Error fetching posts:", error);
            return {
                status: 500,
                jsonBody: { message: error.message }
            };
        }
    });
}
functions_1.app.http('GetAllPosts', {
    route: "posts",
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: GetAllPosts
});

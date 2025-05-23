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
exports.CreateComment = CreateComment;
const functions_1 = require("@azure/functions");
const commentService_1 = __importDefault(require("../service/commentService"));
function CreateComment(request, context) {
    return __awaiter(this, void 0, void 0, function* () {
        context.log(`Http POST request received at "${request.url}"`);
        try {
            const authHeader = request.headers.get("authorization");
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return {
                    status: 401,
                    jsonBody: { message: "Missing or invalid Authorization header" }
                };
            }
            const token = authHeader.split(" ")[1];
            const input = yield request.json();
            const response = yield commentService_1.default.createComment(input, token);
            return {
                status: 200,
                jsonBody: response
            };
        }
        catch (error) {
            context.log("Error creating comment:", error);
            return {
                status: 500,
                jsonBody: {
                    message: error.message || "Internal Server Error"
                }
            };
        }
    });
}
functions_1.app.http('CreateComment', {
    route: "comments",
    methods: ['POST'],
    authLevel: 'anonymous', // Or 'function', or 'user'
    handler: CreateComment
});
console.log("CreateComment Azure Function registered!");

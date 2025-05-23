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
exports.GetCommentsByPost = GetCommentsByPost;
const functions_1 = require("@azure/functions");
const commentService_1 = __importDefault(require("../service/commentService")); // Adjust the import path if needed
function GetCommentsByPost(request, context) {
    return __awaiter(this, void 0, void 0, function* () {
        context.log(`Http GET request received at "${request.url}"`);
        try {
            const postIdParam = request.params.id;
            if (!postIdParam || isNaN(Number(postIdParam))) {
                return {
                    status: 400,
                    jsonBody: { message: "Invalid post ID" }
                };
            }
            const postId = parseInt(postIdParam, 10);
            const response = yield commentService_1.default.getCommentsByPost(postId);
            return {
                status: 200,
                jsonBody: response
            };
        }
        catch (error) {
            context.log("Error fetching comments by post ID:", error);
            return {
                status: 500,
                jsonBody: {
                    message: error.message || "Internal Server Error"
                }
            };
        }
    });
}
functions_1.app.http('GetCommentsByPost', {
    route: "comments/post/{id}",
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: GetCommentsByPost
});

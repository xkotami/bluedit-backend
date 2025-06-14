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
const commentService_1 = __importDefault(require("../service/commentService")); // Adjust path if needed
const httpTrigger = function (context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        context.log(`Http GET request received at "${req.url}"`);
        try {
            const postIdParam = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
            if (!postIdParam || isNaN(Number(postIdParam))) {
                context.res = {
                    status: 400,
                    body: { message: "Invalid post ID" }
                };
                return;
            }
            const postId = parseInt(postIdParam, 10);
            const response = yield commentService_1.default.getCommentsByPost(postId);
            context.res = {
                status: 200,
                body: response
            };
        }
        catch (error) {
            context.log("Error fetching comments by post ID:", error);
            context.res = {
                status: 500,
                body: {
                    message: error.message || "Internal Server Error"
                }
            };
        }
    });
};
exports.default = httpTrigger;

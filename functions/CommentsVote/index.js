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
const commentService_1 = __importDefault(require("../service/commentService"));
const httpTrigger = function (context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        context.log(`Http POST request received at "${req.url}"`);
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
            const { commentId, upvote } = req.body;
            if (!commentId || typeof upvote !== "boolean") {
                context.res = {
                    status: 400,
                    body: { message: "Request body must include 'commentId' and 'upvote' (boolean)" }
                };
                return;
            }
            const result = yield commentService_1.default.voting(commentId, upvote, token);
            context.res = {
                status: 200,
                body: { message: "Vote processed successfully", result }
            };
        }
        catch (error) {
            context.log("Error processing vote:", error);
            context.res = {
                status: 500,
                body: {
                    message: error.message || "Internal Server Error (Voting)"
                }
            };
        }
    });
};
exports.default = httpTrigger;

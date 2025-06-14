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
const postService_1 = __importDefault(require("../service/postService")); // Adjust the path if needed
const httpTrigger = function (context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        context.log(`Http GET request received at "${req.url}"`);
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
            const communityId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
            if (!communityId) {
                context.res = {
                    status: 400,
                    body: { message: "Community ID is required" },
                };
                return;
            }
            const response = yield postService_1.default.getAllPostsOfCommunity(communityId, token);
            context.res = {
                status: 200,
                body: response,
            };
        }
        catch (error) {
            context.log("Error fetching posts of community:", error);
            context.res = {
                status: 500,
                body: { message: error.message || "Internal Server Error" },
            };
        }
    });
};
exports.default = httpTrigger;

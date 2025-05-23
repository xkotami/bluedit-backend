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
exports.LeaveCommunityByToken = LeaveCommunityByToken;
const functions_1 = require("@azure/functions");
const communityService_1 = __importDefault(require("../service/communityService")); // Adjust the path if needed
function LeaveCommunityByToken(request, context) {
    return __awaiter(this, void 0, void 0, function* () {
        context.log(`Http PUT request received at "${request.url}"`);
        try {
            const authHeader = request.headers.get("authorization");
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return {
                    status: 401,
                    jsonBody: { message: "Missing or invalid Authorization header" }
                };
            }
            const token = authHeader.split(" ")[1];
            const communityIdParam = request.params.id;
            if (!communityIdParam || isNaN(Number(communityIdParam))) {
                return {
                    status: 400,
                    jsonBody: { message: "Invalid community ID" }
                };
            }
            const communityId = parseInt(communityIdParam, 10);
            const response = yield communityService_1.default.leaveCommunityByToken(token, communityId);
            return {
                status: 200,
                jsonBody: response
            };
        }
        catch (error) {
            context.log("Error leaving community:", error);
            return {
                status: 500,
                jsonBody: {
                    message: error.message || "Internal Server Error"
                }
            };
        }
    });
}
functions_1.app.http('LeaveCommunityByToken', {
    route: "community/leave/{id}",
    methods: ['PUT'],
    authLevel: 'anonymous',
    handler: LeaveCommunityByToken
});

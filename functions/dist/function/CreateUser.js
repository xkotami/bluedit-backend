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
exports.UserRegister = UserRegister;
const functions_1 = require("@azure/functions");
const userService_1 = __importDefault(require("../service/userService"));
function UserRegister(request, context) {
    return __awaiter(this, void 0, void 0, function* () {
        context.log(`Http POST request received at "${request.url}"`);
        try {
            const input = yield request.json();
            const response = yield userService_1.default.register(input);
            return {
                status: 200,
                jsonBody: response
            };
        }
        catch (error) {
            context.log("Registration error:", error);
            if (error.message === "ERROR_USER_ALREADY_EXISTS") {
                return {
                    status: 400,
                    jsonBody: { message: error.message }
                };
            }
            return {
                status: 500,
                jsonBody: { message: error.message }
            };
        }
    });
}
functions_1.app.http('UserRegister', {
    route: "user/register",
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: UserRegister
});

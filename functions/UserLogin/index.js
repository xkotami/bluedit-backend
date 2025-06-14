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
const userService_1 = __importDefault(require("../service/userService"));
const UserLogin = function (context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        context.log(`Http POST request received at "${req.url}"`);
        try {
            const body = req.body;
            const response = yield userService_1.default.login(body);
            context.res = {
                status: 200,
                body: response
            };
        }
        catch (error) {
            context.log("Login error:", error);
            if (error.message === "ERROR_GENERATING_TOKEN") {
                context.res = {
                    status: 500,
                    body: { message: error.message }
                };
            }
            else if (error.message === "ERROR_INVALID_TOKEN") {
                context.res = {
                    status: 401,
                    body: { message: error.message }
                };
            }
            else {
                context.res = {
                    status: 500,
                    body: { message: error.message }
                };
            }
        }
    });
};
exports.default = UserLogin;

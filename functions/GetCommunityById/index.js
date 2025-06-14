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
const communityService_1 = __importDefault(require("../service/communityService"));
const httpTrigger = function (context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const idParam = context.bindingData.id;
            if (!idParam || isNaN(Number(idParam))) {
                context.res = {
                    status: 400,
                    body: { message: "Invalid community ID" }
                };
                return;
            }
            const id = parseInt(idParam, 10);
            const response = yield communityService_1.default.findCommunityById(id);
            context.res = {
                status: 200,
                body: response
            };
        }
        catch (error) {
            context.log("Error fetching community by ID:", error);
            context.res = {
                status: 500,
                body: {
                    message: error.message || "Internal Server Error (community)"
                }
            };
        }
    });
};
exports.default = httpTrigger;

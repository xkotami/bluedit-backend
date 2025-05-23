"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJwtToken = ({ email, userId }) => {
    const options = { expiresIn: "1h", issuer: 'bluedit-company' };
    try {
        return jsonwebtoken_1.default.sign({ email, userId }, process.env.JWT_SECRET, options);
    }
    catch (error) {
        console.log(error);
        throw new Error("ERROR_GENERATING_TOKEN");
    }
};
const validateToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    }
    catch (error) {
        console.log(error);
        throw new Error("ERROR_INVALID_TOKEN");
    }
};
exports.default = {
    generateJwtToken,
    validateToken
};

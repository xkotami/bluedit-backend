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
const userRepository_1 = __importDefault(require("../repository/userRepository"));
const jwt_1 = __importDefault(require("../util/jwt"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const getAllUsers = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        jwt_1.default.validateToken(token);
        return yield userRepository_1.default.getAllUsers();
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const createUser = (input, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield userRepository_1.default.createUser(input);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const findUserById = (id, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield userRepository_1.default.getUserById(id);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const register = (input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userRepository_1.default.getUserByEmail(input.email);
        if (user) {
            throw new Error("ERROR_USER_EXISTS");
        }
        const hashedPassword = yield bcrypt_1.default.hash(input.password, 10);
        // create with hashed password
        const repoInput = { username: input.username, email: input.email, password: hashedPassword };
        return userRepository_1.default.register(repoInput);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const login = (input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // lookup the user if it exists
        const user = yield userRepository_1.default.getUserByEmail(input.email);
        if (!user)
            throw new Error("ERROR_USER_NOT_FOUND");
        // compare passwords
        if (!(yield bcrypt_1.default.compare(input.password, user.password)))
            throw new Error("ERROR_INVALID_CREDENTIALS");
        // generate access token
        const token = jwt_1.default.generateJwtToken({ email: user.email, userId: user.id });
        return {
            token: token,
            email: user.email,
            id: user.id,
        };
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.default = {
    getAllUsers,
    createUser,
    findUserById,
    login,
    register
};

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
const database_1 = __importDefault(require("./database"));
const user_1 = require("../model/user");
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield database_1.default.user.findMany({});
        return users.map(user => user_1.User.from(user));
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const createUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield database_1.default.user.create({
            data: {
                username: input.username,
                email: input.email,
                password: input.password,
                points: 0
            },
        });
        return user_1.User.from(user);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield database_1.default.user.findUnique({
            where: {
                id: id
            }
        });
        if (user) {
            return user_1.User.from(user);
        }
        else {
            throw new Error('ERROR_USER_NOT_FOUND');
        }
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield database_1.default.user.findUnique({
            where: {
                email: email
            }
        });
        if (user) {
            return user_1.User.from(user);
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const getUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield database_1.default.user.findUnique({
            where: {
                username: username
            }
        });
        if (user) {
            return user_1.User.from(user);
        }
        else {
            throw new Error('ERROR_USER_NOT_FOUND');
        }
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const register = (input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield database_1.default.user.create({
            data: {
                email: input.email,
                username: input.username,
                password: input.password,
                points: 0
            }
        });
        return user_1.User.from(user);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.default = {
    getAllUsers,
    createUser,
    getUserById,
    getUserByEmail,
    register,
    getUserByUsername
};

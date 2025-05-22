import userDb from '../repository/userRepository';
import {Login, Register, UserInput} from "../types";
import jwt from "../util/jwt";
import bcrypt from "bcrypt";


const getAllUsers = async (token: string) => {
    try {
        jwt.validateToken(token);
        return await userDb.getAllUsers();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const createUser = async (input: UserInput, token: string) => {
    try {
        return await userDb.createUser(input);
    } catch(error) {
        console.log(error);
        throw error;
    }
}

const findUserById = async (id: number, token: string) => {
    try {
        return await userDb.getUserById(id);
    } catch(error) {
        console.log(error);
        throw error;
    }
}

const register = async (input: Register) => {
    try {
        const user = await userDb.getUserByEmail(input.email);
        const user2 = await userDb.getUserByUsername(input.username);
        if (user || user2) {
            throw new Error("ERROR_USER_EXISTS")
        }
        const hashedPassword = await bcrypt.hash(input.password, 10);

        // create with hashed password
        const repoInput: Register = {username: input.username, email: input.email, password: hashedPassword};
        const newUser = await userDb.register(repoInput);

        // generate access token
        const token = jwt.generateJwtToken({email: newUser.email, userId: newUser.id})

        return {
            token: token,
            email: newUser.email,
            id: newUser.id,
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const login = async (input: Login) => {
    try {
        // lookup the user if it exists
        const user = await userDb.getUserByEmail(input.email)
        if (!user) throw new Error("ERROR_USER_NOT_FOUND");

        // compare passwords
        if (!await bcrypt.compare(input.password, user.password)) throw new Error("ERROR_INVALID_CREDENTIALS");

        // generate access token
        const token = jwt.generateJwtToken({email: user.email, userId: user.id})

        return {
            token: token,
            email: user.email,
            id: user.id,
        }

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {
    getAllUsers,
    createUser,
    findUserById,
    login,
    register
}
import userDb from '../repository/userRepository';
import {UserInput} from "../types";

const getAllUsers = async (token: string) => {
    try {
        return await userDb.getAllUsers()
    } catch (error) {
        console.log(error);
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

export default {
    getAllUsers,
    createUser,
    findUserById,
}
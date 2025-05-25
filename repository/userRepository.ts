import database from "./database";
import {User} from "../model/user";
import {Login, Register, UserInput} from "../types";

const getAllUsers = async () => {
    try {
        const users = await database.user.findMany({})
        return users.map(user => User.from(user))
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const createUser = async (input: UserInput) => {
    try {
        const user = await database.user.create({
            data: {
                username: input.username,
                email: input.email,
                password: input.password,
                points: 0
            },

        })
        return User.from(user);
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const getUserById = async (id: number) => {
    try {
        const user = await database.user.findUnique({
            where: {
                id: id
            }
        })
        if (user) {
            return User.from(user)
        } else {
            throw new Error('ERROR_USER_NOT_FOUND');
        }
    } catch(error) {
        console.log(error);
        throw error;
    }
}

const getUserByEmail = async (email: string) => {
    try {
        const user = await database.user.findUnique({
            where: {
                email: email
            }
        })
        if (user) {
            return User.from(user)
        } else {
            return null;
        }
    } catch(error) {
        console.log(error);
        throw error;
    }
}

const getUserByUsername = async (username: string) => {
    try {
        const user = await database.user.findUnique({
            where: {
                username: username
            }
        })
        if (user) {
            return User.from(user)
        } else {
            return null;
        }
    } catch(error) {
        console.log(error);
        throw error;
    }
}

const register = async (input: Register) => {
    try {
        const user = await database.user.create({
            data: {
                email: input.email,
                username: input.username,
                password: input.password,
                points: 0
            }
        })
        return User.from(user);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const addPoints = async (id: number) => {
    try {
        const user = await database.user.update({
            where: {
                id: id
            },
            data: {
                points: {
                    increment: 1
                }
            }
        })
        return User.from(user);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const removePoints = async (id: number) => {
    try {
        const user = await database.user.update({
            where: {
                id: id
            },
            data: {
                points: {
                    increment: -1
                }
            }
        })
        return User.from(user);
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export default {
    getAllUsers,
    createUser,
    getUserById,
    getUserByEmail,
    register,
    getUserByUsername,
    addPoints,
    removePoints,
}
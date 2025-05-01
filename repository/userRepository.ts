import database from "./database";
import {User} from "../model/user";
import {UserInput} from "../types";

const getAllUsers = async () => {
    const users = await database.user.findMany({

    })
    return users.map(user => User.from(user))
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
export default {
    getAllUsers,
    createUser,
    getUserById,
}
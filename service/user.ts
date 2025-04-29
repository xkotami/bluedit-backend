import {User} from '../model/user';
import userDb from '../repository/user.db';

const getAllUsers = async (): Promise<User[]> => await userDb.getAllUsers();

const getUserById = (id: number): Promise<User | null> => {
    if (userDb.getUserById(id) === null) {
        throw new Error(`User with id ${id} not found`);
    }
    return userDb.getUserById(id)!;
};

const getUserByUsername = (username: string): Promise<User | null> => {
    if (userDb.getUserByUsername(username) === null) {
        throw new Error(`User with username ${username} not found`);
    }
    return userDb.getUserByUsername(username)!;
};

export default {
    getAllUsers,
    getUserById,
    getUserByUsername,
};

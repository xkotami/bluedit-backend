import {User} from '../model/user';
import database from './database';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const mapUser = (userData: any): User => {
    return new User({
        id: userData.id,
        username: userData.username,
        password: userData.password,
        profile_pic: userData.profile_pic,
        email: userData.email,
        reputation: userData.reputation
    });
};

const getAllUsers = async (): Promise<User[]> => {
    const usersData = await database.user.findMany();
    return usersData.map(mapUser);
};

const getUserById = async (id: number): Promise<User | null> => {
    const userData = await database.user.findUnique({
        where: { id }
    });
    return userData ? mapUser(userData) : null;
};

const getUserByUsername = async (username: string): Promise<User | null> => {
    const userData = await database.user.findUnique({
        where: { username }
    });
    return userData ? mapUser(userData) : null;
}

const newUser = async (user: User) => {
    const { username, password, profile_pic, email, reputation } = user;

    await database.user.create({
        data: {
            username,
            password,
            profile_pic,
            email,
            reputation
        }
    });
};

export default {
    getUserById,
    getAllUsers,
    getUserByUsername,
    newUser,
};

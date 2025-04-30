import database from "./database";
import {User} from "../model/user";

const getAllUsers = async () => {
    const users = await database.user.findMany({

    })
    return users.map(user => User.from(user))
}

export default {
    getAllUsers
}
import jwt from "jsonwebtoken";
import {JWTPayload} from "../types";

const generateJwtToken = ({email, userId}: JWTPayload): string => {
    const options = {expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'bluedit-company'}

    try {
        return jwt.sign({email, userId}, process.env.JWT_SECRET as string, options);
    } catch(error) {
        console.log(error);
        throw new Error("ERROR_GENERATING_TOKEN")
    }
}

const validateToken = (token: string) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;
    } catch(error) {
        console.log(error);
        throw new Error("ERROR_INVALID_TOKEN");
    }
}



export default {
    generateJwtToken,
    validateToken
}
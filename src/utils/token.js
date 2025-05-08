import jwt from "jsonwebtoken";
const { sign } = jwt;


export const generateToken = (data) => {
    const token = sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
    return token;
};
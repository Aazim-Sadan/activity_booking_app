import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateToken } from "../utils/token.js";

const registerUser = async (req, res) => {

    const { name, email, phone_number, password } = req.body;

    if (!name || !email || !phone_number || !password) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ phone_number }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    const user = await User.create({
        name,
        email,
        phone_number,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
}

const loginUser = async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {
        throw new ApiError(400, "email or paswword is required")
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const token = generateToken({ _id: user._id, email });

    const loggedInUser = await User.findById(user._id).select("-password")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("token", token, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, token
                },
                "User logged In Successfully"
            )
        )
}


const getAllUser = async (req, res) => {

    try {

        const user = req.user;
        console.log(user);


        const fetchUsersByName = await User.find()

        const fetchAllUsers = await User.find(
            { $or: [{ email: user.email }] }
        ).select(' -password')

        console.log(fetchAllUsers)

        if (!fetchAllUsers) {
            throw ApiError(404, "No user found")
        }

        return res.status(200)
            .json(
                new ApiResponse(200, fetchAllUsers, "User fetched Successfully")
            )


    } catch (error) {
        new ApiResponse(
            404,
            {
                message: 'User not found'
            },
        )
    }

}

export {
    registerUser,
    loginUser,
    getAllUser
}



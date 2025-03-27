import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false,
            });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: "User already exists with this email.",
                success: false,
            });
        }

        const file = req.file;
        let profilePhoto = "";
        if (file) {
            try {
                const fileUri = getDataUri(file);
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
                profilePhoto = cloudResponse.secure_url;
            } catch (error) {
                return res.status(500).json({
                    message: "Failed to upload profile photo.",
                    success: false,
                    error: error.message,
                });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: { profilePhoto },
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
            error: error.message,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false,
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        if (role !== user.role) {
            return res.status(400).json({
                message: "Role mismatch. Please check your role.",
                success: false,
            });
        }

        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });

        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "strict",
            })
            .json({
                message: `Welcome back, ${user.fullname}`,
                user: {
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    role: user.role,
                    profile: user.profile,
                },
                success: true,
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
            error: error.message,
        });
    }
};

export const logout = async (req, res) => {
    try {
        return res
            .status(200)
            .cookie("token", "", { maxAge: 0 })
            .json({
                message: "Logged out successfully.",
                success: true,
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
            error: error.message,
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const userId = req.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false,
            });
        }

        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skills.split(",");

        if (req.file) {
            try {
                const fileUri = getDataUri(req.file);
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
                user.profile.resume = cloudResponse.secure_url;
                user.profile.resumeOriginalName = req.file.originalname;
            } catch (error) {
                return res.status(500).json({
                    message: "Failed to upload file.",
                    success: false,
                    error: error.message,
                });
            }
        }

        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
            error: error.message,
        });
    }
};
// New function to update the profile photo
export const updateProfilePhoto = async (req, res) => {
    try {
        const userId = req.id;  // Assuming user ID is stored in req.id (JWT)
        const file = req.file;

        if (!file) {
            return res.status(400).json({
                message: "No file provided for profile photo update.",
                success: false,
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false,
            });
        }

        try {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            user.profile.profilePhoto = cloudResponse.secure_url;  // Update profile photo URL
        } catch (error) {
            return res.status(500).json({
                message: "Failed to upload profile photo.",
                success: false,
                error: error.message,
            });
        }

        await user.save();

        return res.status(200).json({
            message: "Profile photo updated successfully.",
            user,
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
            error: error.message,
        });
    }
};

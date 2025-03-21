import type { Request, Response } from "express";

import User from "../models/user.model";

export const signup = async (req: Request, res: Response): Promise<void> => {
	try {
		const { firstName, lastName, email, password, role } = req.body;

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			res.status(400).json({
				message: "User already exists with this email",
			});
			return;
		}

		const newUser = new User({
			firstName,
			lastName,
			email,
			password,
			role: role || "customer",
		});

		await newUser.save();

		const userResponse = newUser.toObject();
		delete (userResponse as Record<string, any>).password;

		res.status(201).json({
			message: "User created successfully",
			user: userResponse,
		});
	} catch (error: any) {
		console.error("Signup error:", error);
		res.status(500).json({
			message: "Error creating user",
			error: error.message,
		});
	}
};

export const getAllUsers = async (
	_req: Request,
	res: Response
): Promise<void> => {
	try {
		const users = await User.find().select("-password");
		res.status(200).json({ users });
	} catch (error: any) {
		res.status(500).json({
			message: "Error retrieving users",
			error: error.message,
		});
	}
};

import bcrypt from "bcrypt";

import type { NextFunction, Request, Response } from "express";

declare global {
	namespace Express {
		interface Request {
			hashedPassword?: string;
		}
	}
}

export const hashPassword = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { password } = req.body;

		if (password) {
			const salt = await bcrypt.genSalt(10);

			const hashedPassword = await bcrypt.hash(password, salt);

			req.hashedPassword = hashedPassword;
			req.body.password = hashedPassword;
		}

		next();
	} catch (error) {
		console.error("Password hashing error:", error);
		res.status(500).json({ message: "Error processing password" });
	}
};

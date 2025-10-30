"use server";

import connectDB from "@/lib/database";
import { signupSchema, SignupType } from "@/lib/types";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { createInitialData } from "./createInitialData";

export async function createUser(data: SignupType) {
  try {
    await connectDB();

    const validData = signupSchema.safeParse(data);
    if (!validData.success) {
      throw new Error(validData.error.issues[0].message);
    }
    const hashedPassword = await bcrypt.hash(validData.data.password, 10);

    const newUser = new User({
      fullName: validData.data.fullName,
      email: validData.data.email,
      password: hashedPassword,
    });
    await newUser.save();
    await createInitialData(newUser._id);
    return {
      success: true,
      message: "Your account has been created successfully.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "It looks like you already have an account.",
    };
  }
}

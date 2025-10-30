"use server";

import connectDB from "@/lib/database";
import { loginSchema, LoginType } from "@/lib/types";
import { signIn } from "@/lib/auth";
export async function credentialLogin(data: LoginType) {
  try {
    await connectDB();
    const validData = loginSchema.safeParse(data);
    if (!validData.success) {
      throw new Error(validData.error.issues[0].message);
    }
    await signIn("credentials", {
      redirect: false,
      email: validData.data.email,
      password: validData.data.password,
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Invalid email or password" };
  }
}

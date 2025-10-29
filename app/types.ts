import z from "zod";

// ************* LOGIN *************
export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});
export type LoginType = z.infer<typeof loginSchema>;

// ************* SIGN UP *************
export const signupSchema = z.object({
  email: z.email().trim(),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
  fullName: z.string().trim().min(3, "Full name must be at least 3 characters"),
});

export type SignupType = z.infer<typeof signupSchema>;

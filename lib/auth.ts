import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDB from "./database";
import Google from "next-auth/providers/google";
import { createInitialData } from "@/app/auth/_actions/createInitialData";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        await connectDB();
        const existingUser = await User.findOne({ email: credentials.email });
        if (!existingUser) {
          throw new Error("Invalid credentials");
        } else {
          const isCorrectPassword = await bcrypt.compare(
            credentials.password as string,
            existingUser.password as string
          );
          if (!isCorrectPassword) {
            throw new Error("Invalid credentials");
          } else {
            return {
              id: existingUser._id.toString(),
              email: existingUser.email,
            };
          }
        }
      },
    }),
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    session: ({ session, token }) => {
      session.user.id = token.id as string;
      return session;
    },

    // Google sign in
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await connectDB();
        const existingUser = await User.findOne({
          email: user.email,
        });

        if (!existingUser) {
          const newUser = new User({
            fullName: user.name,
            email: user.email,
            provider: "google",
          });
          await newUser.save();
          await createInitialData(newUser._id);

          user.id = newUser._id.toString();
        } else {
          user.id = existingUser._id.toString();
        }
      }
      return true;
    },
  },
});

/* eslint-disable  @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "../services/authService"; // Adjust the import path as necessary

declare module "next-auth" {
    interface Session {
        accessToken: string;
        new: boolean;
        user: {
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string;
        new: boolean;
    }
}

export const authOptions: NextAuthOptions = {
    secret: process.env.SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }
                try {
                    const user = await login(credentials.email, credentials.password); // Adjust as necessary
                    if (user) {
                        return {
                            accessToken: user.access_token,
                            new: user.new, // Assuming your API returns 'new'
                            ...user.user // Include user details if available
                        };
                    }
                    return null;
                } catch (error) {
                    console.error("Authorization error:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.accessToken = user.accessToken;
                token.new = user.new;
            }
            return token;
        },
        async session({ session, token }: any) {
            session.accessToken = token.accessToken;
            session.new = token.new;
            return session;
        },
    },
}
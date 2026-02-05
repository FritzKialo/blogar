import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { db } from "@/lib/db"
import { z } from "zod";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await db.user.findUnique({ where: { email } });
                    if (!user) return null;

                    const passwordsMatch = await compare(password, user.password);
                    if (passwordsMatch) return user;
                }

                return null;
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                // @ts-expect-error - role is added by our schema
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.id) {
                session.user.id = token.id as string;
                // @ts-expect-error - role is added by our schema
                session.user.role = token.role as string;
            }
            return session;
        },
    },
})

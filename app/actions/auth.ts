"use server"

import { z } from "zod";
import { db } from "@/lib/db";
import { hash } from "bcryptjs";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

const RegisterSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function registerUser(prevState: any, formData: FormData) {
    const validatedFields = RegisterSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    }

    const { name, email, password } = validatedFields.data;

    // Check if user exists
    const existingUser = await db.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return { error: "Email already in use" };
    }

    const hashedPassword = await hash(password, 10);

    const userCount = await db.user.count();
    const role = userCount === 0 ? "ADMIN" : "USER";

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role,
        },
    });

    return { success: "Account created! Redirecting..." };
}

export async function authenticate(prevState: string | undefined, formData: FormData) {
    try {
        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials.";
                default:
                    return "Something went wrong.";
            }
        }
        throw error;
    }
}

export async function logout() {
    await signOut();
}

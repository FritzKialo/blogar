"use server"

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { z } from "zod";

const ArticleSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(10, "Content must be at least 10 characters"),
});

export async function createArticle(prevState: any, formData: FormData) {
    const session = await auth();
    // @ts-expect-error - role is properly typed in our auth config but ts doesn't know here yet
    if (session?.user?.role !== "ADMIN") {
        return { error: "Only admins can post articles." };
    }

    const validatedFields = ArticleSchema.safeParse({
        title: formData.get("title"),
        content: formData.get("content"),
    });

    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    }

    const { title, content } = validatedFields.data;

    // Generate slug from title
    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") + "-" + Date.now();

    try {
        await db.article.create({
            data: {
                title,
                content,
                slug,
                authorId: session.user.id,
                published: true,
            },
        });
    } catch (error) {
        console.error("Failed to create article:", error);
        return { error: "Failed to create article." };
    }

    redirect("/");
}

export async function addComment(prevState: any, formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Must be logged in" };

    const content = formData.get("content") as string;
    const articleId = formData.get("articleId") as string;

    if (!content || !articleId) return { error: "Missing fields" };

    try {
        await db.comment.create({
            data: {
                content,
                articleId,
                authorId: session.user.id,
            },
        });
        // Revalidate path would be good here, but for now we rely on page refresh or client update
        return { success: "Comment added" };
    } catch (e) {
        return { error: "Failed to add comment" };
    }
}

export async function toggleLike(articleId: string) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Must be logged in" };

    const userId = session.user.id;

    const existingLike = await db.like.findUnique({
        where: {
            articleId_userId: {
                articleId,
                userId,
            },
        },
    });

    if (existingLike) {
        await db.like.delete({
            where: { id: existingLike.id },
        });
        return { liked: false };
    } else {
        await db.like.create({
            data: {
                articleId,
                userId,
            },
        });
        return { liked: true };
    }
}

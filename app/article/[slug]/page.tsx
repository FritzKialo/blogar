import { db } from "@/lib/db";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { LikeButton, CommentSection } from "@/components/interactions";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const session = await auth();
    const { slug } = await params;

    const article = await db.article.findUnique({
        where: { slug },
        include: {
            author: true,
            comments: {
                include: { author: true },
                orderBy: { createdAt: "desc" },
            },
            likes: true,
        },
    });

    if (!article) {
        notFound();
    }

    const userId = session?.user?.id;
    const isLiked = userId ? article.likes.some((like: any) => like.userId === userId) : false;
    
    return (
        <div className="container mt-5 pt-5 pb-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="post-single-wrapper">
                        <h1 className="title mb-4">{article.title}</h1>
                        <div className="post-meta mb-4">
                            <span className="mr-3">By <strong>{article.author.name}</strong></span>
                            <span className="text-muted">{new Date(article.createdAt).toLocaleDateString()}</span>
                        </div>

                        <div className="post-content border-bottom pb-4 mb-4">
                            <p style={{ whiteSpace: 'pre-wrap' }}>{article.content}</p>
                        </div>

                        <div className="d-flex align-items-center justify-content-between mb-5">
                            <LikeButton articleId={article.id} initialLikes={article.likes.length} initialLiked={isLiked} />
                            {/* Share buttons could go here */}
                        </div>

                        <CommentSection articleId={article.id} comments={article.comments} userId={userId} />
                    </div>
                </div>
            </div>
        </div>
    );
}

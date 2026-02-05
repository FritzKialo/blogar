"use client"

import { useActionState, useState } from "react";
import { addComment, toggleLike } from "@/app/actions/article";
import { useRouter } from "next/navigation";

export function LikeButton({ articleId, initialLikes, initialLiked }: { articleId: string, initialLikes: number, initialLiked: boolean }) {
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(initialLiked);
    const router = useRouter();

    const handleLike = async () => {
        // Optimistic update
        setLiked(!liked);
        setLikes(prev => liked ? prev - 1 : prev + 1);

        const result = await toggleLike(articleId);
        if (result?.error) {
            // Revert on error (e.g. not logged in)
            setLiked(initialLiked);
            setLikes(initialLikes);
            router.push("/login");
        }
    };

    return (
        <button className={`btn ${liked ? 'btn-primary' : 'btn-outline-primary'} btn-sm`} onClick={handleLike}>
            <i className="far fa-thumbs-up mr-2"></i> {likes} {likes === 1 ? 'Like' : 'Likes'}
        </button>
    );
}

export function CommentSection({ articleId, comments, userId }: { articleId: string, comments: any[], userId?: string }) {
    const [state, action, isPending] = useActionState(addComment, undefined);

    return (
        <div className="mt-5">
            <h3>Comments ({comments.length})</h3>
            <div className="comment-list mt-4">
                {comments.map((comment: any) => (
                    <div key={comment.id} className="media mb-4 p-3 border rounded">
                        <div className="media-body">
                            <h5 className="mt-0">{comment.author.name} <small className="text-muted ml-2">{new Date(comment.createdAt).toLocaleDateString()}</small></h5>
                            {comment.content}
                        </div>
                    </div>
                ))}
            </div>

            <div className="comment-form mt-4">
                <h4>Leave a Comment</h4>
                {userId ? (
                    <form action={action}>
                        <input type="hidden" name="articleId" value={articleId} />
                        <div className="form-group">
                            <textarea name="content" className="form-control" rows={3} required placeholder="Write your comment..."></textarea>
                        </div>
                        {state?.error && <p className="text-danger">{state.error}</p>}
                        {state?.success && <p className="text-success">Comment posted! Refresh to see.</p>}
                        <button type="submit" className="btn btn-primary" disabled={isPending}>Post Comment</button>
                    </form>
                ) : (
                    <div className="alert alert-info">
                        Please <a href="/login">login</a> to leave a comment.
                    </div>
                )}
            </div>
        </div>
    );
}

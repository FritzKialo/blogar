"use client"

import { useActionState } from "react";
import { createArticle } from "@/app/actions/article";

export default function WriteArticleForm() {
    const [state, action, isPending] = useActionState(createArticle, undefined);

    return (
        <form action={action}>
            <div className="form-group mb-4">
                <label className="form-label font-weight-bold">Title</label>
                <input name="title" type="text" className="form-control form-control-lg" placeholder="Enter article title..." required />
            </div>
            <div className="form-group mb-4">
                <label className="form-label font-weight-bold">Content</label>
                <textarea name="content" className="form-control" rows={10} placeholder="Write your story..." required></textarea>
            </div>
            {state?.error && <div className="alert alert-danger">{state.error}</div>}
            <div className="text-right">
                <button type="submit" className="btn btn-primary btn-lg" disabled={isPending}>
                    {isPending ? "Publishing..." : "Publish Article"}
                </button>
            </div>
        </form>
    );
}

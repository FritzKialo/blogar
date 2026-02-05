"use client"

import { useActionState } from "react";
import { authenticate } from "@/app/actions/auth";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginFormInternal() {
    const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);
    const searchParams = useSearchParams();
    const successMessage = searchParams.get("success");

    return (
        <div className="container mt-5 pt-5 pb-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h2 className="card-title mb-4 text-center">Login</h2>
                            {successMessage && <div className="alert alert-success">{successMessage}</div>}
                            <form action={formAction}>
                                <div className="form-group mb-3">
                                    <label className="form-label">Email</label>
                                    <input name="email" type="email" className="form-control" required />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Password</label>
                                    <input name="password" type="password" className="form-control" required />
                                </div>
                                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                <button type="submit" className="btn btn-primary w-100 mt-3" disabled={isPending}>
                                    {isPending ? "Logging in..." : "Login"}
                                </button>
                                <p className="text-center mt-3">
                                    Don't have an account? <a href="/register">Register</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function LoginForm() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginFormInternal />
        </Suspense>
    );
}

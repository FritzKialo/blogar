"use client"

import { useActionState } from "react";
import { registerUser } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RegisterForm() {
    const [state, action, isPending] = useActionState(registerUser, undefined);
    const router = useRouter();

    useEffect(() => {
        if (state?.success) {
            const timeout = setTimeout(() => {
                router.push("/login?success=Account created! Please login.");
            }, 1000); // Small delay to show success message
            return () => clearTimeout(timeout);
        }
    }, [state?.success, router]);

    return (
        <div className="container mt-5 pt-5 pb-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h2 className="card-title mb-4 text-center">Create an Account</h2>
                            <form action={action}>
                                <div className="form-group mb-3">
                                    <label className="form-label">Name</label>
                                    <input name="name" type="text" className="form-control" required />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Email</label>
                                    <input name="email" type="email" className="form-control" required />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Password</label>
                                    <input name="password" type="password" className="form-control" required minLength={6} />
                                </div>
                                {state?.error && <div className="alert alert-danger">{state.error}</div>}
                                {state?.success && <div className="alert alert-success">{state.success}</div>}
                                <button type="submit" className="btn btn-primary w-100 mt-3" disabled={isPending}>
                                    {isPending ? "Registering..." : "Register"}
                                </button>
                                <p className="text-center mt-3">
                                    Already have an account? <a href="/login">Login</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

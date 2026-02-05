import { auth } from "@/auth";
import { redirect } from "next/navigation";
import WriteArticleForm from "./form";

export default async function WritePage() {
    const session = await auth();
    // @ts-expect-error - role is properly typed in our auth config
    if (!session?.user || session.user.role !== "ADMIN") {
        redirect("/");
    }

    return (
        <div className="container mt-5 pt-5 pb-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h2 className="mb-4">Write a New Article</h2>
                            <WriteArticleForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

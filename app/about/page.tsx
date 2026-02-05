import { db } from "@/lib/db";

export const revalidate = 3600; // Static-ish

export default function AboutPage() {
    return (
        <div className="axil-about-us-area axil-section-gap bg-color-white">
            <div className="container mt-5 pt-5 pb-5">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title text-center mb-5">
                            <span className="pre-title">Who We Are</span>
                            <h2 className="title">About Blogar</h2>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="about-content text-center">
                            <p className="lead mb-4">
                                Blogar is a dynamic platform for sharing thoughts, ideas, and stories.
                                Built with the latest web technologies, we aim to provide a seamless
                                and beautiful writing experience for everyone.
                            </p>
                            <p>
                                Whether you're a seasoned writer or just starting out, Blogar gives you
                                the tools to express yourself and connect with a community of like-minded
                                individuals.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

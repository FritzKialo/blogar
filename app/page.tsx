import { db } from "@/lib/db";
import Link from "next/link";
import { format } from "date-fns";

export const revalidate = 0; // Dynamic

import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  const articles = await db.article.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });

  return (
    <div className="axil-post-list-area axil-section-gap bg-color-white">
      <div className="container mt-5">
        <div className="row align-items-center mb-5">
          <div className="col-lg-12">
            <div className="section-title text-center">
              <h2 className="title">Recent Articles</h2>
              <div className="text-center mt-3">
                {/* @ts-expect-error - role is properly typed in our auth config */}
                {session?.user?.role === "ADMIN" && (
                  <Link href="/write" className="btn btn-primary btn-lg">Write a Story</Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {articles.length === 0 ? (
            <div className="col-12 text-center">
              <p className="lead">No articles yet. Be the first to write one!</p>
            </div>
          ) : (
            articles.map((article) => (
              <div key={article.id} className="col-lg-4 col-xl-4 col-md-6 col-12 col-sm-6 mb-4">
                <div className="content-block post-grid post-grid-transparent">
                  <div className="post-content">
                    <h4 className="title">
                      <Link href={`/article/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h4>
                    <div className="post-meta-content">
                      <div className="post-meta">
                        <div className="post-author-avatar border-rounded">
                          <img src="/assets/images/post-images/author/author-image-1.png" alt="Author" style={{ width: 30, height: 30, borderRadius: '50%' }} />
                        </div>
                        <div className="content">
                          <h6 className="post-author-name">
                            <span className="hover-flip-item-wrapper">
                              <span className="hover-flip-item">
                                <span>{article.author.name}</span>
                              </span>
                            </span>
                          </h6>
                          <ul className="post-meta-list">
                            <li>{new Date(article.createdAt).toLocaleDateString()}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3">{article.content.substring(0, 150)}...</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { auth } from "@/auth";
import { logout } from "@/app/actions/auth";
import MobileMenu from "./mobile-menu";

export default async function Header() {
    const session = await auth();

    return (
        <header className="header axil-header header-dark header-sticky">
            <div className="header-wrap">
                <div className="row justify-content-between align-items-center">
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-3 col-12">
                        <div className="logo">
                            <Link href="/">
                                <img className="dark-logo" src="/assets/images/logo/logo-black.png" alt="Blogar logo" style={{ height: '40px' }} />
                                <img className="light-logo" src="/assets/images/logo/logo-white.png" alt="Blogar logo" style={{ height: '40px' }} />
                            </Link>
                        </div>
                    </div>

                    <div className="col-xl-6 d-none d-xl-block">
                        <div className="mainmenu-wrapper">
                            <nav className="mainmenu-nav">
                                <ul className="mainmenu">
                                    <li><Link href="/">Home</Link></li>
                                    <li><Link href="/about">About</Link></li>
                                    <li><Link href="/contact">Contact</Link></li>
                                    {/* @ts-expect-error - role is properly typed in our auth config but ts doesn't know here yet */}
                                    {session?.user?.role === "ADMIN" && (
                                        <li><Link href="/write">Write Article</Link></li>
                                    )}
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <div className="col-xl-3 col-lg-8 col-md-8 col-sm-9 col-12 d-none d-xl-block">
                        <div className="header-search text-right d-flex align-items-center justify-content-end">
                            {session?.user ? (
                                <div className="d-flex align-items-center gap-3">
                                    <span className="text-white mr-3">Hi, {session.user.name}</span>
                                    <form action={logout}>
                                        <button className="axil-button button-rounded btn-sm btn-primary">Logout</button>
                                    </form>
                                </div>
                            ) : (
                                <div className="d-flex align-items-center">
                                    <Link href="/login" className="axil-button button-rounded btn-sm btn-secondary mr-2">Login</Link>
                                    <Link href="/register" className="axil-button button-rounded btn-sm btn-primary">Register</Link>
                                </div>
                            )}
                        </div>
                    </div>

                    <MobileMenu user={session?.user} onLogout={logout} />
                </div>
            </div>
        </header>
    );
}

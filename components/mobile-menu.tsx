"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function MobileMenu({ user, onLogout }: { user: any, onLogout: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Toggle body class for style.css transitions
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('popup-mobile-menu-show');
        } else {
            document.body.classList.remove('popup-mobile-menu-show');
        }
    }, [isOpen]);

    // Close menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <>
            {/* Hamburger Button */}
            <div className="col-xl-4 col-lg-8 col-md-8 col-sm-9 col-12 d-block d-xl-none">
                <div className="header-search text-right d-flex align-items-center justify-content-end">
                    <div className="mobile-menu-btn ml-3">
                        <button className="hamburger-menu" onClick={() => setIsOpen(true)}>
                            <i className="fas fa-bars"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            <div className={`popup-mobilemenu-area`}>
                <div className="inner">
                    <div className="mobile-menu-top">
                        <div className="logo">
                            <Link href="/">
                                <img src="/assets/images/logo/logo-black.png" alt="Logo" />
                            </Link>
                        </div>
                        <div className="mobile-close" onClick={() => setIsOpen(false)}>
                            <div className="icon">
                                <i className="fas fa-times"></i>
                            </div>
                        </div>
                    </div>
                    <ul className="mainmenu">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                        {user ? (
                            <>
                                {user.role === "ADMIN" && (
                                    <li><Link href="/write">Write Article</Link></li>
                                )}
                                <li>
                                    <form action={onLogout}>
                                        <button type="submit" className="btn btn-link p-0" style={{ color: 'inherit', fontWeight: 500 }}>Logout ({user.name})</button>
                                    </form>
                                </li>
                            </>
                        ) : (
                            <>
                                <li><Link href="/login">Login</Link></li>
                                <li><Link href="/register">Register</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>

            {/* Overlay */}
            {isOpen && <div className="popup-mobilemenu-overlay" onClick={() => setIsOpen(false)} style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.5)',
                zIndex: 98
            }}></div>}
        </>
    );
}

export default function Footer() {
    return (
        <footer className="axil-footer footer-black footer-dark">
            <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="footer-logo-container text-center">
                                <p className="text-muted mt-3">&copy; {new Date().getFullYear()} Blogar. All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

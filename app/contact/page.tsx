export default function ContactPage() {
    return (
        <div className="axil-contact-area axil-section-gap bg-color-white">
            <div className="container mt-5 pt-5 pb-5">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title text-center mb-5">
                            <span className="pre-title">Get In Touch</span>
                            <h2 className="title">Contact Us</h2>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="contact-form-wrapper">
                            <form>
                                <div className="form-group mb-3">
                                    <label>Name</label>
                                    <input type="text" className="form-control" placeholder="Your Name" />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Email</label>
                                    <input type="email" className="form-control" placeholder="Your Email" />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Message</label>
                                    <textarea className="form-control" rows={5} placeholder="Your Message"></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

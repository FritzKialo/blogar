import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blogar - Personal Blog Application",
  description: "A dynamic blog platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="no-js" suppressHydrationWarning>
      <head>
        <link rel="shortcut icon" type="image/x-icon" href="/assets/images/favicon.png" />
        <link rel="stylesheet" href="/assets/css/vendor/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/vendor/font-awesome.css" />
        <link rel="stylesheet" href="/assets/css/vendor/slick.css" />
        <link rel="stylesheet" href="/assets/css/vendor/slick-theme.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
      </head>
      <body suppressHydrationWarning>
        <div className="main-wrapper">
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </div>

        {/* Scripts */}
        <Script src="/assets/js/vendor/modernizr.min.js" strategy="beforeInteractive" />
        <Script src="/assets/js/vendor/jquery.js" strategy="beforeInteractive" />
        <Script src="/assets/js/vendor/bootstrap.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/vendor/slick.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/vendor/gsap.js" strategy="lazyOnload" />
        <Script src="/assets/js/vendor/scrollmagic.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/vendor/imageloaded.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/vendor/wow.js" strategy="lazyOnload" />
        <Script src="/assets/js/main.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}

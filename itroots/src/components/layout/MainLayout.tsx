"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ScrollToTop from "@/components/ui/ScrollToTop/ScrollToTop";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Immediately detectable via path — no header/footer needed
    const isAppPath = pathname?.startsWith("/lms") || pathname?.startsWith("/admin");

    // Hostname-based detection (admin / student / teacher subdomains)
    const [isAppHost, setIsAppHost] = useState(false);

    useEffect(() => {
        const h = window.location.hostname;
        if (h.startsWith("admin") || h.startsWith("student") || h.startsWith("teacher")) {
            setIsAppHost(true);
        }
    }, []);

    if (isAppPath || isAppHost) {
        return <main>{children}</main>;
    }

    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
            <ScrollToTop />
        </>
    );
}

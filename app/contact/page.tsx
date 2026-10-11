import type { Metadata } from "next";
import ContactWithGlobe from "@/components/ui/contact-with-globe";
import SimpleFooter from "@/components/SimpleFooter";
import SiteNavbar from "@/components/SiteNavbar";

export const metadata: Metadata = {
  title: "Contact | Mohamad Arif",
  description:
    "Hubungi Mohamad Arif untuk kolaborasi, proyek freelance, atau kesempatan kerja. Tersedia via email, WhatsApp, dan LinkedIn.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-bg-primary flex flex-col justify-between">
      <SiteNavbar />
      <ContactWithGlobe />
      <SimpleFooter />
    </main>
  );
}

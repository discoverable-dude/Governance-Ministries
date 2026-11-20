import type { Metadata, Viewport } from "next";
import { Montserrat, Source_Serif_4 } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { CHARITY_NUMBER, SITE_URL, absoluteUrl } from "@/lib/site";
import { getSettings } from "@/lib/content";
import "./globals.css";

const sans = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: "swap" });
const serif = Source_Serif_4({ subsets: ["latin"], axes: ["opsz"], variable: "--font-source-serif", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Governance Ministries", template: "%s | Governance Ministries" },
  openGraph: { siteName: "Governance Ministries", locale: "en_GB", type: "website" },
};

export const viewport: Viewport = { themeColor: "#0b2d48" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const s = await getSettings();
  return (
    <html lang="en-GB" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only z-50 bg-white px-4 py-3 font-bold text-navy focus:not-sr-only focus:absolute focus:left-3 focus:top-3"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: s.siteName,
            url: absoluteUrl("/"),
            nonprofitStatus: "https://schema.org/UKTrust",
            identifier: {
              "@type": "PropertyValue",
              propertyID: "Charity Commission for England and Wales registered charity number",
              value: CHARITY_NUMBER,
            },
            address: { "@type": "PostalAddress", streetAddress: "226 Church Road", addressLocality: "Willesden, London", postalCode: "NW10 9NR", addressCountry: "GB" },
            telephone: s.contact.phone,
            email: s.contact.email,
          }}
        />
      </body>
    </html>
  );
}

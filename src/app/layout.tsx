import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { MembershipProvider } from "@/components/providers/MembershipProvider";
import { PortalProvider } from "@/lib/portal";
import en from "@/i18n/dictionaries/en";
import { SITE, organizationLd, websiteLd, faqLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import organizationSchema from "@/lib/schema/organization.json";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: en.meta.title,
    template: "%s · IQCDL",
  },
  description: en.meta.description,
  applicationName: "IQCDL",
  keywords: [
    "quantum computing certification",
    "post-quantum cryptography",
    "IQCDL",
    "quantum readiness",
    "PQC migration",
    "NIST FIPS 203",
    "quantum training",
    "International Quantum Computing Index",
    "Global Quantum Award",
    "Mosca's theorem",
    "crypto agility",
  ],
  authors: [{ name: "IQCDL", url: SITE.url }],
  creator: "IQCDL",
  publisher: "IQCDL",
  category: "education",
  alternates: {
    canonical: SITE.url,
  },
  formatDetection: { telephone: false },
  openGraph: {
    title: en.meta.title,
    description: en.meta.description,
    type: "website",
    siteName: "IQCDL",
    url: SITE.url,
    locale: "en_US",
    alternateLocale: ["ar_AE", "fr_FR", "es_ES", "de_DE", "zh_CN"],
  },
  twitter: {
    card: "summary_large_image",
    title: en.meta.title,
    description: en.meta.description,
    creator: SITE.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=Tajawal:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd()) }}
        />
        <JsonLd data={organizationSchema} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd()) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <LocaleProvider>
            <AuthProvider>
              <MembershipProvider>
                <PortalProvider>{children}</PortalProvider>
              </MembershipProvider>
            </AuthProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

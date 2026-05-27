import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { MembershipProvider } from "@/components/providers/MembershipProvider";
import { PortalProvider } from "@/lib/portal";
import en from "@/i18n/dictionaries/en";

export const metadata: Metadata = {
  title: {
    default: en.meta.title,
    template: "%s · IQCDL",
  },
  description: en.meta.description,
  keywords: [
    "quantum computing certification",
    "post-quantum cryptography",
    "IQCDL",
    "quantum readiness",
    "PQC migration",
    "NIST FIPS 203",
    "quantum training",
  ],
  authors: [{ name: "IQCDL" }],
  openGraph: {
    title: en.meta.title,
    description: en.meta.description,
    type: "website",
    siteName: "IQCDL",
  },
  metadataBase: new URL("https://iqcdl.org"),
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

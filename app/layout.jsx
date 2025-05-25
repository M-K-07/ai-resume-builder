import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "./dashboard/_components/theme-provider";
import { PrimeReactProvider } from "primereact/api";
import { ResumeProvider } from "./context/ResumeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Smart Resume - Professional Resume Builder & Management",
  description: "Elevate your career with Smart Resume. Our AI-powered platform helps you build, manage, and download professional resumes with precision and ease.",
  openGraph: {
    title: "Smart Resume",
    description: "Build, manage, and perfect your professional resume with Smart Resume's AI-driven tools for career advancement.",
    url: "https://your-domain.com",
    siteName: "Resume Builder",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Resume Builder Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Resume",
    description: "Craft compelling professional resumes quickly and effectively with Smart Resume, your AI-powered solution for job success.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <ResumeProvider>
      <ClerkProvider appearance={{ baseTheme: dark }}>
        <PrimeReactProvider>
          <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <main>{children}</main>
              </ThemeProvider>
            </body>
          </html>
        </PrimeReactProvider>
      </ClerkProvider>
    </ResumeProvider>
  );
}

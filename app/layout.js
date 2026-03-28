import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Rajath K | Portfolio",
  description: "Personal Portfolio showcasing Cybersecurity and IoT projects, skills, and achievements.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth dark h-full antialiased`}>
      <body className="min-h-full flex flex-col selection:bg-cyan-500/30">
        {children}
      </body>
    </html>
  );
}

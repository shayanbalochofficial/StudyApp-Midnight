import { Inter } from "next/font/google";
import "./globals.css";
// import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
// import Footer from "@/components/footer";
// import { Toaster } from "@/components/ui/toaster";
import type React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Student Productivity App",
  description: "A premium productivity tool for students",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-linear-to-br from-purple-900 to-black min-h-screen flex flex-col`}
      >
        {/* <ThemeProvider attribute="class" defaultTheme="dark" enableSystem> */}
        <Header />
        <main className="container mx-auto px-4 py-8 grow">{children}</main>
        {/* <Footer /> */}
        {/* <Toaster /> */}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}

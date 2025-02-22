import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import QueryProvider from "@/contexts/QueryProvider";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/contexts/AuthProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "Tasker || Add Your Task",
  description: "Manage your daily tasks easily.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <QueryProvider>
          <AuthProvider>
            <main className="max-w-screen-xl mx-auto px-4">
              <Navbar />
              {children}
              <Toaster></Toaster>
            </main>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

import { Inter } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/contexts/AuthProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "Tasker || Login Tasker",
  description: "Manage your daily tasks easily.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <AuthProvider>
          <main className="max-w-screen-xl mx-auto px-4">
            {children}
            <Toaster></Toaster>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}

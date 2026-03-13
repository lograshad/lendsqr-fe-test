import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";
import { QueryProvider } from "@/components/providers/QueryProvider";
import "@/styles/globals.scss";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lendsqr",
  description: "Admin console for managing lending operations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={workSans.variable} suppressHydrationWarning>
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}

//TODO: implement logout
// need a rest btn for the first filter

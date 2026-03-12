import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
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
    <html lang="en">
      <body className={workSans.variable}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

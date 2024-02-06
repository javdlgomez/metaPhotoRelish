import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MetaPhoto",
  description: "RelishAPI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} mx-6 my-4`}>
        <div>
          <h1 className="text-black-500 text-4xl font-bold">MetaPhoto</h1>
        </div>
        {children}
      </body>
    </html>
  );
}

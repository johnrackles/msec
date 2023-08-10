import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const inter = Lato({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-lato",
});
const proximaNova = localFont({
  src: "../fonts/Mark Simonson - Proxima Nova Semibold-webfont.woff2",
  weight: "400",
  variable: "--font-proximaNova",
});

export const metadata: Metadata = {
  title: "Martha Stewart's Meal Delivery Service｜Martha & Marley Spoon",
  description:
    "Martha & Marley Spoon delivers delicious, 30-minute recipes with farm-fresh ingredients to your door. Learn cooking techniques from Martha Stewart and save time with her meal kit.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.variable,
          proximaNova.variable,
          "grid min-h-screen grid-rows-[auto,1fr] bg-secondary font-sans",
        )}
      >
        <header className="flex h-16 items-center justify-center bg-primary shadow-sm">
          <Link href="/">
            <Image
              src={require("./logo.svg")}
              alt="martha stewart & Marley Spoon"
              className="h-10"
            />
          </Link>
        </header>
        <main className="container mx-auto bg-white p-4 md:p-8 lg:p-12">
          {children}
        </main>
      </body>
    </html>
  );
}

import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/util/providers";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Event Manager",
  description: "Manage events for your group of friends",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-screen">
      <body className={`${inter.className} h-screen`}>
        <div className="h-screen md:py-4">
          <Providers>
            <Header />
            <main
              className={`container mx-auto flex h-[calc(100%-80px)] justify-center`}
            >
              {children}
            </main>
            <Toaster />
          </Providers>
        </div>
      </body>
    </html>
  );
}

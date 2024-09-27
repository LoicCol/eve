import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/util/providers";

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
        <Providers>
          <Header />
          <main
            className={`container mx-auto px-4 py-4 flex justify-center h-[calc(100%-64px)]`}
          >
            {children}
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

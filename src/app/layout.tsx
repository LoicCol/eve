import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

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
    <TooltipProvider>
      <ClerkProvider>
        <html lang="en">
          <body className={inter.className}>
            <Header />
            <main className="container mx-auto px-4 py-8 flex justify-center">
              {children}
            </main>
            <Toaster />
          </body>
        </html>
      </ClerkProvider>
    </TooltipProvider>
  );
}

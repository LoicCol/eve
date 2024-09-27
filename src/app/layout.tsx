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
        <html lang="en" className="h-screen">
          <body className={`${inter.className} h-screen`}>
            <Header />
            <main
              className={`container mx-auto px-4 py-4 flex justify-center h-[calc(100%-64px)]`}
            >
              {children}
            </main>
            <Toaster />
          </body>
        </html>
      </ClerkProvider>
    </TooltipProvider>
  );
}

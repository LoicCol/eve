import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/src/components/ui/sonner";
import Providers from "@/src/util/providers";
import Header from "@/src/components/header";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Eve",
  description: "Manage events for your group of friends",
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang="en" className="h-screen">
      <body className={`${inter.className} h-screen`}>
        <div className="h-screen md:py-4">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Providers locale={locale}>
              <Header />
              <main
                className={`container mx-auto flex h-[calc(100%-80px)] justify-center`}
              >
                {children}
              </main>
              <Toaster richColors position="top-right" closeButton />
            </Providers>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}

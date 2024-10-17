import "@/styles/globals.css";
import { Inter, Sofia } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/util/providers";
import Header from "@/components/header";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });
const sofia = Sofia({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sofia",
});

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
      <body className={`${inter.className} ${sofia.variable} h-screen`}>
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

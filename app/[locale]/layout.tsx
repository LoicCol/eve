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
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-48x48.png"
          sizes="48x48"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Eve-nts" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
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

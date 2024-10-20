import "@/styles/globals.css";
import { Inter, Sofia } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/util/providers";
import Header from "@/components/header";
import { ThemeProvider } from "next-themes";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/app-sidebar";

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
        <div className="h-screen">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Providers locale={locale}>
              <SidebarProvider
                style={
                  {
                    "--sidebar-width": "176px",
                  } as React.CSSProperties
                }
              >
                <AppSidebar />
                <SidebarInset className="h-[calc(100vh-80px)] bg-gradient-to-bl from-border to-green-300 p-[1px] dark:to-green-900">
                  <div className="flex h-full flex-col overflow-hidden rounded-sm bg-background">
                    <header className="flex shrink-0 items-center gap-2">
                      <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="h-5 w-5" />
                        <Separator
                          orientation="vertical"
                          className="mx-2 h-4"
                        />
                        <Header />
                      </div>
                    </header>

                    <main
                      className={`mx-auto flex h-full w-full flex-1 justify-center overflow-auto`}
                    >
                      {children}
                    </main>
                  </div>
                  <Toaster richColors position="top-right" closeButton />
                </SidebarInset>
              </SidebarProvider>
            </Providers>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}

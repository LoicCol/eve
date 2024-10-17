"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { ThemeProvider } from "@/components/next-provider";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { I18nProviderClient } from "@/locales/client";

export default function Providers({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const [queryClient] = useState(() => new QueryClient());
  const { theme } = useTheme();

  return (
    <TooltipProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ClerkProvider
          appearance={{ baseTheme: theme === "dark" ? dark : undefined }}
        >
          <QueryClientProvider client={queryClient}>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            <I18nProviderClient locale={locale}>{children}</I18nProviderClient>
          </QueryClientProvider>
        </ClerkProvider>
      </ThemeProvider>
    </TooltipProvider>
  );
}

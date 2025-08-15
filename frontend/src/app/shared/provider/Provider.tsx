"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";
import { defaultOptions } from "./QueryProvider";
import { ChakraUiProvider } from "@/components/ui/provider";
import { ColorModeProvider } from "@/components/ui/color-mode";
import { Toaster } from "@/components/ui/toaster";

export const Provider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions }));

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraUiProvider>
        <ColorModeProvider>{children}</ColorModeProvider>
        <Toaster />
      </ChakraUiProvider>
    </QueryClientProvider>
  );
};

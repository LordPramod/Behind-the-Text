"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";
import { defaultOptions } from "./QueryProvider";
import { ToasterProvider } from "../component/ui";
import { ChakraUiProvider } from "@/components/ui/provider";
import { ColorModeProvider } from "@/components/ui/color-mode";

export const Provider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions }));

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraUiProvider>
        <ColorModeProvider>{children}</ColorModeProvider>
        <ToasterProvider />
      </ChakraUiProvider>
    </QueryClientProvider>
  );
};

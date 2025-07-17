"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";
import { ChakraUiProvider } from "college-project/components/ui/provider";
import { defaultOptions } from "./QueryProvider";
import { ToasterProvider } from "../component/ui";
import { ColorModeProvider } from "college-project/components/ui/color-mode";

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

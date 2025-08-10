"use client";

import type { FieldValues } from "react-hook-form";
import { FormProvider as ReactHookFormProvider } from "react-hook-form";
import { FormProviderProps } from "../../types/form/provider";

export const FormProvider = <TFieldValues extends FieldValues>({
  children,
  methods,
  onSubmit,
}: FormProviderProps<TFieldValues>) => {
  return (
    <ReactHookFormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="h-full">
        {children}
      </form>
    </ReactHookFormProvider>
  );
};

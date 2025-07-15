import {
  FieldValues,
  FormProvider as ReactHookFormProvider,
} from "react-hook-form";
import { Box } from "@chakra-ui/react";
import { FormProviderProps } from "../../types/form/provider";

export const FormProvider = <TFieldValues extends FieldValues>({
  children,
  methods,
  onSubmit,
}: FormProviderProps<TFieldValues>) => {
  return (
    <ReactHookFormProvider {...methods}>
      <Box as="form" onSubmit={methods.handleSubmit(onSubmit)} height="full">
        {children}
      </Box>
    </ReactHookFormProvider>
  );
};

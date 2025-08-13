import { TestContext } from "node:test";
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";

export type FormProviderProps<TFieldValues extends FieldValues> = {
  methods: UseFormReturn<TFieldValues, TestContext>;
  children: React.ReactNode;
  onSubmit: SubmitHandler<TFieldValues>;
};

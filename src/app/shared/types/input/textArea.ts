import { InputProps } from "@chakra-ui/react";

export type TextAreaInputProps = {
  variant?: string;

  name: string;
  label?: string;
  placeholder?: string;

  handleChange?: (value: string | number) => void;
  isRequired?: boolean;
  isDisabled?: boolean;

  triggers?: string[];

  autoCompletionFn?: (rawInput: string) => string;
  autoCompletionOmissionFn?: (rawInput: string) => string;
} & InputProps;

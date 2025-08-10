import { FormWrapperProps } from "../../types";
import { Field } from "../ui";

export const FormWrapper = ({
  children,
  label,
  disabled,
  errorText,
  error,
  required,
}: FormWrapperProps) => {
  const finalErrorText = error?.message || errorText;
  return (
    <Field
      label={label}
      invalid={!!finalErrorText && !disabled}
      disabled={disabled}
      required={required}
      errorText={finalErrorText}
    >
      {children}
    </Field>
  );
};

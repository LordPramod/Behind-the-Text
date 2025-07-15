import { ChangeEvent } from "react";
import { FieldError, useController, useFormContext } from "react-hook-form";
import { InputGroup, Textarea } from "@chakra-ui/react";

import { TextAreaInputProps } from "../../types/input/textArea";
import { FormWrapper } from "../wrapper";

export const TextAreaFieldInput = ({
  name,
  handleChange,
  isDisabled,
  isRequired,
  label,
  placeholder,
  triggers,
  variant,
}: TextAreaInputProps) => {
  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext();

  const {
    field: { onChange, onBlur, ref, value },
  } = useController({
    control,
    name,
  });

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;

    if (handleChange) {
      handleChange(value);

      trigger(name);
    } else onChange(event);

    triggers?.map((name) => trigger(name)); // trigger other fields if connected to this field
  };

  return (
    <FormWrapper
      label={label}
      error={errors?.[name] as FieldError}
      disabled={isDisabled}
      required={isRequired}
    >
      <InputGroup>
        <Textarea
          variant={variant}
          placeholder={placeholder}
          ref={ref}
          value={value}
          onChange={isDisabled ? undefined : handleInputChange}
          disabled={isDisabled}
          onBlur={onBlur}
          border="1px solid"
          borderColor={errors?.[name] ? "red" : "gray.400"}
          size={"lg"}
          minH={"350px"}
          minW={"700px"}
        />
      </InputGroup>
    </FormWrapper>
  );
};

import { ChangeEvent } from "react";
import { FieldError, useController, useFormContext } from "react-hook-form";

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

    triggers?.map((triggerName: string) => trigger(triggerName)); // trigger other fields if connected to this field
  };

  return (
    <FormWrapper
      label={label}
      error={errors?.[name] as FieldError}
      disabled={isDisabled}
      required={isRequired}
    >
      <div className="relative">
        <textarea
          placeholder={placeholder}
          ref={ref}
          value={value}
          onChange={isDisabled ? undefined : handleInputChange}
          disabled={isDisabled}
          onBlur={onBlur}
          className={`w-full px-4 py-3 text-lg border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors?.[name]
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-400 focus:border-blue-500"
          }`}
          style={{ minHeight: "350px", minWidth: "700px" }}
        />
      </div>
    </FormWrapper>
  );
};

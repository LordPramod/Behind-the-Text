import Select, { StylesConfig } from "react-select";
import { useController, useFormContext } from "react-hook-form";

import { selectStyles } from "./styles";
import { ReactSelectProps, SelectOptionType } from "../types/form/select";
import { FormWrapper } from "../component/wrapper";

export const ReactSelect = ({
  name,
  options,
  label,
  placeholder,
  disabled,
  required,
  isMulti,
  isSearchable = true,
  extraOnChange,
}: ReactSelectProps) => {
  // this prevents the application crash when invalid options is passed
  if (!Array.isArray(options)) options = [];

  const { control } = useFormContext();

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleChange = (value: unknown) => {
    if (disabled) return;

    const selectedValue = isMulti
      ? (value as SelectOptionType[]).map((e) => e.value)
      : (value as SelectOptionType)?.value;
    field.onChange(selectedValue);
    extraOnChange?.(selectedValue);
  };

  const formattedValue = isMulti
    ? options.filter((item) => field.value?.includes(item.value))
    : options.find((item) => item.value === field.value);
  const errorText = error?.message as string;

  return (
    <FormWrapper
      errorText={errorText}
      label={label}
      disabled={disabled}
      required={required}
    >
      <Select
        isMulti={isMulti}
        value={formattedValue}
        onChange={handleChange}
        options={options}
        styles={
          {
            ...selectStyles,
            control: (base) => ({
              ...base,
              borderColor: error ? "red" : base.borderColor, // Error border
            }),
          } as StylesConfig
        }
        placeholder={placeholder}
        isDisabled={disabled}
        components={{
          IndicatorSeparator: undefined,
        }}
        closeMenuOnSelect={isMulti ? false : true}
        isSearchable={isSearchable}
        menuPlacement="auto"
      />
    </FormWrapper>
  );
};

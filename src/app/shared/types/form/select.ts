export type SelectOptionType = {
  label: string;
  value: string;
};

export type ReactSelectProps = {
  name: string;
  options: SelectOptionType[];

  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  extraOnChange?: (value: string | string[]) => void;

  isMulti?: boolean;
  isSearchable?: boolean;
};

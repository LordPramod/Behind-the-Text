import React from "react";

export type FieldProps = {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  errorText?: React.ReactNode;
  optionalText?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  children?: React.ReactNode;
};

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  function Field(props, ref) {
    const { label, children, helperText, errorText, required, disabled } =
      props;
    return (
      <div ref={ref} className="space-y-2">
        {label && (
          <label
            className={`block font-bold text-gray-900 ${
              disabled
                ? "text-black bg-gray-100 cursor-not-allowed opacity-100"
                : ""
            }`}
          >
            {label}

            {required ? (
              <span className="text-red-500 ml-1">*</span>
            ) : undefined}
          </label>
        )}

        {children}

        {helperText && <p className="text-sm text-gray-600">{helperText}</p>}
        {errorText && <p className="text-sm text-red-600">{errorText}</p>}
      </div>
    );
  }
);

import React from "react";
import { Field as ChakraField, Text } from "@chakra-ui/react";

export type FieldProps = Omit<ChakraField.RootProps, "label"> & {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  errorText?: React.ReactNode;
  optionalText?: React.ReactNode;
  fieldRequired?: boolean;
};

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  function Field(props, ref) {
    const { label, children, helperText, errorText, required, ...rest } = props;
    return (
      <ChakraField.Root ref={ref} {...rest}>
        {label && (
          <ChakraField.Label
            mb="0"
            fontWeight="bold"
            color="base.primaryText"
            _disabled={{
              color: "black",
              opacity: 1,
              backgroundColor: "#f5f5f5",
              cursor: "not-allowed",
            }}
          >
            {label}

            {required ? (
              <Text as="span" color="red">
                *
              </Text>
            ) : undefined}
          </ChakraField.Label>
        )}

        {children}

        {helperText && (
          <ChakraField.HelperText>{helperText}</ChakraField.HelperText>
        )}
        {errorText && (
          <ChakraField.ErrorText>{errorText}</ChakraField.ErrorText>
        )}
      </ChakraField.Root>
    );
  }
);

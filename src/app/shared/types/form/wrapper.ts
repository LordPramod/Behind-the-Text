import React from "react";
import type { FieldError } from "react-hook-form";

export type FormWrapperProps = {
  children: React.ReactNode;
  errorText?: string;
  error?: FieldError;
  label?: string;
  disabled?: boolean;
  required?: boolean;
};

import { cn } from "@/lib/function";
import * as React from "react";
import { Input, type InputProps } from "./input";
import { Select } from "./select";
import { Textarea } from "./textarea";

type SharedFormInputProps = {
  label?: string;
  error?: string;
  helperText?: string;
  labelClassName?: string;
  containerClassName?: string;
  errorClassName?: string;
  className?: string;
};

type FormInputTextProps = SharedFormInputProps & InputProps & {
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
};

type FormInputTextareaProps = SharedFormInputProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    type: "textarea";
  };

type FormInputSelectProps = SharedFormInputProps &
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    type: "select";
  };

type FormInputProps =
  | FormInputTextProps
  | FormInputTextareaProps
  | FormInputSelectProps;

const FormInput = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  FormInputProps
>(  (
    {
      type,
      className,
      label,
      error,
      helperText,
      labelClassName,
      containerClassName,
      errorClassName,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn(containerClassName)}>
        {label ? (
          <label
            className={cn(
              "block font-label-lg text-label-lg text-on-surface-variant mb-xs",
              labelClassName,
            )}
          >
            {label}
          </label>
        ) : null}
        {type !== "textarea" && type !== "select" && (
          <Input
            ref={ref as React.ForwardedRef<HTMLInputElement>}
            className={cn(className)}
            {...(props as InputProps)}
          />
        )}
        {type === "textarea" && (
          <Textarea
            ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
            className={cn(className)}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        )}
        {type === "select" && (
          <Select
            ref={ref as React.ForwardedRef<HTMLSelectElement>}
            className={cn(className)}
            {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
          />
        )}

        {helperText && !error ? (
          <p className="text-xs text-on-surface-variant">{helperText}</p>
        ) : null}
        {error ? (
          <p className={cn("text-xs text-error", errorClassName)}>{error}</p>
        ) : null}
      </div>
    );
  },
);
FormInput.displayName = "FormInput";

export { FormInput };

import { cn } from "@/lib/function";
import * as React from "react";
import { Input } from "./input";

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange"> {
  value: string | number;
  onChange: (value: string) => void;
  format?: (value: string) => string;
  parse?: (value: string) => string;
}

const defaultParse = (value: string) => value.replace(/[^0-9]/g, "");
const defaultFormat = (value: string) => {
  const raw = defaultParse(value);
  if (!raw) return "";
  return new Intl.NumberFormat("de-DE").format(Number(raw));
};

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      value,
      onChange,
      format = defaultFormat,
      parse = defaultParse,
      className,
      ...props
    },
    ref,
  ) => {
    const [displayValue, setDisplayValue] = React.useState<string>(
      format(String(value ?? "")),
    );

    React.useEffect(() => {
      setDisplayValue(format(String(value ?? "")));
    }, [value, format]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = parse(event.target.value);
      setDisplayValue(format(parsed));
      onChange(parsed);
    };

    return (
      <Input
        type="text"
        ref={ref}
        value={displayValue}
        onChange={handleChange}
        className={cn(className)}
        {...props}
      />
    );
  },
);
NumberInput.displayName = "NumberInput";

export { NumberInput };

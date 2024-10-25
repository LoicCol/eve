import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

interface FormFieldDateProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends Omit<ControllerProps<TFieldValues, TName>, "render" | "type"> {
  label: string;
  className?: string;
  min?: string;
}

export default function FormFieldDate<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  label,
  className,
  min,
  ...props
}: FormFieldDateProps<TFieldValues, TName>) {
  return (
    <FormField
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type="date" min={min} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
      {...props}
    />
  );
}

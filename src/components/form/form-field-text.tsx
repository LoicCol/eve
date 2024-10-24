import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

interface FormFieldTextProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends Omit<ControllerProps<TFieldValues, TName>, "render" | "type"> {
  label: string;
  placeholder: string;
}

export default function FormFieldText<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({ label, placeholder, ...props }: FormFieldTextProps<TFieldValues, TName>) {
  return (
    <FormField
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
      {...props}
    />
  );
}

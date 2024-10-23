import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ReactElement } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

export default function FormFieldTime<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: {
  control: Control<T>;
  name: Path<T>;
  label: string | ReactElement;
  placeholder: string;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type="time" placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

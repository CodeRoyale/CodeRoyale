import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type ChatInputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  placeholder: string;
};

export const ChatInput: React.FC<ChatInputProps> = ({ size: _, ...props }) => {
  const [field] = useField(props);
  return (
    <div className="flex flex-col">
      <input
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
        className="rounded-md bg-primary-700 placeholder:text-primary-300 text-white focus:border-none focus:ring-0 focus:outline focus:outline-offset-2 focus:outline-focus-outline border-none"
      ></input>
    </div>
  );
};

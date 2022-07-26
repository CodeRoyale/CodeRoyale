import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> &
  InputHTMLAttributes<HTMLTextAreaElement> & {
    name: string;
    label: string;
    placeholder: string;
    textarea?: boolean;
  };

export const InputField: React.FC<InputFieldProps> = ({
  textarea,
  label,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <div className="flex flex-col">
      <label
        htmlFor={field.name}
        className="text-primary-300 mb-2 font-semibold"
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          {...field}
          {...props}
          id={field.name}
          placeholder={props.placeholder}
          className={`rounded-md bg-primary-700 placeholder:text-primary-300 text-white focus:border-none focus:ring-0 focus:outline focus:outline-offset-2 focus:outline-focus-outline ${
            error ? "border border-error-red text-error-red" : "border-none"
          }`}
        ></textarea>
      ) : (
        <input
          {...field}
          {...props}
          id={field.name}
          placeholder={props.placeholder}
          className={`rounded-md bg-primary-700 placeholder:text-primary-300 text-white focus:border-none focus:ring-0 focus:outline focus:outline-offset-2 focus:outline-focus-outline ${
            error ? "border border-error-red text-error-red" : "border-none"
          }`}
        ></input>
      )}
      {error ? (
        <span className="mt-2 text-error-red text-xs">{error}</span>
      ) : null}
    </div>
  );
};

import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type ChatInputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  placeholder: string;
};

export const ChatInput: React.FC<ChatInputProps> = ({ size: _, ...props }) => {
  const [field, { error }] = useField(props);
  return (
    <div className="flex flex-col">
      <input
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
        className={`rounded-md bg-primary-700 placeholder:text-primary-300 text-white focus:border-none focus:ring-0 focus:outline focus:outline-offset-2 focus:outline-focus-outline ${
          error ? 'border border-error-red text-error-red' : 'border-none'
        }`}
      ></input>
      {error ? (
        <span className="mt-2 text-error-red text-xs">{error}</span>
      ) : null}
    </div>
  );
};

import React, { InputHTMLAttributes } from 'react';
import { useField } from 'formik';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  placeholder: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <div className="flex flex-col">
      <label
        htmlFor={field.name}
        className="text-primary-100 mb-2 font-semibold"
      >
        {label}
      </label>
      <input
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
        className={`rounded-md py-2 px-3 bg-primary-700 placeholder:text-primary-300 text-white focus:outline focus:outline-offset-2 focus:outline-focus-outline ${
          error ? 'border border-error-red text-error-red' : ''
        }`}
      ></input>
      {error ? (
        <span className="mt-2 text-error-red text-xs">{error}</span>
      ) : null}
    </div>
  );
};

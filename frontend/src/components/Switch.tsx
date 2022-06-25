import React from 'react';
import { Switch as HeadlessSwitch } from '@headlessui/react';

interface SwitchProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export const Switch: React.FC<SwitchProps> = ({
  label,
  value = false,
  onChange,
}) => {
  return (
    <HeadlessSwitch.Group>
      <div className="flex items-center justify-between">
        <HeadlessSwitch.Label className="text-primary-300 font-semibold">
          {label}
        </HeadlessSwitch.Label>
        <HeadlessSwitch
          checked={value}
          onChange={onChange}
          className={`${value ? 'bg-button-primary-default' : 'bg-primary-600'}
          relative inline-flex h-[34px] w-[70px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span className="sr-only">{label}</span>
          <span
            aria-hidden="true"
            className={`${value ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[30px] w-[30px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </HeadlessSwitch>
      </div>
    </HeadlessSwitch.Group>
  );
};

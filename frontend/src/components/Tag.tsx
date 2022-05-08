import React, { HTMLAttributes } from 'react';

type TagProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
};

export const Tag: React.FC<TagProps> = ({ title, ...props }) => (
  <div
    className="bg-primary-600 py-1 px-2 text-sm font-semibold text-primary-100 rounded-md cursor-pointer transition duration-200 ease-in-out hover:bg-primary-300"
    {...props}
  >
    {title}
  </div>
);

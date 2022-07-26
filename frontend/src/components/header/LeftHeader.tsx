import React, { HTMLAttributes } from "react";

export const LeftHeader: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div {...props}>
      <img
        className="py-7 cursor-pointer"
        src="/img/CodeRoyaleLogo.png"
        alt="next"
        height={90}
        width={90}
      />
    </div>
  );
};

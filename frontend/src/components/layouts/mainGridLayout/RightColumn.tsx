import React from "react";

interface RightColumnProps {
  isFixed?: boolean;
  children: React.ReactNode;
}

export const RightColumn: React.FC<RightColumnProps> = ({
  children,
  isFixed = false,
}) => {
  if (isFixed) {
    return (
      <div>
        <div
          className="fixed h-full overflow-hidden"
          style={{ width: "325px" }}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="sticky h-full overflow-hidden" style={{ width: "325px" }}>
        {children}
      </div>
    </div>
  );
};

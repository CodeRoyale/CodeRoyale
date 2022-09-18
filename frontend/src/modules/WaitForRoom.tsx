import React from "react";
import { useRoom } from "../global-stores";

export const WaitForRoom: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const room = useRoom((state) => state.room);

  let body = null;
  if (room) {
    body = children;
  }

  return <>{body}</>;
};

import React from "react";
import { UserAvatarController } from "../avatar/UserAvatarController";

export const RightHeader: React.FC<{}> = () => (
  <div className="flex justify-end py-6">
    <UserAvatarController />
  </div>
);

import { useRouter } from "next/router";
import React from "react";
import { useRoom } from "../../global-stores";

export const ArenaPage = () => {
  const router = useRouter();
  const room = useRoom((state) => state.room);

  return (
    <div className="text-white">
      {router.query.id}
      <pre>{JSON.stringify(room, null, 2)}</pre>
    </div>
  );
};

import { useRouter } from "next/router";
import React from "react";
import { useRoom } from "../../global-stores";

export const VetoPage = () => {
  const router = useRouter();
  const room = useRoom((state) => state.room);

  return (
    <div className="text-white">
      {router.query.id}
      <pre className="text-white">{JSON.stringify(room, null, 2)}</pre>
    </div>
  );
};

import React from "react";
import { useRouter } from "next/router";
import { useMeQuery } from "../../generated/graphql";
import { LeftHeader } from "./LeftHeader";

export const LeftHeaderController = () => {
  const router = useRouter();
  const { data, loading } = useMeQuery();

  let body = null;

  if (loading) {
  } else if (!data?.me) {
    body = <LeftHeader onClick={() => router.push("/dashboard")} />;
  } else {
    body = <LeftHeader onClick={() => router.push("/dashboard")} />;
  }

  return <>{body}</>;
};

import React, { useContext } from "react";
import { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { DropdownMenuIconButton } from "../DropdownMenuIconButton";
import { WebSocketContext } from "../../modules/ws/WebSocketProvider";
import { AvatarDropdownMenu } from "./AvatarDropdownMenu";

export const AvatarDropdownMenuController: React.FC = () => {
  const { conn, setConn } = useContext(WebSocketContext);
  const router = useRouter();
  const apolloClient = useApolloClient();
  const [logout] = useLogoutMutation();
  const { data, loading } = useMeQuery();

  const handleLogoutClick = async () => {
    conn?.disconnect();
    setConn(null);
    await logout();
    await apolloClient.resetStore();
  };

  const handleProfileClick = () => {
    if (data?.me && !loading) {
      router.push(`/profile/${data.me.username}`);
    }
  };

  return (
    <AvatarDropdownMenu>
      <DropdownMenuIconButton
        title="Profile"
        icon="profile"
        borderRadius="rounded-t-lg"
        onClick={handleProfileClick}
      />
      <DropdownMenuIconButton
        title="Settings"
        icon="settings"
        onClick={() => router.push("/settings")}
      />
      <button
        type="button"
        className="bg-primary-700 pt-2 pb-2.5 pr-32 rounded-b-lg w-full transition duration-200 ease-in-out hover:bg-primary-600"
        onClick={handleLogoutClick}
      >
        <span className="text-primary-100 text-sm font-bold">Log out</span>
      </button>
    </AvatarDropdownMenu>
  );
};

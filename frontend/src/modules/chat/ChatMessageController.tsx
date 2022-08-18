import { useRouter } from "next/router";
import React from "react";
import {
  ChatMessage,
  ChatMessageType,
} from "../../components/chat/ChatMessage";
import { useUserFromIdQuery } from "../../generated/graphql";

interface ChatMessageControllerProps {
  fromUserId: number;
  type: ChatMessageType;
  message: string;
  usernameColor: string;
}

export const ChatMessageController: React.FC<ChatMessageControllerProps> = ({
  fromUserId,
  type,
  message,
  usernameColor,
}) => {
  const router = useRouter();
  const { data, loading } = useUserFromIdQuery({
    variables: { userId: fromUserId },
  });

  let body = null;

  if (loading) {
  } else if (!data?.userFromId) {
  } else {
    body = (
      <>
        <div className="mt-3"></div>
        <ChatMessage
          type={type}
          message={message}
          username={data.userFromId.user?.username}
          usernameColor={usernameColor}
          usernameOnClick={() => {
            router.push(`/profile/${data.userFromId.user?.username}`);
          }}
        />
      </>
    );
  }

  return <>{body}</>;
};

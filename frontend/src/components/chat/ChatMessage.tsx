import React from "react";

export type ChatMessageType = "Normal" | "RoomAlert" | "ToTeam";

interface ChatMessageProps {
  type: ChatMessageType;
  usernameColor: string;
  username?: string;
  message: string;
  usernameOnClick: () => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  type = "Normal",
  message,
  username,
  usernameColor,
  usernameOnClick,
}) => {
  let body = (
    <p className="text-primary-100 text-sm break-words">
      <span
        className="cursor-pointer"
        style={{ color: usernameColor }}
        onClick={usernameOnClick}
      >
        {username}
        <span className="text-primary-100">: </span>
      </span>
      {message}
    </p>
  );

  if (type === "ToTeam") {
    body = (
      <div className="bg-primary-700 px-2.5 py-2 rounded-md">
        <span className="text-primary-200 text-sm">Team Whisper</span>
        <p className="text-primary-100 text-sm mt-0.5 break-words">
          <span
            className={`text-[${usernameColor}] cursor-pointer`}
            style={{ color: usernameColor }}
            onClick={usernameOnClick}
          >
            {username}
            <span className="text-primary-100">: </span>
          </span>
          {message}
        </p>
      </div>
    );
  } else if (type === "RoomAlert") {
    body = (
      <p className="text-primary-300 text-sm break-words">
        <span
          className="text-primary-200 cursor-pointer"
          onClick={usernameOnClick}
        >
          {username}
        </span>{" "}
        {message}
      </p>
    );
  }

  return <>{body}</>;
};

import { ReceiveChatMessageInterface } from "@coderoyale/common";
import { Form, Formik } from "formik";
import React, { useContext, useEffect, useRef } from "react";
import { ChatInput } from "../../components/chat/ChatInput";
import { Switch } from "../../components/Switch";
import { useMeQuery } from "../../generated/graphql";
import { useChat } from "../../global-stores";
import { sendChatMessage } from "../../service/roomSocket";
import { WebSocketContext } from "../ws/WebSocketProvider";
import { ChatMessageController } from "./ChatMessageController";

export const ChatController: React.FC<{}> = () => {
  const { conn } = useContext(WebSocketContext);
  const { data } = useMeQuery();
  const chat = useChat((state) => state.chat);
  const userChatIdentityColors = useChat(
    (state) => state.userChatIdentityColors
  );
  const addChat = useChat((state) => state.addChat);
  const bottomRef = useRef<null | HTMLDivElement>(null);

  const handleRcvChatMessage = (res: ReceiveChatMessageInterface) => {
    console.log(res);
    if (res.type === "ROOM_ALERT_MESSAGE") {
      addChat({
        fromUserId: res.fromUserId,
        type: "RoomAlert",
        message: res.message,
      });
    } else if (res.type === "ROOM_CHAT_MESSAGE")
      addChat({
        fromUserId: res.fromUserId,
        type: res.toTeam ? "ToTeam" : "Normal",
        message: res.message,
      });
  };

  useEffect(() => {
    conn?.on("receiveChatMessage", handleRcvChatMessage);

    return () => {
      conn?.off("receiveChatMessage", handleRcvChatMessage);
    };
  }, []);

  // scroll to bottom of chat window when new chat message comes in
  useEffect(() => {
    // dont scroll to bottom if user has scrolled up
    // if (
    //   chatRef.current?.getBoundingClientRect().bottom! <= window.innerHeight
    // ) {
    //   bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    // }
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="bottom-0 left-0 w-full mt-8 bg-primary-800 rounded-md">
      <div
        className="relative px-4 py-3 w-full h-auto overflow-y-auto scrollbar-thin scrollbar-thumb-primary-700"
        style={{ height: "calc(100vh - 272px)" }}
      >
        <span className="text-primary-300 text-sm">Welcome to chat!</span>
        {chat.map(({ fromUserId, message, type }, index) => (
          <ChatMessageController
            key={index}
            fromUserId={fromUserId}
            message={message}
            type={type}
            usernameColor={userChatIdentityColors[fromUserId]}
          />
        ))}
        <div ref={bottomRef}></div>
      </div>
      <Formik
        initialValues={{
          message: "",
          toTeam: false,
        }}
        onSubmit={async (values, { setErrors, setFieldValue }) => {
          const trimmedMessage = values.message.trim();

          // dont send an empty message
          if (trimmedMessage.length > 0) {
            const res: any = await sendChatMessage(conn, {
              message: values.message,
              toTeam: values.toTeam,
            });
            if (res.data) {
              addChat({
                type: values.toTeam ? "ToTeam" : "Normal",
                fromUserId: data?.me?.id!,
                message: values.message,
              });
              setFieldValue("message", "");
            }
          } else {
            setErrors({ message: "Cannot send a empty character" });
          }
        }}
      >
        {({ values, setFieldValue, setErrors }) => (
          <Form className="w-full pt-2 pb-4 px-4">
            <ChatInput
              name="message"
              placeholder="Send a message"
              type="text"
              autoComplete="off"
              onChange={(e) => {
                // check char count to make sure user does not send a big message
                const trimmedMessage = e.target.value.trim();

                if (trimmedMessage.length > 350) {
                  setErrors({
                    message: "Cannot exceed more than 350 characters",
                  });
                } else {
                  setFieldValue("message", e.target.value);
                }
              }}
            />
            <div className="mt-3">
              <Switch
                label="Team Message"
                value={values.toTeam}
                size="xs"
                onChange={(val) => setFieldValue("toTeam", val)}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

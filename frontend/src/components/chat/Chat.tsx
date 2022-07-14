import React, { useState, useRef, useEffect } from 'react';
import { Form, Formik } from 'formik';
import { Switch } from '../Switch';
import { ChatInput } from './ChatInput';

export const Chat: React.FC<{}> = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const chatRef = useRef<null | HTMLDivElement>(null);
  const bottomRef = useRef<null | HTMLDivElement>(null);

  // scroll to bottom of chat window when new chat message comes in
  useEffect(() => {
    // dont scroll to bottom if user has scrolled up
    // if (
    //   chatRef.current?.getBoundingClientRect().bottom! <= window.innerHeight
    // ) {
    //   bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    // }
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="bottom-0 left-0 w-full mt-8 bg-primary-800 rounded-md">
      <div
        className="relative px-4 py-2 w-full h-auto overflow-y-auto scrollbar-thin scrollbar-thumb-primary-700"
        style={{ height: 'calc(100vh - 272px)' }}
      >
        <div className="text-primary-300 text-sm">Welcome to chat!</div>
        {messages.map((message, key) => (
          <div ref={chatRef} key={key} className="text-white break-words">
            {message}
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>
      <Formik
        initialValues={{
          message: '',
          toTeam: false,
        }}
        onSubmit={(values, { setErrors, setFieldValue }) => {
          setMessages((old) => [...old, values.message]);
          console.log(values);
          setFieldValue('message', '');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="w-full pt-2 pb-4 px-4">
            <ChatInput
              name="message"
              placeholder="Send a message"
              type="text"
              autoComplete="off"
            />
            <div className="mt-3">
              <Switch
                label="Team Message"
                value={values.toTeam}
                size="xs"
                onChange={(val) => setFieldValue('toTeam', val)}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

import { Form, Formik } from 'formik';
import React from 'react';
import { Switch } from '../Switch';
import { ChatInput } from './ChatInput';

export const Chat: React.FC<{}> = () => {
  return (
    <div className="w-full h-full mt-8">
      <div className="absolute bottom-[98px] px-4 flex flex-col-reverse w-full h-full border-t-[230px] border-transparent overflow-auto mt-[150px] scrollbar-thin scrollbar-thumb-primary-700">
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
        <div className="text-white">Joel</div>
      </div>
      <Formik
        initialValues={{
          message: '',
          toTeam: false,
        }}
        onSubmit={(values, { setErrors }) => {
          console.log(values);
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className="absolute bottom-0 left-0 w-full p-4">
            <ChatInput
              name="message"
              placeholder="Send a message"
              type="text"
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

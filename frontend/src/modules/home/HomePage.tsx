import React, { useState } from 'react';
import { NextPage } from 'next';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { googleClientId } from '../../utils/constants';
import { AuthFormController } from './AuthFormController';
import {
  GoogleAuthButtonController,
  GoogleUser,
} from './GoogleAuthButtonController';
// import { Form, Formik } from 'formik';
// import { InputField } from '../../components/InputField';

// ! need to remove tailwind colors

export const HomePage: NextPage<{}> = () => {
  const [showAuthForm, setShowAuthForm] = useState<boolean>(false);

  const [authOptions, setAuthOptions] = useState<GoogleUser>();

  return (
    <div
      className="grid gap-5 justify-center h-screen w-screen"
      style={{ gridTemplateColumns: '640px 640px', margin: '0 auto' }}
    >
      <div className="col-span-1 text-white">
        Logo and intro here (come back to design)
      </div>
      <div className="col-span-1 my-auto p-8">
        <h1 className="mb-3 text-2xl font-bold text-primary-100 text-center">
          Welcome
        </h1>
        {!showAuthForm ? null : (
          <AuthFormController authOptions={authOptions} />
        )}
        {showAuthForm ? null : (
          <GoogleOAuthProvider clientId={googleClientId}>
            <GoogleAuthButtonController
              getGoogleUser={(googleUser) => {
                setAuthOptions(googleUser);
                setShowAuthForm(true);
              }}
            />
          </GoogleOAuthProvider>
        )}
      </div>
    </div>
  );
};

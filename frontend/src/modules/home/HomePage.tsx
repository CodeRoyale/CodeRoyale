import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useRouter } from 'next/router';
import { googleClientId } from '../../utils/constants';
import { useMeQuery } from '../../generated/graphql';
import { AuthFormController } from './AuthFormController';
import {
  GoogleAuthButtonController,
  GoogleUser,
} from './GoogleAuthButtonController';

export const HomePage = () => {
  const router = useRouter();
  const { data, loading } = useMeQuery();

  const [showAuthForm, setShowAuthForm] = useState<boolean>(false);

  const [authOptions, setAuthOptions] = useState<GoogleUser>();

  let body = null;

  if (loading) {
  } else if (!data?.me) {
    body = (
      <>
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
      </>
    );
  } else {
    router.push('/dashboard');
  }

  return (
    <div
      className="grid gap-5 justify-center h-screen w-screen"
      style={{ gridTemplateColumns: '640px 640px', margin: '0 auto' }}
    >
      {body}
    </div>
  );
};

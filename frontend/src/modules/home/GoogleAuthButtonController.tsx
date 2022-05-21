import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleAuthButton } from '../../components/GoogleAuthButton';
import { useLoginMutation } from '../../generated/graphql';

export type GoogleUser = {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  locale: string;
  name: string;
  picture: string;
  sub: string;
  access_token: string;
};

interface GoogleAuthButtonControllerProps {
  getGoogleUser: (googleUser: GoogleUser) => void;
}

export const GoogleAuthButtonController: React.FC<
  GoogleAuthButtonControllerProps
> = ({ getGoogleUser }) => {
  const router = useRouter();
  const [login] = useLoginMutation();

  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const responseFromGoogle = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: { Authorization: `Bearer ${codeResponse.access_token}` },
        }
      );

      const googleUser: GoogleUser = {
        ...responseFromGoogle.data,
        access_token: codeResponse.access_token,
      };

      if (!googleUser) {
        console.log('Google OAuth failed');
      } else {
        const response = await login({
          variables: {
            email: googleUser.email,
          },
        });

        // user is not registered
        if (!response.data?.login.user) {
          getGoogleUser(googleUser);
        } else if (response.data.login.errors) {
          // do a notification here
        } else if (response.data.login.user) {
          // login successful
          router.push('/dashboard');
        }
      }
    },
  });

  return (
    <GoogleAuthButton onClick={() => googleLogin()}>
      Continue with Google
    </GoogleAuthButton>
  );
};

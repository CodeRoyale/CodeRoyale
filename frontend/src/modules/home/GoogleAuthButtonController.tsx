/* eslint-disable */
import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleAuthButton } from "../../components/GoogleAuthButton";
import { MeDocument, MeQuery, useLoginMutation } from "../../generated/graphql";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

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

  const handleGoogleLogin = async (credentialResponse: any) => {
    console.log("credentialResponse", credentialResponse);

    const decoded: any = jwtDecode(credentialResponse.credential);
    console.log("decoded", decoded);
    const {
      email,
      email_verified,
      family_name,
      given_name,
      locale,
      picture,
      name,
      sub,
    } = decoded;

    const googleUser: GoogleUser = {
      email,
      email_verified,
      family_name,
      given_name,
      locale,
      picture,
      name,
      sub,
      access_token: "ascplajsclascascasc",
    };

    console.log("googleUser: ", googleUser);

    const response = await login({
      variables: {
        email: googleUser.email,
      },
      update: (cache, { data }) => {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: "Query",
            me: data?.login.user,
          },
        });
        cache.evict({ fieldName: "people" });
      },
    });

    // user is not registered
    if (!response.data?.login.user) {
      getGoogleUser(googleUser);
    } else if (response.data.login.errors) {
      // do a notification here
    } else if (response.data.login.user) {
      // login successful
      router.push("/dashboard");
    }
  };

  // const googleLogin = useGoogleLogin({
  //   onSuccess: async (codeResponse) => {
  //     console.log(codeResponse);
  //     const responseFromGoogle = await axios.get(
  //       "https://www.googleapis.com/oauth2/v3/userinfo",
  //       {
  //         headers: { Authorization: `Bearer ${codeResponse.access_token}` },
  //       }
  //     );

  //     const googleUser: GoogleUser = {
  //       ...responseFromGoogle.data,
  //       access_token: codeResponse.access_token,
  //     };

  //     if (!googleUser) {
  //       console.log("Google OAuth failed");
  //     } else {
  //       const response = await login({
  //         variables: {
  //           email: googleUser.email,
  //         },
  //         update: (cache, { data }) => {
  //           cache.writeQuery<MeQuery>({
  //             query: MeDocument,
  //             data: {
  //               __typename: "Query",
  //               me: data?.login.user,
  //             },
  //           });
  //           cache.evict({ fieldName: "people" });
  //         },
  //       });

  //       // user is not registered
  //       if (!response.data?.login.user) {
  //         getGoogleUser(googleUser);
  //       } else if (response.data.login.errors) {
  //         // do a notification here
  //       } else if (response.data.login.user) {
  //         // login successful
  //         router.push("/dashboard");
  //       }
  //     }
  //   },
  // });

  return <GoogleLogin onSuccess={handleGoogleLogin} />;
};

// import { GoogleUser } from "src/types/types";
import { RegisterInput } from "../resolvers/user";
// import axios from "axios";
// import { GoogleUser } from "src/types/types";

export const validateAuthOptions = async (options: RegisterInput) => {
  const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  // this does not contain . and _ which are legal to have in a username
  const usernameSpecialChars = /[!@#$%^&*()+\-=\[\]{};':"\\|,<>\/?]+/;
  const hasNumber = /\d/;

  // const responseFromGoogle = await axios.get(
  //   "https://www.googleapis.com/oauth2/v3/userinfo",
  //   {
  //     headers: { Authorization: `Bearer ${options.accessToken}` },
  //   }
  // );

  // const googleUser: GoogleUser = responseFromGoogle.data;

  // if (!googleUser) {
  //   return [
  //     {
  //       field: "token",
  //       message: "Bad Google code",
  //     },
  //   ];
  // }

  // if (options.email !== googleUser.email) {
  //   return [
  //     {
  //       field: "email",
  //       message: "Email does not match OAuth email",
  //     },
  //   ];
  // }

  if (usernameSpecialChars.test(options.username)) {
    return [
      {
        field: "username",
        message: "Invalid username",
      },
    ];
  }

  if (specialChars.test(options.name) || hasNumber.test(options.name)) {
    return [
      {
        field: "name",
        message: "Invalid name",
      },
    ];
  }

  if (options.username.length <= 2) {
    return [
      {
        field: "username",
        message: "Length of username must be greater than 2",
      },
    ];
  }

  if (options.name.length <= 2) {
    return [
      {
        field: "name",
        message: "Length of name must be greater than 2",
      },
    ];
  }

  return null;
};

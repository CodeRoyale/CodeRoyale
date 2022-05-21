// import { GoogleUser } from "src/types/types";
import { RegisterInput } from "../resolvers/user";
import axios from "axios";
import { GoogleUser } from "src/types/types";

export const validateAuthOptions = async (options: RegisterInput) => {
  const responseFromGoogle = await axios.get(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: { Authorization: `Bearer ${options.accessToken}` },
    }
  );

  const googleUser: GoogleUser = responseFromGoogle.data;

  if (!googleUser) {
    return [
      {
        field: "token",
        message: "Bad Google code",
      },
    ];
  }

  if (options.email !== googleUser.email) {
    return [
      {
        field: "email",
        message: "Email does not match OAuth email",
      },
    ];
  }

  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "Invalid username",
      },
    ];
  }

  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "Invalid username. Username cannot have @",
      },
    ];
  }

  if (options.name.includes("@")) {
    return [
      {
        field: "name",
        message: "Invalid name. Name cannot have @",
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

  return null;
};

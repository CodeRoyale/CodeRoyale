interface UpdateUserOptionsInterface {
  username: string;
  name: string;
  bio: string;
}

export const validateUpdateUserOptions = (
  options: UpdateUserOptionsInterface
) => {
  const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  // this does not contain . and _ which are legal to have in a username
  const usernameSpecialChars = /[!@#$%^&*()+\-=\[\]{};':"\\|,<>\/?]+/;
  const hasNumber = /\d/;

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

import { useUserQuery } from "../generated/graphql";
import { useGetStringUsername } from "./useGetStringUsername";

export const useGetProfileFromUrl = () => {
  const stringUsername = useGetStringUsername();

  return useUserQuery({
    skip: stringUsername === "",
    variables: {
      username: stringUsername,
    },
  });
};

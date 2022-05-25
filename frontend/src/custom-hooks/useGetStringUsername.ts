import { useRouter } from 'next/router';

export const useGetStringUsername = () => {
  const router = useRouter();

  const stringUsername =
    typeof router.query.username === 'string' ? router.query.username : '';

  return stringUsername;
};

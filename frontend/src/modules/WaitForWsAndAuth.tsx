import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { useMeQuery } from '../generated/graphql';
import { WebSocketContext } from './ws/WebSocketProvider';

interface WaitForWsAndAuthProps {
  children: React.ReactNode;
}

export const WaitForWsAndAuth: React.FC<WaitForWsAndAuthProps> = ({
  children,
}) => {
  let body = null;
  const { data, loading } = useMeQuery();
  const router = useRouter();
  const conn = useContext(WebSocketContext);

  if (loading) {
  } else if (!data?.me) {
    router.push('/');
  } else if (!conn) {
  } else {
    body = children;
  }

  return <>{body}</>;
};

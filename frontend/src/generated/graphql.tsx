import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"];
  message: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  connect: Scalars["Boolean"];
  createRoom: Room;
  deleteRoom: Scalars["Boolean"];
  login: UserResponse;
  logout: Scalars["Boolean"];
  register: UserResponse;
  updateUser: UserResponse;
};

export type MutationConnectArgs = {
  followingUserId: Scalars["Int"];
  wantsToFollow: Scalars["Boolean"];
};

export type MutationCreateRoomArgs = {
  input: RoomInput;
};

export type MutationDeleteRoomArgs = {
  roomId: Scalars["String"];
};

export type MutationLoginArgs = {
  email: Scalars["String"];
};

export type MutationRegisterArgs = {
  options: RegisterInput;
};

export type MutationUpdateUserArgs = {
  options: UpdateUserInput;
};

export type PaginatedRooms = {
  __typename?: "PaginatedRooms";
  hasMore: Scalars["Boolean"];
  rooms: Array<Room>;
};

export type Query = {
  __typename?: "Query";
  hello: Scalars["String"];
  me?: Maybe<User>;
  people: Array<User>;
  rooms: PaginatedRooms;
  user: UserResponse;
  userFromId: UserResponse;
  users: Array<User>;
};

export type QueryRoomsArgs = {
  cursor?: InputMaybe<Scalars["String"]>;
  isPrivate: Scalars["Boolean"];
  limit: Scalars["Int"];
};

export type QueryUserArgs = {
  username: Scalars["String"];
};

export type QueryUserFromIdArgs = {
  userId: Scalars["Int"];
};

export type QueryUsersArgs = {
  userIds: Array<Scalars["Int"]>;
};

export type RegisterInput = {
  accessToken: Scalars["String"];
  email: Scalars["String"];
  name: Scalars["String"];
  profilePicture: Scalars["String"];
  username: Scalars["String"];
};

export type Room = {
  __typename?: "Room";
  createdAt: Scalars["String"];
  creator: User;
  creatorId: Scalars["Float"];
  id: Scalars["String"];
  maxMembers: Scalars["Float"];
  private: Scalars["Boolean"];
  title: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type RoomInput = {
  creatorId: Scalars["Float"];
  maxMembers: Scalars["Float"];
  private: Scalars["Boolean"];
  title: Scalars["String"];
};

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars["String"]>;
  name: Scalars["String"];
  username: Scalars["String"];
};

export type User = {
  __typename?: "User";
  bio?: Maybe<Scalars["String"]>;
  connectionStatus?: Maybe<Scalars["Boolean"]>;
  createdAt: Scalars["String"];
  email: Scalars["String"];
  followers: Scalars["Float"];
  following: Scalars["Float"];
  id: Scalars["Float"];
  name: Scalars["String"];
  profilePicture: Scalars["String"];
  updatedAt: Scalars["String"];
  username: Scalars["String"];
};

export type UserResponse = {
  __typename?: "UserResponse";
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegularErrorFragment = {
  __typename?: "FieldError";
  field: string;
  message: string;
};

export type RegularUserFragment = {
  __typename?: "User";
  id: number;
  username: string;
  email: string;
  profilePicture: string;
  name: string;
  bio?: string | null;
  connectionStatus?: boolean | null;
  following: number;
  followers: number;
};

export type RegularUserResponseFragment = {
  __typename?: "UserResponse";
  errors?: Array<{
    __typename?: "FieldError";
    field: string;
    message: string;
  }> | null;
  user?: {
    __typename?: "User";
    id: number;
    username: string;
    email: string;
    profilePicture: string;
    name: string;
    bio?: string | null;
    connectionStatus?: boolean | null;
    following: number;
    followers: number;
  } | null;
};

export type RoomSnippetFragment = {
  __typename?: "Room";
  id: string;
  title: string;
  private: boolean;
  maxMembers: number;
  createdAt: string;
  updatedAt: string;
  creator: { __typename?: "User"; id: number; username: string };
};

export type ConnectMutationVariables = Exact<{
  followingUserId: Scalars["Int"];
  wantsToFollow: Scalars["Boolean"];
}>;

export type ConnectMutation = { __typename?: "Mutation"; connect: boolean };

export type LoginMutationVariables = Exact<{
  email: Scalars["String"];
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "UserResponse";
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
    user?: {
      __typename?: "User";
      id: number;
      username: string;
      email: string;
      profilePicture: string;
      name: string;
      bio?: string | null;
      connectionStatus?: boolean | null;
      following: number;
      followers: number;
    } | null;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: RegisterInput;
}>;

export type RegisterMutation = {
  __typename?: "Mutation";
  register: {
    __typename?: "UserResponse";
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
    user?: {
      __typename?: "User";
      id: number;
      username: string;
      email: string;
      profilePicture: string;
      name: string;
      bio?: string | null;
      connectionStatus?: boolean | null;
      following: number;
      followers: number;
    } | null;
  };
};

export type UpdateUserMutationVariables = Exact<{
  options: UpdateUserInput;
}>;

export type UpdateUserMutation = {
  __typename?: "Mutation";
  updateUser: {
    __typename?: "UserResponse";
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
    user?: {
      __typename?: "User";
      id: number;
      username: string;
      email: string;
      profilePicture: string;
      name: string;
      bio?: string | null;
      connectionStatus?: boolean | null;
      following: number;
      followers: number;
    } | null;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?: {
    __typename?: "User";
    id: number;
    username: string;
    email: string;
    profilePicture: string;
    name: string;
    bio?: string | null;
    connectionStatus?: boolean | null;
    following: number;
    followers: number;
  } | null;
};

export type PeopleQueryVariables = Exact<{ [key: string]: never }>;

export type PeopleQuery = {
  __typename?: "Query";
  people: Array<{
    __typename?: "User";
    id: number;
    username: string;
    profilePicture: string;
    name: string;
  }>;
};

export type RoomsQueryVariables = Exact<{
  isPrivate: Scalars["Boolean"];
  cursor?: InputMaybe<Scalars["String"]>;
  limit: Scalars["Int"];
}>;

export type RoomsQuery = {
  __typename?: "Query";
  rooms: {
    __typename?: "PaginatedRooms";
    hasMore: boolean;
    rooms: Array<{
      __typename?: "Room";
      id: string;
      title: string;
      private: boolean;
      maxMembers: number;
      createdAt: string;
      updatedAt: string;
      creator: { __typename?: "User"; id: number; username: string };
    }>;
  };
};

export type UserQueryVariables = Exact<{
  username: Scalars["String"];
}>;

export type UserQuery = {
  __typename?: "Query";
  user: {
    __typename?: "UserResponse";
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
    user?: {
      __typename?: "User";
      id: number;
      username: string;
      email: string;
      profilePicture: string;
      name: string;
      bio?: string | null;
      connectionStatus?: boolean | null;
      following: number;
      followers: number;
    } | null;
  };
};

export type UserFromIdQueryVariables = Exact<{
  userId: Scalars["Int"];
}>;

export type UserFromIdQuery = {
  __typename?: "Query";
  userFromId: {
    __typename?: "UserResponse";
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
    user?: {
      __typename?: "User";
      id: number;
      username: string;
      email: string;
      profilePicture: string;
      name: string;
      bio?: string | null;
      connectionStatus?: boolean | null;
      following: number;
      followers: number;
    } | null;
  };
};

export type UsersQueryVariables = Exact<{
  userIds: Array<Scalars["Int"]> | Scalars["Int"];
}>;

export type UsersQuery = {
  __typename?: "Query";
  users: Array<{
    __typename?: "User";
    id: number;
    username: string;
    profilePicture: string;
  }>;
};

export const RegularErrorFragmentDoc = gql`
  fragment RegularError on FieldError {
    field
    message
  }
`;
export const RegularUserFragmentDoc = gql`
  fragment RegularUser on User {
    id
    username
    email
    profilePicture
    name
    bio
    connectionStatus
    following
    followers
  }
`;
export const RegularUserResponseFragmentDoc = gql`
  fragment RegularUserResponse on UserResponse {
    errors {
      ...RegularError
    }
    user {
      ...RegularUser
    }
  }
  ${RegularErrorFragmentDoc}
  ${RegularUserFragmentDoc}
`;
export const RoomSnippetFragmentDoc = gql`
  fragment RoomSnippet on Room {
    id
    title
    private
    maxMembers
    createdAt
    updatedAt
    creator {
      id
      username
    }
  }
`;
export const ConnectDocument = gql`
  mutation Connect($followingUserId: Int!, $wantsToFollow: Boolean!) {
    connect(followingUserId: $followingUserId, wantsToFollow: $wantsToFollow)
  }
`;
export type ConnectMutationFn = Apollo.MutationFunction<
  ConnectMutation,
  ConnectMutationVariables
>;

/**
 * __useConnectMutation__
 *
 * To run a mutation, you first call `useConnectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConnectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [connectMutation, { data, loading, error }] = useConnectMutation({
 *   variables: {
 *      followingUserId: // value for 'followingUserId'
 *      wantsToFollow: // value for 'wantsToFollow'
 *   },
 * });
 */
export function useConnectMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ConnectMutation,
    ConnectMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ConnectMutation, ConnectMutationVariables>(
    ConnectDocument,
    options
  );
}
export type ConnectMutationHookResult = ReturnType<typeof useConnectMutation>;
export type ConnectMutationResult = Apollo.MutationResult<ConnectMutation>;
export type ConnectMutationOptions = Apollo.BaseMutationOptions<
  ConnectMutation,
  ConnectMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($email: String!) {
    login(email: $email) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const RegisterDocument = gql`
  mutation Register($options: RegisterInput!) {
    register(options: $options) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const UpdateUserDocument = gql`
  mutation UpdateUser($options: UpdateUserInput!) {
    updateUser(options: $options) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options
  );
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult =
  Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      ...RegularUser
    }
  }
  ${RegularUserFragmentDoc}
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PeopleDocument = gql`
  query People {
    people {
      id
      username
      profilePicture
      name
    }
  }
`;

/**
 * __usePeopleQuery__
 *
 * To run a query within a React component, call `usePeopleQuery` and pass it any options that fit your needs.
 * When your component renders, `usePeopleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePeopleQuery({
 *   variables: {
 *   },
 * });
 */
export function usePeopleQuery(
  baseOptions?: Apollo.QueryHookOptions<PeopleQuery, PeopleQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PeopleQuery, PeopleQueryVariables>(
    PeopleDocument,
    options
  );
}
export function usePeopleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PeopleQuery, PeopleQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PeopleQuery, PeopleQueryVariables>(
    PeopleDocument,
    options
  );
}
export type PeopleQueryHookResult = ReturnType<typeof usePeopleQuery>;
export type PeopleLazyQueryHookResult = ReturnType<typeof usePeopleLazyQuery>;
export type PeopleQueryResult = Apollo.QueryResult<
  PeopleQuery,
  PeopleQueryVariables
>;
export const RoomsDocument = gql`
  query Rooms($isPrivate: Boolean!, $cursor: String, $limit: Int!) {
    rooms(isPrivate: $isPrivate, limit: $limit, cursor: $cursor) {
      rooms {
        ...RoomSnippet
      }
      hasMore
    }
  }
  ${RoomSnippetFragmentDoc}
`;

/**
 * __useRoomsQuery__
 *
 * To run a query within a React component, call `useRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomsQuery({
 *   variables: {
 *      isPrivate: // value for 'isPrivate'
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useRoomsQuery(
  baseOptions: Apollo.QueryHookOptions<RoomsQuery, RoomsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<RoomsQuery, RoomsQueryVariables>(
    RoomsDocument,
    options
  );
}
export function useRoomsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<RoomsQuery, RoomsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<RoomsQuery, RoomsQueryVariables>(
    RoomsDocument,
    options
  );
}
export type RoomsQueryHookResult = ReturnType<typeof useRoomsQuery>;
export type RoomsLazyQueryHookResult = ReturnType<typeof useRoomsLazyQuery>;
export type RoomsQueryResult = Apollo.QueryResult<
  RoomsQuery,
  RoomsQueryVariables
>;
export const UserDocument = gql`
  query User($username: String!) {
    user(username: $username) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUserQuery(
  baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
}
export function useUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    options
  );
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UserFromIdDocument = gql`
  query UserFromId($userId: Int!) {
    userFromId(userId: $userId) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;

/**
 * __useUserFromIdQuery__
 *
 * To run a query within a React component, call `useUserFromIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserFromIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserFromIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserFromIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    UserFromIdQuery,
    UserFromIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserFromIdQuery, UserFromIdQueryVariables>(
    UserFromIdDocument,
    options
  );
}
export function useUserFromIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserFromIdQuery,
    UserFromIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserFromIdQuery, UserFromIdQueryVariables>(
    UserFromIdDocument,
    options
  );
}
export type UserFromIdQueryHookResult = ReturnType<typeof useUserFromIdQuery>;
export type UserFromIdLazyQueryHookResult = ReturnType<
  typeof useUserFromIdLazyQuery
>;
export type UserFromIdQueryResult = Apollo.QueryResult<
  UserFromIdQuery,
  UserFromIdQueryVariables
>;
export const UsersDocument = gql`
  query Users($userIds: [Int!]!) {
    users(userIds: $userIds) {
      id
      username
      profilePicture
    }
  }
`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      userIds: // value for 'userIds'
 *   },
 * });
 */
export function useUsersQuery(
  baseOptions: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    options
  );
}
export function useUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    options
  );
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<
  UsersQuery,
  UsersQueryVariables
>;

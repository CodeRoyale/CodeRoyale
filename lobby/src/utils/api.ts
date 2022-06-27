import { GraphQLClient, gql } from "graphql-request";

const graphQLClient = new GraphQLClient(process.env.API, {
  headers: {
    "lobby-secret": process.env.LOBBY_SECRET,
  },
});

const createRoom = async (data: {
  title: string;
  private: boolean;
  creatorId: number;
  maxMembers: number;
}) => {
  const mutation = gql`
    mutation CreateRoom($input: RoomInput!) {
      createRoom(input: $input) {
        id
        title
        private
        maxMembers
        creatorId
      }
    }
  `;

  const variables = {
    input: { ...data },
  };

  return graphQLClient.request(mutation, variables);
};

export default { createRoom };

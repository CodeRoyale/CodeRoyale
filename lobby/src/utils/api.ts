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
        creator {
          username
        }
      }
    }
  `;

  const variables = {
    input: { ...data },
  };

  return graphQLClient.request(mutation, variables);
};

const deleteRoom = async (roomId: string) => {
  const mutation = gql`
    mutation DeleteRoom($roomId: String!) {
      deleteRoom(roomId: $roomId)
    }
  `;

  const variables = {
    roomId,
  };

  return graphQLClient.request(mutation, variables);
};

const getRandomQuestionIds = async (noOfIds: number): Promise<number[]> => {
  const query = gql`
    query GetRandomQuestionIds($noOfIds: Int!) {
      getRandomQuestionIds(noOfIds: $noOfIds)
    }
  `;

  const variables = {
    noOfIds,
  };

  return graphQLClient.request(query, variables);
};

export default { createRoom, deleteRoom, getRandomQuestionIds };

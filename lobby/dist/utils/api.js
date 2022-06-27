"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_request_1 = require("graphql-request");
const graphQLClient = new graphql_request_1.GraphQLClient(process.env.API, {
    headers: {
        "lobby-secret": process.env.LOBBY_SECRET,
    },
});
const createRoom = async (data) => {
    const mutation = (0, graphql_request_1.gql) `
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
        input: Object.assign({}, data),
    };
    return graphQLClient.request(mutation, variables);
};
exports.default = { createRoom };
//# sourceMappingURL=api.js.map
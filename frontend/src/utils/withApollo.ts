import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";
import { withApollo as createWithApollo } from "next-apollo";
import { PaginatedRooms } from "../generated/graphql";

const createClient = (ctx?: NextPageContext) =>
  new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL as string,
    credentials: "include",
    headers: {
      // cookie forwarding (for ssr we needs to pass the cookie from our client to the graphql api through the server, since req are made on the server)
      cookie:
        // undefined means we are on the server
        (typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined) || "",
    },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            rooms: {
              keyArgs: [],
              merge(
                existing: PaginatedRooms | undefined,
                incoming: PaginatedRooms
              ): PaginatedRooms {
                return {
                  ...incoming,
                  rooms: [...(existing?.rooms || []), ...incoming.rooms],
                };
              },
            },
          },
        },
      },
    }),
  });

export const withApollo = createWithApollo(createClient);

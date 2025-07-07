import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import type { ReactNode } from "react";
import { BASE_URL } from "utils/const.ts";
import { resolvers } from "./resolvers.ts";

const client = new ApolloClient({
  uri: BASE_URL,
  cache: new InMemoryCache(),
  resolvers: resolvers,
});

type ProviderProps = {
  children: ReactNode;
};

export const Provider = ({ children }: ProviderProps) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Provider;

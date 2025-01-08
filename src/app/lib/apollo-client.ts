import { createHttpLink, ApolloClient, DefaultOptions } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { InMemoryCache } from "@apollo/experimental-nextjs-app-support";

const graphUrl = process.env.GRAPH_URL;

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

export function apolloConfig(previewToken?: string) {
  let client: ApolloClient<any> | undefined = undefined;
  // In Preview Mode
  if (previewToken) {
    const httpLink = createHttpLink({
      uri: `https://${graphUrl}/content/v2`,
    });

    const authLink = setContext((_: any, { headers }: any) => {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${previewToken}`,
        },
      };
    });

    client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
      defaultOptions,
    });
  } else {
    // In Live Mode
    const singleGraphKey = process.env.GRAPH_SINGLE_KEY;
    const httpLink = createHttpLink({
      uri: `https://${graphUrl}/content/v2?auth=${singleGraphKey}`,
    });

    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
        },
      };
    });

    client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
      defaultOptions,
    });
  }

  return client;
}

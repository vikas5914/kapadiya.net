import { GraphQLClient } from "graphql-request";
import * as gql from "gql-query-builder";

// define the HygraphLoaderOptions interface

export interface HygraphLoaderOptions {
  /** Hygraph Content API Endpoint */
  endpoint: string;
  /** Hygraph Content API Token if the API is not public */
  token?: string;
  /** The fields to fetch from the API setup how gql-query-builder wants */
  fields: Array<string | object>;
  /** The operation to fetch from the API */
  operation: string | IOperation;
  /** The GraphQL variables to pass to the API */
  variables?: Array<object>;
  /** The rich text field to render */
  richText?: string;
}

async function fetchAllData(
  client,
  { fields, operation, variables }
) {
  let data = [];
  let hasNextPage = true;
  let endCursor = null;

  // Loop through all pages of data
  while (hasNextPage) {
    // build the query
    const query = gql.query({
      operation: operation,
      fields: fields,
      variables: {
        ...variables,
        first: 100,
        // if endCursor exists, add it to the variables otherwise, don't
        ...(endCursor && { after: endCursor }),
      },
    });
    // make the request with query and variables
    const res = await client.request(query.query, query.variables);

    // if next page exists, update endCursor and hasNextPage and call the function again
    if (res[operation].pageInfo.hasNextPage) {
      endCursor = res[operation].pageInfo.endCursor;
      data = [...data, ...res[operation].edges];
      hasNextPage = res[operation].pageInfo.hasNextPage;
    } else {
      data = [...data, ...res[operation].edges];
      hasNextPage = false;
    }
  }

  return data;
}

export function HygraphLoader({
  endpoint,
  token,
  fields,
  operation,
  variables,
  richText
}: HygraphLoaderOptions) {
  const client = new GraphQLClient(endpoint);

  if (!endpoint) {
    throw new Error("HygraphLoader requires an endpoint");
  }

  if (!fields) {
    throw new Error("HygraphLoader requires fields to be defined");
  }
  if (!operation) {
    throw new Error("HygraphLoader requires an operation to be defined");
  }


  if (token) {
    client.setHeader("Authorization", `Bearer ${token}`);
  }
  const connectionOperation = `${operation}Connection`;
  const connectionVariables = {
    ...variables,
    first: 100,
  };
  const connectionFields = [
    {
      pageInfo: ["endCursor", "hasNextPage"],
    },
    {
      aggregate: ["count"],
    },
    {
      edges: [
        {
          node: fields,
        },
      ],
    },
  ];

  return {
    name: "Hygraph Loader",
    load: async ({ config, logger, store, parseData, generateDigest, entryTypes }) => {
      logger.info(`Loading ${operation} data from Hygraph`);
      store.clear();

      const data = await fetchAllData(client, {
        fields: connectionFields,
        operation: connectionOperation,
        variables: connectionVariables,
      });

      for (const item of data) {
        let rendered = '';
        const itemData = item.node;
        const parsedData = await parseData({ id: itemData.slug, data: itemData });
        const digest = generateDigest(data);
        store.set({ id: parsedData.slug, data: parsedData, rendered });
      }

      logger.info(
        `Finished loading ${operation} with ${store.entries().length} items`
      );
    },
  };
}





interface IOperation {
  name: string;
  alias: string;
}
interface IQueryBuilderOptions {
  operation: string | IOperation;
  fields?: Fields;
  variables?: VariableOptions;
}
declare type VariableOptions =
  | {
      type?: string;
      name?: string;
      value: any;
      list?: boolean | [boolean];
      required?: boolean;
    }
  | {
      [k: string]: any;
    };

declare type Fields = Array<string | object | NestedField>;
declare type NestedField = {
  operation: string;
  variables: IQueryBuilderOptions[];
  fields: Fields;
  fragment?: boolean | null;
};
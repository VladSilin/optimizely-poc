import React from "react";
import { gql } from "@apollo/client";

import { apolloConfig } from "@/app/lib/apollo-client";
import CompositionComponentNode, {
  CompositionComponentNodeFragment,
} from "./components/CompositionComponentNode";

// NOTE: Using the same query here (no separate preview query), but relying on
// key and version to be blank. This is a hack for PoC purposes.
const VisualBuilder = gql`
  query VisualBuilder($key: String, $version: String) {
    storefront(
      where: {
        _metadata: { key: { eq: $key } }
        _or: { _metadata: { version: { eq: $version } } }
      }
    ) {
      items {
        composition {
          grids: nodes {
            ... on CompositionStructureNode {
              key
              rows: nodes {
                ... on CompositionStructureNode {
                  key
                  columns: nodes {
                    ... on CompositionStructureNode {
                      key
                      elements: nodes {
                        ...compositionComponentNode
                      }
                    }
                  }
                }
              }
            }
          }
        }
        _metadata {
          key
          version
        }
      }
    }
  }

  ${CompositionComponentNodeFragment}
`;

// NOTE: The use of searchParams causes this page to be dynamically rendered.
// searchParams are required to enable preview mode in lieu of other global state.
// If we wish to maintain a static site, this would need to change (keeping it as-is
// for PoC purposes)
async function RootPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const variables: Record<string, unknown> = {};

  const key = searchParams["key"];
  const version = searchParams["version"];

  if (version) {
    variables.version = version;
  }

  if (key) {
    variables.key = key;
  }

  const previewToken = searchParams["preview_token"];

  const { data } = await apolloConfig(previewToken).query({
    query: VisualBuilder,
    variables,
  });

  // TODO: See how to make this work in server component
  //useEffect(() => {
  //  onContentSaved((_) => {
  //    const contentIdArray = _.contentLink.split("_");
  //    if (contentIdArray.length > 1) {
  //      version = contentIdArray[contentIdArray.length - 1];
  //      variables.version = version;
  //    }
  //    refetch(variables);
  //  });
  //}, []);

  const experiences = data?.storefront?.items;
  if (!experiences) {
    return null;
  }

  const experience: any = experiences[experiences.length - 1];

  if (!experience) {
    return null;
  }

  return (
    <div className="relative w-full flex-1 vb:outline">
      <div className="relative w-full flex-1 vb:outline">
        {experience?.composition?.grids?.map((grid: any) => (
          <div
            key={grid.key}
            className="relative w-full flex flex-col flex-nowrap justify-start vb:grid"
            data-epi-block-id={grid.key}
          >
            {grid.rows?.map((row: any) => (
              <div
                key={row.key}
                className="flex-1 flex flex-row flex-nowrap justify-start vb:row"
              >
                {row.columns?.map((column: any) => (
                  <div
                    className="flex-1 flex flex-col flex-nowrap justify-start vb:col"
                    key={column.key}
                  >
                    {column.elements?.map((element: any) => (
                      <div data-epi-block-id={element?.key} key={element?.key}>
                        <CompositionComponentNode
                          compositionComponentNode={element}
                          previewToken={previewToken}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RootPage;

/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  query ProductDetailPages {\n    productDetailPage {\n      items {\n        slug\n      }\n    }\n  }\n": types.ProductDetailPagesDocument,
    "\n  query ProductDetailPagePreview($key: String, $version: String) {\n    productDetailPage(\n      where: {\n        _metadata: { key: { eq: $key } }\n        _or: { _metadata: { version: { eq: $version } } }\n      }\n    ) {\n      items {\n        _metadata {\n          url {\n            hierarchical\n          }\n        }\n        pageTitle\n        pageContent {\n          html\n        }\n        slug\n      }\n    }\n  }\n": types.ProductDetailPagePreviewDocument,
    "\n  query MyQuery($slug: String) {\n    productDetailPage(\n      where: { _metadata: { url: { hierarchical: { endsWith: $slug } } } }\n    ) {\n      items {\n        _metadata {\n          url {\n            hierarchical\n          }\n        }\n        pageTitle\n        pageContent {\n          html\n        }\n        slug\n      }\n    }\n  }\n": types.MyQueryDocument,
    "\n  fragment compositionComponentNode on CompositionComponentNode {\n    key\n    component {\n      _metadata {\n        types\n      }\n      ...heroBannerFragment\n      ...productZoneFragment\n    }\n  }\n\n  \n  \n": types.CompositionComponentNodeFragmentDoc,
    "\n  fragment heroBannerFragment on storefrontHeroBanner {\n    title\n    subtitle\n  }\n": types.HeroBannerFragmentFragmentDoc,
    "\n  fragment productZoneFragment on productZone {\n    rows\n    columns\n  }\n": types.ProductZoneFragmentFragmentDoc,
    "\n  query ProductThumbnails {\n    productDetailPage {\n      items {\n        slug\n        thumbnail {\n          title\n          spanRows\n          spanColumns\n          image {\n            default\n          }\n        }\n      }\n    }\n  }\n": types.ProductThumbnailsDocument,
    "\n  query VisualBuilder($key: String, $version: String) {\n    _Experience(\n      where: {\n        _metadata: { key: { eq: $key } }\n        _or: { _metadata: { version: { eq: $version } } }\n      }\n    ) {\n      items {\n        composition {\n          grids: nodes {\n            ... on CompositionStructureNode {\n              key\n              rows: nodes {\n                ... on CompositionStructureNode {\n                  key\n                  columns: nodes {\n                    ... on CompositionStructureNode {\n                      key\n                      elements: nodes {\n                        ...compositionComponentNode\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n        _metadata {\n          key\n          version\n        }\n      }\n    }\n  }\n\n  \n": types.VisualBuilderDocument,
    "\n    query getContentType($key: String!, $version: String) {\n      content: _Content(\n        where: {\n          _or: [{ _metadata: { key: { eq: $key }, version: { eq: $version } } }]\n        }\n      ) {\n        total\n        items {\n          _metadata {\n            types\n            url {\n              hierarchical\n            }\n          }\n        }\n      }\n    }\n  ": types.GetContentTypeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ProductDetailPages {\n    productDetailPage {\n      items {\n        slug\n      }\n    }\n  }\n"): (typeof documents)["\n  query ProductDetailPages {\n    productDetailPage {\n      items {\n        slug\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ProductDetailPagePreview($key: String, $version: String) {\n    productDetailPage(\n      where: {\n        _metadata: { key: { eq: $key } }\n        _or: { _metadata: { version: { eq: $version } } }\n      }\n    ) {\n      items {\n        _metadata {\n          url {\n            hierarchical\n          }\n        }\n        pageTitle\n        pageContent {\n          html\n        }\n        slug\n      }\n    }\n  }\n"): (typeof documents)["\n  query ProductDetailPagePreview($key: String, $version: String) {\n    productDetailPage(\n      where: {\n        _metadata: { key: { eq: $key } }\n        _or: { _metadata: { version: { eq: $version } } }\n      }\n    ) {\n      items {\n        _metadata {\n          url {\n            hierarchical\n          }\n        }\n        pageTitle\n        pageContent {\n          html\n        }\n        slug\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MyQuery($slug: String) {\n    productDetailPage(\n      where: { _metadata: { url: { hierarchical: { endsWith: $slug } } } }\n    ) {\n      items {\n        _metadata {\n          url {\n            hierarchical\n          }\n        }\n        pageTitle\n        pageContent {\n          html\n        }\n        slug\n      }\n    }\n  }\n"): (typeof documents)["\n  query MyQuery($slug: String) {\n    productDetailPage(\n      where: { _metadata: { url: { hierarchical: { endsWith: $slug } } } }\n    ) {\n      items {\n        _metadata {\n          url {\n            hierarchical\n          }\n        }\n        pageTitle\n        pageContent {\n          html\n        }\n        slug\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment compositionComponentNode on CompositionComponentNode {\n    key\n    component {\n      _metadata {\n        types\n      }\n      ...heroBannerFragment\n      ...productZoneFragment\n    }\n  }\n\n  \n  \n"): (typeof documents)["\n  fragment compositionComponentNode on CompositionComponentNode {\n    key\n    component {\n      _metadata {\n        types\n      }\n      ...heroBannerFragment\n      ...productZoneFragment\n    }\n  }\n\n  \n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment heroBannerFragment on storefrontHeroBanner {\n    title\n    subtitle\n  }\n"): (typeof documents)["\n  fragment heroBannerFragment on storefrontHeroBanner {\n    title\n    subtitle\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment productZoneFragment on productZone {\n    rows\n    columns\n  }\n"): (typeof documents)["\n  fragment productZoneFragment on productZone {\n    rows\n    columns\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ProductThumbnails {\n    productDetailPage {\n      items {\n        slug\n        thumbnail {\n          title\n          spanRows\n          spanColumns\n          image {\n            default\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query ProductThumbnails {\n    productDetailPage {\n      items {\n        slug\n        thumbnail {\n          title\n          spanRows\n          spanColumns\n          image {\n            default\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query VisualBuilder($key: String, $version: String) {\n    _Experience(\n      where: {\n        _metadata: { key: { eq: $key } }\n        _or: { _metadata: { version: { eq: $version } } }\n      }\n    ) {\n      items {\n        composition {\n          grids: nodes {\n            ... on CompositionStructureNode {\n              key\n              rows: nodes {\n                ... on CompositionStructureNode {\n                  key\n                  columns: nodes {\n                    ... on CompositionStructureNode {\n                      key\n                      elements: nodes {\n                        ...compositionComponentNode\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n        _metadata {\n          key\n          version\n        }\n      }\n    }\n  }\n\n  \n"): (typeof documents)["\n  query VisualBuilder($key: String, $version: String) {\n    _Experience(\n      where: {\n        _metadata: { key: { eq: $key } }\n        _or: { _metadata: { version: { eq: $version } } }\n      }\n    ) {\n      items {\n        composition {\n          grids: nodes {\n            ... on CompositionStructureNode {\n              key\n              rows: nodes {\n                ... on CompositionStructureNode {\n                  key\n                  columns: nodes {\n                    ... on CompositionStructureNode {\n                      key\n                      elements: nodes {\n                        ...compositionComponentNode\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n        _metadata {\n          key\n          version\n        }\n      }\n    }\n  }\n\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getContentType($key: String!, $version: String) {\n      content: _Content(\n        where: {\n          _or: [{ _metadata: { key: { eq: $key }, version: { eq: $version } } }]\n        }\n      ) {\n        total\n        items {\n          _metadata {\n            types\n            url {\n              hierarchical\n            }\n          }\n        }\n      }\n    }\n  "): (typeof documents)["\n    query getContentType($key: String!, $version: String) {\n      content: _Content(\n        where: {\n          _or: [{ _metadata: { key: { eq: $key }, version: { eq: $version } } }]\n        }\n      ) {\n        total\n        items {\n          _metadata {\n            types\n            url {\n              hierarchical\n            }\n          }\n        }\n      }\n    }\n  "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
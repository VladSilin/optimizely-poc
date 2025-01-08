import React from "react";
import { gql } from "@apollo/client/core";

import { apolloConfig } from "@/app/lib/apollo-client";

type Params = {
  slug: string;
};

const ProductDetailPages = gql`
  query ProductDetailPages {
    productDetailPage {
      items {
        slug
      }
    }
  }
`;

const ProductDetailPagePreview = gql`
  query ProductDetailPagePreview($key: String, $version: String) {
    productDetailPage(
      where: {
        _metadata: { key: { eq: $key } }
        _or: { _metadata: { version: { eq: $version } } }
      }
    ) {
      items {
        _metadata {
          url {
            hierarchical
          }
        }
        pageTitle
        pageContent {
          html
        }
        slug
      }
    }
  }
`;

const ProductDetailPage = gql`
  query MyQuery($slug: String) {
    productDetailPage(
      where: { _metadata: { url: { hierarchical: { endsWith: $slug } } } }
    ) {
      items {
        _metadata {
          url {
            hierarchical
          }
        }
        pageTitle
        pageContent {
          html
        }
        slug
      }
    }
  }
`;

async function getProductDetailPage(
  previewToken?: string,
  key?: string,
  version?: string,
  slug?: string
): Promise<any> {
  if (previewToken) {
    const {
      data: { productDetailPage },
    } = await apolloConfig(previewToken).query({
      query: ProductDetailPagePreview,
      variables: {
        key,
        version,
      },
    });

    return productDetailPage;
  } else {
    const {
      data: { productDetailPage },
    } = await apolloConfig().query({
      query: ProductDetailPage,
      variables: {
        slug: `${slug}/`,
      },
    });

    return productDetailPage;
  }
}

// NOTE: Generating new pages currently doesn't work
// with preview data.
// The preview token is ephemeral and cannot be saved in environment variables.
export async function generateStaticParams() {
  //const previewToken = process.env.PREVIEW_TOKEN;
  const { data } = await apolloConfig().query({
    query: ProductDetailPages,
  });

  const productDetailPages = data?.productDetailPage?.items;

  return productDetailPages.map((p: any) => ({ slug: p.slug }));
}

// NOTE: Currently, generateStaticParams() retrieves only published pages
// Perhaps this property could be used to vary page generation behaviour, but forgoing this for PoC purposes
export const dynamicParams = false;

async function CardDetailPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: { [key: string]: string | undefined };
}) {
  const productDetailPage = await getProductDetailPage(
    searchParams["preview_token"],
    searchParams["key"],
    searchParams["version"],
    params.slug
  );

  const cardDetailsPage = productDetailPage?.items.find(
    (p: any) => p.slug === params.slug
  );

  return (
    <div className="md:flex md:justify-center relative overflow-auto p-8 my-20 min-h-screen">
      <article className="prose lg:prose-xl">
        <h1>{cardDetailsPage.pageTitle}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: cardDetailsPage.pageContent.html }}
        />
      </article>
    </div>
  );
}

export default CardDetailPage;

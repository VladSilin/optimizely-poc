import React from "react";
import { gql } from "@apollo/client";

import { apolloConfig } from "@/app/lib/apollo-client";
import Card from "./Card";

type ProductZoneProps = {
  rows: number;
  columns: number;

  // Required since this component makes its own query call for PoC purposes
  previewToken?: string;
};

export const ProductZoneFragment = gql`
  fragment productZoneFragment on productZone {
    rows
    columns
  }
`;

const ProductThumbnails = gql`
  query ProductThumbnails {
    productDetailPage {
      items {
        slug
        thumbnail {
          title
          spanRows
          spanColumns
          image {
            default
          }
        }
      }
    }
  }
`;

export default async function ProductZone(props: ProductZoneProps) {
  const {
    data: { productDetailPage },
  } = await apolloConfig(props.previewToken).query({
    query: ProductThumbnails,
  });

  const products = productDetailPage?.items.sort((a: any, b: any) =>
    a.thumbnail.title > b.thumbnail.title ? 1 : -1
  );

  return (
    <section id="card-product-zone">
      {/* min-h-screen */}
      <div className="md:flex md:justify-center relative overflow-auto p-8 bg-sky-100">
        <div
          className={`grid grid-cols-1 md:grid-cols-${props.columns} grid-rows-${props.rows} gap-6 font-mono text-black text-xl text-center font-bold leading-6 rounded-lg`}
        >
          {products.map((product: any, i: number) => {
            const cardProps = {
              cardIndex: i,

              cardTitle: product.thumbnail.title,
              cardImage: product.thumbnail.image.default,

              spanRows: product.thumbnail.spanRows,
              spanColumns: product.thumbnail.spanColumns,

              slug: product.slug,
            };

            return <Card key={i} {...cardProps} />;
          })}
        </div>
      </div>
    </section>
  );
}

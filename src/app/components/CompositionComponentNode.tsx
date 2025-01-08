import React from "react";
import { gql } from "@apollo/client";

import HeroBanner, { HeroBannerFragment } from "./HeroBanner";
import ProductZone, { ProductZoneFragment } from "./ProductZone";

export const CompositionComponentNodeFragment = gql`
  fragment compositionComponentNode on CompositionComponentNode {
    key
    component {
      _metadata {
        types
      }
      ...heroBannerFragment
      ...productZoneFragment
    }
  }

  ${HeroBannerFragment}
  ${ProductZoneFragment}
`;

// NOTE: Prop-drilling the previewToken here for PoC purposes
const CompositionComponentNode = (props: {
  compositionComponentNode: any;
  previewToken?: string;
}) => {
  // TODO: Put proper types on this
  const component = props.compositionComponentNode.component;

  switch (component?.__typename) {
    case "storefrontHeroBanner":
      return (
        <HeroBanner title={component.title} subtitle={component.subtitle} />
      );
    case "productZone":
      return (
        <ProductZone
          rows={component.rows}
          columns={component.columns}
          previewToken={props.previewToken}
        />
      );
    default:
      return <>NotImplementedException</>;
  }
};

export default CompositionComponentNode;

import React from "react";
import { gql } from "@apollo/client";

type HeroBannerProps = {
  title: string;
  subtitle: string;
};

export const HeroBannerFragment = gql`
  fragment heroBannerFragment on storefrontHeroBanner {
    title
    subtitle
  }
`;

export default function HeroBanner(props: HeroBannerProps) {
  return (
    <section id="hero-banner" className="bg-sky-950">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1
          data-epi-edit="title"
          className="mt-2 mb-4 text-4xl font-bold tracking-tight leading-none text-white md:text-5xl lg:text-6xl"
        >
          {props.title}
        </h1>
        <p
          data-epi-edit="subtitle"
          className="mb-8 text-lg font-normal text-gray-400 lg:text-xl sm:px-16 xl:px-48"
        >
          {props.subtitle}
        </p>
      </div>
    </section>
  );
}

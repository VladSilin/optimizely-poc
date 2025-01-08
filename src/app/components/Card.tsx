"use client";

import React from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

type CardProps = {
  cardIndex: number;

  cardTitle: string;
  cardImage: string;
  spanRows: number;
  spanColumns: number;

  slug?: string;
};

function Card(props: CardProps) {
  const { cardIndex, cardTitle, cardImage, spanRows, spanColumns, slug } =
    props;

  const router = useRouter();

  return (
    <div
      id={`card-${cardIndex}`}
      key={cardIndex}
      className={`p-4 rounded-md md:rounded-lg shadow-xl bg-white grid row-span-${spanRows} col-span-1 md:col-span-${spanColumns}`}
      onClick={() => {
        if (!slug) {
          return;
        }

        router.push(`/cards/${slug}`);
      }}
    >
      <div className="p-1 pb-6 row-span-1">
        <h3>{cardTitle}</h3>
      </div>
      <div className="flex justify-center items-center p-1 pb-6">
        <Image
          src={cardImage}
          alt={`Card ${cardIndex + 1} Image`}
          width={200}
          height={100}
          priority
        />
      </div>
    </div>
  );
}

export default Card;

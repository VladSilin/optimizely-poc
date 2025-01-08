"use client";

import { useEffect, useRef } from "react";

type RefreshProps = {
  interval?: number;
};

export default function Refresh({ interval = 3000 }: RefreshProps) {
  const intervalId = useRef();

  useEffect(() => {
    const currentIntervalId = intervalId.current;

    setInterval(() => {
      window.location.reload();
    }, interval);

    return () => clearInterval(currentIntervalId);
  }, [interval]);

  return null;
}

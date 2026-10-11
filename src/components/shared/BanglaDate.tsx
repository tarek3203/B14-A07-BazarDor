"use client";

import { useSyncExternalStore } from "react";
import { bnDate } from "@/lib/bn";

const subscribe = () => () => {};

// empty on the server, today's date once the client takes over, so the two
// renders never disagree
const BanglaDate = () => {
  const today = useSyncExternalStore(
    subscribe,
    () => bnDate(new Date()),
    () => "",
  );

  return <span className="block min-h-4 text-xs text-muted">{today}</span>;
};

export default BanglaDate;

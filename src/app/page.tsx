import React from "react";
import dynamic from "next/dynamic";
import { Loading } from "./components";

const SearchNumber = dynamic(() => import("./components/search-number"), {
  loading: () => <Loading />,
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-24">
      <SearchNumber />
    </main>
  );
}

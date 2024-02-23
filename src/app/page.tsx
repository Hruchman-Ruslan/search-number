import React from "react";
import dynamic from "next/dynamic";

const SearchNumber = dynamic(() => import("./components/search-number"), {
  loading: () => (
    <div className="flex items-center justify-center">
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4.472v3.093c-3.042.662-5.521 2.799-6 5.726H6zm9.071-5.655A7.962 7.962 0 0119.945 12H16v4.472a7.984 7.984 0 01-4-1.182V12h7.071zM12 20.472V16h-4.945a8.015 8.015 0 01-1.027 3.445l1.972 1.068C9.841 21.592 10.883 22 12 22c1.968 0 3.76-.902 4.945-2.328l-1.972-1.068z"
        ></path>
      </svg>
      <p className="text-gray-700">Loading...</p>
    </div>
  ),
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-24">
      <SearchNumber />
    </main>
  );
}

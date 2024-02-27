"use client";

import React, { ChangeEvent, useState } from "react";
import Image from "next/image";

import { findMean, findMedian, findSequence } from "../utils";

import { Loading } from ".";

import imageDefault from "../../../public/default.png";

export interface SearchNumberProps {}

export default function SearchNumber({}: SearchNumberProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [searchResult, setSearchResult] = useState<{
    largestNumber: number | null;
    smallestNumber: number | null;
    median: number | null;
    mean: number | null;
    increasing: number[];
    decreasing: number[];
  }>({
    largestNumber: null,
    smallestNumber: null,
    median: null,
    mean: null,
    increasing: [],
    decreasing: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleSearch = () => {
    if (!selectedFile) {
      setError("Please choose a file.");
      return;
    }

    setLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        const content = e.target.result as string;
        const numbers = content.split(/\s+/).map(Number);

        const sortedNumbers = numbers.toSorted((a, b) => a - b);

        setSearchResult({
          largestNumber: sortedNumbers[sortedNumbers.length - 1],
          smallestNumber: sortedNumbers[0],
          median: findMedian(sortedNumbers),
          mean: findMean(sortedNumbers),
          increasing: findSequence(sortedNumbers, true),
          decreasing: findSequence(sortedNumbers.reverse()),
        });
        setLoading(false);
        setError(null);
      }
    };
    reader.readAsText(selectedFile);
  };

  return (
    <div className="flex gap-5 items-center">
      <div>
        <input
          type="file"
          onChange={handleFileChange}
          className="border-2 border-purple-800 hover:bg-sky-700 font-bold p-1 rounded-md mr-2 cursor-pointer transition duration-500 ease-in-out"
        />
        <button
          onClick={handleSearch}
          className="bg-purple-700 hover:bg-sky-700 text-white font-bold py-3 px-8 rounded-md transition duration-500 ease-in-out"
        >
          Search
        </button>
      </div>

      {loading ? (
        <Loading />
      ) : (
        searchResult.largestNumber !== null && (
          <div className="border-2 border-purple-800 hover:bg-sky-700 p-2 rounded-md transition duration-500 ease-in-out">
            <ul className="flex flex-col gap-2 ">
              <li>
                <span className="text-white font-bold">
                  Largest Number: {searchResult.largestNumber}
                </span>
              </li>

              <li>
                <span className="text-white font-bold">
                  Smallest Number: {searchResult.smallestNumber}
                </span>
              </li>

              <li>
                <span className="text-white font-bold">
                  Median: {searchResult.median}
                </span>
              </li>

              <li>
                <span className="text-white font-bold">
                  Arithmetic average: {searchResult.mean}
                </span>
              </li>

              <li>
                <span className="text-white font-bold">
                  Increasing Sequence: {searchResult.increasing.join(", ")}
                </span>
              </li>

              <li>
                <span className="text-white font-bold">
                  Decreasing Sequence: {searchResult.decreasing.join(", ")}
                </span>
              </li>
            </ul>
          </div>
        )
      )}

      {error && (
        <div
          className="bg-transparent border border-red-700 text-red-700 px-4 py-3 rounded flex flex-col items-center justify-center gap-2"
          role="alert"
          style={{ animation: "fade-in 0.5s forwards" }}
        >
          <Image src={imageDefault} alt="default image" width={150} />
          <p className="font-bold">{error}</p>
        </div>
      )}
    </div>
  );
}

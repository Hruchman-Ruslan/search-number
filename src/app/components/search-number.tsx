"use client";

import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import { findMean, findMedian } from "../utils";
import { Loading } from ".";
import imageDefault from "../../../public/default.png";

export interface SearchNumberProps {}

export default function SearchNumber({}: SearchNumberProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [largestNumber, setLargestNumber] = useState<number | null>(null);
  const [smallestNumber, setSmallestNumber] = useState<number | null>(null);
  const [median, setMedian] = useState<number | null>(null);
  const [mean, setMean] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleSearch = () => {
    if (selectedFile) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          const content = e.target.result as string;
          const numbers = content.split(/\s+/).map(Number);
          const sortedNumbers = numbers.sort((a, b) => a - b);

          let maxNumber: number | null = null;
          let minNumber: number | null = null;

          for (const num of sortedNumbers) {
            if (maxNumber === null || num > maxNumber) maxNumber = num;
            if (minNumber === null || num < minNumber) minNumber = num;
          }

          setLargestNumber(maxNumber);
          setSmallestNumber(minNumber);
          setMedian(findMedian(sortedNumbers));
          setMean(findMean(sortedNumbers));
          setLoading(false);
          setError(false);
        }
      };
      reader.readAsText(selectedFile);
    }

    if (!selectedFile) setError(true);
  };

  return loading ? (
    <Loading />
  ) : (
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

      {largestNumber !== null &&
        smallestNumber !== null &&
        median !== null &&
        mean !== null && (
          <div className="border-2 border-purple-800 hover:bg-sky-700 p-2 rounded-md transition duration-500 ease-in-out">
            <ul className="flex flex-col gap-2 ">
              <li>
                <span className="text-white font-bold">
                  Largest Number: {largestNumber}
                </span>
              </li>

              <li>
                <span className="text-white font-bold">
                  Smallest Number: {smallestNumber}
                </span>
              </li>

              <li>
                <span className="text-white font-bold">Median: {median}</span>
              </li>

              <li>
                <span className="text-white font-bold">Mean: {mean}</span>
              </li>
            </ul>
          </div>
        )}

      {error && (
        <div
          className="bg-transparent border border-red-700 text-red-700 px-4 py-3 rounded flex flex-col items-center justify-center gap-2"
          role="alert"
          style={{ animation: "fade-in 0.5s forwards" }}
        >
          <Image src={imageDefault} alt="default image" width={150} />
          <p className="font-bold">Please choose the file.</p>
        </div>
      )}
    </div>
  );
}

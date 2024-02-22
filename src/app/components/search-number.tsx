"use client";

import React, { ChangeEvent, useState } from "react";

export interface SearchNumberProps {}

export default function SearchNumber({}: SearchNumberProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [largestNumber, setLargestNumber] = useState<number | null>(null);
  const [smallestNumber, setSmallestNumber] = useState<number | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleSearch = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          const content = e.target.result as string;
          const numbers = content.split(/\s+/).map(Number);
          let maxNumber: number | null = null;
          let minNumber: number | null = null;

          for (const num of numbers) {
            if (maxNumber === null || num > maxNumber) maxNumber = num;
            if (minNumber === null || num < minNumber) minNumber = num;
          }

          setLargestNumber(maxNumber);
          setSmallestNumber(minNumber);
        }
      };
      reader.readAsText(selectedFile);
    }
  };

  return (
    <div className="flex gap-5 items-center">
      <div>
        <input
          type="file"
          onChange={handleFileChange}
          className="border-2 border-purple-800 hover:bg-sky-700 p-1 rounded-md mr-2 cursor-pointer transition duration-500 ease-in-out"
        />
        <button
          onClick={handleSearch}
          className="bg-purple-700 hover:bg-sky-700 text-white font-bold py-3 px-8 rounded-md transition duration-500 ease-in-out"
        >
          Search
        </button>
      </div>

      {largestNumber !== null && smallestNumber !== null && (
        <div className="border-2 border-purple-800 hover:bg-sky-700 p-1 rounded-md transition duration-500 ease-in-out">
          <ul className="flex flex-col gap-2 ">
            <li>
              <span className=" text-white font-bold">
                Largest Number: {largestNumber}
              </span>
            </li>

            <li>
              <span className=" text-white font-bold">
                Smallest Number: {smallestNumber}
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { ChangeEvent, useState } from "react";

export interface SearchNumberProps {
  number?: number;
}

export default function SearchNumber({ number }: SearchNumberProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleSearch = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          const content = e.target.result;
          console.log(content);
        }
      };
      reader.readAsText(selectedFile);
    }
  };

  return (
    <>
      <input
        type="file"
        onChange={handleFileChange}
        className="border-2 border-purple-800 hover:bg-sky-700 p-1 rounded-md mr-2 cursor-pointer"
      />
      <button
        onClick={handleSearch}
        className="bg-purple-700 hover:bg-sky-700 text-white font-bold py-3 px-8 rounded-md transition duration-500 ease-in-out"
      >
        Search
      </button>
    </>
  );
}

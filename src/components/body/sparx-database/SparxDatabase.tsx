import { Suspense, useState } from "react";

import AlgebraData from "./../../../data/filePaths/AlgebraCompressed.json";
import GeometryData from "./../../../data/filePaths/GeometryCompressed.json";
import NumberData from "./../../../data/filePaths/NumberCompressed.json";
import ProbabilityData from "./../../../data/filePaths/ProbabilityCompressed.json";
import RatioAndProportionData from "./../../../data/filePaths/RatioAndProportionCompressed.json";
import StatisticsData from "./../../../data/filePaths/StatisticsCompressed.json";

function SparxImage({ compressedPath }: { compressedPath: string }) {
  function decompressPath() {
    return `./sparxDatabaseImages/[${
      compressedPath.split("-")[0] == "a"
        ? "Algebra"
        : compressedPath.split("-")[0] == "g"
        ? "Geometry"
        : compressedPath.split("-")[0] == "n"
        ? "Number"
        : compressedPath.split("-")[0] == "p"
        ? "Probability"
        : compressedPath.split("-")[0] == "r"
        ? "Ratio and Proportion"
        : "Statistics"
    }-GCSE-${compressedPath.split("-")[1]}][${compressedPath
      .split("-")[2]
      .replace(".", "-")
      .replace(".", "-")}].webp`;
  }
  return (
    <Suspense
      fallback={
        <div className="w-1/4 aspect-video m-1 mx-2 border rounded-md">
          <div className="w-full h-full bg-gray-400 animate-pulse text-white"></div>
        </div>
      }
    >
      <a
        className="group hover:bg-gray-400 w-1/4 aspect-video m-1 mx-2 border rounded-md hover:rounded-lg hover:shadow-lg hover:-translate-y-1"
        href={decompressPath()}
        download={decompressPath().replace("./sparxDatabaseImages/", "")}
      >
        <img
          className="rounded-md invert-[0.86] group-hover:invert-[0.84] hover:rounded-lg"
          src={decompressPath()}
          alt=""
        />
      </a>
    </Suspense>
  );
}

function SparxDatabase() {
  const batchSize = 40;
  const [batchNumber, setBatchNumber] = useState(1);

  const [selectedDataTypes, setSelectedDataTypes] = useState(["Algebra"]);
  const [imagesUpdate, setImagesUpdate] = useState(1);

  return (
    <div className="w-full h-screen m-0 bg-gray-500 overflow-auto scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-transparent flex flex-col items-center">
      <div>
        {[
          "Algebra",
          "Geometry",
          "Number",
          "Probability",
          "Ratio and Proportion",
          "Statistics",
        ].map((dataType: string) => (
          <button
            className={`border ${
              selectedDataTypes.includes(dataType)
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-500 hover:bg-gray-400"
            } text-white p-2 rounded-md my-5 px-6 mx-1 hover:shadow-md hover:-translate-y-[1px]`}
            onClick={() => {
              if (selectedDataTypes.includes(dataType)) {
                setSelectedDataTypes(
                  selectedDataTypes.filter((d) => d != dataType)
                );
              } else {
                setSelectedDataTypes([...selectedDataTypes, dataType]);
              }
              setBatchNumber(1);
              setImagesUpdate(imagesUpdate + 1);
            }}
          >
            {dataType}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center mt-10">
        {imagesUpdate &&
          [
            ...(selectedDataTypes.includes("Algebra") ? AlgebraData : []),
            ...(selectedDataTypes.includes("Geometry") ? GeometryData : []),
            ...(selectedDataTypes.includes("Number") ? NumberData : []),
            ...(selectedDataTypes.includes("Probability")
              ? ProbabilityData
              : []),
            ...(selectedDataTypes.includes("Ratio and Proportion")
              ? RatioAndProportionData
              : []),
            ...(selectedDataTypes.includes("Statistics") ? StatisticsData : []),
          ]
            .sort(() => Math.random() - 0.5)
            .slice(0, batchNumber * batchSize)
            .map((data: any) => (
              <SparxImage
                {...{
                  compressedPath: data,
                }}
              />
            ))}
      </div>
      <button
        className="border bg-gray-500 text-white p-2 hover:bg-gray-400 rounded-md my-5 px-12"
        onClick={() => setBatchNumber(batchNumber + 1)}
      >
        Load more
      </button>
    </div>
  );
}

export default SparxDatabase;

import { useState } from "react";
import { BsSearch } from "react-icons/bs";

import { IoIosArrowForward } from "react-icons/io";

import recursivePathsMapping from "./recursivePathsMapping";

import topicsData from "../../../data/topicsData.json";
import TopicsPage from "../topics/Topics";

function searchThroughData(
  data: any,
  searchValue: string,
  setSearchValue: (searchValue: string) => void,
  useContentFunction: ([title, content]: [string, any]) => void
) {
  return (
    <div className="text-white flex flex-wrap p-10 pt-5">
      {recursivePathsMapping({
        data: data,
      })
        .filter((data: any) =>
          data.path.toLowerCase().includes(searchValue.toLowerCase())
        )
        .map((data: any) => (
          <button
            className="p-2 m-1 border rounded-md flex flex-col hover:bg-gray-400 group"
            onClick={() => {
              if (data.isDirect) {
                useContentFunction([
                  data.path.split("/")[data.path.split("/").length - 1],
                  data.data,
                ]);
              } else {
                setSearchValue(data.path);
              }
            }}
          >
            <span className="text-xs text-muted">{data.path}</span>
            <div className="flex flex-row items-center justify-between w-full">
              <span className="text-lg text-white">
                {data.path.split("/")[data.path.split("/").length - 1]}
              </span>
              <IoIosArrowForward className="text-transparent group-hover:text-white ms-2" />
            </div>
          </button>
        ))}
    </div>
  );
}

function Search({
  setContent,
  topicHistory,
  setTopicHistory,
}: {
  setContent: (content: any) => void;
  topicHistory: any;
  setTopicHistory: (topicData: any) => void;
}) {
  const [searchValue, setSearchValue] = useState("");
  function addTopicToHistory(topicData: any) {
    const contentExists = topicHistory.some(
      (item: any) => item[1] === topicData[1]
    );
    if (!contentExists) {
      return [...topicHistory, topicData];
    }
    return topicHistory;
  }
  return (
    <div className="w-full h-screen m-0 bg-gray-500 flex flex-col items-center overflow-auto scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-transparent">
      <div className="w-1/2 h-fit bg-gray-500 text-white rounded-full border border-muted placeholder-muted flex flex-row mt-5">
        <button className="text-md bg-gray-600 w-8 h-full rounded-s-full flex justify-end items-center">
          <BsSearch />
        </button>
        <input
          type="text"
          id="large-input"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-[calc(100%-2rem)] bg-gray-600 h-full p-3 text-white rounded-e-full border-muted placeholder-muted focus:outline-none"
        />
      </div>
      {searchThroughData(
        topicsData,
        searchValue,
        setSearchValue,
        ([title, content]: [string, any]) => {
          setContent(
            <TopicsPage
              data={content}
              topicHistory={addTopicToHistory([title, content])}
              setContent={setContent}
            />
          );
          setTopicHistory(addTopicToHistory([title, content]));
        }
      )}
    </div>
  );
}

export default Search;

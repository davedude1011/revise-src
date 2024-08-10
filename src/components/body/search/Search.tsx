import { useState } from "react";
import { BsSearch } from "react-icons/bs";

import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

import recursivePathsMapping from "./recursivePathsMapping";

import topicsData from "../../../data/topicsData.json";
import TopicsPage from "../topics/Topics";

import dictionaryData from "../../../data/dictionaryData.json";

function searchThroughData({
  data,
  includeTag,
  searchValue,
  setSearchValue,
  useContentFunction = () => {},
  displayDataOnclick = false,
  DataElement,
}: {
  data: any;
  includeTag: string;
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
  useContentFunction?: ([title, content]: [string, any]) => void;
  displayDataOnclick?: boolean;
  DataElement?: any;
}) {
  console.log("made it!");
  const [activeButtons, setActiveButtons] = useState([] as any);
  if (searchValue.includes(includeTag)) {
    return (
      <div className="text-white flex flex-wrap p-10 pt-5">
        {recursivePathsMapping({
          data: data,
        })
          .filter((data: any) =>
            data.path
              .toLowerCase()
              .includes(searchValue.toLowerCase().replace(/\s*:\w+\b\s*/g, ""))
          )
          .map((data: any) => (
            <button
              className="p-2 m-1 border rounded-md flex flex-col hover:bg-gray-400 group h-fit"
              onClick={() => {
                if (data.isDirect) {
                  useContentFunction([
                    data.path.split("%slash%")[
                      data.path.split("%slash%").length - 1
                    ],
                    data.data,
                  ]);
                } else {
                  setSearchValue(includeTag + " " + data.path);
                }

                if (displayDataOnclick) {
                  if (!activeButtons.includes(data.path)) {
                    setActiveButtons([...activeButtons, data.path]);
                  } else {
                    setActiveButtons(
                      activeButtons.filter((path: string) => path !== data.path)
                    );
                  }
                }
              }}
            >
              <span className="text-xs text-muted">
                {data.path.replace(/%slash%/g, "/")}
              </span>
              <div className="flex flex-row items-center justify-between w-full">
                <span className="text-lg text-white">
                  {
                    data.path.split("%slash%")[
                      data.path.split("%slash%").length - 1
                    ]
                  }
                </span>
                {activeButtons.includes(data.path) &&
                data.data[0].definition ? (
                  <IoIosArrowDown className="text-transparent group-hover:text-white ms-2" />
                ) : (
                  <IoIosArrowForward className="text-transparent group-hover:text-white ms-2" />
                )}
              </div>
              {activeButtons.includes(data.path) && (
                <DataElement data={data.data} />
              )}
            </button>
          ))}
      </div>
    );
  }
}

function Search({
  setContent,
  topicHistory,
  setTopicHistory,
  preSearch = ":topics :dictionary ",
}: {
  setContent: (content: any) => void;
  topicHistory: any;
  setTopicHistory: (topicData: any) => void;
  preSearch?: string;
}) {
  const [searchValue, setSearchValue] = useState(preSearch);
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
    <div className="w-full h-screen m-0 bg-gray-500 flex flex-col items-start overflow-auto scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-transparent">
      <div className="w-full flex flex-col items-center">
        <div className="w-1/2 h-fit bg-gray-500 text-white rounded-full border border-muted placeholder-muted flex flex-row mt-5">
          <button className="text-md bg-gray-600 w-8 h-full rounded-s-full flex justify-end items-center">
            <BsSearch />
          </button>
          <input
            type="text"
            id="large-input"
            placeholder="Search"
            value={searchValue.replace(/%slash%/g, "/")}
            onChange={(e) =>
              setSearchValue(e.target.value.replace(/\//g, "%slash%"))
            }
            className="w-[calc(100%-2rem)] bg-gray-600 h-full p-3 text-white rounded-e-full border-muted placeholder-muted focus:outline-none"
          />
        </div>
      </div>
      {searchThroughData({
        data: topicsData,
        includeTag: ":topics",
        searchValue,
        setSearchValue,
        useContentFunction: ([title, content]: [string, any]) => {
          setContent(
            <TopicsPage
              data={content}
              topicHistory={addTopicToHistory([title, content])}
              setContent={setContent}
            />
          );
          setTopicHistory(addTopicToHistory([title, content]));
        },
      })}
      {searchThroughData({
        data: dictionaryData,
        includeTag: ":dictionary",
        searchValue,
        setSearchValue,
        displayDataOnclick: true,
        DataElement: ({ data }: { data: any }) =>
          data[0].definition && (
            <div className="text-left flex flex-col gap-2 max-w-[600px]">
              <div></div>
              <div className="text-lg p-2">{data[0].definition}</div>
              <div>
                <div>Relating Topics</div>
                {data[0].relativeTopics.map((topic: any) => (
                  <div className="text-sm text-muted ms-1">{topic}</div>
                ))}
              </div>
              <div>
                <div>Forms</div>
                {data[0].forms.map((form: any) => (
                  <div className="text-sm text-muted ms-1">{form}</div>
                ))}
              </div>
              <div>
                <a
                  className="text-blue-400"
                  target="_blank"
                  href={data[0].link}
                >
                  {data[0].link}
                </a>
              </div>
            </div>
          ),
      })}
    </div>
  );
}

export default Search;

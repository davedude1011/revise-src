import { useEffect, useState } from "react";
import topicsData from "../../../data/topicsData.json";
import recursivePathMapping from "../search/recursivePathsMapping";

import { MdDelete } from "react-icons/md";

function addDataToPath({
  globalData,
  path,
  newData = "",
  newPath = "",
}: {
  globalData: any;
  path: string;
  newData?: any;
  newPath?: string;
}) {
  const keys = path.split("/");
  let current = globalData;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) {
      current[keys[i]] = {};
    }
    current = current[keys[i]];
  }
  if (newPath) {
    current[keys[keys.length - 1]][newPath] = {};
  } else {
    current[keys[keys.length - 1]] = newData;
  }
  console.log(globalData);
  return globalData;
}

function CreateTopics() {
  const [newTopicsData, setTopicsData] = useState(topicsData);

  const topicsDataMappedPaths = recursivePathMapping({
    data: newTopicsData,
    ignoreData: true,
  });

  const [selectedPath, setSelectedPath] = useState("");
  const [displayIsDirectOptions, setDisplayIsDirectOptions] = useState(false);
  const [inputType, setInputType] = useState("interactive");
  const [buttonTitleInput, setButtonTitleInput] = useState("");

  const [elementsData, setElementsData] = useState(
    [] as { type: string; content: string }[]
  );
  const [videoUrls, setVideoUrls] = useState([] as string[]);

  const [pageDataArray, setPageDataArray] = useState({} as any);
  const pageData = [elementsData, ...videoUrls];

  function updatePageDataArray() {
    const pageData = [elementsData, ...videoUrls];
    let tempPageDataArray = pageDataArray;
    addDataToPath({
      globalData: tempPageDataArray,
      path: selectedPath,
      newData: pageData,
    });
    setPageDataArray(tempPageDataArray);
    console.log(pageDataArray);
  }
  useEffect(() => {
    console.log("pageDataArray has been updated:", pageDataArray);
  }, [pageDataArray]);

  const [isOutputBeautified, setIsOutputBeautified] = useState(false);

  return (
    <div className="w-full h-screen m-0 p-10 bg-gray-500 scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-transparent overflow-auto text-white">
      <div className="w-full flex flex-row gap-8">
        <form className="w-fit min-w-80 flex flex-col gap-1 place-items-end">
          <div className="flex flex-row w-full justify-between">
            <label
              htmlFor="topicGroup"
              className="mb-2 text-sm font-medium text-gray-900 dark:text-white flex items-center"
            >
              Select Topic Group
            </label>
            <button
              className={`w-fit text-sm p-2 h-fit rounded-md ${
                displayIsDirectOptions
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-500 hover:bg-gray-400"
              } hover:shadow-md border`}
              onClick={(e) => {
                e.preventDefault();
                setDisplayIsDirectOptions(!displayIsDirectOptions);
              }}
            >
              show IsDirect options
            </button>
          </div>
          <select
            id="topicGroup"
            className="bg-gray-500 text-white border border-muted text-sm rounded-lg focus:border-blue-600 block w-full p-2.5 scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-transparent"
            onChange={(e) => {
              setSelectedPath(e.target.value);
            }}
          >
            {topicsDataMappedPaths.map((pathData: any) => {
              return (
                (displayIsDirectOptions ||
                  (!displayIsDirectOptions && !pathData.isDirect)) && (
                  <option value={pathData.path}>{pathData.path}</option>
                )
              );
            })}
          </select>
        </form>
        <div className="flex flex-col gap-2">
          <div className="w-fit flex flex-row justify-center gap-2 items-end">
            {["local", "global"].map((type: string) => (
              <button
                className={`text-sm p-2 border rounded-md h-fit ${
                  inputType == type
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-500 hover:bg-gray-400"
                }`}
                onClick={() => setInputType(type)}
              >
                {`${type.charAt(0).toUpperCase()}${type.slice(1)}`} Output
              </button>
            ))}
          </div>
          <div className="w-fit flex flex-row justify-center gap-2 items-end">
            {["interactive", "json"].map((type: string) => (
              <button
                className={`text-sm p-2 border rounded-md h-fit ${
                  inputType == type
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-500 hover:bg-gray-400"
                }`}
                onClick={() => setInputType(type)}
              >
                {`${type.charAt(0).toUpperCase()}${type.slice(1)}`} Input
              </button>
            ))}
          </div>
        </div>
        <div className="w-fit h-fill flex flex-row items-end">
          <input
            type="text"
            placeholder="Button Title..."
            className="p-2 h-fit min-w-8 border rounded-md text-sm border-e-0 rounded-e-none bg-gray-500 text-white placeholder:text-muted"
            value={buttonTitleInput}
            onChange={(e) => setButtonTitleInput(e.target.value)}
          />
          <button
            className="text-sm h-fit p-2 border border-s-0 rounded-s-none rounded-md hover:bg-gray-400"
            onClick={() => {
              setTopicsData(
                addDataToPath({
                  globalData: newTopicsData,
                  path: selectedPath,
                  newPath: buttonTitleInput,
                })
              );
              setButtonTitleInput("");
            }}
          >
            Add Button
          </button>
        </div>
        <div className="w-fit flex flex-row items-end">
          <button
            className={`text-sm h-fit w-fit p-2 border ${
              pageData[0].length > 0 ? "border-white" : "text-muted"
            } px-4 rounded-md hover:bg-gray-400`}
            onClick={() => {
              setTopicsData(
                addDataToPath({
                  globalData: newTopicsData,
                  path: selectedPath,
                  newData: pageData,
                })
              );
              updatePageDataArray();
              setElementsData([]);
              setVideoUrls([]);
            }}
            disabled={pageData[0].length <= 0}
          >
            Add Topic
          </button>
        </div>
      </div>
      {inputType == "interactive" ? (
        <div className="w-full flex flex-row">
          <div className="w-2/3 flex flex-col mt-5 pe-2">
            <h1>Topic Content:</h1>
            {elementsData.map((pageElementData: any, index) => (
              <div
                className={`w-full flex flex-col gap-1 ${
                  index == 0 ? "mt-2" : "mt-6"
                }`}
              >
                <div className="w-full flex flex-row justify-between">
                  <div className="flex flex-row gap-1">
                    {["header", "text", "text-list", "image", "iframe"].map(
                      (contentType: string) => (
                        <button
                          className={`w-fit text-sm px-4 py-2 h-fit rounded-md ${
                            pageElementData.type == contentType
                              ? "bg-blue-600 hover:bg-blue-700"
                              : "bg-gray-500 hover:bg-gray-400"
                          } hover:shadow-md border`}
                          onClick={() => {
                            let tempElementsData = [...elementsData];
                            tempElementsData[index] = {
                              type: contentType,
                              content: pageElementData.content,
                            };
                            setElementsData(tempElementsData);
                          }}
                        >
                          {contentType}
                        </button>
                      )
                    )}
                  </div>
                  <button
                    className={`w-fit text-sm p-2 h-fit rounded-md border border-transparent text-white hover:border-gray-200 transition-all hover:shadow-lg hover:bg-gray-400`}
                    onClick={() => {
                      let tempElementsData = [...elementsData];
                      tempElementsData.splice(index, 1);
                      setElementsData(tempElementsData);
                    }}
                  >
                    <MdDelete size={18}></MdDelete>
                  </button>
                </div>
                <textarea
                  className="w-full bg-gray-500 border rounded-md p-2 shadow-md"
                  value={pageElementData.content}
                  onChange={(e) => {
                    let tempElementsData = [...elementsData];
                    tempElementsData[index] = {
                      type: pageElementData.type,
                      content: e.target.value,
                    };
                    setElementsData(tempElementsData);
                  }}
                ></textarea>
              </div>
            ))}
            <button
              className={`w-fit text-sm p-2 px-6 h-fit rounded-md border text-white border-gray-200 transition-all hover:shadow-lg hover:bg-gray-400 mt-5`}
              onClick={() => {
                setElementsData([
                  ...elementsData,
                  {
                    type: "header",
                    content: "",
                  },
                ]);
              }}
            >
              New Block
            </button>
          </div>
          <div className="w-1/3 mt-5 ps-2">
            <h1>Video Links:</h1>
            {videoUrls.map((pageVideoLink: any, index) => (
              <div className="w-full flex flex-row mt-2 items-center">
                <input
                  type="text"
                  value={pageVideoLink}
                  placeholder="https://youtu.be/CxGSnA-RTsA?si=cn6aXWqS-wUheiUj"
                  className={`w-full bg-gray-500 border rounded-md p-2 shadow-md placeholder:text-gray-200`}
                  onChange={(e) => {
                    let tempVideoUrls = [...videoUrls];
                    tempVideoUrls[index] = e.target.value;
                    setVideoUrls(tempVideoUrls);
                  }}
                />
                <button
                  className={`w-fit text-sm p-3 h-fit rounded-md border border-transparent text-white hover:border-gray-200 transition-all hover:shadow-lg hover:bg-gray-400`}
                  onClick={() => {
                    let tempVideoUrls = [...videoUrls];
                    tempVideoUrls.splice(index, 1);
                    setVideoUrls(tempVideoUrls);
                  }}
                >
                  <MdDelete size={18}></MdDelete>
                </button>
              </div>
            ))}
            <button
              className={`w-fit text-sm p-2 px-6 h-fit rounded-md border text-white border-gray-200 transition-all hover:shadow-lg hover:bg-gray-400 mt-5`}
              onClick={() => {
                setVideoUrls([...videoUrls, ""]);
              }}
            >
              New Video
            </button>
          </div>
        </div>
      ) : inputType == "json" ? (
        <div className="mt-5 h-full">
          <button
            className={`w-fit text-sm px-4 py-2 h-fit rounded-md ${
              isOutputBeautified
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-500 hover:bg-gray-400"
            } hover:shadow-md border`}
            onClick={() => {
              setIsOutputBeautified(!isOutputBeautified);
            }}
          >
            Beautify Output
          </button>
          <button
            className={`w-fit text-sm px-4 py-2 ms-2 h-fit rounded-md hover:shadow-md hover: border`}
            onClick={() => {
              navigator.clipboard.writeText(
                isOutputBeautified
                  ? JSON.stringify(pageData, null, "\t")
                  : JSON.stringify(pageData)
              );
            }}
          >
            Copy
          </button>
          <textarea
            value={
              isOutputBeautified
                ? JSON.stringify(pageData, null, "\t")
                : JSON.stringify(pageData)
            }
            onChange={(e) => {
              try {
                console.log(JSON.parse(e.target.value)[1]);
                console.log(elementsData);
                setElementsData(JSON.parse(e.target.value)[0]);
                setVideoUrls(JSON.parse(e.target.value).splice(1));
              } catch {}
            }}
            className={`${
              isOutputBeautified && "whitespace-pre"
            } w-full h-[36rem] p-2 mt-2 bg-gray-500 shadow-md border rounded-md scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-transparent`}
          ></textarea>
        </div>
      ) : inputType == "local" || inputType == "global" ? (
        <div className="mt-5 h-full">
          <button
            className={`w-fit text-sm px-4 py-2 h-fit rounded-md ${
              isOutputBeautified
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-500 hover:bg-gray-400"
            } hover:shadow-md border`}
            onClick={() => {
              setIsOutputBeautified(!isOutputBeautified);
            }}
          >
            Beautify Output
          </button>
          <button
            className={`w-fit text-sm px-4 py-2 ms-2 h-fit rounded-md hover:shadow-md hover: border`}
            onClick={() => {
              navigator.clipboard.writeText(
                inputType == "local"
                  ? isOutputBeautified
                    ? JSON.stringify(pageDataArray, null, "\t")
                    : JSON.stringify(pageDataArray)
                  : isOutputBeautified
                  ? JSON.stringify(newTopicsData, null, "\t")
                  : JSON.stringify(newTopicsData)
              );
            }}
          >
            Copy
          </button>
          <textarea
            value={
              inputType == "local"
                ? isOutputBeautified
                  ? JSON.stringify(pageDataArray, null, "\t")
                  : JSON.stringify(pageDataArray)
                : isOutputBeautified
                ? JSON.stringify(newTopicsData, null, "\t")
                : JSON.stringify(newTopicsData)
            }
            className={`${
              isOutputBeautified && "whitespace-pre"
            } w-full h-[36rem] p-2 mt-2 bg-gray-500 shadow-md border rounded-md scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-transparent`}
          ></textarea>
        </div>
      ) : undefined}
    </div>
  );
}

export default CreateTopics;

import { MathJax, MathJaxContext } from "better-react-mathjax";
import VideoCarousel from "./VideoCarousel";

function TopicsPage({
  data,
  topicHistory,
  setContent,
}: {
  data: any[];
  topicHistory: [string, any];
  setContent: (content: any) => void;
}) {
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
    <div className="w-full h-screen overflow-auto m-0 bg-gray-500 p-10 text-white scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-transparent">
      {topicHistory.map(([title, content]: [string, any]) => (
        <button
          className={`text-sm m-1 p-2 rounded-md border ${
            content == data
              ? "bg-blue-600 hover:bg-blue-700"
              : "hover:bg-gray-400"
          }`}
          onClick={() => {
            setContent(
              <TopicsPage
                data={content}
                // @ts-ignore
                topicHistory={addTopicToHistory([title, content])}
                setContent={setContent}
              />
            );
          }}
        >
          {" "}
          {title}
        </button>
      ))}
      {topicHistory.length > 0 && <div className="mb-10"></div>}
      <VideoCarousel {...{ videoUrls: data.slice(1) }} />
      <MathJaxContext>
        <MathJax>
          {data[0].map((element: any, index: number) => (
            <>
              {element.type == "header" && (
                <div
                  className={`w-full h-fit font-semibold text-2xl mb-2 ${
                    index == 0 ? "" : "mt-12"
                  }`}
                >
                  {element.content}
                </div>
              )}
              {element.type == "text" && (
                <div className="opacity-70 -z-10 w-full md:w-2/3 h-fit text-md mb-1 mt-2 whitespace-pre-line">
                  {element.content}
                </div>
              )}
              {element.type == "text-list" && (
                <li className="opacity-85 -z-10 w-3/4 md:w-1/3 h-fit text-md mt-4">
                  {element.content[0] == "-"
                    ? element.content.slice(2)
                    : element.content}
                </li>
              )}
              {element.type == "image" && (
                <img
                  src={element.content}
                  className="w-1/2 h-96 mt-2 rounded-xl"
                />
              )}
              {element.type == "iframe" && (
                <iframe
                  className="w-full md:w-1/2 h-64 md:h-96 mt-2 rounded-xl"
                  src={element.src}
                ></iframe>
              )}
            </>
          ))}
        </MathJax>
      </MathJaxContext>
    </div>
  );
}

export default TopicsPage;

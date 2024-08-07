import { useState } from "react";

//import { AiFillSun, AiFillMoon } from "react-icons/ai";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";

import { BsSearch } from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";
import { PiMathOperations } from "react-icons/pi";
import { IoMicOutline } from "react-icons/io5";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { AiOutlineRobot } from "react-icons/ai";

import Button from "./button/Button";
import ButtonDropdown from "./button/ButtonDropdown";
import Homepage from "../body/homepage/Homepage";

import topicsData from "../../data/topicsData.json";
import TopicsPage from "../body/topics/Topics";

import SearchPage from "../body/search/Search";

import SparxDatabase from "../body/sparx-database/SparxDatabase";

import podcastsData from "../../data/PodcastsData.json";

import Chatbot from "../body/chatbot/Chatbot";

import CreateTopics from "../body/createTopics/CreateTopics";
import TopicsMarketplace from "../body/createTopics/TopicsMarketplace";

import pastPaperData from "../../data/PastPaperData.json";
import PastPaper from "../body/pastPaper/PastPaper";
import { AiOutlineFileText } from "react-icons/ai";

import curriculumData from "../../data/CurriculumData.json";
import CurriculumPage from "../body/curriculum/Curriculum";
import { MdOutlineSchool } from "react-icons/md";

function Sidebar({
  //content,
  setContent,
  podcastId,
  setPodcastId,
  navbarFull,
  setNavbarFull,
}: {
  content: any;
  setContent: (content: any) => void;
  podcastId: string;
  setPodcastId: (podcastId: string) => void;
  navbarFull: boolean;
  setNavbarFull: (navbarFull: boolean) => void;
}) {
  const [topicHistory, setTopicHistory] = useState([] as any);
  function addTopicToHistory(topicData: any) {
    const contentExists = topicHistory.some(
      (item: any) => item[1] === topicData[1]
    );
    if (!contentExists) {
      return [...topicHistory, topicData];
    }
    return topicHistory;
  }

  const [activeButton, setActiveButton] = useState("");
  function formatButtonData(buttonData: any) {
    return buttonData.map((data: any) =>
      data.type == "simple" ? (
        <Button
          {...{
            icon: data.icon,
            text: data.text,
            content: data.data,
            setContent,
            isActive: activeButton === data.text,
            setActiveButton,
            navbarFull,
            setNavbarFull,
          }}
        ></Button>
      ) : data.type == "dropdown" ? (
        <ButtonDropdown
          {...{
            icon: data.icon,
            text: data.text,
            dropdownData: data.dropdownData,
            useContentFunction: data.useContentFunction,
            setActiveButton,
            navbarFull,
            setNavbarFull,
          }}
        ></ButtonDropdown>
      ) : null
    );
  }

  return (
    <div
      className={`z-10 top-0 left-0 h-screen absolute md:relative ${
        navbarFull ? "w-full md:min-w-64 md:w-fit" : "w-0 md:min-w-20 md:w-20"
      } transition-all m-0 flex flex-col bg-gray-600 text-white overflow-auto scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-transparent`}
    >
      <div className="w-full h-fit py-6 flex flex-row justify-evenly items-center">
        {/*
        {navbarFull && (
          <button>
            <AiFillSun size={24} />
          </button>
        )}
          */}
        {navbarFull && (
          <span
            className="text-[1.65rem] cursor-pointer"
            onClick={() => {
              setContent(<Homepage />);
              setActiveButton("");
            }}
          >
            RccRevision
          </span>
        )}

        <button>
          {navbarFull ? (
            <AiOutlineMenuFold
              size={24}
              onClick={() => setNavbarFull(!navbarFull)}
            />
          ) : (
            <AiOutlineMenuUnfold
              size={24}
              onClick={() => setNavbarFull(!navbarFull)}
            />
          )}
        </button>
      </div>
      <hr />
      <br />
      <div className="w-full h-fit flex flex-col content-center flex-wrap">
        {formatButtonData([
          {
            type: "simple",
            icon: <BsSearch />,
            text: "Search",
            data: (
              <SearchPage
                {...{
                  setContent,
                  topicHistory,
                  setTopicHistory,
                }}
              />
            ),
          },
          {
            type: "dropdown",
            icon: <CiBookmark />,
            text: "Topics",
            dropdownData: topicsData,
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
          },
          {
            type: "simple",
            icon: <PiMathOperations />,
            text: "Sparx Database",
            data: <SparxDatabase />,
          },
          {
            type: "dropdown",
            icon: <IoMicOutline />,
            text: "Podcasts",
            dropdownData: podcastsData,
            useContentFunction: ([_, [newPodcastId]]: [string, [string]]) => {
              setPodcastId(podcastId == newPodcastId ? "" : newPodcastId);
            },
          },
          {
            type: "simple",
            icon: <AiOutlineRobot />,
            text: "Chatbot",
            data: <Chatbot />,
          },
          {
            type: "dropdown",
            icon: <VscGitPullRequestCreate />,
            text: "Create Topics",
            dropdownData: {
              "Create Topic": [<CreateTopics />],
              "Topic Marketplace": [<TopicsMarketplace />],
            },
            useContentFunction: ([_, [pageElement]]: [
              string,
              [JSX.Element]
            ]) => {
              setContent(pageElement);
            },
          },
          {
            type: "dropdown",
            icon: <AiOutlineFileText />,
            text: "Past Papers",
            dropdownData: pastPaperData,
            useContentFunction: ([_, [pastPaperSrc]]: [string, [string]]) => {
              setContent(<PastPaper {...{ pastPaperSrc }} />);
            },
          },
          {
            type: "dropdown",
            icon: <MdOutlineSchool />,
            text: "Curriculum",
            dropdownData: curriculumData,
            useContentFunction: ([_, [curriculumSrc]]: [string, [string]]) => {
              setContent(<CurriculumPage {...{ curriculumSrc }} />);
            },
          },
        ])}
      </div>
    </div>
  );
}

export default Sidebar;
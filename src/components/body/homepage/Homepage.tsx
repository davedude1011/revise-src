import { GoArrowDown } from "react-icons/go";
import { BsSearch } from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";
import { PiMathOperations } from "react-icons/pi";
import { FiHeadphones } from "react-icons/fi";
import { FiSliders } from "react-icons/fi";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { AiOutlineRobot } from "react-icons/ai";
import { AiOutlineFileText } from "react-icons/ai";
import { MdOutlineSchool } from "react-icons/md";
import { PiBookBookmarkLight } from "react-icons/pi";

import Search from "../search/Search";
import SparxDatabase from "../sparx-database/SparxDatabase";
import InteractablesPage from "../interactables/InteractablesPage";
import Chatbot from "../chatbot/Chatbot";
import CreateTopics from "../createTopics/CreateTopics";

function FeatureBox({
  title,
  icon,
  text,
  buttonText,
  onclickFunction,
}: {
  title: string;
  icon: any;
  text: string;
  buttonText: string;
  onclickFunction: () => void;
}) {
  return (
    <div className="flex flex-col border rounded-lg w-full md:w-[45%] lg:w-[32%] items-center p-8 hover:rounded-md hover:-translate-y-1 border-gray-300 hover:border-gray-100">
      <div>{icon}</div>
      <div className="text-xl mt-4 text-center">{title}</div>
      <div className="text-muted text-sm text-center">{text}</div>
      <button
        className="mt-8 p-2 border hover:border-white hover:px-10 rounded-md  transition-all text-sm px-8"
        onClick={onclickFunction}
      >
        {buttonText}
      </button>
    </div>
  );
}

function Homepage({
  setNavbarFull,
  setContent,
  topicHistory,
  setTopicHistory,
  setPreOpenDropdownArray,
}: {
  setNavbarFull: (navbarFull: boolean) => void;
  setContent: (content: any) => void;
  topicHistory: any;
  setTopicHistory: (topicHistory: any) => void;
  setPreOpenDropdownArray: (setPreOpenDropdownArray: string[]) => void;
}) {
  return (
    <div className="homepage w-full h-screen m-0 bg-gray-500 scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-transparent text-white flex flex-col items-center overflow-auto">
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="w-full mg:w-2/3 lg:w-1/2 h-fit text-center flex flex-col items-center">
          <div className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Free Revision Resources
          </div>
          <div className="mt-2 text-lg w-full px-2 md:w-2/3 md:px-0 text-muted">
            RccRevision is built{" "}
            <span className="text-blue-600 font-semibold">
              by students, for students
            </span>
            . Explore our collection of free and unobscured revision materials.
          </div>
          <button
            className="mt-2 p-2 bg-blue-500 hover:bg-blue-600 rounded-md hover:px-8 transition-all text-sm px-4"
            onClick={() => {
              let homepageElement = document.querySelector(".homepage");
              if (homepageElement) {
                homepageElement.scroll({
                  top: window.innerHeight - 24,
                  left: 0,
                  behavior: "smooth",
                });
              }
              console.log(document.querySelector(".homepage-features"));
              setNavbarFull(true);
            }}
          >
            Explore Resources
          </button>
          <div className="mt-6 flex flex-row items-center gap-2 text-muted">
            <span>
              <GoArrowDown />
            </span>
            <span>Scroll down to see more</span>
          </div>
        </div>
      </div>
      <div className="w-full h-fit min-h-screen flex flex-col items-center">
        <div className="text-2xl font-semibold tracking-wide">
          What RccRevision Offers
        </div>
        <div className="w-full p-5 md:p-16 md:pt-8 flex flex-row flex-wrap justify-evenly gap-y-5">
          <FeatureBox
            {...{
              icon: <CiBookmark size={36} />,
              title: "Comprehensive Topics",
              text: "Detailed information, engaging videos, and interactive components to help students understand key concepts.",
              buttonText: "Explore",
              onclickFunction: () => {
                setNavbarFull(true);
                setPreOpenDropdownArray(["topics"]);
              },
            }}
          />
          <FeatureBox
            {...{
              icon: <FiHeadphones size={36} />,
              title: "Podcasts",
              text: "Informative and entertaining podcasts that can be overlaid on any page to study while listening.",
              buttonText: "Listen",
              onclickFunction: () => {
                setNavbarFull(true);
                setPreOpenDropdownArray(["podcasts"]);
              },
            }}
          />
          <FeatureBox
            {...{
              icon: <AiOutlineFileText size={36} />,
              title: "Past Papers",
              text: "Access our collection of past exam papers to practice and identify areas for improvement.",
              buttonText: "Practice",
              onclickFunction: () => {
                setNavbarFull(true);
                setPreOpenDropdownArray(["past papers"]);
              },
            }}
          />
          <FeatureBox
            {...{
              icon: <FiSliders size={36} />,
              title: "Interactables",
              text: "Interactive React components that bring complex concepts to life, allowing students to explore and experiment.",
              buttonText: "Try out",
              onclickFunction: () => setContent(<InteractablesPage />),
            }}
          />
          <FeatureBox
            {...{
              icon: <BsSearch size={36} />,
              title: "Search",
              text: "A Combined Search Engine for Topics, and other linked features.",
              buttonText: "Search",
              onclickFunction: () =>
                setContent(
                  <Search {...{ setContent, topicHistory, setTopicHistory }} />
                ),
            }}
          />
          <FeatureBox
            {...{
              icon: <MdOutlineSchool size={36} />,
              title: "Curriculum",
              text: "The Curriculum roadmaps for each subject, specifically from the Robertsbridge website.",
              buttonText: "Explore",
              onclickFunction: () => {
                setNavbarFull(true);
                setPreOpenDropdownArray(["curriculum"]);
              },
            }}
          />
          <FeatureBox
            {...{
              icon: <VscGitPullRequestCreate size={36} />,
              title: "Create Topics",
              text: "Contribute your own revision materials to the platform and share your knowledge with the community. (beta)",
              buttonText: "Contribute",
              onclickFunction: () => setContent(<CreateTopics />),
            }}
          />
          <FeatureBox
            {...{
              icon: <AiOutlineRobot size={36} />,
              title: "Chatbot",
              text: "Get personalized assistance and answers to your questions from our AI-powered chatbot.",
              buttonText: "Chat",
              onclickFunction: () => setContent(<Chatbot />),
            }}
          />
          <FeatureBox
            {...{
              icon: <PiMathOperations size={36} />,
              title: "Sparx Database",
              text: "Explore a comprehensive database of over 27,000 maths question images scraped from SparxMaths.",
              buttonText: "Explore",
              onclickFunction: () => setContent(<SparxDatabase />),
            }}
          />
        </div>
        <div className="w-full h-fit min-h-screen flex flex-col items-center">
          <div className="text-center w-2/3 md:w-1/2 mt-20">
            <div className="text-2xl font-semibold tracking-wide">
              Searching the Platform
            </div>
            <div className="text-sm text-muted mt-2">
              Search across all our recources, including Topics, Podcasts,
              Dictionary Definitions, and more.
            </div>
          </div>
          <div className="w-full flex flex-row flex-wrap justify-evenly p-5 md:p-16 md:pt-8 gap-y-5">
            <FeatureBox
              {...{
                icon: <CiBookmark size={36} />,
                title: "Topics",
                text: "Search our comprehensive collection of revision topics.",
                buttonText: "Search Topics",
                onclickFunction: () =>
                  setContent(
                    <Search
                      {...{
                        setContent,
                        topicHistory,
                        setTopicHistory,
                        preSearch: ":topics",
                      }}
                    />
                  ),
              }}
            />
            <FeatureBox
              {...{
                icon: <FiHeadphones size={36} />,
                title: "Podcasts",
                text: "Search our library of informative and entertaining revision podcasts.",
                buttonText: "Search Podcasts",
                onclickFunction: () =>
                  setContent(
                    <Search
                      {...{
                        setContent,
                        topicHistory,
                        setTopicHistory,
                        preSearch: ":podcasts",
                      }}
                    />
                  ),
              }}
            />
            <FeatureBox
              {...{
                icon: <PiBookBookmarkLight size={36} />,
                title: "Dictionary",
                text: "Search our dictionary for definitions of key terms and concepts.",
                buttonText: "Search Dictionary",
                onclickFunction: () =>
                  setContent(
                    <Search
                      {...{
                        setContent,
                        topicHistory,
                        setTopicHistory,
                        preSearch: ":dictionary",
                      }}
                    />
                  ),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;

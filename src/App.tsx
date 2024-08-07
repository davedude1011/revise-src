import { useState } from "react";
import Homepage from "./components/body/homepage/Homepage";
import Sidebar from "./components/sidebar/Sidebar";

import { AiOutlineMenuUnfold } from "react-icons/ai";

function App() {
  const [content, setContent] = useState(<Homepage />);

  // @ts-ignore
  const [podcastTheme, setPodcastTheme] = useState("1" as "1" | "0");
  const [podcastId, setPodcastId] = useState("");

  const [navbarFull, setNavbarFull] = useState(true);
  return (
    <>
      <div className="flex flex-row">
        <button className="md:hidden absolute top-0 left-0 m-4 border p-1 rounded-md text-white">
          <AiOutlineMenuUnfold
            size={24}
            onClick={() => setNavbarFull(!navbarFull)}
          />
        </button>
        <Sidebar
          {...{
            content,
            setContent,
            podcastId,
            setPodcastId,
            navbarFull,
            setNavbarFull,
          }}
        />
        {content}
      </div>
      {podcastId && (
        <iframe
          className="absolute bottom-0 right-10 w-96 h-48"
          style={{ borderRadius: "12px" }}
          src={`https://open.spotify.com/embed/episode/${podcastId}?utm_source=generator&theme=${podcastTheme}`}
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      )}
    </>
  );
}

export default App;

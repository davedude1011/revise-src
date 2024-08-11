import { useState } from "react";
import {
  ParticleMovementSlider,
  ParticleMovementSliderThumbnail,
} from "./components/ParticleMovementSlider";
import { WaveTypes, WaveTypesThumbnail } from "./components/WaveTypes";

function Interactable({
  ThumbnailElement,
  OnclickElement,
  title,
  text,
  setDisplayedElement,
}: {
  ThumbnailElement: any;
  OnclickElement: any;
  title: string;
  text: string;
  setDisplayedElement: (displayedElement: any) => void;
}) {
  return (
    <button
      className="w-64 h-fit shadow-lg shadow-gray-800 rounded-md hover:shadow-xl hover:shadow-gray-900 transition-all hover:-translate-y-2"
      onClick={() => {
        setDisplayedElement(OnclickElement);
      }}
    >
      <div className="w-64 h-64 flex flex-row justify-center items-center bg-gray-200 rounded-t-md">
        {ThumbnailElement}
      </div>
      <div className="w-full h-32 bg-gray-300 rounded-b-md flex flex-col ps-4 justify-center text-start">
        <div className="font-bold text-lg">{title}</div>
        <div className="text-sm text-muted">{text}</div>
      </div>
    </button>
  );
}

function InteractablesPage() {
  const [displayedElement, setDisplayedElement] = useState("" as any);
  return (
    <div className="w-full h-screen m-0 bg-gray-500 scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-transparent overflow-auto text-white">
      {displayedElement && (
        <div className="w-full h-screen m-0 flex flex-col items-center justify-center">
          {displayedElement}
        </div>
      )}
      <div className="w-full h-fit p-5 mt-10 md:p-10">
        <div className="text-2xl md:text-5xl md:font-bold tracking-tight">
          Interactable Components
        </div>
        <div className="text-sm text-muted md:text-base">
          Explore our collection of interactive custom made components.
        </div>
      </div>
      <div className="w-full h-fit p-5 flex flex-row justify-center flex-wrap gap-4 md:justify-normal md:p-10">
        <Interactable
          {...{
            ThumbnailElement: <ParticleMovementSliderThumbnail />,
            OnclickElement: <ParticleMovementSlider />,
            title: "Particle Movement",
            text: "Shows the movement/arrangement of Particles depending on their internal energy.",
            setDisplayedElement,
          }}
        />
        <Interactable
          {...{
            ThumbnailElement: <WaveTypesThumbnail />,
            OnclickElement: <WaveTypes />,
            title: "Wave Types",
            text: "The movement of particles through different waves.",
            setDisplayedElement,
          }}
        />
      </div>
    </div>
  );
}

export default InteractablesPage;

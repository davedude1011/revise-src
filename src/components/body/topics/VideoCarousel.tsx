import { useState } from "react";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { GoDash } from "react-icons/go";

function buttonIcon(icon: any, onclickFunction: () => void) {
  return (
    <button
      className="text-muted hover:text-white p-2 py-5"
      onClick={onclickFunction}
    >
      {icon}
    </button>
  );
}

function VideoCarousel({ videoUrls }: { videoUrls: string[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <>
      {videoUrls.length > 0 && (
        <>
          <div className="w-full h-fit flex flex-col">
            <div className="flex flex-row justify-evenly items-center align-middle">
              {buttonIcon(<IoIosArrowBack size={36} />, () => {
                if (currentSlide > 0) {
                  setCurrentSlide(currentSlide - 1);
                } else {
                  setCurrentSlide(videoUrls.length - 1);
                }
              })}
              {videoUrls.map((videoUrl: string, index: number) => (
                <iframe
                  key={index}
                  className={`w-full md:w-1/2 h-48 md:h-96 mt-2 rounded-xl ${
                    currentSlide == index ? "" : "hidden"
                  }`}
                  src={videoUrl}
                  allow="fullscreen"
                ></iframe>
              ))}
              {buttonIcon(<IoIosArrowForward size={36} />, () => {
                if (currentSlide < videoUrls.length - 1) {
                  setCurrentSlide(currentSlide + 1);
                } else {
                  setCurrentSlide(0);
                }
              })}
            </div>
            <div className="flex flex-row justify-center items-center">
              {videoUrls.map((_, index) => (
                <button
                  className={`${
                    currentSlide == index ? "text-white" : "text-muted"
                  } hover:text-white py-2`}
                  onClick={() => setCurrentSlide(index)}
                >
                  <GoDash size={36} />
                </button>
              ))}
            </div>
          </div>
          <br />
        </>
      )}
    </>
  );
}

export default VideoCarousel;

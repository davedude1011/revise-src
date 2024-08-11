import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Particle({
  baseX,
  baseY,
  shiftAmount,
  type,
}: {
  baseX: number;
  baseY: number;
  shiftAmount: number;
  type: string;
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        x:
          baseX +
          Math.floor(Math.random() * (shiftAmount * 2 + 1)) -
          shiftAmount,
        y:
          baseY +
          Math.floor(Math.random() * (shiftAmount * 2 + 1)) -
          shiftAmount,
      });
    }, 100); // Update position every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [shiftAmount]);

  return (
    <motion.div
      className={`w-10 h-10 ${
        type == "full" ? "bg-blue-500" : "border border-blue-500"
      } absolute rounded-full flex items-center justify-center`}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      {type == "hydrogen" && "H"}
    </motion.div>
  );
}

export function ParticleMovementSlider() {
  const [particleEnergy, setParticleEnergy] = useState(1);
  const particleDimensions = [
    Math.round((window.innerWidth * (2 / 3)) / (40 + particleEnergy)),
    Math.round((window.innerHeight * (2 / 3)) / (40 + particleEnergy)),
  ];
  const [type, setType] = useState("hydrogen");

  return (
    <div className="h-2/3 w-2/3 min-w-64">
      <div className="w-full h-fit flex flex-row flex-wrap justify-center md:justify-between items-end">
        <div className="w-fit flex flex-row gap-2">
          {["Full", "Outline", "Hydrogen"].map((buttonType: string) => (
            <button
              className={`hover:bg-gray-200 hover:shadow-md p-1 px-4 rounded-md border ${
                type == buttonType.toLowerCase() && "border-white"
              }`}
              onClick={() => setType(buttonType.toLowerCase())}
            >
              {buttonType}
            </button>
          ))}
        </div>
        <div className="w-fit h-full text-center z-10 font-bold text-lg tracking-wider">
          {particleEnergy < 5 && "Solid"}
          {particleEnergy >= 5 && particleEnergy <= 15 && "Liquid"}
          {particleEnergy > 15 && "Gas"}
        </div>
      </div>
      <div className="h-full w-full border rounded-md overflow-hidden relative mt-2">
        <div className="w-full h-full absolute -translate-y-[40px] -translate-x-[40px]">
          {Array.from({ length: particleDimensions[0] }, (_, i) => i + 1).map(
            (indexX: number) =>
              Array.from(
                { length: particleDimensions[1] },
                (_, i) => i + 1
              ).map((indexY: number) => (
                <Particle
                  baseX={indexX * (40 + particleEnergy)}
                  baseY={indexY * (40 + particleEnergy)}
                  shiftAmount={particleEnergy}
                  type={type}
                />
              ))
          )}
        </div>
      </div>
      <input
        id="labels-range-input"
        type="range"
        value={particleEnergy}
        onChange={(e) => setParticleEnergy(Number(e.target.value))}
        min={1}
        max={50}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-100"
      />
    </div>
  );
}

export function ParticleMovementSliderThumbnail() {
  const particleDimensions = [8, 8];

  return (
    <div className="w-56 h-56 rounded-md overflow-hidden relative items-center">
      <div className="w-full h-full flex flex-col">
        {Array.from({ length: particleDimensions[0] }, (_, i) => i + 1).map(
          (_: number) => (
            <div className="w-fit flex flex-row my-1">
              {Array.from(
                { length: particleDimensions[1] },
                (_, i) => i + 1
              ).map((_: number) => (
                <div className="w-5 h-5 bg-blue-500 mx-1 rounded-full"></div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}

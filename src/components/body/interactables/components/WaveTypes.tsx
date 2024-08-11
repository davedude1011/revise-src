import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Particle({
  baseX,
  baseY,
  shiftAmount,
  isShift,
  waveType,
  radius,
  preDegree,
  type,
}: {
  baseX: number;
  baseY: number;
  shiftAmount: number;
  isShift: boolean;
  waveType: string;
  radius: number;
  preDegree: number;
  type: string;
}) {
  const [degree, setDegree] = useState(preDegree);
  useEffect(() => {
    const interval = setInterval(() => {
      if (waveType == "transverse") {
        setDegree((degree + 10) % 360);
      }
    }, 100); // Update position every second
    return () => clearInterval(interval); // Cleanup interval on unmount
  });

  const radian = (degree * Math.PI) / 180;
  const circularX = baseX + radius * Math.cos(radian);
  const circularY = baseY + radius * Math.sin(radian);

  return (
    <motion.div
      className={`w-10 h-10 ${
        type == "full" ? "bg-blue-500" : "border border-blue-500"
      } absolute rounded-full flex items-center justify-center`}
      animate={
        waveType == "longitudinal"
          ? {
              x: isShift ? baseX + shiftAmount : baseX,
              y: baseY,
            }
          : {
              x: circularX,
              y: circularY,
            }
      }
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      {type == "hydrogen" && "H"}
    </motion.div>
  );
}

export function WaveTypes() {
  const [waveType, setWaveType] = useState("longitudinal");

  const particleDimensions = [
    waveType == "longitudinal"
      ? Math.round((window.innerHeight * (2 / 3)) / 40)
      : Math.round((window.innerHeight * (2 / 3)) / 40) - 5,
    waveType == "longitudinal"
      ? Math.round((window.innerWidth * (2 / 3)) / 40)
      : Math.round((window.innerWidth * (2 / 3)) / 40) + 2,
  ];
  const [particleEnergy, setParticleEnergy] = useState(20);
  const [type, setType] = useState("hydrogen");
  const [particleGapX, setParticleGapX] = useState(0);
  const [particleGapY, setParticleGapY] = useState(0);

  const [longitudinalShiftX, setLongitudinalShiftX] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (waveType == "longitudinal") {
        if (longitudinalShiftX < particleDimensions[1]) {
          setLongitudinalShiftX(longitudinalShiftX + 1);
        } else {
          setLongitudinalShiftX(0);
        }
      } else {
        setLongitudinalShiftX(0);
      }
      console.log(longitudinalShiftX);
    }, 100); // Update position every second

    return () => clearInterval(interval);
  }, [particleDimensions]);

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
        <div className="w-fit flex flex-row gap-2">
          {["Transverse", "Longitudinal"].map((buttonType: string) => (
            <button
              className={`hover:bg-gray-200 hover:shadow-md p-1 px-4 rounded-md border ${
                waveType == buttonType.toLowerCase() && "border-white"
              }`}
              onClick={() => setWaveType(buttonType.toLowerCase())}
            >
              {buttonType}
            </button>
          ))}
        </div>
      </div>
      <div className="h-full w-full border rounded-md overflow-hidden relative mt-2">
        <div className="w-full h-full absolute -translate-y-[40px] -translate-x-[40px]">
          {Array.from({ length: particleDimensions[0] }, (_, i) => i + 1).map(
            (indexY: number) =>
              Array.from(
                { length: particleDimensions[1] },
                (_, i) => i + 1
              ).map((indexX: number) => (
                <Particle
                  baseX={
                    waveType == "longitudinal"
                      ? indexX * (40 + particleGapX)
                      : (indexX - 2) * (40 + particleGapX)
                  }
                  isShift={longitudinalShiftX == indexX}
                  baseY={
                    waveType == "longitudinal"
                      ? indexY * (40 + particleGapY)
                      : indexY * (40 + particleGapY) + 200
                  }
                  shiftAmount={particleEnergy}
                  waveType={waveType}
                  radius={
                    ((particleDimensions[0] - indexY) * particleEnergy) / 10
                  }
                  preDegree={indexX * 10}
                  type={type}
                />
              ))
          )}
        </div>
      </div>
      <input
        id="labels-range-input-energy"
        type="range"
        value={particleEnergy}
        onChange={(e) => setParticleEnergy(Number(e.target.value))}
        min={1}
        max={100}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-100"
      />
      <input
        id="labels-range-input-gap-x"
        type="range"
        value={particleGapX}
        onChange={(e) => setParticleGapX(Number(e.target.value))}
        min={0}
        max={80}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-100"
      />
      <input
        id="labels-range-input-gap-y"
        type="range"
        value={particleGapY}
        onChange={(e) => setParticleGapY(Number(e.target.value))}
        min={0}
        max={80}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-100"
      />
    </div>
  );
}

export function WaveTypesThumbnail() {
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
                <div className="w-5 h-5 border border-blue-500 mx-1 rounded-full"></div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}

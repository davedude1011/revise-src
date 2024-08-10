import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Particle({
  baseX,
  baseY,
  shiftAmount,
}: {
  baseX: number;
  baseY: number;
  shiftAmount: number;
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
      className="w-5 h-5 bg-blue-500 absolute rounded-full"
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    />
  );
}

function ParticleMovementSlider() {
  const particleDimensions = [14, 14];
  const [particleEnergy, setParticleEnergy] = useState(1);

  return (
    <div className="w-64">
      <div className="w-64 h-64 border rounded-md overflow-hidden relative">
        <div className="w-full text-center z-10 relative font-bold tracking-wider">
          {particleEnergy < 5 && "Solid"}
          {particleEnergy >= 5 && particleEnergy <= 15 && "Liquid"}
          {particleEnergy > 15 && "Gas"}
        </div>
        <div className="w-full h-full absolute -translate-x-1/4 -translate-y-1/4">
          {Array.from({ length: particleDimensions[0] }, (_, i) => i + 1).map(
            (indexX: number) =>
              Array.from(
                { length: particleDimensions[1] },
                (_, i) => i + 1
              ).map((indexY: number) => (
                <Particle
                  baseX={indexX * (20 + particleEnergy)}
                  baseY={indexY * (20 + particleEnergy)}
                  shiftAmount={particleEnergy}
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

export default ParticleMovementSlider;

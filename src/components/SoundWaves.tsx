const SoundWaves = ({ side }: { side: "left" | "right" }) => {
  const isLeft = side === "left";
  
  return (
    <div 
      className={`absolute top-1/2 -translate-y-1/2 ${isLeft ? 'left-0 -translate-x-[200px]' : 'right-0 translate-x-[200px]'}`}
    >
      {/* Three curved arcs */}
      <svg
        width="234"
        height="354"
        viewBox="0 0 234 354"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={isLeft ? '' : 'scale-x-[-1]'}
      >
        {/* Outer arc */}
        <path
          d="M20 20C20 100 50 280 20 334"
          stroke="#FFC107"
          strokeWidth="24"
          strokeLinecap="round"
          className="animate-wave-1"
        />
        {/* Middle arc */}
        <path
          d="M70 70C70 130 90 220 70 284"
          stroke="#FFC107"
          strokeWidth="24"
          strokeLinecap="round"
          className="animate-wave-2"
        />
        {/* Inner arc */}
        <path
          d="M120 120C120 150 130 190 120 234"
          stroke="#FFC107"
          strokeWidth="24"
          strokeLinecap="round"
          className="animate-wave-3"
        />
      </svg>
    </div>
  );
};

export default SoundWaves;

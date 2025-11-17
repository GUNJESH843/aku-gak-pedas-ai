const SoundWaves = ({ side }: { side: "left" | "right" }) => {
  const isLeft = side === "left";
  
  return (
    <div 
      className="absolute top-1/2 -translate-y-1/2"
      style={{ 
        [side]: '10%',
        transform: `translateY(-50%) ${isLeft ? '' : 'scaleX(-1)'}`
      }}
    >
      <div className="relative w-[170px] h-[159px]">
        {/* Outer wave */}
        <svg
          className="absolute inset-0 animate-wave-1"
          width="170"
          height="159"
          viewBox="0 0 170 159"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M51 0.172852C22.8 12.5729 0 40.5729 0 73.5729C0 106.573 22.8 134.573 51 146.973"
            stroke="#FFC107"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>

        {/* Middle wave */}
        <svg
          className="absolute inset-0 animate-wave-2"
          width="170"
          height="159"
          viewBox="0 0 170 159"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M35.3 17.8086C16.9 28.2086 4.5 48.5086 4.5 71.5086C4.5 94.5086 16.9 114.809 35.3 125.209"
            stroke="#FFC107"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>

        {/* Inner wave */}
        <svg
          className="absolute inset-0 animate-wave-3"
          width="170"
          height="159"
          viewBox="0 0 170 159"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.65 35.7852C11.7 43.7852 7 54.5852 7 66.5852C7 78.5852 11.7 89.3852 19.65 97.3852"
            stroke="#FFC107"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default SoundWaves;

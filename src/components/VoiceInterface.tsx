import { X, Mic, Settings } from "lucide-react";
import farmVaidyaIcon from "@/assets/farm-vaidya-icon.png";

const VoiceInterface = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen pt-20">
      {/* Background glow effect */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[461px] h-[461px] bg-green rounded-full glow-green pointer-events-none"
        style={{ filter: 'blur(500px)' }}
      />

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center">
        {/* Center icon */}
        <div className="flex flex-col items-center gap-8">
          <div className="relative">
            <img 
              src={farmVaidyaIcon} 
              alt="Farm Vaidya AI" 
              className="w-[238px] h-[238px] animate-pulse"
            />
            {/* Breathing glow ring */}
            <div className="absolute inset-0 rounded-full bg-green/20 animate-ping" 
                 style={{ animationDuration: '2s' }} 
            />
          </div>
          <p className="text-2xl font-semibold text-text-primary">
            I'm listening.....
          </p>
        </div>
      </div>

      {/* Bottom control bar */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center justify-between gap-4 px-6 py-4 bg-background rounded-full shadow-lg border border-border min-w-[306px]">
          <button className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity">
            <X className="w-6 h-6" />
          </button>
          
          <button className="w-12 h-12 flex items-center justify-center bg-green-light rounded-full hover:bg-secondary transition-colors">
            <Mic className="w-6 h-6 text-green" />
          </button>
          
          <button className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity">
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceInterface;

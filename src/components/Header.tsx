import { Menu, Edit } from "lucide-react";
import farmVaidyaLogo from "@/assets/farm-vaidya-logo.png";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-background border-b border-border z-50">
      <div className="container mx-auto h-full flex items-center justify-between px-6">
        {/* Left side - Menu and Edit icons */}
        <div className="flex items-center gap-6">
          <button className="w-8 h-8 flex items-center justify-center hover:bg-muted rounded-lg transition-colors">
            <Menu className="w-6 h-6" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-muted rounded-lg transition-colors">
            <Edit className="w-6 h-6" />
          </button>
        </div>

        {/* Center - Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <img 
            src={farmVaidyaLogo} 
            alt="Farm Vaidya - Sustainability with voice agent" 
            className="h-10"
          />
        </div>

        {/* Right side - User profile */}
        <div className="flex items-center gap-2">
          <div className="w-14 h-14 rounded-full bg-[#FFFBF1] flex items-center justify-center overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-2xl">
              👨‍🌾
            </div>
          </div>
          <span className="font-semibold text-base text-text-primary">Username</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

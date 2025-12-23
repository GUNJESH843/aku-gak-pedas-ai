import { useState, useRef, useCallback, useEffect } from "react";
import { X, Mic, VolumeX, Volume2 } from "lucide-react";
import Daily, { DailyCall } from "@daily-co/daily-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import farmVaidyaIcon from "@/assets/farm-vaidya-icon.png";

const VoiceInterface = () => {
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const callRef = useRef<DailyCall | null>(null);

  const startSession = useCallback(async () => {
    setIsConnecting(true);
    try {
      // Request microphone permission first
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Start Pipecat session via edge function
      const { data, error } = await supabase.functions.invoke('pipecat-start');
      
      if (error) {
        throw new Error(error.message || 'Failed to start session');
      }

      if (!data?.room_url) {
        throw new Error('No room URL received from server');
      }

      console.log('Pipecat session started:', data);

      // Create Daily call and join the room
      const call = Daily.createCallObject({
        audioSource: true,
        videoSource: false,
      });

      callRef.current = call;

      // Set up event listeners
      call.on('joined-meeting', () => {
        console.log('Joined Daily room');
        setIsConnected(true);
        setIsConnecting(false);
      });

      call.on('left-meeting', () => {
        console.log('Left Daily room');
        setIsConnected(false);
      });

      call.on('error', (e) => {
        console.error('Daily error:', e);
        toast({
          variant: "destructive",
          title: "Connection Error",
          description: "Failed to connect to voice agent.",
        });
        setIsConnected(false);
        setIsConnecting(false);
      });

      // Track when the bot is speaking
      call.on('participant-updated', (event) => {
        if (event?.participant && !event.participant.local) {
          const isBotSpeaking = event.participant.tracks?.audio?.state === 'playable';
          setIsSpeaking(isBotSpeaking);
        }
      });

      // Join the room with token if provided
      const joinOptions: { url: string; token?: string } = { url: data.room_url };
      if (data.token) {
        joinOptions.token = data.token;
      }

      await call.join(joinOptions);

      toast({
        title: "Connected",
        description: "Voice agent is ready. Start speaking!",
      });
    } catch (error) {
      console.error('Error starting session:', error);
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "Could not connect to voice agent.",
      });
      setIsConnecting(false);
    }
  }, [toast]);

  const endSession = useCallback(async () => {
    if (callRef.current) {
      await callRef.current.leave();
      callRef.current.destroy();
      callRef.current = null;
    }
    setIsConnected(false);
    setIsSpeaking(false);
    toast({
      title: "Disconnected",
      description: "Voice session ended.",
    });
  }, [toast]);

  const toggleMute = useCallback(() => {
    if (callRef.current) {
      const newMuteState = !isMuted;
      callRef.current.setLocalAudio(!newMuteState);
      setIsMuted(newMuteState);
    }
  }, [isMuted]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (callRef.current) {
        callRef.current.leave();
        callRef.current.destroy();
      }
    };
  }, []);

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
              className={`w-[238px] h-[238px] ${isConnected && isSpeaking ? 'animate-pulse' : ''}`}
            />
            {/* Breathing glow ring - active when connected */}
            {isConnected && (
              <div 
                className="absolute inset-0 rounded-full bg-green/20 animate-ping" 
                style={{ animationDuration: '2s' }} 
              />
            )}
          </div>
          <p className="text-2xl font-semibold text-text-primary">
            {isConnecting 
              ? "Connecting..." 
              : isConnected 
                ? (isSpeaking ? "Speaking..." : "I'm listening...")
                : "Tap mic to start"}
          </p>
        </div>
      </div>

      {/* Bottom control bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center justify-between gap-4 px-6 py-4 bg-background rounded-full shadow-lg border border-border min-w-[306px]">
          <button 
            onClick={endSession}
            disabled={!isConnected}
            className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity disabled:opacity-30"
          >
            <X className="w-6 h-6" />
          </button>
          
          <button 
            onClick={isConnected ? endSession : startSession}
            disabled={isConnecting}
            className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors ${
              isConnected 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-green-light hover:bg-secondary'
            } ${isConnecting ? 'opacity-50' : ''}`}
          >
            <Mic className={`w-6 h-6 ${isConnected ? 'text-white' : 'text-green'}`} />
          </button>
          
          <button 
            onClick={toggleMute}
            disabled={!isConnected}
            className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity disabled:opacity-30"
          >
            {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceInterface;

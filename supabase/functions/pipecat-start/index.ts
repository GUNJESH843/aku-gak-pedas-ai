import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const PIPECAT_API_KEY = Deno.env.get('PIPECAT_API_KEY');
    
    if (!PIPECAT_API_KEY) {
      throw new Error('PIPECAT_API_KEY is not configured');
    }

    console.log('Starting Pipecat agent session...');

    const response = await fetch('https://api.pipecat.daily.co/v1/public/webagent/start', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PIPECAT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        createDailyRoom: true,
        dailyRoomProperties: {
          enable_recording: "cloud",
          privacy: "public"
        },
        dailyMeetingTokenProperties: {
          is_owner: true
        },
        body: {}
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Pipecat API error:', response.status, errorText);
      throw new Error(`Pipecat API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Pipecat session started:', data);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error starting Pipecat session:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as Blob;
    const model = formData.get('model') as string;

    if (!audioFile || !model) {
      return NextResponse.json(
        { error: "Missing audio or model" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    const voiceId = process.env[`ELEVENLABS_VOICE_ID_${model.toUpperCase()}`];

    if (!apiKey || !voiceId) {
      return NextResponse.json(
        { error: "Configuration error" },
        { status: 500 }
      );
    }

    // Create FormData for ElevenLabs
    const elevenlabsFormData = new FormData();
    elevenlabsFormData.append('audio', audioFile);
    elevenlabsFormData.append('optimize_streaming_latency', '3');

    // Call ElevenLabs speech-to-speech API
    const response = await fetch(
      `https://api.elevenlabs.io/v1/speech-to-speech/${voiceId}/stream`,
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey
        },
        body: elevenlabsFormData
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Voice processing failed" },
        { status: response.status }
      );
    }

    // Stream the audio response
    return new Response(response.body, {
      headers: {
        'Content-Type': 'audio/mpeg'
      }
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Service error" },
      { status: 500 }
    );
  }
}

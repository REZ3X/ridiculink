import { NextResponse } from 'next/server';
import { LongURL } from '../../../models/LongURL.js';

export async function POST(request) {
  try {
    console.log('Longerner API called');
    
    const { url } = await request.json();
    console.log('Received URL:', url);

    if (!url) {
      console.log('No URL provided');
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    try {
      new URL(url);
      console.log('URL format is valid');
    } catch (urlError) {
      console.log('Invalid URL format:', urlError.message);
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    console.log('Creating long URL...');
    const result = await LongURL.create(url);
    console.log('Long URL created successfully:', result);
    
    return NextResponse.json({
      success: true,
      longUrl: result.longUrl,
      originalUrl: result.originalUrl,
      expiresAt: result.expiresAt,
      isExisting: result.isExisting
    });

  } catch (error) {
    console.error('Longerner API error:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json(
      { error: `Internal server error: ${error.message}` },
      { status: 500 }
    );
  }
}
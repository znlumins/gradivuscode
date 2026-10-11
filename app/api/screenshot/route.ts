import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  // Format valid HTTP/HTTPS URL
  const validUrl = targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`;

  try {
    // Service 1: Microlink API (high quality full page render screenshot)
    const microlinkEndpoint = `https://api.microlink.io?url=${encodeURIComponent(
      validUrl
    )}&screenshot=true&meta=false&embed=screenshot.url`;

    const res = await fetch(microlinkEndpoint, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
      next: { revalidate: 86400 }, // Cache 24 jam agar super cepat & ringan
    });

    if (res.ok) {
      const buffer = await res.arrayBuffer();
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
        },
      });
    }

    // Fallback: WordPress mshots screenshot generator
    const fallbackUrl = `https://s0.wp.com/mshots/v1/${encodeURIComponent(validUrl)}?w=1200&h=800`;
    const fallbackRes = await fetch(fallbackUrl);
    const fallbackBuffer = await fallbackRes.arrayBuffer();

    return new NextResponse(fallbackBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      },
    });
  } catch {
    // Ultimate fallback redirect to thum.io
    return NextResponse.redirect(`https://image.thum.io/get/width/1200/crop/800/${validUrl}`);
  }
}

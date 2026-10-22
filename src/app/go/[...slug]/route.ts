import { NextResponse } from "next/server";

/**
 * Creator short links (harvest: DEV-825 attribution system). The real
 * site's edge 302s to the homepage with standard UTMs:
 *
 *   /go/{handle}                  → /?utm_source={handle}&utm_medium=influencer
 *   /go/{campaign}/{handle}       → /?utm_source={handle}&utm_medium=influencer&utm_campaign={campaign}
 *   /go, /go/a/b/c (3+ segments)  → 404
 *
 * One-segment links omit the campaign entirely so analytics sees it as
 * unset rather than "(none)". The handle is not validated — unknown
 * handles redirect the same way. First-touch labels are captured
 * client-side by Attribution.tsx on the landing page.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await params;

  if (slug.length === 1) {
    const url = new URL("/", request.url);
    url.searchParams.set("utm_source", slug[0]);
    url.searchParams.set("utm_medium", "influencer");
    return NextResponse.redirect(url, 302);
  }

  if (slug.length === 2) {
    const [campaign, handle] = slug;
    const url = new URL("/", request.url);
    url.searchParams.set("utm_source", handle);
    url.searchParams.set("utm_medium", "influencer");
    url.searchParams.set("utm_campaign", campaign);
    return NextResponse.redirect(url, 302);
  }

  return new NextResponse(null, { status: 404 });
}

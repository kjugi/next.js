import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("headers", request.headers);
  // if (request.headers.get("x-middleware-prefetch")) {
  //   return;
  // }
  //   if (request.nextUrl.pathname.startsWith('/about')) {
  //     return NextResponse.rewrite(new URL('/about-2', request.url))
  //   }

  //   if (request.nextUrl.pathname.startsWith('/dashboard')) {
  //     return NextResponse.rewrite(new URL('/dashboard/user', request.url))
  //   }

  return NextResponse.next();
}

/**
 * Initial note:
 * I have checked documentation about prefetching. I didn't find any good answers:
 * - https://nextjs.org/docs/pages/api-reference/functions/use-router#routerprefetch
 * Info that prefetch works only on production build
 * - https://nextjs.org/docs/pages/api-reference/components/link#prefetch
 * Info that it's enabled by default. False value will still have prefetch on hover
 * You can switch to <a> tag to avoid that... Great solution. Or switch to app router...
 * Another good one.
 * - https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#2-prefetching
 * Just base overview that such feature exists. No details.
 * - https://nextjs.org/docs/pages/building-your-application/routing/middleware#matcher
 * Important info about matchers and the possibility to exclude prefetch requests.
 * They don't happen by default if you combine it with prefetch="false" on link
 * They still happen on hover but it does not go through middleware anymore
 * - https://nextjs.org/docs/pages/building-your-application/rendering/edge-and-nodejs-runtimes
 * On middleware page there is mention that it supports only edge API and not exclusive nodejs API
 * It does not mean that middleware does not work in nodejs!
 * On this page it's even a different into that nodejs api is default!
 */

// Question: why middleware enables prefetch on links?
// Answer: Known issue from community:
// - https://github.com/vercel/next.js/discussions/68088
// - https://github.com/vercel/next.js/discussions/44596
// suggests to use experimental config "middlewarePrefetch: 'strict'"
// with this setting you don't need to exclude requests with prefetch header
// "missing: [{ type: "header", key: "purpose", value: "prefetch" }],"
// while using "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"
// you don't have server requests with prefetch header (no additional traffic on server)
// You can still see .json request on page enter but it's just SPA session request.
// Question: What it does?
// Clue: search here: https://github.com/search?q=repo%3Avercel%2Fnext.js%20middlewarePrefetch&type=code
// Go to: packages/next/src/build/webpack/plugins/define-env-plugin.ts
// Look for __NEXT_MIDDLEWARE_PREFETCH usage
// in: packages/next/src/shared/lib/router/router.ts
// We are in "prefetch" method from router. Here lies the answer. "flexible" is a default setting.
// Answer: Explanation PR: https://github.com/vercel/next.js/pull/42936. It introduces the config
// The worst thing that official documentation does not include ANY information about it!
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    // matcher: exclude all routes except homepage
    // "/((?!:path)*)",
    // {
    //   // Question: Can I block prefetching from this middleware?
    //   // Answer: yes I can - with matcher
    //   // Question: Can I find any prefetch info in request object?
    //   // Answer: yes I can - in headers
    //   // It does not solve problem with prefetch on hover
    //   source:
    //     "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    //   missing: [{ type: "header", key: "purpose", value: "prefetch" }],
    // },
  ],
};

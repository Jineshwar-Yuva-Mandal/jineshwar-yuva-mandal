import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { getSupabaseConfiguration } from "@/lib/supabase/config";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const requestedNext = requestUrl.searchParams.get("next");
  const next = requestedNext?.startsWith("/") ? requestedNext : "/members/portal/";
  const response = NextResponse.redirect(new URL(next, requestUrl.origin));

  if (!code) return response;

  const { url, publishableKey } = getSupabaseConfiguration();
  const supabase = createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return request.headers.get("cookie")
          ?.split("; ")
          .map((cookie) => {
            const [name, ...value] = cookie.split("=");
            return { name, value: value.join("=") };
          }) ?? [];
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  await supabase.auth.exchangeCodeForSession(code);
  return response;
}
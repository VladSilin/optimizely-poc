import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  //const { searchParams } = new URL(request.url);

  // TODO: Fix this check
  // const secret = searchParams.get("secret");

  //const isRequestValid = secret === process.env.DRAFT_SECRET_TOKEN;

  //if (!isRequestValid) {
  //  return new Response("Invalid request", { status: 401 });
  //}

  // Disable Draft Mode by setting the cookie
  // draftMode().disable();

  const cookieStore = cookies();
  const cookie = cookieStore.get("__prerender_bypass")!;
  cookies().set({
    name: "__prerender_bypass",
    value: cookie?.value,
    expires: new Date(0), // Set expiration date to the past
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "none",
  });

  redirect("/");
}

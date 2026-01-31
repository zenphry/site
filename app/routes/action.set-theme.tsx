import type { ActionFunctionArgs } from "react-router";
import { themeCookie } from "~/lib/theme.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const theme = formData.get("theme");

  if (theme !== "light" && theme !== "dark" && theme !== "system") {
    return new Response(
      JSON.stringify({ success: false, error: "Invalid theme" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": await themeCookie.serialize(theme),
    },
  });
}

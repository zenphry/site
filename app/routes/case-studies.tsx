import { redirect } from "react-router";
import type { LoaderFunctionArgs } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const newPath = url.pathname.replace("/case-studies", "/resources/case-studies");
  throw redirect(newPath);
}

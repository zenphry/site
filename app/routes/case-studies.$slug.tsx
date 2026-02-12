import { redirect } from "react-router";
import type { LoaderFunctionArgs } from "react-router";

export async function loader({ params }: LoaderFunctionArgs) {
  throw redirect(`/resources/case-studies/${params.slug}`);
}

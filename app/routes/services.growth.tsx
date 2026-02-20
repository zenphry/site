import { redirect } from "react-router";

export function loader() {
  throw redirect("/services/scale", 301);
}

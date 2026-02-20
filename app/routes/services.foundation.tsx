import { redirect } from "react-router";

export function loader() {
  throw redirect("/services/operational", 301);
}

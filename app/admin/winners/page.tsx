import { redirect } from "next/navigation";

export default function WinnersRedirectPage() {
  redirect("/admin/winners/draw");
}

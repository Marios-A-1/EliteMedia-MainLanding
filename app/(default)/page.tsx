import { redirect } from "next/navigation";

export const metadata = {
  title: "Elite Media Event",
  description:
    "Join the Elite Media Academy event and learn a practical roadmap to build your first 1,000 EUR online in 90 days.",
};

export default function Home() {
  redirect("/events");
}

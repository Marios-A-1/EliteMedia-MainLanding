import { redirect } from "next/navigation";

export const metadata = {
  title: "Thymiolas Event",
  description:
    "Join the Thymiolas event and learn a practical roadmap to build your first 1,000 EUR online in 90 days.",
};

export default function Home() {
  redirect("/events");
}

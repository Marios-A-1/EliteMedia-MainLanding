"use client";

import { useState, type FormEvent } from "react";

type ClaimTicketFormProps = {
  sessionId: string;
  tier: "regular" | "vip";
  defaultEmail?: string;
  defaultName?: string;
  defaultPhone?: string;
};

const resolveMessage = (status?: string) => {
  switch (status) {
    case "invalid_tier":
      return "This ticket tier is invalid.";
    case "already_claimed":
      return "This ticket has already been claimed.";
    case "not_paid":
      return "We couldn't confirm your payment yet. Please try again later.";
    case "session_not_found":
      return "We couldn't find that checkout session.";
    default:
      return "Something went wrong. Please try again or contact support.";
  }
};

export default function ClaimTicketForm({
  sessionId,
  tier,
  defaultEmail,
  defaultName,
  defaultPhone,
}: ClaimTicketFormProps) {
  const [fullName, setFullName] = useState(defaultName ?? "");
  const [email, setEmail] = useState(defaultEmail ?? "");
  const [phone, setPhone] = useState(defaultPhone ?? "");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage(null);

    try {
      const response = await fetch("/api/events/claim-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          tier,
          fullName,
          email,
          phone,
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | { status?: string }
        | null;

      if (!response.ok) {
        setStatus("error");
        setMessage(resolveMessage(data?.status));
        return;
      }

      setStatus("success");
      setMessage("Ticket claimed successfully. Check your email for confirmation.");
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div>
        <label className="text-sm font-semibold text-neutral-700">Ονοματεπώνυμο</label>
        <input
          type="text"
          required
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-sm focus:border-amber-400 focus:outline-none"
        />
      </div>
      <div>
        <label className="text-sm font-semibold text-neutral-700">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-sm focus:border-amber-400 focus:outline-none"
        />
      </div>
      <div>
        <label className="text-sm font-semibold text-neutral-700">Τηλέφωνο</label>
        <input
          type="tel"
          required
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-sm focus:border-amber-400 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="inline-flex w-full items-center justify-center rounded-full border border-amber-300 bg-amber-400/90 px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Επεξεργασία..." : "Κράτα την θέση σου"}
      </button>

      {message ? (
        <p
          className={`text-sm ${
            status === "success" ? "text-emerald-600" : "text-rose-600"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

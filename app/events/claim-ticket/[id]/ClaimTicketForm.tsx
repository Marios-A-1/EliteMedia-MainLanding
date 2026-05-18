"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type ClaimTicketFormProps = {
  sessionId: string;
  tier: "regular" | "vip" | "online";
  defaultEmail?: string;
  defaultName?: string;
  defaultPhone?: string;
};

const resolveMessage = (status?: string) => {
  switch (status) {
    case "missing_fields":
      return "Συμπλήρωσε όλα τα πεδία.";
    case "invalid_tier":
      return "Μη έγκυρη κατηγορία εισιτηρίου.";
    case "invalid_phone":
      return "Μη έγκυρος αριθμός τηλεφώνου.";
    case "already_claimed":
      return "Αυτό το εισιτήριο έχει ήδη καταχωρηθεί.";
    case "not_paid":
      return "Δεν έχει επιβεβαιωθεί ακόμη η πληρωμή.";
    case "session_not_found":
      return "Δεν βρέθηκε η συνεδρία πληρωμής.";
    default:
      return "Κάτι πήγε στραβά. Προσπάθησε ξανά.";
  }
};

const normalizePhone = (value: string) => value.replace(/[^\d+]/g, "");

const isValidPhone = (value: string) => /^\+?\d{8,15}$/.test(value);

export default function ClaimTicketForm({
  sessionId,
  tier,
  defaultEmail,
  defaultName,
  defaultPhone,
}: ClaimTicketFormProps) {
  const router = useRouter();
  const thankYouUrl = `/events/claim-ticket/thank-you?session_id=${encodeURIComponent(
    sessionId
  )}`;
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

    const normalizedPhone = normalizePhone(phone);
    if (!isValidPhone(normalizedPhone)) {
      setStatus("error");
      setMessage("Μη έγκυρος αριθμός τηλεφώνου.");
      return;
    }

    try {
      const response = await fetch("/api/events/claim-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          tier,
          fullName,
          email,
          phone: normalizedPhone,
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | { status?: string }
        | null;

      if (!response.ok) {
        if (data?.status === "already_claimed") {
          setStatus("success");
          router.replace(thankYouUrl);
          return;
        }
        setStatus("error");
        setMessage(resolveMessage(data?.status));
        return;
      }

      setStatus("success");
      router.replace(thankYouUrl);
    } catch (error) {
      setStatus("error");
      setMessage("Κάτι πήγε στραβά. Προσπάθησε ξανά.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-7 space-y-5">
      <div>
        <label className="text-sm font-black text-neutral-700">
          Ονοματεπώνυμο
        </label>
        <input
          type="text"
          required
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white/90 px-4 py-4 text-base font-semibold text-neutral-950 shadow-[0_10px_24px_rgba(15,23,42,0.06)] transition focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100"
        />
      </div>
      <div>
        <label className="text-sm font-black text-neutral-700">
          Ηλεκτρονικό ταχυδρομείο
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white/90 px-4 py-4 text-base font-semibold text-neutral-950 shadow-[0_10px_24px_rgba(15,23,42,0.06)] transition focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100"
        />
      </div>
      <div>
        <label className="text-sm font-black text-neutral-700">Τηλέφωνο</label>
        <input
          type="tel"
          inputMode="tel"
          required
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white/90 px-4 py-4 text-base font-semibold text-neutral-950 shadow-[0_10px_24px_rgba(15,23,42,0.06)] transition focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="event-brand-cta inline-flex w-full items-center justify-center rounded-2xl px-5 py-4 text-sm font-black transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Επεξεργασία..." : "Κράτα τη θέση σου"}
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

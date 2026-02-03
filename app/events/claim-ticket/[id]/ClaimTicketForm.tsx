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
        setStatus("error");
        setMessage(resolveMessage(data?.status));
        return;
      }

      setStatus("success");
      setMessage("Η θέση σου καταχωρήθηκε.");
    } catch (error) {
      setStatus("error");
      setMessage("Κάτι πήγε στραβά. Προσπάθησε ξανά.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div>
        <label className="text-sm font-semibold text-neutral-700">
          Ονοματεπώνυμο
        </label>
        <input
          type="text"
          required
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-sm focus:border-amber-400 focus:outline-none"
        />
      </div>
      <div>
        <label className="text-sm font-semibold text-neutral-700">
          Ηλεκτρονικό ταχυδρομείο
        </label>
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
          inputMode="tel"
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
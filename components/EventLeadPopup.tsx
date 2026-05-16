"use client";

import { useEffect, useState, type FormEvent } from "react";

import AnimatedContent from "@/components/AnimatedContent";
import ElectricBorder from "@/components/ElectricBorder";
import {
  EVENT_LEAD_POPUP_OPEN,
  type EventLeadPopupOpenDetail,
} from "@/utils/eventLeadPopup";

type SubmitStatus = "idle" | "loading" | "error";
type PopupStep = "form" | "success";

const SUCCESS_MESSAGE = "Κάποιος από την ομάδα μας θα επικοινωνήσει μαζί σου σύντομα.";

const normalizePhone = (value: string) => value.replace(/[^\d+]/g, "");
const isValidPhone = (value: string) => /^\+?\d{8,15}$/.test(value);

const resolveErrorMessage = (status?: string) => {
  switch (status) {
    case "invalid_phone":
      return "Μη έγκυρος αριθμός τηλεφώνου.";
    case "missing_fields":
      return "Συμπλήρωσε όλα τα πεδία.";
    case "sheet_error":
      return "Κάτι πήγε στραβά. Προσπάθησε ξανά.";
    default:
      return "Κάτι πήγε στραβά. Προσπάθησε ξανά.";
  }
};

export default function EventLeadPopup() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<PopupStep>("form");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [source, setSource] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handleOpen = (event: Event) => {
      const customEvent = event as CustomEvent<EventLeadPopupOpenDetail>;
      setSource(customEvent.detail?.source);
      setOpen(true);
    };

    window.addEventListener(EVENT_LEAD_POPUP_OPEN, handleOpen);
    return () => {
      window.removeEventListener(EVENT_LEAD_POPUP_OPEN, handleOpen);
    };
  }, []);

  const resetState = () => {
    setStep("form");
    setStatus("idle");
    setMessage(null);
    setFullName("");
    setEmail("");
    setPhone("");
    setSource(undefined);
  };

  const handleClose = () => {
    setOpen(false);
    resetState();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedPhone = normalizePhone(phone);
    if (!isValidPhone(normalizedPhone)) {
      setStatus("error");
      setMessage("Μη έγκυρος αριθμός τηλεφώνου.");
      return;
    }

    setStatus("loading");
    setMessage(null);

    try {
      const response = await fetch("/api/events/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: normalizedPhone,
          source,
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | { status?: string }
        | null;

      if (!response.ok) {
        setStatus("error");
        setMessage(resolveErrorMessage(data?.status));
        return;
      }

      setStatus("idle");
      setMessage(null);
      setStep("success");
    } catch {
      setStatus("error");
      setMessage("Κάτι πήγε στραβά. Προσπάθησε ξανά.");
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-4 py-6">
      <div
        className="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />
      <AnimatedContent
        className="relative w-full max-w-md"
        distance={340}
        reverse
        duration={1.2}
        ease="power3.out"
        delay={0}
        threshold={1}
        playOnMount
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Lead form popup"
          className="relative w-full max-w-md"
        >
          {/* <ElectricBorder
            color="#fcc76d"
            speed={1.0}
            chaos={0.05}
            style={{ borderRadius: 24 }}
          > */}
            <div className="relative overflow-hidden rounded-[24px] bg-white p-6">
              <button
                type="button"
                onClick={handleClose}
                className="absolute right-4 top-4 rounded-full bg-neutral-100 px-3 py-1 text-xs font-bold text-neutral-500 hover:text-neutral-800"
                aria-label="Close lead form"
              >
                X
              </button>

              {step === "form" ? (
                <>
                  <h3 className="text-center text-2xl font-bold text-neutral-900">
                    Στοιχεία Επικοινωνίας
                  </h3>
                  <p className="mt-2 text-center text-sm text-neutral-600">
                    Συμπλήρωσε τα στοιχεία σου και θα επικοινωνήσουμε μαζί σου.
                  </p>
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
                      <label className="text-sm font-semibold text-neutral-700">
                        Τηλέφωνο
                      </label>
                      <input
                        type="tel"
                        inputMode="tel"
                        required
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-sm focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <AnimatedContent
                      className="w-full"
                      duration={2.0}
                      delay={0.15}
                      playOnMount
                    >
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="event-brand-cta inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-black transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {status === "loading" ? "Επεξεργασία..." : "Υποβολή"}
                      </button>
                    </AnimatedContent>

                    {message ? <p className="text-sm text-rose-600">{message}</p> : null}
                  </form>
                </>
              ) : (
                <div className="py-4 text-center">
                  <h3 className="text-2xl font-bold text-neutral-900">Ευχαριστούμε!</h3>
                  <p className="mt-3 text-sm text-neutral-700">{SUCCESS_MESSAGE}</p>
                  <AnimatedContent
                    className="mt-6 flex justify-center"
                    duration={2.0}
                    delay={0.15}
                    playOnMount
                  >
                    <button
                      type="button"
                      onClick={handleClose}
                      className="event-brand-cta inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-black transition hover:brightness-105"
                    >
                      Κλείσιμο
                    </button>
                  </AnimatedContent>
                </div>
              )}
            </div>
          {/* </ElectricBorder> */}
        </div>
      </AnimatedContent>
    </div>
  );
}

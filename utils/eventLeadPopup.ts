export const EVENT_LEAD_POPUP_OPEN = "event-lead-popup:open";

export type EventLeadPopupOpenDetail = {
  source?: string;
};

export const openEventLeadPopup = (source?: string) => {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent<EventLeadPopupOpenDetail>(EVENT_LEAD_POPUP_OPEN, {
      detail: { source },
    })
  );
};

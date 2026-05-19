const EVENT_TITLE = "THYMIOLAS — Πώς Έβγαλα Χρήματα με το AI στην Ελλάδα";
const EVENT_SUBTITLE =
  "Πραγματικό value μέσα από προσωπική εμπειρία, γνώσεις και στρατηγικές γύρω από το AI και το online income στην Ελλάδα.";
const EVENT_LOCATION = "Αθήνα, Στριγγάρη 5, 173 43";
const EVENT_LOCATION_QUERY = encodeURIComponent(EVENT_LOCATION);

const GOOGLE_CALENDAR_URL = (() => {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: EVENT_TITLE,
    dates: "20260523T183000/20260523T203000",
    details:
      "23/05/2026 στις 18:30. Πραγματικό free value γύρω από το AI και το online income στην Ελλάδα.",
    location: EVENT_LOCATION,
    ctz: "Europe/Athens",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
})();

export const EVENT_CONFIG = Object.freeze({
  ENABLE_EVENT_OFFER_COUNTDOWN: false,
  EVENT_TITLE,
  EVENT_SUBTITLE,
  EVENT_LOCATION_NAME: "Αθήνα",
  EVENT_LOCATION_ADDRESS: "Στριγγάρη 5, 173 43",
  EVENT_LOCATION_TEXT: EVENT_LOCATION,
  TIMEZONE: "Europe/Athens",
  START_LOCAL: "2026-05-23 18:30",
  END_LOCAL: "2026-05-23 20:30",
  START_UTC: "20260523T153000Z",
  END_UTC: "20260523T173000Z",
  EVENT_DATETIME_LABEL: "23/05/2026",
  EVENT_TIME_LABEL: "18:30",
  GOOGLE_MAPS_DIRECTIONS_URL: `https://www.google.com/maps/dir/?api=1&destination=${EVENT_LOCATION_QUERY}`,
  GOOGLE_MAPS_EMBED_URL: `https://www.google.com/maps?q=${EVENT_LOCATION_QUERY}&output=embed`,
  GOOGLE_CALENDAR_URL,
});

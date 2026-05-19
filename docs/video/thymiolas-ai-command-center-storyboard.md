# THYMIOLAS AI Command Center Video Storyboard

Purpose: reuse the new web hero direction as a 12-15 second promo animation in HyperFrames or Remotion.

## Visual System

- Palette: near-black `#07111f`, white `#ffffff`, blue `#2563eb`, light blue `#38bdf8`, soft blue surfaces `#eff6ff`.
- Typography: heavy display headline, compact uppercase labels, readable Greek body copy.
- Motif: AI command-center panel with prompt, roadmap cards, thin connection lines, and blue glow.
- Motion: deterministic, no random effects. Cards and connection lines animate in sequence.

## Timing Map

| Time | Scene | Visual |
| --- | --- | --- |
| 0.0-3.8s | Prompt types in | Command panel appears. Prompt text types: "Πώς μπορώ να βγάλω χρήματα με AI στην Ελλάδα;" |
| 3.8-9.5s | Roadmap expands | Four cards animate from the prompt line: Skill, Offer, Outreach, First Income. Connection line draws left to right. |
| 9.5-13.5s | Event lockup | Cards settle behind title. Show "THYMIOLAS", "Πώς Έβγαλα Χρήματα με το AI στην Ελλάδα", "23/05", "18:30", "15€ Online", "29€ In-Person". |
| 13.5-15.0s | CTA hold | Final blue pulse on "Δήλωσε ενδιαφέρον". Hold clean frame for export thumbnails. |

## HyperFrames Notes

- Build the end-state layout first, then use GSAP entrances from that final layout.
- Root composition: `1920x1080`, duration `15s`.
- Use separate text elements for prompt, card labels, headline, date, and prices.
- Register one paused timeline as `window.__timelines["thymiolas-ai-command-center"]`.
- Use finite repeats only for subtle glows or connection pulses.

## Remotion Notes

- Composition: `ThymiolasAiCommandCenter`, `durationInFrames: 450`, `fps: 30`, `width: 1920`, `height: 1080`.
- Use sequence blocks for the three scenes.
- Use `interpolate()` for line draw, card opacity, y-offset, and final CTA pulse.
- Keep all visible text as props so variants can be rendered for vertical/social formats later.

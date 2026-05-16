# Thymiolas AI Event Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the existing `/events` page for "EVENT: THYMIOLAS — Πώς Έβγαλα Χρήματα με το AI στην Ελλάδα" and shift the event accent from gold/yellow to blue.

**Architecture:** Keep the existing Next.js App Router route and existing event components. Replace page content constants and shared event config, then update the event-facing accent classes/styles in place instead of introducing a new design system.

**Tech Stack:** Next.js 15 App Router, React 19, Tailwind CSS v4, Ant Design components.

---

### Task 1: Event Copy And Config

**Files:**
- Modify: `app/events/page.tsx`
- Modify: `lib/eventConfig.ts`
- Modify: `components/EventDetails.tsx`
- Modify: `components/BreakdownTimeline.tsx`
- Modify: `components/Directions.tsx`

- [ ] **Step 1: Update shared event config**

Set the event title/subtitle to "THYMIOLAS — Πώς Έβγαλα Χρήματα με το AI στην Ελλάδα", date to May 31, 2026, and default unknown venue text to "Θα ανακοινωθεί". Keep UTC values aligned to a placeholder 12:00-16:00 Europe/Athens slot until the client supplies exact time.

- [ ] **Step 2: Update `/events` hero and CTA constants**

Replace the old "first 1000€ online in 90 days" copy with AI/income-in-Greece positioning. Keep `EventTicketsCta` as the existing CTA component and use lead-popup behavior already present.

- [ ] **Step 3: Update content section constants**

Use the supplied structure:
1. Εισαγωγή
2. Storytelling
3. Πώς να το Κάνεις και Εσύ
4. Waitlist / CTA
5. Q&A Session

- [ ] **Step 4: Update event details**

Show May 31, 2026, online/in-person ticket prices, and online plus in-person access. Leave venue/time as "Θα ανακοινωθεί" where exact data is missing.

### Task 2: Blue Event Accent

**Files:**
- Modify: `app/css/style.css`
- Modify: `components/hero-home.tsx`
- Modify: `components/EventTicketsCta.tsx`
- Modify: `components/EventLeadPopup.tsx`
- Modify: `components/EventOfferCountdownBadge.tsx`
- Modify: `components/EventOfferCountdownPopup.tsx`
- Modify: `components/Directions.tsx`
- Modify: `components/BreakdownTimeline.tsx`
- Modify: `components/EventDetails.tsx`
- Modify: `components/cta.tsx`

- [ ] **Step 1: Update theme tokens**

Change Tailwind amber theme tokens to blue values so existing `amber-*` event utilities render blue without rewriting every component.

- [ ] **Step 2: Replace hard-coded gold values**

Replace event-facing hard-coded gold hex/rgb values (`#f59e0b`, `#fbbf24`, `#f4c74e`, `#fff1d1`, gold shadows) with blue equivalents.

- [ ] **Step 3: Keep existing component structure**

Do not add new layout components. Existing sections should keep their current behavior, animations, and lead-popup CTA wiring.

### Task 3: Verification

**Files:**
- No new production files.

- [ ] **Step 1: Build**

Run `npm run build`. Expected: successful Next.js production build.

- [ ] **Step 2: Browser verification**

Open `http://127.0.0.1:3001/`. Expected: redirects to `/events`. Confirm page title and visible hero reflect the Thymiolas AI event and blue accents render.

- [ ] **Step 3: Report missing inputs**

Tell the user that exact event time and venue/map details are still missing from the supplied brief and are currently represented as "Θα ανακοινωθεί".

## Self-Review

Spec coverage: homepage redirect already exists; this plan covers new event title, goal, date, tickets, structure, and blue accent. Missing source data is handled explicitly with "Θα ανακοινωθεί".

Placeholder scan: no implementation step depends on unknown code names or future TODOs.

Type consistency: changes use existing exported content objects and component prop shapes.

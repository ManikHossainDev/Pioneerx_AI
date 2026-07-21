# PioneerX — Frontend Update List (v1.5)

> This document covers all frontend changes required for v1.5. Changes are organized from smallest to largest. Each item references the relevant backend API or data it depends on.

---

## New Features (Add Before Everything Else)

### 0a. "Where We Mind Your Business" — Chatbox Placeholder
Inside every section's chat screen, before the user sends their first message, display the following in the center of the chat area:

- PioneerX logo (or icon)
- Below the logo: **"Where We Mind Your Business"** as a tagline/slogan text
- Below that: the chat input box

Once the user sends a message, this placeholder disappears and the conversation takes over. This is purely a UI/display change — no backend dependency.

### 0b. 3-Day Free Trial Popup
When a user visits the website for the first time (no active session), show a popup/modal offering the 3-day free trial.

- Show once per visitor (use localStorage to track if already shown)
- Popup content: headline, brief description of what the trial includes, a "Start Free Trial" CTA button
- "Start Free Trial" → navigates to the registration/magic link screen
- Include a dismiss option ("Maybe later" or an X button)
- Do not show the popup if the user is already logged in

No backend dependency — trial is automatically applied on registration (handled in backend).

### 0c. Promo Code Input at Registration
On the registration screen (where user enters their email for magic link), add an optional promo code field:

- Label: "Have a promo code? (Optional)"
- Input field for the code
- If filled, pass `promoCode` to `POST /auth/magic-link` or apply after login via `POST /auth/apply-promo`
- On success: show "Promo code applied! Your trial has been extended." message
- On error: show the error message returned by the backend (expired, invalid, already used)

**Backend dependency:** `POST /auth/apply-promo` — see backend changelog §12b.

---

## Quick Fixes (UI & Content)

### 1. Hide Sign In button when logged in
If a valid auth token/session exists, do not render the Sign In button anywhere on the site or app. Show the user's profile/avatar instead.

### 2. Remove "Careers" from website
Remove the Careers link and page entirely from the website navigation and footer.

### 3. Remove fake reviews + Add real review system
Remove the existing fake testimonials section entirely.

Replace it with a real review display system:

**How it works:**
- Backend এ একটা `Review` table থাকবে (name, role/company, reviewText, avatarUrl, isApproved, createdAt)
- Admin panel থেকে admin real reviews add + approve করবে
- Website এ `GET /reviews` call করে approved reviews fetch করে দেখাবে
- কোনো approved review না থাকলে section টা hide থাকবে — empty state দেখাবে না

**Backend এ যা লাগবে (backend team কে জানাও):**
```
model Review {
  id          String   @id @default(uuid())
  name        String
  roleCompany String?
  reviewText  String   @db.Text
  avatarUrl   String?
  isApproved  Boolean  @default(false)
  createdAt   DateTime @default(now())
}

GET  /reviews              → returns all approved reviews (public)
POST /admin/reviews        → admin adds a review
PATCH /admin/reviews/:id   → admin edits or approves/rejects
DELETE /admin/reviews/:id  → admin deletes
```

**Frontend এ:**
- `GET /reviews` call করো page load এ
- Response empty হলে section hide করো
- Response এ data থাকলে existing testimonial UI তে real data দিয়ে render করো


### 3b. Real User Review Submission (in-app)
Inside the app (any section or profile area), add a "Leave a Review" option.

**UI:**
- A button or menu item: "Rate your experience"
- Tapping opens a modal/screen with:
  - Name field (pre-filled from profile if available)
  - Role/Company field (optional)
  - Star rating (1-5)
  - Review text area
  - Submit button

**Flow:**
- On submit → call `POST /reviews`
- On success → show "Thank you! Your review will appear after approval."
- On error → show error message

**Backend dependency:** `POST /reviews` — see backend changelog §14b.

### 4. Fix footer links
The Contact link currently scrolls back to the footer. Fix the routing so each footer link navigates to its correct destination. Audit all footer links and fix any that are broken or point to the wrong location.

### 5. Fix mobile section titles
On the mobile version of the website, section titles are displaying incorrectly. Identify the responsive breakpoint where this breaks and fix the title rendering to match the desktop version.

### 6. Update home page image
The current home page hero/dashboard image no longer reflects the product. Replace it with an updated visual that matches the current UI. Coordinate with design if a new asset is needed.

### 7. Update Privacy Policy and Terms of Service
Replace the current Privacy Policy and Terms of Service content with the updated versions provided by the client.

### 8. Legal & Finance disclaimer
At the top of the Legal & Finance section, add the following disclaimer in a visually distinct style (e.g. a banner or info box):

> "This is general information only — not legal or financial advice. Consult a qualified professional before making business decisions."

---

## Medium Fixes (Functionality)

### 9. Fix section descriptions
Each section screen currently shows the Idea & Validation description at the top regardless of which section the user is in. Fix this so the description displayed matches the active section.

**Backend dependency:** `GET /sections/:key` returns the correct section data including its own name and description. Ensure the frontend is reading `section.description` (or equivalent field) from the API response, not from a hardcoded or incorrectly cached value.

### 10. Fix business profile naming during onboarding
When a new user registers or creates their first business profile, show a prompt or input field asking them to name the business before proceeding. The current default "Untitled Business" should not be shown without giving the user a chance to set a name.

**Backend dependency:** `PATCH /business-profiles/:id` — call this with the name the user provides during onboarding.

### 11. Fix saved outputs showing in wrong section
A saved output from Idea & Validation should not appear when the user is in Sales. Saved outputs should only display outputs that belong to the current section.

**Backend dependency:** `GET /saved-outputs` now filters by the current section. Ensure the frontend is passing the current `sectionKey` or `sectionId` as a query parameter when fetching saved outputs.

### 12. Fix saved output "Tap to View"
Currently tapping a saved output only shows tasks and suggested links. It should show the full conversation that led to that saved output, along with the tasks and links.

**Backend dependency:** `GET /generations/:id` now includes the linked conversation messages. Display these messages in a modal or dedicated view, followed by the action steps and suggested links below.

---

## Larger Updates (New Behaviour)

### 13. Business context across sections (no UI change needed)
The AI will now automatically remember the user's business profile (name, industry, phase) when moving between sections. No frontend change required — this is a backend fix. However, if the frontend was manually passing any business context to the AI, remove that logic and let the backend handle it entirely.

### 14. Auto-generation of tasks and suggested links
The "Generate" button that previously triggered action steps and suggested links is no longer needed. Tasks and links now generate automatically with every message.

**What to do:**
- **[COMMENT OUT]** the Generate button and its click handler — do not delete.
- After receiving a message response from `POST /conversations/:sectionKey/message`, read `action_steps` and `suggested_links` directly from the response and render them.
- Update the UI so tasks and links refresh automatically after each message, without any user action.

**Backend dependency:** `POST /conversations/:sectionKey/message` response now includes:
```json
{
  "message": { "role": "assistant", "content": "..." },
  "action_steps": [...],
  "suggested_links": [...],
  "generationId": "...",
  "creditStatus": { "balance": 1240, "limit": 15000, "percentage": 8, "resetAt": "..." }
}
```

### 15. Locked sections in sidebar
Free users should be able to see all sections (Core, Advanced, Pro+, Elite) in the sidebar, but sections they don't have access to should appear greyed out with a lock icon and an "Upgrade" label or button next to the tier name.

**Backend dependency:** `GET /sections` now returns all sections with an `isLocked: boolean` field. Use this to conditionally style locked sections and show the upgrade prompt.

Tapping a locked section should show an upgrade modal or navigate to the pricing/upgrade screen — not navigate into the section.

### 16. Credit balance on screen
Display the user's credit balance persistently on the screen — suggested placement is the top navigation bar or a fixed header area.

Format: `1,240 credits remaining` or a progress bar showing used/total.

**Backend dependency:** Every message response includes `creditStatus`. Also call `GET /credit-status` on dashboard load to get the initial value.

At 80%+ used → show the balance in a warning colour (orange/yellow).
At 100% used → show "No credits remaining" and disable the message input and generate button.

### 17. Notifications
Add a notification bell icon to the navigation. Tapping it opens a panel or dropdown showing unread notifications.

Notification types to display:
- `credit_low` — "You have less than 10% of your credits remaining."
- `model_update` — "A new AI model has been added to PioneerX."
- `platform_update` — Platform update message (text from admin).

**Backend dependency:**
- `GET /notifications` — fetch unread notifications
- `PATCH /notifications/:id/read` — mark as read on tap
- `PATCH /notifications/read-all` — mark all as read

Show an unread count badge on the bell icon when there are unread notifications.

### 18. Image generation UI
Add an image generation feature in the "Where We Mind Your Business" section.

UI elements:
- A text input for the image prompt
- A type selector: "Logo" or "Business Card"
- A "Generate Image" button
- A display area for the generated image with a download option

On clicking Generate:
- Call `POST /image/generate` with `{ prompt, type }`
- Show a loading state while the image is being generated
- Display the returned image
- If `creditLimitReached` error → show upgrade prompt
- If daily image limit reached → show "You've reached your daily image limit. Upgrade for more."

After generation, deduct from the displayed credit balance using the `creditStatus` returned in the response.

---

## API Response Reference (for frontend developer)

```
POST /conversations/:sectionKey/message
→ { message, action_steps, suggested_links, generationId, creditStatus }

GET /sections
→ [{ id, key, name, description, requiredTier, isLocked }, ...]

GET /saved-outputs?sectionKey=:key
→ [{ id, generationId, label, savedAt }, ...]

GET /generations/:id
→ { id, action_steps, suggested_links, conversation: { messages: [...] } }

GET /credit-status
→ { balance, limit, percentage, resetAt }

GET /notifications
→ [{ id, type, message, isRead, createdAt }, ...]

POST /image/generate
→ { imageUrl, creditStatus } | { creditLimitReached: true } | { dailyLimitReached: true }
```

---

## Summary

| # | Change | Type |
|---|---|---|
| 1 | Hide Sign In when logged in | UI fix |
| 2 | Remove Careers | Content |
| 3 | Remove fake reviews | Content |
| 4 | Fix footer links | Bug fix |
| 5 | Fix mobile section titles | Bug fix |
| 6 | Update home page image | Content |
| 7 | Update Privacy Policy & Terms | Content |
| 8 | Legal & Finance disclaimer | Content |
| 9 | Fix section descriptions | Bug fix |
| 10 | Fix business profile naming | Bug fix |
| 11 | Fix saved outputs by section | Bug fix |
| 12 | Fix saved output view (show conversation) | Bug fix |
| 13 | Business context across sections | Backend only — no frontend change |
| 14 | Auto-generate tasks + links (comment out Generate button) | New behaviour |
| 15 | Locked sections in sidebar | New feature |
| 16 | Credit balance on screen | New feature |
| 17 | Notifications | New feature |
| 18 | Image generation UI | New feature |

| 0a | "Where We Mind Your Business" slogan in chatbox | New UI |
| 0b | 3-day free trial popup on website | New UI |
| 0c | Promo code input at registration | New feature |

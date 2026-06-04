# Google Sheets — Contact & Partner forms

Submissions from the homepage **Contact** form and **Partner With Us** page are saved to your Google Sheet via a Apps Script web app.

## Spreadsheet tabs

Create one Google Sheet with these tabs (exact names):

| Tab name | Form | API |
|----------|------|-----|
| `ContactInfo` | Homepage contact section | `POST /api/contact` |
| `PartnerWithUs` | `/partner-with-us` form | `POST /api/partner` |

### Row 1 — headers

**ContactInfo**

`Submitted At` | `Full Name` | `Email` | `Phone` | `Subject` | `Message`

**PartnerWithUs**

`Submitted At` | `Full Name` | `Email` | `Phone` | `Company` | `Message`

## Setup

1. Create the sheet and tabs above with header rows.
2. **Extensions → Apps Script** — paste `docs/google-apps-script.gs` from this repo.
3. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Copy the deployment URL into `.env.local` at the project root:

```env
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

5. Restart the dev server (`npm run dev`) or redeploy production.

Without `GOOGLE_SHEETS_WEBHOOK_URL`, forms still work in **development** (logged to the terminal). In **production**, submissions return an error until the URL is set.

## Share the sheet

The Google account that owns the script must have edit access to the spreadsheet. The script uses `SpreadsheetApp.getActiveSpreadsheet()`, so bind the script to that sheet (open the sheet → Extensions → Apps Script).

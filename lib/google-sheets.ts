/**
 * Google Apps Script Web App — append form rows to spreadsheet tabs.
 * Expects POST JSON: { sheet: "ContactInfo" | "PartnerWithUs", ...fields }
 */

export const SHEET_TABS = {
  contact: 'ContactInfo',
  partner: 'PartnerWithUs',
} as const

export type SheetTabName = (typeof SHEET_TABS)[keyof typeof SHEET_TABS]

export type GoogleSheetsResult =
  | { ok: true; skipped?: boolean }
  | { ok: false; message: string }

export async function appendToGoogleSheet(
  sheet: SheetTabName,
  payload: Record<string, string>,
): Promise<GoogleSheetsResult> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim()

  if (!url) {
    if (process.env.NODE_ENV === 'development') {
      console.info('[google-sheets] skipped (GOOGLE_SHEETS_WEBHOOK_URL not set)', { sheet, payload })
      return { ok: true, skipped: true }
    }
    return { ok: false, message: 'Form storage is not configured. Please try again later.' }
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sheet,
        submittedAt: new Date().toISOString(),
        ...payload,
      }),
      cache: 'no-store',
    })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      console.error('[google-sheets] HTTP error', res.status, text)
      return { ok: false, message: 'Unable to save your submission. Please try again.' }
    }

    let json: { success?: boolean; message?: string } = {}
    try {
      json = (await res.json()) as { success?: boolean; message?: string }
    } catch {
      /* Apps Script may return plain text */
    }

    if (json.success === false) {
      return { ok: false, message: json.message ?? 'Unable to save your submission.' }
    }

    return { ok: true }
  } catch (err) {
    console.error('[google-sheets]', err)
    return { ok: false, message: 'Unable to save your submission. Please try again.' }
  }
}

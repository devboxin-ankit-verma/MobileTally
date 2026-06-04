/**
 * MobileTally — ContactInfo & PartnerWithUs form webhook
 * Deploy as Web App (Anyone) and set GOOGLE_SHEETS_WEBHOOK_URL in .env.local
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const tab = data.sheet;
    const submittedAt = data.submittedAt || new Date().toISOString();

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(tab);

    if (!sheet) {
      return json({ success: false, message: 'Tab not found: ' + tab });
    }

    if (tab === 'ContactInfo') {
      sheet.appendRow([
        submittedAt,
        data.fullName || '',
        data.email || '',
        data.phone || '',
        data.subject || '',
        data.message || '',
      ]);
    } else if (tab === 'PartnerWithUs') {
      sheet.appendRow([
        submittedAt,
        data.fullName || '',
        data.email || '',
        data.phone || '',
        data.company || '',
        data.message || '',
      ]);
    } else {
      return json({ success: false, message: 'Invalid sheet' });
    }

    return json({ success: true });
  } catch (err) {
    return json({ success: false, message: String(err) });
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

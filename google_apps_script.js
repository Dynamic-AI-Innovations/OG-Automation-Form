// ═══════════════════════════════════════════════════════════════════
// OG Automation Gap Analysis — Google Apps Script Backend
// Deploy this as a Web App:
//   Extensions → Apps Script → paste this code → Deploy → New deployment
//   Type: Web App | Execute as: Me | Who has access: Anyone
// ═══════════════════════════════════════════════════════════════════

const SHEET_NAME = 'Submissions';

const HEADERS = [
  'Timestamp', 'First Name', 'Last Name', 'Job Title', 'Email',
  'Department', 'Team Size', 'Submission Date', 'Reports To',
  'Processes Identified', 'Top Process #1', 'Top Process #2', 'Top Process #3',
  'Tools In Use',
  'Automation Level (1-5)', 'Weekly Manual Hours', 'Data Entry % of Time',
  'Process Manual % Breakdown', 'Manual Handoffs',
  'Error / Delay Causes', 'Operational Risk', 'Past Incidents',
  'Reporting Status', 'Real-time Visibility',
  'Priority #1', 'Priority #1 Reason',
  'Priority #2', 'Priority #2 Reason',
  'Priority #3', 'Priority #3 Reason',
  'Long-term Goals', 'Success Looks Like', 'Freed-up Time Used For',
  'Change Readiness (1-5)', 'Digital Literacy (1-5)',
  'Blockers', 'Support Needed', 'Desired Timeline', 'Additional Comments'
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // Get or create the Submissions sheet
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      formatHeaderRow(sheet);
    }

    // Append the submission as a new row
    sheet.appendRow([
      new Date().toLocaleString('en-GB'),
      data.fname        || '',
      data.lname        || '',
      data.title        || '',
      data.email        || '',
      data.dept         || '',
      data.teamSize     || '',
      data.date         || '',
      data.reportsTo    || '',
      data.processes    || '',
      data.top1         || '',
      data.top2         || '',
      data.top3         || '',
      data.tools        || '',
      data.autoLevel    || '',
      data.hrsManual    || '',
      data.dataEntryPct || '',
      data.procTable    || '',
      data.handoffs     || '',
      data.errorCauses  || '',
      data.risk         || '',
      data.pastErrors   || '',
      data.reportingManual || '',
      data.realtimeVis  || '',
      data.qw1          || '',
      data.qw1why       || '',
      data.qw2          || '',
      data.qw2why       || '',
      data.qw3          || '',
      data.qw3why       || '',
      data.longterm     || '',
      data.success      || '',
      data.freedTime    || '',
      data.readiness    || '',
      data.digLiteracy  || '',
      data.blockers     || '',
      data.supportNeeds || '',
      data.timeline     || '',
      data.comments     || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function formatHeaderRow(sheet) {
  const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange.setBackground('#29ABE2');
  headerRange.setFontColor('#FFFFFF');
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(11);
  sheet.setFrozenRows(1);
  sheet.setColumnWidth(1, 160);   // Timestamp
  sheet.setColumnWidth(6, 130);   // Department
  sheet.setColumnWidth(10, 220);  // Processes
}

// Run this manually once to test the sheet is set up correctly
function testSetup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    formatHeaderRow(sheet);
    Logger.log('Sheet created successfully: ' + SHEET_NAME);
  } else {
    Logger.log('Sheet already exists: ' + SHEET_NAME);
  }
}

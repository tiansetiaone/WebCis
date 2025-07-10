const { google } = require('googleapis');

// Validasi environment variables
function checkEnvVars() {
  const requiredVars = [
    'GOOGLE_SERVICE_ACCOUNT_EMAIL',
    'GOOGLE_PRIVATE_KEY',
    'GOOGLE_SHEET_ID'
  ];
  
  const missingVars = requiredVars.filter(v => !process.env[v]);
  if (missingVars.length > 0) {
    throw new Error(`Missing environment variables: ${missingVars.join(', ')}`);
  }
}

checkEnvVars();

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

// Fungsi untuk semua sheet
async function initSheet(sheetName = 'Sheet1') {
  try {
    console.log(`Initializing sheet: ${sheetName}`);
    
    // Check if sheet exists
    const sheetExists = await checkSheetExists(sheetName);
    
    if (!sheetExists) {
      console.log(`Sheet ${sheetName} doesn't exist, creating...`);
      await createSheet(sheetName);
    }

    // Check if headers exist
    const headerResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A1:Z1`,
    });

    if (!headerResponse.data.values) {
      // Determine headers based on sheet name
      let headers;
      if (sheetName === 'Sheet1') {
        headers = ['Dokumen', 'Nama User', 'Email', 'No. Telpon', 'Timestamp'];
      } else if (sheetName === 'StoreContacts' || sheetName === 'KioskContacts') {
        headers = ['Nama', 'Email', 'Telepon', 'Alamat', 'Pesan', 'Timestamp'];
      } else {
        headers = ['Nama', 'Email', 'Telepon', 'Timestamp'];
      }

      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetName}!A1:${String.fromCharCode(65 + headers.length - 1)}1`,
        valueInputOption: 'USER_ENTERED',
        resource: { values: [headers] },
      });
      console.log(`Sheet ${sheetName} headers initialized`);
    }
  } catch (error) {
    console.error('Error initializing sheet:', {
      message: error.message,
      stack: error.stack,
      sheetName
    });
    throw error;
  }
}

// Fungsi untuk menyimpan data (versi lama untuk Sheet1)
async function saveToGoogleSheet(data) {
  return saveToCustomSheet(data, 'Sheet1');
}

// Fungsi untuk menyimpan data kontak (versi baru untuk Store/Kiosk)
async function saveContactToSheet(data, sheetName = 'StoreContacts') {
  return saveToCustomSheet(data, sheetName);
}

// Fungsi universal untuk menyimpan ke sheet tertentu
async function saveToCustomSheet(data, sheetName) {
  try {
    console.log(`Preparing to save to ${sheetName}`, data);

    // Pastikan sheet ada
    await initSheet(sheetName);

    let values;
    if (sheetName === 'Sheet1') {
      values = [
        [
          data.document,
          data.name,
          data.email,
          data.phone,
          new Date().toLocaleString('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
        ]
      ];
    } else {
      values = [
        [
          data.name,
          data.email,
          data.phone || '',
          data.address || '',
          data.message,
          new Date().toLocaleString('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
        ]
      ];
    }

    console.log('Values to be saved:', values);

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A2:F`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: { values },
    });

    console.log('Google Sheets response:', {
      updatedCells: response.data.updates?.updatedCells,
      updatedRange: response.data.updates?.updatedRange,
      spreadsheetId: response.data.spreadsheetId
    });

    return response.data;
  } catch (error) {
    console.error('Error saving to Google Sheet:', {
      message: error.message,
      stack: error.stack,
      sheetName,
      data,
      SPREADSHEET_ID
    });
    throw error;
  }
}

// Fungsi untuk membaca data
async function getDownloadData() {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A2:E',
    });
    return response.data.values || [];
  } catch (error) {
    console.error('Error reading from Google Sheet:', {
      message: error.message,
      stack: error.stack
    });
    return [];
  }
}

// Fungsi untuk menghapus data test
async function clearTestData(sheetName = 'Sheet1') {
  try {
    await sheets.spreadsheets.values.clear({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A2:Z`,
    });
    console.log(`Test data cleared from ${sheetName}`);
  } catch (error) {
    console.error('Error clearing test data:', {
      message: error.message,
      stack: error.stack,
      sheetName
    });
  }
}

// Fungsi bantuan untuk mengecek keberadaan sheet
async function checkSheetExists(sheetName) {
  try {
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });
    return spreadsheet.data.sheets.some(sheet => sheet.properties.title === sheetName);
  } catch (error) {
    console.error('Error checking sheet existence:', {
      message: error.message,
      stack: error.stack,
      sheetName
    });
    return false;
  }
}

// Fungsi bantuan untuk membuat sheet baru
async function createSheet(sheetName) {
  try {
    const response = await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      resource: {
        requests: [{
          addSheet: {
            properties: {
              title: sheetName
            }
          }
        }]
      }
    });
    console.log(`Created new sheet: ${sheetName}`, {
      spreadsheetId: SPREADSHEET_ID,
      sheetId: response.data.replies[0].addSheet.properties.sheetId
    });
    return response.data;
  } catch (error) {
    console.error('Error creating sheet:', {
      message: error.message,
      stack: error.stack,
      sheetName
    });
    throw error;
  }
}

module.exports = {
  saveToGoogleSheet,
  saveContactToSheet,
  getDownloadData,
  clearTestData
};
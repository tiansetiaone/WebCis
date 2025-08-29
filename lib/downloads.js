// lib/downloads.js
import fs from 'fs';
import path from 'path';

const downloadsFilePath = path.join(process.cwd(), 'data', 'downloads.json');

// Function untuk mendapatkan waktu Jakarta yang aman untuk server
function getJakartaTimestamp() {
  const now = new Date();
  
  // Manual adjustment: UTC + 7 jam untuk Asia/Jakarta
  const jakartaTime = new Date(now.getTime() + (7 * 60 * 60 * 1000));
  
  return jakartaTime.toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

export function saveDownloadData(data) {
  try {
    // Baca data yang ada
    let downloads = [];
    if (fs.existsSync(downloadsFilePath)) {
      const fileData = fs.readFileSync(downloadsFilePath, 'utf8');
      downloads = JSON.parse(fileData);
    }
    
    // Tambahkan data baru dengan timestamp Jakarta
    downloads.push({
      ...data,
      timestamp: getJakartaTimestamp(),
      // Simpan juga timestamp UTC untuk konsistensi data
      timestampUTC: new Date().toISOString()
    });
    
    // Simpan ke file
    fs.writeFileSync(downloadsFilePath, JSON.stringify(downloads, null, 2), 'utf8');
    
    return downloads;
  } catch (error) {
    console.error('Error saving download data:', error);
    throw error;
  }
}

export function getDownloadData() {
  try {
    if (!fs.existsSync(downloadsFilePath)) {
      return [];
    }
    
    const fileData = fs.readFileSync(downloadsFilePath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error('Error reading download data:', error);
    return [];
  }
}

// Optional: Function untuk format yang lebih konsisten
export function formatJakartaTime(date = new Date()) {
  const jakartaTime = new Date(date.getTime() + (7 * 60 * 60 * 1000));
  
  return {
    formatted: jakartaTime.toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }),
    iso: jakartaTime.toISOString(),
    timestamp: jakartaTime.getTime()
  };
}
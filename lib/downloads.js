// lib/downloads.js
import fs from 'fs';
import path from 'path';

const downloadsFilePath = path.join(process.cwd(), 'data', 'downloads.json');

export function saveDownloadData(data) {
  try {
    // Baca data yang ada
    let downloads = [];
    if (fs.existsSync(downloadsFilePath)) {
      const fileData = fs.readFileSync(downloadsFilePath, 'utf8');
      downloads = JSON.parse(fileData);
    }
    
    // Tambahkan data baru
    downloads.push({
      ...data,
      timestamp: new Date().toISOString()
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
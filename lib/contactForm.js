import fs from 'fs';
import path from 'path';

const submissionsPath = path.join(process.cwd(), '/data/contactSubmissions.json');

export function saveContactSubmission(data) {
  const allSubmissions = getContactSubmissions();
  const newSubmission = {
    ...data,
    id: Date.now().toString(),
    date: new Date().toISOString()
  };
  
  allSubmissions.push(newSubmission);
  fs.writeFileSync(submissionsPath, JSON.stringify(allSubmissions, null, 2));
  
  return newSubmission;
}

export function getContactSubmissions() {
  if (!fs.existsSync(submissionsPath)) {
    return [];
  }
  
  const fileData = fs.readFileSync(submissionsPath, 'utf8');
  return JSON.parse(fileData);
}
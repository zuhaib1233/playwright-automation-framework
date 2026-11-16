import fs from 'fs';
import path from 'path';

const filePath = path.resolve(process.cwd(), 'src/data/test-channels.json');

export interface ChannelRecord {
  number: string;
  name: string;
  createdAt: string;
}

// 1. JSON file se saare saved test channels read karna
export function getSavedChannels(): ChannelRecord[] {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
    return [];
  }
  const data = fs.readFileSync(filePath, 'utf-8');
  return data ? JSON.parse(data) : [];
}

// 2. Naya create kiya hua channel add karna
export function saveTestChannel(record: ChannelRecord) {
  const channels = getSavedChannels();
  channels.push(record);
  fs.writeFileSync(filePath, JSON.stringify(channels, null, 2));
}

// 3. Delete hone ke baad specific channel ko JSON se remove karna
export function removeChannelFromJson(number: string, name: string) {
  const channels = getSavedChannels();
  const updated = channels.filter(c => !(c.number === number && c.name === name));
  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
}
import { SearchResult } from "./fetchAllYouTubeResults";
import fs from 'fs';

export function saveData(data: SearchResult[], filename: string = 'data.csv'): void {
  console.log('Saving data to:', filename);
  let oldData: SearchResult[] = [];
  if (fs.existsSync(filename)) {
    const data: string = fs.readFileSync(filename, 'utf-8');
    oldData = data.split('\n').map((line) => {
      const [videoId, channelId, channelTitle, videoTitle] = line.split(';');
      return { videoId, channelId, channelTitle, videoTitle};
    });
  }
  
  const oldVideoIds = new Set(oldData.map((video) => video.videoId));
  const oldChannelIds = new Set(oldData.map((video) => video.channelId));
  let i = 0;
  for (const item of data) {
    if (!oldVideoIds.has(item.videoId) && !oldChannelIds.has(item.channelId)) {
      oldData.push(item);
      i++;
    }
  }

  console.log('Added', i, 'new videos');
  const mapItem = (item: SearchResult): string => `${item.videoId};${item.channelId};${item.channelTitle.replaceAll(';', ',')};${item.videoTitle.replaceAll(';', ',')}`;
  const saveString = oldData.map(mapItem).join('\n');
  fs.writeFileSync(filename, saveString);

}

import { saveData } from "./save";
import { searchYouTube } from "./searchYouTube";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function main(): Promise<void> {
  const queries = ["test"];
  try {

    for (const query of queries) {
      const videos = await searchYouTube(query);
      saveData(videos, `search.csv`);
      
      //console.log(videos);
      //console.log('Found', videos.length, 'videos');
      await delay(1000);
    }
  }
  catch (error) {
    console.error('Error searching YouTube:', (error as {message: string}).message);
  }
}

main();

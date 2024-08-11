import { getChannelInfo } from './getChannelInfo';
import { fetchSearchResults, filterItem, SearchResult } from './fetchAllYouTubeResults';

const SIX_MONTHS_AGO = new Date();
SIX_MONTHS_AGO.setMonth(SIX_MONTHS_AGO.getMonth() - 6);

export interface VideoResult {
  videoId: string;
  channelId: string;
  channelTitle: string;
  videoTitle: string;
  subscribers: number;
  duration: string;
  spokenPercentage: number;
}



export async function searchYouTube(query: string, maxResults: number = 500): Promise<SearchResult[]> {
  console.log('Searching YouTube for:', query);

  let nextPageToken: string | undefined;
  const finalSearchResults: SearchResult[] = [];

  do {
    const {searchResults, nextPageToken: newToken} = await fetchSearchResults(query, nextPageToken);
    //searchResults.push(...newResults);

    const channelIds = new Set<string>(searchResults.map((result) => result.channelId));
    const channelInfos = await getChannelInfo(Array.from(channelIds));
    //console.log('Found', searchResults.length, 'videos');
  

    const filteredResults = searchResults.filter((item) => filterItem(item, channelInfos));
    for (const item of filteredResults) {

      const channelId = item.channelId || '';
      
      if (!finalSearchResults.some((video) => video.channelId === channelId)) {
        finalSearchResults.push(item);
      }
    }
    
    nextPageToken = newToken;
  } while (nextPageToken && finalSearchResults.length < maxResults);

  return finalSearchResults;
}

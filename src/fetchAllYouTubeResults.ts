import { ChannelInfo} from './getChannelInfo';
import { youtube } from './youtube';

export interface SearchResult {
  videoId: string;
  channelId: string;
  channelTitle: string;
  videoTitle: string;
}
const SIX_MONTHS_AGO = new Date();
SIX_MONTHS_AGO.setMonth(SIX_MONTHS_AGO.getMonth() - 6);


export async function fetchSearchResults(query: string, nextPageToken: string | undefined): Promise<{
  searchResults: SearchResult[],
  nextPageToken: string | undefined}> {

  const searchResults: SearchResult[] = [];
  const searchResponse = await youtube.search.list({
    q: query,
    part: ['snippet'],
    type: ['video'],
    maxResults: 50,
    relevanceLanguage: 'en',
    videoDuration: 'medium', // up to 60 minutes
    videoCaption: 'closedCaption', // likely to have spoken content
    publishedAfter: SIX_MONTHS_AGO.toISOString(),
    pageToken: nextPageToken,
  });

  const items = searchResponse.data.items || [];
  for (const item of items) {
    const channelId = item.snippet?.channelId || '';
    const videoId = item.id?.videoId || '';
    if (channelId && videoId) {
      searchResults.push({
        videoId,
        channelId,
        channelTitle: item.snippet?.channelTitle || '',
        videoTitle: item.snippet?.title || '',
      });
    }
  }

  nextPageToken = searchResponse.data.nextPageToken || undefined;
  return {
    searchResults,
    nextPageToken,
  };
  }

  export function filterItem(item: SearchResult, channelInfos: ChannelInfo[]): boolean {
    const channelId = item.channelId || '';
    const channelInfo = channelInfos.find((info) => info.channelId === channelId) || { subscriberCount: 0 };
    
    if (
      channelInfo.subscriberCount >= 1000 &&
      channelInfo.subscriberCount <= 100000
    ) {
      return true;
    }
    return false;
  }
  


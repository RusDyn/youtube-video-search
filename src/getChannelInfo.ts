import { youtube } from "./youtube";

export interface ChannelInfo {
  subscriberCount: number;
  channelId: string;
}

export async function getChannelInfo(channelIds: string[]): Promise<ChannelInfo[]> {
  //console.log('channelIds:', channelIds);
  const ids = Array.from(channelIds);
  const resultChannelDatas: ChannelInfo[] = [];
  while (ids.length > 0) {
    const idsChunk = ids.splice(0, 50);
    const channelResponse = await youtube.channels.list({
      id: idsChunk,
      part: ['statistics'],
      maxResults: 50,
    });
    const channelDatas = channelResponse.data.items?.map((channelData) => 
      {
        const subscriberCount = parseInt(channelData?.statistics?.subscriberCount || '0', 10)
        return {subscriberCount, channelId: channelData.id!}
  }) || [];
    resultChannelDatas.push(...channelDatas);
  }
  

  
  return resultChannelDatas
}

import { youtube } from "./youtube";

export async function getVideoInfo(videoIds: string[]) {
  console.log('videoIds:', videoIds);
  const ids = Array.from(videoIds);
  const resultVideoDatas = [];
  while (ids.length > 0) {
    const idsChunk = ids.splice(0, 50);
    const videoResponse = await youtube.videos.list({
      id: idsChunk,
      part: ['contentDetails'],
      maxResults: 50,
    });
    const videoDatas = videoResponse.data.items?.map((videoData) => 
      {
        const duration = videoData?.contentDetails?.duration || 'PT0S';
        return {duration, videoId: videoData.id}
    }) || [];
    resultVideoDatas.push(...videoDatas);
  }
  
  return  resultVideoDatas;
}
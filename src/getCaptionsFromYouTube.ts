import { youtube } from "./youtube";

export async function getCaptionsFromYouTube(videoId: string): Promise<string> {
    try {
        const response = await youtube.videos.list({
            part: ['snippet', 'contentDetails'],
            id: [videoId],
        });

        if (response.data.items && response.data.items.length > 0) {
            const video = response.data.items[0];
            const json = JSON.stringify(video, null, 2);
            console.log(json);
            //console.log('Title:', video.snippet?.title);
            //console.log('Description:', video.snippet?.description);
            //console.log('Has Captions:', video.contentDetails?.caption);
        } else {
            console.log('No video found with the provided ID.');
        }
        return "";
    } catch (error) {
        console.error('Error fetching video details:', error);
    }
    return "";
}

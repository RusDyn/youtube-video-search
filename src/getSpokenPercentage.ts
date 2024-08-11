import { YoutubeTranscript } from 'youtube-transcript';
import { parseISO8601Duration } from './parseISO8601Duration';

export async function getSpokenPercentage(videoId: string, duration: string): Promise<number> {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    const totalWords = transcript.reduce((acc, entry) => acc + entry.text.split(' ').length, 0);
    const totalDurationInSeconds = parseISO8601Duration(duration);
    const averageSpeakingRate = 150; // Average speaking rate is about 150 words per minute
    const speakingTimeInSeconds = (totalWords / averageSpeakingRate) * 60;

    return (speakingTimeInSeconds / totalDurationInSeconds) * 100;
  } catch (error) {
    //console.error('Error fetching transcript:', error);
    return -1;
  }
}

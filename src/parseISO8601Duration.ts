export function parseISO8601Duration(duration: string): number {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = parseInt(match![1] || '0H', 10);
    const minutes = parseInt(match![2] || '0M', 10);
    const seconds = parseInt(match![3] || '0S', 10);
    return (hours * 3600) + (minutes * 60) + seconds;
  }
  
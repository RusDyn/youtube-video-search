import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();
const API_KEY = process.env.YOUTUBE_API_KEY;
console.log('API_KEY:', API_KEY);
const youtube = google.youtube({
    version: 'v3',
    auth: API_KEY,
});

export {youtube}
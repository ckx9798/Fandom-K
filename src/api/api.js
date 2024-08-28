import axios from 'axios';

// api instance
export const instance = axios.create({
    baseURL: 'https://fandom-k-api.vercel.app/6-2',
    timeout: 3000,
});

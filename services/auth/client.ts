import axios from "axios";

export const api = axios.create({
    baseURL: "https://example.com", // vamos alterar isso
    timeout: 15000
})

let isRefreshing = false;
let pendindQueue: Array<(token: string | null) => void> = [];

function onRefreshed(token: string |null) {
    pendindQueue.forEach(cb => cb(token));
    pendindQueue = [];
}

api.interceptors.request.use(async (config) => {
    // const { acess } = await getTokens()
    if (config.headers) {
        config.headers.Authorization = `Bearer ${}`
    }
    return config;
})

api.interceptors.response.use(
    (response) => response, async (error) => {
        const original = error.config;

        if (error?.response?.status === 401 && !original._retry) {
            original._retry = true;
            return new Promise((resolve, reject) => {
                pendindQueue.push((newToken) => {
                    if (!newToken) return reject(error);
                    original.headers.Authorization = `Bearer ${newToken}`
                    resolve(original) // vamos alterar isso
                })
            })
        } 
    }
)
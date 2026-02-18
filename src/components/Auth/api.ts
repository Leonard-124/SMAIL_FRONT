// import axios from "axios";

// const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

// const api = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true, // send httpOnly refresh-token cookie automatically
// });

// // ─── Request interceptor: attach access token from memory ────────────────────
// api.interceptors.request.use(
//   (config) => {
//     const token = getAccessToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ─── Response interceptor: auto-refresh on 401 ───────────────────────────────
// let isRefreshing = false;
// let failedQueue: Array<{
//   resolve: (token: string) => void;
//   reject: (err: unknown) => void;
// }> = [];

// function processQueue(error: unknown, token: string | null = null) {
//   failedQueue.forEach((prom) => {
//     if (error) prom.reject(error);
//     else prom.resolve(token!);
//   });
//   failedQueue = [];
// }

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         // Queue subsequent requests while refresh is in progress
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             originalRequest.headers.Authorization = `Bearer ${token}`;
//             return api(originalRequest);
//           })
//           .catch((err) => Promise.reject(err));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const { data } = await axios.post(
//           `${BASE_URL}/auth/refresh`,
//           {},
//           { withCredentials: true }
//         );
//         const newToken = data.accessToken;
//         setAccessToken(newToken);
//         processQueue(null, newToken);
//         originalRequest.headers.Authorization = `Bearer ${newToken}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         processQueue(refreshError, null);
//         clearAccessToken();
//         window.location.href = "/login";
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// // ─── In-memory token store (XSS-safe, lost on page refresh) ──────────────────
// // On page refresh, the silent refresh endpoint (called in AuthProvider) 
// // will restore it using the httpOnly cookie.
// let _accessToken: string | null = null;

// export function setAccessToken(token: string) {
//   _accessToken = token;
// }

// export function getAccessToken(): string | null {
//   return _accessToken;
// }

// export function clearAccessToken() {
//   _accessToken = null;
// }

// export default api;
/////////////////////////////////////////////////////////////////////////////////////////////

import axios from "axios";

// ✅ Uses VITE_API_URL env var — set in .env.local for dev, deployment env for prod
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 15000,
});

// ─── In-memory token store (XSS-safe) ────────────────────────────────────────
let _accessToken: string | null = null;

export function setAccessToken(token: string) { _accessToken = token; }
export function getAccessToken(): string | null { return _accessToken; }
export function clearAccessToken() { _accessToken = null; }

// ─── Request: attach access token ────────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response: auto-refresh on 401 ───────────────────────────────────────────
let isRefreshing = false;
let failedQueue: Array<{ resolve: (t: string) => void; reject: (e: unknown) => void }> = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token!)));
  failedQueue = [];
}

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const orig = error.config;
    if (error.response?.status === 401 && !orig._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          orig.headers.Authorization = `Bearer ${token}`;
          return api(orig);
        });
      }
      orig._retry = true;
      isRefreshing = true;
      try {
        const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {}, { withCredentials: true });
        setAccessToken(data.accessToken);
        processQueue(null, data.accessToken);
        orig.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(orig);
      } catch (err) {
        processQueue(err, null);
        clearAccessToken();
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
import { boot } from 'quasar/wrappers';
import axios from 'axios';
import { useAppAuthStore } from 'src/stores/useUserStore.ts';
import { BASE_URL } from 'src/utils/apiUrls';
const api = axios.create({
    // baseURL: 'http://localhost:8000',
    baseURL: BASE_URL,
    withCredentials: true
});

// Helper function to get CSRF token from cookie
function getCookie(name) {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    if (parts.length === 2) return parts.pop().split(';').shift() || null;
    return null;
}

let isRefreshing = false;
let refreshPromise = null;

export default boot(({ app }) => {
    app.config.globalProperties.$axios = axios;
    app.config.globalProperties.$api = api;

    api.interceptors.request.use((config) => {
        if (config.method?.toLowerCase() === 'post' || config.method?.toLowerCase() === 'put') {
            const csrfToken = getCookie('csrftoken');
            if (csrfToken) {
                config.headers['X-CSRFToken'] = csrfToken;
            }
        }

        const authStore = useAppAuthStore();
        const accessToken = authStore.accessToken;
        console.log('accessToken_form_axiosjs', accessToken);

        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        return config;
    });

    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            try {
                if (error.response.status === 401 && !originalRequest._retry) {
                    if (!isRefreshing) {
                        isRefreshing = true;
                        try {
                            const authStore = useAppAuthStore();
                            const refreshToken = authStore.refreshToken;

                            if (!refreshToken) {
                                throw new Error('Refresh token not found.');
                            }

                            refreshPromise = api.post('/api/v1/token/refresh/', { refresh: refreshToken });
                            const response = await refreshPromise;

                            authStore.accessToken = response.data.access;
                            originalRequest.headers.Authorization = `Bearer ${response.data.access}`;

                            return api(originalRequest);
                        } catch (error) {
                            console.error('Error refreshing token:', error);
                            // Handle refresh token failure, e.g., redirect to login page
                            throw error;
                        } finally {
                            isRefreshing = false;
                            refreshPromise = null;
                        }
                    } else {
                        // If a refresh request is already in progress, wait for it to complete
                        await refreshPromise;
                        return api(originalRequest);
                    }
                }
            } catch (error) {
                console.log(error);
                throw error;
            }

            return Promise.reject(error);
        }
    );
});

export { axios, api };

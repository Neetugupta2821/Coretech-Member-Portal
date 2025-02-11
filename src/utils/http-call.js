import axios from 'axios';
import store from '../store';
import { BASE_URL } from '@/utils/apiUrls';

// export const  axios =axios;
export function getCurrentHost() {
    const apiUrl = BASE_URL;
    console.log('API URL:', apiUrl);
    return apiUrl;
}
const APIUrl = getCurrentHost();
export const HTTP = axios.create({
    baseURL: APIUrl,
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
});

HTTP.interceptors.request.use(
    function (config) {
        if (store.getters.loggedIn && store.getters.getToken) {
            config.headers['Authorization'] = `Bearer ${store.getters.getToken}`;
        }
        return config;
    },
    function (error) {
        console.log('Error in api calling->', error);
        return Promise.reject(error);
    }
);

HTTP.interceptors.response.use(undefined, function (err) {
    const originalConfig = err.config;

    if (err.response && err.response.status === 401 && !originalConfig._retry) {
        if (originalConfig.url === '/token/refresh') {
            return Promise.reject(err);
        }
        originalConfig._retry = true;
        return store
            .dispatch('refreshToken')
            .then((access) => {
                originalConfig._retry = true;
                originalConfig.headers['Authorization'] = `Bearer ${access}`;
                return HTTP.request(originalConfig);
            })
            .catch((err) => {
                console.log('Error in res intercept', err);
                store.dispatch('destroyAllTokens');
                return Promise.reject(err);
            });
    }
    return Promise.reject(err);
});

import { createStore } from 'vuex';

import { HTTP } from '../utils/http-call';
import { BASE_URL, LOGIN_URL } from '@/utils/apiUrls';

const store = createStore({
    state: {
        accessToken: localStorage.getItem('access_token') || null,
        refreshToken: localStorage.getItem('refresh_token') || null,
        // -----------------------------------------------------
        toasts: []
    },
    getters: {
        loggedIn(state) {
            return state.accessToken != null;
        },
        getToken(state) {
            return state.accessToken;
        },
        getRefreshToken(state) {
            return state.refreshToken;
        }
    },
    mutations: {
        updateLocalStorage(state, { access, refresh }) {
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            state.accessToken = access;
            state.refreshToken = refresh;
        },
        updateAccess(state, access) {
            state.accessToken = access;
            localStorage.setItem('access_token', access);
        },
        destroyToken(state) {
            localStorage.clear();
        },
        // added for toast
        addToast(state, toast) {
            state.toasts.push(toast);
        },
        clearToast(state, title) {
            const index = state.toasts.findIndex((toast) => toast.title === title); // find toast
            state.toasts.splice(index, 1); // remove toast from array
        }
    },
    actions: {
        destroyAllTokens(context) {
            context.commit('destroyToken');
            router.push('/');
        },
        // run the below action to get a new access token on expiration
        refreshToken(context) {
            console.log('token expired');
            return new Promise((resolve, reject) => {
                if (context.state.refreshToken == null) {
                    reject('No refresh token');
                }
                HTTP.post(LOGIN_URL, {
                    refresh: context.state.refreshToken
                }) // send the stored refresh token to the backend API
                    .then((response) => {
                        context.commit('updateAccess', response.data.access);
                        resolve(response.data.access);
                    })
                    .catch((err) => {
                        console.log('error in refreshing token');
                        context.commit('destroyToken');
                        reject(err); // error generating new access and refresh token because refresh token has expired
                    });
            });
        },
        logoutUser(context) {
            if (context.getters.loggedIn) {
                return new Promise((resolve, reject) => {
                    HTTP.post('/token/logout/', {
                        refresh_token: `${store.getters.getRefreshToken}`
                    })
                        .then((response) => {
                            context.commit('destroyToken');
                            resolve();
                        })
                        .catch((err) => {
                            console.log('error logoutUser', err);
                            context.commit('destroyToken');
                            reject(err);
                        });
                });
            }
        },
        // ------------------------------Perfectly-Done----------------------------------------------
        loginUser(context, credentials) {
            return new Promise((resolve, reject) => {
                HTTP.post('/token/', {
                    username: credentials.username,
                    password: credentials.password
                })
                    .then((response) => {
                        if (!response.data?.detail && (response.data.access || response.data.refresh)) {
                            let access = response.data.access;
                            let refresh = response.data.refresh;
                            context.commit('updateLocalStorage', { access: access, refresh: refresh });
                            const data = { status: 'success', error_code: '0', error_msg: '', detail: '' };
                            resolve({ data });
                        } else {
                            console.log('from_else');
                            resolve(response);
                        }
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        }
    }
});
export default store;

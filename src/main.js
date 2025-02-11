import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import '@/assets/styles.scss';
import '@/assets/tailwind.css';

router.afterEach((to) => {
    // Set class or id on body based on the route name or path
    console.log('-----', to);
    const routeClass = to.name || to.path.replace(/\//g, '-'); // Use route name or path
    document.body.className = ''; // Reset existing classes
    document.body.classList.add(`${routeClass}`); // Add a custom class
    document.body.id = `${routeClass}`; // Add a custom ID (optional)
});

const app = createApp(App);

app.use(router);
app.use(store);

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.app-dark'
        }
    }
});
app.use(ToastService);
app.use(ConfirmationService);

app.mount('#app');

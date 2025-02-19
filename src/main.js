import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Tooltip from 'primevue/tooltip';
// Import the missing regular icon
import { faCircleDot } from '@fortawesome/free-regular-svg-icons';
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
console.log('Hello neetu gupta');
const app = createApp(App);

app.use(router);
app.use(store);
app.component('font-awesome-icon', FontAwesomeIcon);
app.directive('tooltip', Tooltip);
export default {
    components: {
        FontAwesomeIcon
    }
};
library.add(faCircleDot);
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

import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';
const isAuthenticated = () => {
    // Replace with actual authentication logic (e.g., checking localStorage or Vuex store)
    return localStorage.getItem('userToken') !== null;
};
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/news',
                    name: 'news',
                    component: () => import('@/views/NewsRoom.vue')
                },
                {
                    path: '/account',
                    name: 'account',
                    component: () => import('@/views/uikit/MyAccount.vue')
                },
                {
                    path: '/account/credit',
                    name: 'credit',
                    component: () => import('@/views/uikit/AccountBilling.vue')
                },
                {
                    path: '/service',
                    name: 'service',
                    component: () => import('@/views/services/ServiceOverview.vue')
                },
                {
                    path: '/offer',
                    name: 'offer',
                    component: () => import('@/views/services/OfferService.vue')
                },
                {
                    path: '/offer/dedicated',
                    name: 'dedicated',
                    component: () => import('@/views/services/DedicatedServer.vue')
                },
                {
                    path: '/offer/addon/general',
                    name: 'general',
                    component: () => import('@/views/services/ServiceAddons.vue')
                },
                // Ddos Protections Routes
                {
                    path: '/network/incidents',
                    name: 'incidents',
                    component: () => import('@/views/ddos/network/Incidents.vue')
                },
                {
                    path: '/network/flexrules',
                    name: 'flexrules',
                    component: () => import('@/views/ddos/network/Flexrules.vue')
                },
                {
                    path: '/network/flowrules',
                    name: 'flowrules',
                    component: () => import('@/views/ddos/network/Flowrules.vue')
                },
                {
                    path: '/network/thresholds',
                    name: 'thresholds',
                    component: () => import('@/views/ddos/network/Thresholds.vue')
                },
                {
                    path: '/network/routing',
                    name: 'routing',
                    component: () => import('@/views/ddos/network/Routing.vue')
                },
                {
                    path: '/network/prefixlist',
                    name: 'prefixlist',
                    component: () => import('@/views/ddos/network/SourcePrefixList.vue')
                },
                {
                    path: '/network/geodefinition',
                    name: 'geodefinition',
                    component: () => import('@/views/ddos/network/GeoDefinition.vue')
                },
                {
                    path: '/website/certificate',
                    name: 'certificate',
                    component: () => import('@/views/ddos/website/Certificates.vue')
                },
                {
                    path: '/website/challenge',
                    name: 'challenge',
                    component: () => import('@/views/ddos/website/Challenge.vue')
                },
                {
                    path: '/website/vhost',
                    name: 'vhost',
                    component: () => import('@/views/ddos/website/VirtualHost.vue')
                },
                {
                    path: '/customer/tickets',
                    name: 'tickets',
                    component: () => import('@/views/support/customer/MyTicket.vue')
                },
                {
                    path: '/customer/newticket',
                    name: 'newticket',
                    component: () => import('@/views/support/customer/NewTicket.vue')
                },
                {
                    path: '/customer/faq',
                    name: 'faq',
                    component: () => import('@/views/support/customer/Faq.vue')
                },
                {
                    path: '/info/about',
                    name: 'about',
                    component: () => import('@/views/support/information/About.vue')
                },
            ]
        },
        {
            path: '/landing',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },

        // {
        //     path: '/auth/login',
        //     name: 'login',
        //     component: () => import('@/views/pages/auth/Login.vue')
        // },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ]
});

// Navigation Guard: Check authentication before each route
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isAuthenticated()) {
        next('/auth/login'); // Redirect to login if not authenticated
    } else {
        next(); // Continue if authenticated
    }
});

export default router;

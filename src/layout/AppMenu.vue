<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';
const model = ref([
    {
        label: 'Home',
        items: [
            { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
            { label: 'Newsroom', icon: 'pi pi-book', to: '/news' }
        ]
    },
    {
        label: 'Account',
        items: [
            { label: 'My Account', icon: 'pi pi-fw pi-user', to: '/account' },
            { label: 'Account Billing', icon: 'pi pi-dollar', to: '/account/credit' },
        ]
    },
    {
        label: 'Services',
        items: [
            {
                label: 'Service Overview',
                icon: 'pi pi-fw pi-globe',
                to: '/service'
            },
            {
                label: 'Order a Service',
                icon: 'pi pi-star',
                items: [
                    {
                        label: 'Overview',
                        icon: 'pi pi-asterisk',
                        to: '/offer'
                    },
                    // {
                    //     label: 'Dedicated Servers',
                    //     icon: 'pi pi-server',
                    //     to: '/offer/dedicated'
                    // },
                    // {
                    //     label: 'Service Addons',
                    //     icon: 'pi pi-plus-circle',
                    //     to: '/offer/addon/general'
                    // }
                ]
            },
        ]
    },
    {
        label: 'DDOS Protection',
        items: [
            {
                label: 'Network Protection',
                icon: 'pi pi-cloud',
                items: [
                    {
                        label: 'Incidents',
                        icon: 'pi pi-exclamation-triangle',
                        to: '/network/incidents'
                    },
                    {
                        label: 'Flexrules',
                        icon: 'pi pi-cloud-download',
                        to: '/network/flexrules'
                    },
                    {
                        label: 'Flowrules',
                        icon: 'pi pi-cloud-upload',
                        to: '/network/flowrules'
                    },
                    {
                        label: 'Thresholds',
                        icon: 'pi pi-chart-line',
                        to: '/network/thresholds'
                    },
                    {
                        label: 'Routing',
                        icon: 'pi pi-map',
                        to: '/network/routing'
                    },
                    {
                        label: 'Resources',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'Source Prefix Lists', icon: 'pi pi-list', to: '/network/prefixlist' },
                            { label: 'Geo Definition', icon: 'pi pi-fw pi-bookmark', to: '/network/geodefinition' },
                        ]
                    }
                ]
            },
            {
                label: 'Website Protection',
                icon: 'pi pi-inbox',
                items: [
                    {
                        label: 'Certificates',
                        icon: 'pi pi-receipt',
                        to: '/website/certificate'
                    },
                    {
                        label: 'Challenge',
                        icon: 'pi pi-key',
                        to: '/website/challenge'
                    },
                    {
                        label: 'Virtual Host',
                        icon: 'pi pi-box',
                        to: '/website/vhost'
                    }
                ]
            },
        ]
    },
    {
        label: 'Support',
        items: [
            {
                label: 'Customer Service',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'My Ticket',
                        icon: 'pi pi-ticket',
                        to: '/customer/tickets'
                    },
                    {
                        label: 'New Ticket',
                        icon: 'pi pi-ticket',
                        to: '/customer/newticket'
                    },
                    {
                        label: 'FAQ',
                        icon: 'pi pi-question-circle',
                        to: '/customer/faq'
                    }
                ]
            },
            {
                label: 'Information',
                icon: 'pi pi-wave-pulse',
                items: [
                    {
                        label: 'About',
                        icon: 'pi pi-exclamation-circle',
                        to: '/info/about'
                    },
                    {
                        label: 'Wiki',
                        icon: 'pi pi-wave-pulse',
                        url: 'https://wiki.coretech.network/',
                        target: '_blank'
                    },
                    {
                        label: 'Network Status ',
                        icon: 'pi pi-wave-pulse',
                        url: 'https://status.coretech.network/status/client',
                        target: '_blank'

                    }
                ]
            },
        ]
    },
    // {
    //     label: 'Pages',
    //     icon: 'pi pi-fw pi-briefcase',
    //     to: '/pages',
    //     items: [
    //         {
    //             label: 'Landing',
    //             icon: 'pi pi-fw pi-globe',
    //             to: '/landing'
    //         },
    //         {
    //             label: 'Auth',
    //             icon: 'pi pi-fw pi-user',
    //             items: [
    //                 {
    //                     label: 'Login',
    //                     icon: 'pi pi-fw pi-sign-in',
    //                     to: '/auth/login'
    //                 },
    //                 {
    //                     label: 'Error',
    //                     icon: 'pi pi-fw pi-times-circle',
    //                     to: '/auth/error'
    //                 },
    //                 {
    //                     label: 'Access Denied',
    //                     icon: 'pi pi-fw pi-lock',
    //                     to: '/auth/access'
    //                 }
    //             ]
    //         },
    //         {
    //             label: 'Crud',
    //             icon: 'pi pi-fw pi-pencil',
    //             to: '/pages/crud'
    //         },
    //         {
    //             label: 'Not Found',
    //             icon: 'pi pi-fw pi-exclamation-circle',
    //             to: '/pages/notfound'
    //         },
    //         {
    //             label: 'Empty',
    //             icon: 'pi pi-fw pi-circle-off',
    //             to: '/pages/empty'
    //         }
    //     ]
    // },
    // {
    //     label: 'Get Started',
    //     items: [
    //         {
    //             label: 'Documentation',
    //             icon: 'pi pi-fw pi-book',
    //             to: '/documentation'
    //         },
    //         {
    //             label: 'View Source',
    //             icon: 'pi pi-fw pi-github',
    //             url: 'https://github.com/primefaces/core-tech',
    //             target: '_blank'
    //         }
    //     ]
    // }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <!-- <li v-if="item.separator" class="menu-separator"></li> -->
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>

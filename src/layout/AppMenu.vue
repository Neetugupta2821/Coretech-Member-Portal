<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';
const model = ref([
    {
        label: 'Home',
        items: [
            { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
            { label: 'Newsroom', icon: 'pi pi-book', to: '/newsroom' }
        ]
    },
    {
        label: 'Account',
        items: [
            { label: 'My Account', icon: 'pi pi-fw pi-user', to: '/my_account' },
            { label: 'Account Billing', icon: 'pi pi-dollar', to: '/my_account/account_billing' },
        ]
    },
    {
        label: 'Services',
        items: [
            {
                label: 'Service Overview',
                icon: 'pi pi-briefcase',
                to: '/service_overview'
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
                    {
                        label: 'Service Addons',
                        icon: 'pi pi-plus-circle',
                        to: '/offer/addon'
                    }
                ]
            },
        ]
    },
    {
        label: 'DDOS Protection',
        items: [
            {
                label: 'Network Protection',
                icon: 'pi pi-shield',
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
                            { label: 'Prefix Lists', icon: 'pi pi-list', to: '/network/prefixlist' },
                            { label: 'Geo Definition', icon: 'pi pi-globe', to: '/network/geodefinition' },
                        ]
                    }
                ]
            },
            {
                label: 'Website Protection',
                icon: 'pi pi-desktop',
                items: [
                    {
                        label: 'Certificates',
                        icon: 'pi pi-key',
                        to: '/website/certificate'
                    },
                    {
                        label: 'Challenge',
                        icon: 'pi pi-shield',
                        to: '/website/challenge'
                    },
                    {
                        label: 'Virtual Host',
                        icon: 'pi pi-server',
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
                        label: 'Wiki',
                        icon: 'pi pi-wave-pulse',
                        // to: '/info/wiki',
                        url: 'https://wiki.coretech.network/',
                        target: '_blank'
                    },
                    {
                        label: 'Network Status ',
                        icon: 'pi pi-wave-pulse',
                        // to: '/info/network',
                        url: 'https://status.coretech.network/status/client',
                        target: '_blank'

                    },
                    {
                        label: 'About',
                        icon: 'pi pi-exclamation-circle',
                        to: '/info/about'
                    },
                    {
                        label: 'Term & Conditions',
                        icon: 'pi pi-file',
                        to: '/info/term'
                    },
                    {
                        label: 'Privacy & Policy',
                        icon: 'pi pi-exclamation-circle',
                        to: '/info/privacy'
                    },
                ]
            },
        ]
    },
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

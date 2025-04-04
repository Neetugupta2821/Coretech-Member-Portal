<script setup>
import { useLayout } from '@/layout/composables/layout';
import AppConfigurator from './AppConfigurator.vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const { toggleMenu, toggleDarkMode, isDarkTheme, } = useLayout();
import { ref, onMounted, watch, onUnmounted } from "vue";

const accesstoken = ref(localStorage.getItem('access_token') || '');
console.log(accesstoken);
const uuid = ref(localStorage.getItem('uuid') || '');
const firstname = ref(localStorage.getItem('firstname') || '');
const lastname = ref(localStorage.getItem('lastname') || '');
const company = ref(localStorage.getItem('company') || '');

const menu = ref();
const items = ref([
    {
        label: 'Total Credit',
        amount: 0.00,
        icon: 'pi pi-dollar',
    },
    {
        label: 'Available Credit',
        amount: 0.00,
        icon: 'pi pi-dollar',
    },
    {
        label: 'Blocked Credit',
        amount: 0.00,
        icon: 'pi pi-dollar'
    },
])

const lastUpdated = ref('');
onMounted(() => {
    const date = new Date();
    lastUpdated.value = date.toLocaleString();
});

const toggle = (event) => {
    menu.value.toggle(event);
};

import { useToast } from "primevue/usetoast";

const toast = useToast();

const save = () => {
    toast.add({ severity: 'success', summary: 'Success', detail: 'Data Saved', life: 3000 });
};

const show = async (uuid) => {
    if (navigator.clipboard?.writeText) {
        try {
            await navigator.clipboard.writeText(uuid);
            toast.add({ severity: 'success', summary: 'Text Copied!', detail: uuid, life: 1000 });
            return;
        } catch (error) {
            console.error("Failed to copy using Clipboard API:", error);
        }
    }

    // Fallback for HTTP (older browsers)
    const textarea = document.createElement("textarea");
    textarea.value = uuid;
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand("copy");
        toast.add({ severity: 'success', summary: 'Text Copied!', detail: uuid, life: 1000 });
    } catch (error) {
        console.error("Fallback copy failed:", error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to copy UUID', life: 2000 });
    }
    document.body.removeChild(textarea);
};


const isMenuOpen = ref(false);
const profileMenu = ref(null);

const toggleMenu2 = () => {
    isMenuOpen.value = !isMenuOpen.value;
    console.log("Menu toggled:", isMenuOpen.value);
};

// Function to close menu when clicking outside
const handleClickOutside = (event) => {
    if (profileMenu.value && !profileMenu.value.contains(event.target)) {
        isMenuOpen.value = false;
    }
};

onMounted(() => {
    document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
});

// Close menu on route change
watch(() => route.path, () => {
    isMenuOpen.value = false;
});

const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('child');
    localStorage.removeItem('uuid');
    localStorage.removeItem('email');
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    localStorage.removeItem('company');
    localStorage.removeItem('street');
    localStorage.removeItem('phone');
    localStorage.removeItem('zipcode');
    localStorage.removeItem('city');
    localStorage.removeItem('country');
    localStorage.removeItem('vatid');
    localStorage.removeItem('city');
    localStorage.removeItem('isAuthenticated');
    router.push('/login');
};
</script>

<template>
    <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <router-link to="/" class="layout-topbar-logo">
                <span>
                    <img src="../assets/images/logoblack.png" alt="Dark Logo" class="w-40 block dark:hidden" />
                    <img src="../assets/images/logo.png" alt="Light Logo" class="w-40 hidden dark:block" />
                </span>
            </router-link>
            <button class="layout-menu-button layout-topbar-action" style="margin: 0px 29px" @click="toggleMenu">
                <font-awesome-icon :icon="['far', 'circle-dot']" />
            </button>
        </div>
        <div class="flex justify-center">
            <div class="items-center text-center">
                <i class="pi pi-info-circle mb-0 text-green-400 text-xxl mr-3 pt-0"></i>
                <span class="mb-5 text-lg">Abilities last updated: {{ lastUpdated }}</span>
            </div>
        </div>
        <div class="layout-topbar-actions items-center">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
                    <i :class="['pi', { 'pi-sun': isDarkTheme, 'pi-moon': !isDarkTheme }]"></i>
                </button>
                <div :style="{ fontSize: 17 + 'px', padding: 5 + 'px', fontWeight: 600 }">
                    <Button type="button" label="€0.00" @click="toggle" aria-haspopup="true" unstyled="false"
                        size="large" aria-controls="overlay_tmenu" />
                    <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup />
                </div>
                <div class="relative">
                    <button
                        v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
                        type="button" class="layout-topbar-action layout-topbar-action-highlight">
                        <i class="pi pi-palette"></i>
                    </button>
                    <AppConfigurator />
                </div>
            </div>
            <button class="layout-topbar-menu-button layout-topbar-action"
                v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }">
                <i class="pi pi-ellipsis-v"></i>
            </button>
            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    <div style="padding: 6px 0px;">
                        <!-- <p v-tooltip.bottom="'Veena Kumari'" style="font-weight: 600; font-size: 16px;">
                            Veena Kumari(431dc740<span>
                                <Toast />
                                <i class="pi pi-mobile" style="color: #00cfe8;padding: 0px 2px;" @click="show()">
                                </i>
                            </span>)
                        </p> -->
                        <p v-tooltip.bottom="`${firstname} ${lastname}`" style="font-weight: 600; font-size: 16px;">
                            {{ firstname }} {{ lastname }} ({{ uuid.substring(0, 8) }}<span>
                                <Toast />
                                <i class="pi pi-clipboard cursor-pointer text-cyan-500" style=" padding: 0px 2px;"
                                    @click="show(uuid)"></i>
                            </span>)
                        </p>
                        <p style="font-weight: 600; font-size: 12px;">{{ company }}</p>
                    </div>
                    <div class="profile" @click="toggleMenu2" ref="profileMenu"
                        style="background-color: rgba(235, 96, 63, .12); color: #eb603f; padding: 5px 12px; border-radius: 50px; margin: 5px 0px;">
                        <div class="img-box">
                            <i class="pi pi-user" style="font-size: 18px;"></i>
                        </div>
                    </div>
                    <div class="card menu" :class="{ active: isMenuOpen }">
                        <ul>
                            <li>
                                <router-link :to="'/my_account'">
                                    <p class="text-black dark:text-white items-center"><i
                                            class="ph-bold ph-user"></i>&nbsp;Account Settings</p>
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="'/customer/faq'">
                                    <p class="text-black dark:text-white"><i
                                            class="ph-bold ph-envelope-simple"></i>&nbsp;Frequently Asked</p>
                                </router-link>
                            </li>
                            <hr class="my-2 border-gray-300 dark:border-gray-700">
                            <li @click="logout" class="cursor-pointer">
                                <p class="text-black dark:text-white"><i class="ph-bold ph-gear-six"></i>&nbsp;Log Out
                                </p>
                            </li>
                        </ul>
                    </div>
                    <!-- <div>
                            <SplitButton class="p-splitbutton-button" :model="items3" outlined="true" label=" "
                                icon="pi pi-user" rounded="false" text="false" size="large" plain="false" dt="any" />
                        </div> -->
                    <!-- </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
:deep(.p-button) {
    background-color: none;
    border: none;
    color: #6e6b7b !important;
    font-size: 17px;
    font-weight: 800;
    padding: 6px 10px;
}

:deep(.p-button:hover),
:deep(.p-button:focus) {
    background-color: inherit !important;
    border-color: inherit !important;
    color: inherit !important;
    box-shadow: none !important;
}

.profile-menu {
    display: flex;
    align-items: center;
}

/* / menu toggle / */
.menu-toggle {
    position: relative;
    width: 40px;
    height: 40px;
    cursor: not-allowed;
    display: flex;
    justify-content: center;
    align-items: center;
}

.menu-toggle::before {
    content: '';
    position: absolute;
    width: 24px;
    height: 4px;
    background: #000;
    box-shadow: 0 8px 0 #000, 0 -8px 0 #000;
}

/* / profile menu / */
.profile {
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    text-align: end;
}

.profile h3 {
    text-align: end;
    line-height: 1;
    margin-bottom: 4px;
    font-weight: 600;
}

.profile p {
    line-height: 1;
    font-size: 14px;
    opacity: .6;
}

.profile .img-box img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* / menu / */
.menu {
    position: absolute;
    top: calc(100% + 12px);
    right: 15px;
    width: 170px;
    min-height: 100px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, .2);
    opacity: 0;
    transform: translateY(-10px);
    visibility: hidden;
    transition: 300ms;
    z-index: 999;
}

.menu.active {
    opacity: 1;
    /* / transform: translateY(0); / */
    visibility: visible;
}

/* / menu links / */
.menu ul {
    position: relative;
    display: flex;
    flex-direction: column;
    z-index: 10;
}

.menu ul li {
    list-style: none;
}

.menu ul li:hover {
    background: rgba(226, 162, 101, 0.7);
    color: orange;
}

.menu ul li p {
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: 6px 10px;
    gap: 6px;
}

.menu ul li p i {
    font-size: 1.2em;
    color: orange;
}

.card {
    padding: 0rem !important;
}
</style>

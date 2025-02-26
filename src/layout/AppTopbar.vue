<script setup>
import { useLayout } from '@/layout/composables/layout';
import AppConfigurator from './AppConfigurator.vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const { toggleMenu, toggleDarkMode, isDarkTheme, layoutConfig, layoutState, isSidebarActive } = useLayout();
import { ref } from "vue";

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

const toggle = (event) => {
    menu.value.toggle(event);
};

import { useToast } from "primevue/usetoast";

const toast = useToast();


// import { useToast } from "primevue/usetoast";
// const toast = useToast();

// const items3 = [
//     {
//         label: 'Account Settings',
//         command: () => {
//             toast.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
//         }
//     },
//     {
//         label: 'Frequently Asked',
//         command: () => {
//             toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
//         }
//     },
//     {
//         separator: true
//     },
//     {
//         label: 'Log Out',
//         command: () => {
//             window.location.href = 'https://vuejs.org/';
//         }
//     }
// ];

const save = () => {
    toast.add({ severity: 'success', summary: 'Success', detail: 'Data Saved', life: 3000 });
};

const show = () => {
    toast.add({ severity: 'success', summary: 'Text Copied!', detail: 'Message Content', life: 1000 });
};

const isMenuOpen = ref(false);

const toggleMenu2 = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('child');
    localStorage.removeItem('isAuthenticated');
    router.push('/auth/login');
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
        <div>
            <div><i class="pi pi-info-circle" style="color: #28c76f; margin-right:8px; font-size: 18px;"></i><span
                    style="padding: 0px 0px 6px 3px;">Abilities last updated: 2/18/2025, 12:22 PM</span> </div>
        </div>
        <div class="layout-topbar-actions">

            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
                    <i :class="['pi', { 'pi-sun': isDarkTheme, 'pi-moon': !isDarkTheme }]"></i>
                </button>


                <div :style="{ color: textColor, fontSize: 17 + 'px', padding: 5 + 'px', fontWeight: 600 }">
                     <button @click="toggleDropdown">Toggle Dropdown</button>
                    <div id="dropdownRadioHelper"   v-if="isDropdownOpen"
                    class="z-10  hidden  bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-60 dark:bg-gray-700 dark:divide-gray-600">
                    <ul class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownRadioHelperButton">
                        <li>
                            <div class="flex p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                                <div class="flex items-center h-5">
                                    <input id="helper-radio-4" name="helper-radio" type="radio" value="individual"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                        v-model="selectedRadio" />
                                </div>
                                <div class="ms-2 text-sm">
                                    <label for="helper-radio-4" class="font-medium text-gray-900 dark:text-gray-300">
                                        <div>Individual</div>
                                        <p id="helper-radio-text-4"
                                            class="text-xs font-normal text-gray-500 dark:text-gray-300">
                                            Some helpful instruction goes over here.
                                        </p>
                                    </label>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="flex p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                                <div class="flex items-center h-5">
                                    <input id="helper-radio-5" name="helper-radio" type="radio" value="company"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                        v-model="selectedRadio" />
                                </div>
                                <div class="ms-2 text-sm">
                                    <label for="helper-radio-5" class="font-medium text-gray-900 dark:text-gray-300">
                                        <div>Company</div>
                                        <p id="helper-radio-text-5"
                                            class="text-xs font-normal text-gray-500 dark:text-gray-300">
                                            Some helpful instruction goes over here.
                                        </p>
                                    </label>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="flex p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                                <div class="flex items-center h-5">
                                    <input id="helper-radio-6" name="helper-radio" type="radio" value="nonprofit"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                        v-model="selectedRadio" />
                                </div>
                                <div class="ms-2 text-sm">
                                    <label for="helper-radio-6" class="font-medium text-gray-900 dark:text-gray-300">
                                        <div>Non profit</div>
                                        <p id="helper-radio-text-6"
                                            class="text-xs font-normal text-gray-500 dark:text-gray-300">
                                            Some helpful instruction goes over here.
                                        </p>
                                    </label>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                    <!-- <Button type="button" label="€0.00" @click="toggle" aria-haspopup="true" unstyled="false"
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
                        <p v-tooltip.bottom="'Veena Kumari'" style="font-weight: 600; font-size: 16px;">
                            Veena Kumari(431dc740<span>
                                <Toast />
                                <i class="pi pi-mobile" style="color: #00cfe8;padding: 0px 2px;" @click="show()">
                                </i>
                            </span>)
                        </p>
                    </div>
                    <!-- <div type="button" class="profile-menu"> -->

                    <div class="profile" @click="toggleMenu2"
                        style="background-color: rgba(235, 96, 63, .12);color: #eb603f ;padding: 10px; border-radius: 50px;">
                        <div class="img-box">
                            <i class="pi pi-user" style="font-size: 18px;"></i>
                            <!-- <img src="https://i.postimg.cc/BvNYhMHS/user-img.jpg" alt="User Image"> -->
                        </div>
                    </div>
                    <div class="menu dark:bg-zinc-900 bg-white" :class="{ active: isMenuOpen }">
                        <ul>
                            <li>
                                <router-link :to="'/account'">
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
                            <Divider />
                            <li @click="logout">
                                <p class="text-black dark:text-white"><i class="ph-bold ph-gear-six"></i>&nbsp;Log Out
                                </p>
                            </li>
                        </ul>
                    </div>

                    <div type="button" class="profile-menu">

                        <div>
                            <SplitButton class="p-splitbutton-button" :model="items3" outlined="true" label=" "
                                icon="pi pi-user" rounded="false" text="false" size="large" plain="false" dt="any" />
                        </div> -->

                    </div>

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
</style>

<script setup>
import NotificationView from '@/components/dashboard/NotificationView.vue';
import AccountDetails from './AccountDetails.vue';
import Security from './Security.vue';
import Notification from './Notification.vue';
</script>
<template>
    <div class="mb-4">
        <div class="col-span-12 xl:col-span-12 mb-6">
            <span class="text-xl font-bold">Account Management</span>
        </div>
        <div class="col-span-12 xl:col-span-12">
            <router-link :to="'/news'">
                <NotificationView />
            </router-link>
        </div>
    </div>
    <div  v-animateonscroll="{ enterClass: 'animate-fadein', leaveClass: 'animate-fadeout'}" class="card animate-duration-500 animate-ease-in-out">
        <Tabs value="0">
            <TabList>
                <Tab value="0" as="div" class="flex items-center gap-2">
                    <i class="pi pi-user"></i>
                    <span class="font-bold whitespace-nowrap">Account</span>
                </Tab>
                <Tab value="1" as="div" class="flex items-center gap-2">
                    <i class="pi pi-lock"></i>
                    <span class="font-bold whitespace-nowrap">Security</span>
                </Tab>
                <Tab v-slot="slotProps" value="2" asChild>
                    <div :class="['flex items-center gap-2', slotProps.class]" @click="slotProps.onClick"
                        v-bind="slotProps.a11yAttrs">
                        <i class="pi pi-bell"></i>
                        <span class="font-bold whitespace-nowrap">Notification</span>
                    </div>
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel value="0" as="p" class="m-0">
                    <AccountDetails />
                </TabPanel>
                <TabPanel value="1" as="p" class="m-0">
                    <Security />
                </TabPanel>
                <TabPanel value="2" as="p" class="m-0">
                    <Notification />
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
</template>

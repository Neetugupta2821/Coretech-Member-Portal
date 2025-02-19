<script setup>
import NotificationView from '@/components/dashboard/NotificationView.vue';
</script>

<template>
    <div class="mb-4">
        <div class="col-span-12 xl:col-span-12 mb-6">
            <span class="text-xl font-bold">Service Addons</span>
            <p class="text-muted-color">Addons are additional services that can be added to your service. They are billed separately from your
                service.</p>
        </div>
        <div class="col-span-12 xl:col-span-12">
            <router-link :to="'/news'">
                <NotificationView />
            </router-link>
        </div>
    </div>
</template>

<script setup>
import NotificationView from '@/components/dashboard/NotificationView.vue';
</script>

<template>
    <div class="mb-4">
        <div class="col-span-12 xl:col-span-12 mb-6">
            <span class="text-xl font-bold">FAQ</span>
            <p class="text-muted-color">Choose a category to quickly find the help you need</p>
        </div>
        <div class="col-span-12 xl:col-span-12">
            <router-link :to="'/news'">
                <NotificationView />
            </router-link>
        </div>
    </div>
</template>

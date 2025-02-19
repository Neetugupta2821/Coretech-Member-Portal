<script setup>
import ScheduledMaintenance from '@/components/dashboard/ScheduledMaintenance.vue';
import StatsWidget from '@/components/dashboard/StatsWidget.vue';
import NotificationView from '@/components/dashboard/NotificationView.vue';
import ServiceUnder from '@/components/dashboard/ServiceUnder.vue';
</script>


<template>
    <div class="mb-4">
        <div class="col-span-12 xl:col-span-12 mb-6">
            <span class="text-xl">Dashboard</span>
        </div>
        <div class="col-span-12 xl:col-span-12">
            <router-link :to="'/news'">
                <NotificationView />
            </router-link>
        </div>
    </div>
    <div v-animateonscroll="{ enterClass: 'animate-fadein', leaveClass: 'animate-fadein' }"
        class="grid grid-cols-12 gap-8 animate-duration-700">
        <div class="col-span-12 xl:col-span-12">
            <ServiceUnder />
        </div>
        <StatsWidget />
        <div class="col-span-12 xl:col-span-12">
            <ScheduledMaintenance />
        </div>
    </div>
</template>

<!-- <style scoped>
@keyframes slidedown-icon {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(20px);
    }

    100% {
        transform: translateY(0);
    }
}

.slidedown-icon {
    animation: slidedown-icon;
    animation-duration: 3s;
    animation-iteration-count: infinite;
}
</style> -->

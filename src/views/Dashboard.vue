<script setup>
import ScheduledMaintenance from '@/components/dashboard/ScheduledMaintenance.vue';
import StatsWidget from '@/components/dashboard/StatsWidget.vue';
</script>

<template>
    <div v-animateonscroll="{ enterClass: 'animate-fadein', leaveClass: 'animate-fadein' }"
        class="grid grid-cols-12 gap-8 animate-duration-1000">
        <StatsWidget />
        <div class="col-span-12 xl:col-span-12">
            <ScheduledMaintenance />
        </div>
    </div>
</template>

<style scoped>
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
</style>

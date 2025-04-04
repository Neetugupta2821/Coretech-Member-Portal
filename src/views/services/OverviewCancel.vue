<script setup>
import { useRoute } from "vue-router";
import { onMounted } from "vue";

const route = useRoute();
const serviceId = route.params.id;

onMounted(() => {
    console.log("Service ID:", serviceId);
});
</script>
<template>
    <div class="card dark:bg-gray-900 bg-gray-200 p-4 rounded-md text-gray-400">
        <p class="align-center shadow-md mb-2 text-yellow-500 flex items-center gap-2">
            <i class="pi pi-exclamation-triangle"></i>
            <strong>Important Notice</strong>
        </p>
        <p class="text-md">Please note that service addons, listed as separate services, may not be automatically
            canceled. If an addon is listed as a separate service (e.g., BGP Sessions), please ensure to request their
            cancellation separately.
        </p>
    </div>
    <div class="card dark:bg-gray-900 bg-gray-200 p-4 rounded-md text-gray-400 text-md">
        <p class="align-center shadow-md mb-2 text-red-500 flex items-center gap-2"> <i class="pi pi-exclamation-triangle"></i><strong> Automated cancellation not supported</strong></p>
        <p class="text-md">Unfortunately, automated cancellations are not available for legacy products and services
            ordered before July 2023. Please reach out to our customer service for assistance.

            We apologize for the inconvenience. Our system did not return a specific cancellation date for this service.
        </p>
    </div>
</template>

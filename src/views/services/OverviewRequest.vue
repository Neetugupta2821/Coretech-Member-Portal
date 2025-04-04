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
    <div class="p-6">
        <h1 class="text-xl font-bold">Request Details</h1>
        <p>Viewing details for request ID: {{ $route.params.id }}</p>
    </div>
</template>

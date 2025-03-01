<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

if (isAuthenticated && router.currentRoute.value.path === '/login') {
    router.push('/');
}
</script>

<template>
    <router-view basename="coretech">
    </router-view>
</template>

<style scoped></style>

<script setup>
import axios from 'axios';
import { baseUrl } from '@/Api/BaseUrl';
import { ref, onMounted } from 'vue';

const term = ref(null);

const fetchTerm = async () => {
    try {
        const response = await axios.get(`${baseUrl}TermsConditions/`);

        if (response.data && response.data.Data && response.data.Data.length > 0) {
            term.value = response.data.Data[0];
        }

        console.log("API Response:", response.data);
    } catch (error) {
        console.error("Error Fetching Data:", error);
    }
};

onMounted(fetchTerm);
</script>

<template>
    <div class="mb-4">
        <div class="col-span-12 xl:col-span-12 mb-6">
            <span class="text-3xl font-medium">Terms and Conditions</span>
        </div>
    </div>

    <div class="card shadow-lg p-6">
        <template v-if="term">
            <p class="text-lg text-gray-400">{{ term.description }}</p>
        </template>

        <p v-else class="text-lg text-gray-500 dark:text-gray-400">Loading Terms & Conditions...</p>
    </div>
</template>

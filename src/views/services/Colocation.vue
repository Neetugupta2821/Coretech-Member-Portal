<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { baseUrl } from '@/Api/BaseUrl';
const colocation = ref(null);
const ColocationDetails = ref([]);
const accessToken = localStorage.getItem('access_token');

const fetchColocation = async () => {
    try {
        const response = await axios.get(`${baseUrl}Colocation/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            }
        });
        if (response.data.length > 0) {
            colocation.value = response.data[0];
        }
    } catch (error) {
        console.error("Error Fetching Colocation API Data:", error);
    }
};

const fetchColocationDetails = async () => {
    try {
        const response = await axios.get(`${baseUrl}Colocation-Subcategory/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            }
        });
        ColocationDetails.value = response.data.map(item => ({
            uuid: item.uuid,
            title: item.title,
            sub_title: item.sub_title,
            description: item.description,
            monthly_price: item.monthly_price,
            one_time_price: item.one_time_price,
            tags: item.tags.map(tag => tag.name)
        }))
        console.log(ColocationDetails.value);
    } catch (error) {
        console.error("Error Fetching Colocation Details Data:", error)
    }
};

onMounted(() => {
    fetchColocation();
    fetchColocationDetails();
});
</script>

<template>
    <div class="p-6 rounded-lg">
        <h2 v-if="colocation" class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">{{ colocation.name }}
        </h2>
        <p v-if="colocation" class="text-sm text-gray-500 dark:text-gray-400 mb-6">
            {{ colocation.description }}
        </p>
        <p v-else class="text-gray-500 dark:text-gray-400">Loading colocation details...</p>

        <div v-if="ColocationDetails" class="space-y-4">
            <div v-for="detail in ColocationDetails" :key="detail.uuid" class="card p-4 shadow-md">
                <h3 class="text-lg font-medium">{{ detail.title }}</h3>
                <span class="text-gray-400 text-sm">{{ detail.uuid }}</span>
                <div class="flex justify-between items-center mt-2">
                    <p class=" text-gray-500 dark:text-gray-400 mt-4">{{ detail.description }}</p>
                    <div class="col-span-1">
                        <Button label="Request" icon="pi pi-envelope" class="flex-auto" severity="info"
                            variant="outlined" @click="visibleRight = true"></Button>
                    </div>
                </div>
                <Divider />
                <span class="block font-bold text-gray-400 text-sm p-1">
                    {{ detail.tags.join(' , ') }}
                </span>
                <div class="flex justify-between items-center mt-2">
                    <span
                        class="text-green-500 font-semibold bg-green-600/10 dark:bg-green-600/10 p-1 text-sm border-rounded">{{
                        detail.monthly_price }}
                        € per month incl. applicable
                        taxes</span>
                    <span
                        class="text-cyan-500 font-semibold bg-cyan-600/10 dark:bg-cyan-600/10 p-1 text-sm border-rounded">{{ detail.one_time_price }}
                        € one time incl.
                        applicable
                        taxes</span>
                </div>
            </div>
        </div>
        <p v-else class="text-gray-500 dark:text-gray-400">Loading general data....</p>
    </div>
</template>

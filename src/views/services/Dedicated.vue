<script setup>
import axios from 'axios';
import { baseUrl } from '@/Api/BaseUrl';
import { ref, onMounted } from 'vue';
const accessToken = localStorage.getItem('access_token');
const dedicated = ref(null);
const dedicatedDetails = ref([]);

const fetchDedicated = async () => {
    try {
        const response = await axios.get(`${baseUrl}DedicatedServer/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        if (response.data.length > 0) {
            dedicated.value = response.data[0];
        }
    } catch (error) {
        console.error("Error Fetching Data:", error);
    }
};

const fetchDedicatedDetails = async () => {
    try {
        const response = await axios.get(`${baseUrl}DedicatedServer-Subcategory/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });
        dedicatedDetails.value = response.data.map(item => ({
            uuid: item.uuid,
            title: item.title,
            sub_title: item.sub_title,
            description: item.description,
            monthly_price: item.monthly_price,
            one_time_price: item.one_time_price,
            tags: item.tags.map(tag => tag.name)
        }));
        console.log(dedicatedDetails.value)
    } catch (error) {
        console.error("Error Fetching Dedicated:", error)
    }
};

onMounted(() => {
    fetchDedicated();
    fetchDedicatedDetails();
});
</script>

<template>
    <div class="p-6 rounded-lg">
        <h2 v-if="dedicated" class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">{{ dedicated.name }}
        </h2>
        <p v-if="dedicated" class="text-sm text-gray-500 dark:text-gray-400 mb-6">
            {{ dedicated.description }}
        </p>
        <p v-else class="text-gray-500 dark:text-gray-400">Loading Cloud Server Data.....</p>

        <div v-if="dedicatedDetails" class="space-y-4">
            <div v-for="detail in dedicatedDetails" :key="detail.uuid" class="card p-4 shadow-md">
                <h3 class="text-lg font-medium">{{ detail.title }}<span class="text-gray-400">{{ detail.sub_title
                }}</span></h3>
                <span class="text-gray-400 text-sm">{{ detail.uuid }}</span>
                <div class="flex justify-between items-center mt-2">
                    <p class=" text-gray-500 dark:text-gray-400 mt-4">{{ detail.description }}</p>
                    <div class="col-span-1">
                        <Button label="Order" icon="pi pi-cart-plus" class="flex-auto" severity="success"
                            variant="outlined" @click="visibleRight = true"></Button>
                    </div>
                </div>
                <Divider />
                <span class="block font-bold text-gray-400 text-sm p-1">
                    {{ detail.tags.join(' , ') }}
                </span>
                <!-- <i class="pi pi-exclamation-circle text-gray-400 "></i>  -->
                <div class="flex justify-between items-center mt-2">
                    <span
                        class="text-green-500 font-semibold bg-green-600/10 dark:bg-green-600/10 p-1 text-sm border-rounded">{{
                            detail.monthly_price }}
                        € per month incl. applicable
                        taxes</span>
                    <span
                        class="text-cyan-500 font-semibold bg-cyan-600/10 dark:bg-cyan-600/10 p-1 text-sm border-rounded">{{
                            detail.one_time_price }}
                        € one time incl.
                        applicable
                        taxes</span>
                </div>
            </div>
        </div>
        <p v-else class="text-gray-500 dark:text-gray-400">Loading dedicated data...</p>
    </div>
</template>

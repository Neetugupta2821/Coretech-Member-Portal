<script setup>
import axios from 'axios';
import { baseUrl } from '@/Api/BaseUrl';
import { ref, onMounted } from 'vue';

const accessToken = localStorage.getItem('access_token');
const cloudServer = ref(null);
const cloudServerDetails = ref([]);

const fetchCloud = async () => {
    try {
        const response = await axios.get(`${baseUrl}CloudServers/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });
        if (response.data.length > 0) {
            cloudServer.value = response.data[0];
        }
    } catch (error) {
        console.error("Error fetching cloudServer Data");
    }
};

const fetchCloudServerDetails = async () => {
    try {
        const response = await axios.get(`${baseUrl}CloudServer-Subcategory/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });
        cloudServerDetails.value = response.data.map(item => ({
            uuid: item.uuid,
            title: item.title,
            sub_title: item.sub_title,
            description: item.description,
            monthly_price: item.monthly_price,
            one_time_price: item.one_time_price,
            tags: item.tags.map(tag => tag.name)
        }))
        console.log(cloudServerDetails.value);
    } catch (error) {
        console.error("Error Fetching Cloud Server Details Data:", error)
    }
};

onMounted(() => {
    fetchCloud();
    fetchCloudServerDetails();
});
</script>

<template>
    <div class="p-6 rounded-lg">
        <h2 v-if="cloudServer" class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">{{ cloudServer.name
            }}</h2>
        <p v-if="cloudServer" class="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {{ cloudServer.description }}
        </p>
        <p v-else class="text-gray-500 dark:text-gray-400">Loading Cloud Server Data.....</p>

        <div v-if="cloudServerDetails" class="space-y-4">
            <div v-for="detail in cloudServerDetails" :key="detail" class="card p-4 shadow-md">
                <h3 class="text-lg font-medium">{{ detail.title }}</h3>
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
        <p v-else class="text-gray-500 dark:text-gray-400">Loading Cloud Server Data...</p>
    </div>
</template>

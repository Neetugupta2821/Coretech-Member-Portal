<script setup>
import axios from 'axios';
import { baseUrl } from '@/Api/BaseUrl';
import { ref, onMounted } from 'vue';

const accessToken = localStorage.getItem('access_token');
const general = ref(null);
const GeneralDetails = ref([]);
const fetchGeneral = async () => {
    try {
        const response = await axios.get(`${baseUrl}general/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        if (response.data.length > 0) {
            general.value = response.data[0];
        }
    } catch (error) {
        console.error("Error Fetching Data:", error);
    }
};

const fetchGeneralDetails = async () => {
    try {
        const response = await axios.get(`${baseUrl}General-subcategory/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            }
        });
        // Extract subcategories properly
        GeneralDetails.value = response.data.flatMap(item =>
            item.subcategories.map(sub => ({
                uuid: sub.uuid,
                title: sub.title,
                sub_title: sub.sub_title,
                description: sub.description,
                monthly_price: sub.monthly_price,
                one_time_price: sub.one_time_price,
                tags: sub.tags ? sub.tags.map(tag => tag.name) : []
            }))
        );
        console.log(GeneralDetails.value);
    } catch (error) {
        console.error("Error Fetching General Details Data:", error);
    }
};


onMounted(() => {
    fetchGeneral();
    fetchGeneralDetails();
});
</script>

<template>
    <div class="p-6 rounded-lg">
        <h2 v-if="general" class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
            {{ general.name }}
        </h2>
        <p v-if="general" class="text-sm text-gray-500 dark:text-gray-400 mb-6">
            {{ general.description }}
        </p>
        <p v-else class="text-gray-500 dark:text-gray-400">Loading General Data.....</p>

        <!-- Addons Section -->
        <div v-if="GeneralDetails" class="space-y-4">
            <div v-for="detail in GeneralDetails" :key="detail.uuid" class="card p-4 shadow-md">
                <h3 class="text-lg font-medium">{{ detail.title }}</h3>
                <span class="text-gray-400 text-sm">{{ detail.uuid }}</span>
                <div class="flex justify-between items-center mt-2">
                    <p class="text-gray-500 dark:text-gray-400 mt-4">
                        {{ detail.description }}
                    </p>
                    <div class="col-span-1">
                        <Button label="Request" icon="pi pi-envelope" class="flex-auto" severity="info"
                            variant="outlined" @click="visibleRight = true"></Button>
                    </div>
                </div>
                <Divider />
                <span class="block font-bold text-gray-400 text-sm p-1">
                    {{ detail.tags.join(' , ') }}
                </span>
                <!--  -->
                <div class="flex justify-between items-center mt-2">
                    <span
                        class="text-green-500 font-semibold bg-green-600/10 dark:bg-green-600/10 p-1 text-sm border-rounded">
                        {{ detail.monthly_price }} € per month incl. applicable taxes
                    </span>
                    <span
                        class="text-cyan-500 font-semibold bg-cyan-600/10 dark:bg-cyan-600/10 p-1 text-sm border-rounded">
                        {{ detail.one_time_price }} € one time incl. applicable taxes
                    </span>
                </div>
            </div>
        </div>
        <p v-else class="text-gray-500 dark:text-gray-400">Loading General data....</p>
    </div>
</template>

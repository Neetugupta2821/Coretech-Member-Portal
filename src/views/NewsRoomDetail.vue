<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { baseUrl } from '@/Api/BaseUrl';

const route = useRoute();
const newsDetails = ref(null);
const accessToken = localStorage.getItem('access_token');

console.log("Received ID:", route.params.id);
console.log("Access Token:", accessToken);

const fetchNewsDetails = async () => {
    try {
        console.log("Fetching from:", `${baseUrl}Read-More/${route.params.id}/`);
        const response = await axios.post(`${baseUrl}Read-More/${route.params.id}/`, {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            }
        });
        console.log("API Response:", response.data);
        newsDetails.value = response.data.news;
    } catch (error) {
        console.error("Error fetching news details:", error);
    }
};

onMounted(() => {
    if (route.params.id) {
        fetchNewsDetails();
    } else {
        console.error("No ID found in route parameters");
    }
});
</script>

<template>
    <div class="mb-4">
        <div class="col-span-12 xl:col-span-12 mb-6">
            <span class="text-2xl">Announcements</span>
        </div>
    </div>
    <div v-animateonscroll="{ enterClass: 'animate-fadein' }" class="animate-duration-700 grid grid-cols-12 gap-8 ">
        <div class="col-span-12 lg:col-span-6 xl:col-span-8">
            <div class="card mb-8">
                <div v-if="newsDetails" class="container mx-auto">
                    <h2 class="text-xl font-bold mb-4">{{ newsDetails.news_type }}: {{ newsDetails.title }}</h2>
                    <p class="text-muted-color">{{ newsDetails.content }}</p>
                </div>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-4">
            <div class="card mb-8 shadow-lg rounded-lg">
                <div v-if="newsDetails" class="container mx-auto ">
                    <h2 class="text-xl font-bold mb-4">Announcement Details</h2>
                    <table class="w-full text-left text-sm">
                        <tbody>
                            <tr>
                                <td class="p-2 font-bold">Type:</td>
                                <td class="p-2">
                                    <span class="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs">
                                        {{ newsDetails.news_type }}</span>
                                </td>
                            </tr>
                            <tr>
                                <td class="p-2 font-bold">Notice available from:</td>
                                <td class="p-2 text-muted-color">{{ newsDetails.notice_available_from }}</td>
                            </tr>
                            <tr>
                                <td class="p-2 font-bold">Notice available until:</td>
                                <td class="p-2 text-muted-color">{{ newsDetails.notice_available_until }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <!-- <div v-else class="text-center p-6">
        <p>Loading...</p>
    </div> -->
</template>

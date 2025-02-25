<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { baseUrl } from '@/Api/BaseUrl';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const news = ref(null);

const fetchNewsData = async () => {
    try {
        const response = await axios.get(`${baseUrl}NewsCount/`);
        news.value = response.data.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch News Data");
    }
};

onMounted(fetchNewsData);
</script>

<template>
    <div class="grid grid-cols-12 gap-8">
        <div class="col-span-12 xl:col-span-12">
            <div class="notify font-bold mb-0 bg-orange-400/10 dark:bg-orange-400/10">
                <div class="flex justify-between mb-0">
                    <div>
                        <span class="block text-large text-orange-400">
                            <i class="pi pi-bell text-orange-400 "></i> &nbsp;
                            There are {{ news?.["General Announcement"] || 0 }} general, {{ news?.["Maintenance"] || 0
                            }} maintenance, and {{ news?.["Development News"] || 0 }}
                            development announcements.
                        </span>
                    </div>
                    <div>
                        <span class="block text-large text-orange-400">
                            View All
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.notify {
    padding: 10px;
    border-radius: 5px;
    /* box-shadow: 3px 4px 5px rgba(245, 131, 78, 0.24); */
}
</style>

<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import axios from 'axios';
import { baseUrl } from '@/Api/BaseUrl';
import { useRouter } from 'vue-router';

const dt = ref();
const products = ref([]);
const selectedProducts = ref();
const activeDropdown = ref(null);

const router = useRouter();

const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};
const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;

    let truncated = text.substring(0, maxLength);
    let lastSpace = truncated.lastIndexOf(" ");

    if (lastSpace > 0) {
        truncated = truncated.substring(0, lastSpace);
    }

    return truncated + "...";
};

const accessToken = localStorage.getItem('access_token');
const fetchNews = async () => {
    try {
        const response = await axios.get(`${baseUrl}NewRoom/`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            }
        });
        products.value = response.data.map(item => {
            const shortTitle = truncateText(item.content, 100);
            // console.warn(`Original: ${item.content}, Shortened: ${shortTitle}`);

            return {
                id: item.news_uuid,
                code: item.news_uuid.substring(0, 8),
                type: item.news_type,
                title: item.title,
                content: shortTitle,
                createdAt: formatDate(item.notice_available_from),
                status: item.status
            };
        });
    } catch (error) {
        console.error('Error fetching news:', error);
    }
};
onMounted(fetchNews);

const toggleMenu = (id) => {
    activeDropdown.value = activeDropdown.value === id ? null : id;
};

const navigateToDetails = (news_uuid) => {
    console.log("Navigating to:", news_uuid);
    if (news_uuid) {
        router.push({ name: 'newsDetails', params: { id: news_uuid } });
    } else {
        console.error("Invalid news UUID");
    }
};
</script>


<template>
    <div class="mb-4">
        <div class="col-span-12 xl:col-span-12 mb-6">
            <span class="text-2xl">News & Announcements</span>
        </div>
    </div>
    <div v-animateonscroll="{ enterClass: 'animate-fadein' }" class="animate-duration-700 ">
        <div class="card mb-8">
            <DataTable ref="dt" v-model:selection="selectedProducts" :value="products" dataKey="id" :paginator="true"
                :rows="10" :filters="filters" :rowsPerPageOptions="[5, 10, 25, 50]"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink  RowsPerPageDropdown">
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0 font-bold text-xl">Recent News</h4>
                    </div>
                </template>

                <Column field="code" header="UUID" sortable style="min-width: 8rem"></Column>
                <Column field="type" header="Type" sortable style="min-width: 12rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.type"
                            :severity="slotProps.data.type === 'General Announcement' ? 'warning' : 'info'" />
                    </template>
                </Column>
                <Column field="title" header="Title" sortable style="min-width: 8rem"></Column>
                <Column field="content" header="Content" sortable style="min-width: 8rem"></Column>
                <Column field="createdAt" header="Created at" sortable style="min-width: 8rem"></Column>
                <Column field="status" header="Status" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.status"
                            :severity="slotProps.data.status === 'Unread' ? 'warning' : 'success'" />
                    </template>
                </Column>
                <Column field="action" header="Action" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        <div class="relative">
                            <i class="pi pi-ellipsis-h text-orange-600 cursor-pointer" style="font-size: 1rem;"
                                @click="toggleMenu(slotProps.data.id)"></i>

                            <div v-if="activeDropdown === slotProps.data.id"
                                class="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg z-10">
                                <ul class="p-2 dark:bg-gray-950 ">
                                    <li @click="navigateToDetails(slotProps.data.id)"
                                        class="cursor-pointer hover:bg-orange-200">
                                        <p class="text-black dark:text-white   items-center"><i
                                                class="ph-bold ph-user"></i>&nbsp;Read more</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>


<style>
.fade-in {
    opacity: 1;
    animation-name: fadeInOpacity;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    animation-duration: 2s;
}

@keyframes fadeInOpacity {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>

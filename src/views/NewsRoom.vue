<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import axios from 'axios';
import { baseUrl } from '@/Api/BaseUrl';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
const dt = ref();
const products = ref([]);
const selectedProducts = ref();
const activeDropdown = ref(null);
const isMounted = ref(false);
const accessToken = localStorage.getItem('access_token');
const router = useRouter();
const toast = useToast();
const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});

// Function to format date
const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
};

// Function to truncate text
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

const getSeverty = (status) => {
    if (status === "Closed") {
        return "danger";
    } else if (status === "Maintenance") {
        return "success";
    } else if (status === "Development News") {
        return "info"
    }
    return "warning";
}

// Fetching News Data
const fetchNews = async () => {
    try {
        const response = await axios.get(`${baseUrl}NewRoom/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            }
        });
        products.value = response.data.map(item => {
            return {
                id: item.news_uuid,
                code: item.news_uuid,
                type: item.news_type,
                title: item.title,
                content: truncateText(item.content, 100),
                createdAt: formatDate(item.notice_available_from),
                status: item.readnews.length > 0 ? item.readnews[0].status : "Unread"
            };
        });

        isMounted.value = true;

    } catch (error) {
        console.error('Error fetching news:', error);
    }
};

onMounted(fetchNews);

const toggleMenu = (id) => {
    activeDropdown.value = activeDropdown.value === id ? null : id;
};

const navigateToDetails = (news_uuid) => {
    if (news_uuid) {
        router.push({ name: 'newsDetails', params: { id: news_uuid } });
    } else {
        console.error("Invalid news UUID");
    }
};

const copyToClipboard = async (uuid) => {
    if (navigator.clipboard?.writeText) {
        try {
            await navigator.clipboard.writeText(uuid);
            toast.add({ severity: 'success', summary: 'Text Copied!', detail: uuid, life: 1000 });
            return;
        } catch (error) {
            console.error("Failed to copy using Clipboard API:", error);
        }
    }
    const textarea = document.createElement("textarea");
    textarea.value = uuid;
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand("copy");
        toast.add({ severity: 'success', summary: 'Text Copied!', detail: uuid, life: 1000 });
    } catch (error) {
        console.error("Fallback copy failed:", error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to copy UUID', life: 2000 });
    }
    document.body.removeChild(textarea);
};
</script>

<template>
    <div class="mb-4">
        <div class="col-span-12 xl:col-span-12 mb-6">
            <span class="text-2xl">News & Announcements</span>
        </div>
    </div>
    <transition name="slide-forward-center">
        <div v-if="isMounted" class="card mb-8 shadow-lg rounded-lg">
            <DataTable ref="dt" v-model:selection="selectedProducts" :value="products" dataKey="id" :paginator="true"
                :rows="10" :filters="filters" :rowsPerPageOptions="[5, 10, 25, 50]"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink  RowsPerPageDropdown">
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0 font-bold text-xl">Recent News</h4>
                    </div>
                </template>
                <Column field="code" header="UUID" sortable style="min-width: 6rem">
                    <template #body="slotProps">
                        <div class="flex items-center gap-2">
                            <p class="font-mono text-md">{{ slotProps.data.code.substring(0, 8) }}</p>
                            <i class="pi pi-clipboard cursor-pointer text-cyan-500"
                                @click="copyToClipboard(slotProps.data.code)">
                            </i>
                        </div>
                    </template>
                </Column>
                <Column field="type" header="Type" sortable style="min-width: 14rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.type" :severity="getSeverty(slotProps.data.type)" class="text-sm" />
                    </template>
                </Column>
                <Column field="title" header="Title" sortable style="min-width: 8rem"></Column>
                <Column field="content" header="Content" sortable style="min-width: 6rem"></Column>
                <Column field="createdAt" header="Created at" sortable style="min-width: 10rem"></Column>
                <Column field="status" header="Status" sortable style="min-width: 6rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.status"
                            :severity="slotProps.data.status === 'Unread' ? 'warning' : 'success'" />
                    </template>
                </Column>
                <Column field="action" header="Action" style="min-width: 8rem">
                    <template #body="slotProps">
                        <div class="relative">
                            <i class="pi pi-ellipsis-h text-orange-600 cursor-pointer" style="font-size: 1rem;"
                                @click="toggleMenu(slotProps.data.id)"></i>

                            <div v-if="activeDropdown === slotProps.data.id"
                                class="absolute right-0 mt-2 w-40 shadow-lg rounded-lg">
                                <ul class="p-2 card shadow-lg">
                                    <li @click="navigateToDetails(slotProps.data.id)"
                                        class="cursor-pointer hover:text-orange-400">
                                        <p class="text-black dark:text-white items-center">
                                            <i class="ph-bold ph-user"></i>&nbsp;Read more
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </transition>
</template>

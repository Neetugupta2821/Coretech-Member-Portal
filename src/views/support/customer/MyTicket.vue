<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { FilterMatchMode } from '@primevue/core/api';
import { baseUrl } from '@/Api/BaseUrl';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

const dt = ref();
const products = ref([]);
const selectedProducts = ref([]);
const isMounted = ref(false);
const toast = useToast();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const router = useRouter();
const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        // second: '2-digit',
        hour12: true
    });
};

const getSeverity = (flag) => {
    if (flag === "Emergency" || flag === "Hand-On") {
        return "warning";
    } else if (flag === "None") {
        return "secondary";
    }
    return "success";
}

const getSevertyStatus = (status) => {
    if (status === "Closed") {
        return "danger";
    } else if (status === "Created") {
        return "success";
    } else if (status === "Approved") {
        return "info"
    }
    return "warning";
}

const accessToken = localStorage.getItem('access_token');
const fetchTickets = async () => {
    try {
        const response = await axios.post(`${baseUrl}MyTicket/`, {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });
        products.value = response.data.map(item => ({
            uuid: item.ticket_uuid,
            user: `${item.user.firstname} ${item.user.lastname} (${item.user.aurologic_uuid})`,
            subject: item.subject,
            created_at: formatDate(item.created_at),
            status: item.status,
            flag: item.emergency_or_handon,
        }));
        isMounted.value = true;
    } catch (error) {
        console.error('Error Fetching Data:', error);
    }
};

const navigateToDetails = (ticket_uuid) => {
    console.log("Navigating to:", ticket_uuid);
    if (ticket_uuid) {
        router.push({ name: 'view', params: { id: ticket_uuid } });
    } else {
        console.error("Invalid Ticket UUID");
    }
};

onMounted(fetchTickets);

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
            <span class="text-3xl font-medium">Tickets Overview</span>
        </div>
        <div class="grid grid-cols-12 gap-8">
            <div class="col-span-12 xl:col-span-12">
                <div class="notify font-bold mb-0 bg-orange-400/10 dark:bg-orange-400/10 p-3 rounded-sm">
                    <span class="block text-large text-orange-400">
                        To ensure timely support for all our customers, please be aware that tickets without a
                        response from your side for 3-7 days will be automatically closed without prior notice.
                    </span>
                </div>
            </div>
        </div>
    </div>

    <Transition name="slide-forward-center">
        <div v-if="isMounted" class="card mb-8 shadow-lg rounded-lg">
            <DataTable ref="dt" v-model:selection="selectedProducts" :value="products" dataKey="uuid" :paginator="true"
                :rows="10" :filters="filters" :rowsPerPageOptions="[5, 10, 25, 50]"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink  RowsPerPageDropdown">
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0 font-medium text-xl">All Tickets</h4>
                    </div>
                </template>

                <Column field="uuid" header="UUID" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        <div class="flex items-center gap-2">
                            <p class="text-md">
                                {{ slotProps.data.uuid.substring(0, 8) }}
                                <i class="pi pi-clipboard cursor-pointer text-cyan-500"
                                    @click="copyToClipboard(slotProps.data.uuid)"></i>
                            </p>
                        </div>

                    </template>
                </Column>
                <Column field="user" header="Customer" sortable style="min-width: 8rem"></Column>
                <Column field="subject" header="Subject" sortable style="min-width: 10rem"></Column>
                <Column field="flag" header="Flags" sortable style="min-width: 10rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.flag" :severity="getSeverity(slotProps.data.flag)" />
                    </template>
                </Column>
                <Column field="created_at" header="Created At" sortable style="min-width: 8rem"></Column>
                <Column field="status" header="Status" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.status" :severity="getSevertyStatus
                            (slotProps.data.status)" />
                    </template>
                </Column>
                <Column field="action" header="Action" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        <div class="relative">
                            <i class="pi pi-eye text-orange-600 cursor-pointer" style="font-size: 1rem;"
                                @click="navigateToDetails(slotProps.data.uuid)"></i>
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </Transition>

</template>

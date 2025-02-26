<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { baseUrl } from '@/Api/BaseUrl';
const products = ref([]);
const visible = ref(false);
const selectedItem = ref(null);

const fetchMaintenanceData = async () => {
    try {
        const response = await axios.get(`${baseUrl}Schedule/Mantance/`);
        products.value = response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch maintenance data");
    }
};
onMounted(fetchMaintenanceData);
const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString();
};

const openLink = (url) => {
    if (url) {
        window.open(url, '_blank');
    } else {
        toast.warning("No URL available");
    }
};

const openDialog = (item) => {
    selectedItem.value = item;
    visible.value = true;
};
</script>

<template>
    <div class="card">
        <DataTable :value="products" tableStyle="min-width: 50rem">
            <template #header>
                <div class="flex flex-wrap items-center justify-between gap-2">
                    <span class="text-2xl font-bold">Scheduled Maintenance</span>
                </div>
            </template>
            <!-- <Column header="DETAIL" style="min-width: 12rem">
                <template #body="slotProps" label="Top" @click="openPosition('top')">
                    {{ (slotProps.data.details) }}
                    &nbsp;<span @click="openLink(slotProps.data.urls)">
                        <i class="pi pi-external-link text-orange-400" style="font-size: 1rem "></i>
                    </span>
                </template>
            </Column> -->

            <!-- DETAILS COLUMN -->
            <Column header="DETAIL" style="min-width: 12rem">
                <template #body="slotProps">
                    <span class="cursor-pointer" @click="openDialog(slotProps.data)">
                        {{ slotProps.data.heading }}
                        &nbsp;
                        <span @click="openLink(slotProps.data.urls)">
                            <i class="pi pi-external-link text-orange-400" style="font-size: 1rem"></i>
                        </span>
                    </span>
                </template>
            </Column>
            <Column header="STATUS" style="min-width: 12rem">
                <template #body="slotProps">
                    SCHEDULED
                    <!-- {{ (slotProps.data.status) }} -->
                </template>
            </Column>
            <Column header="SCHEDULED FOR" style="min-width: 12rem">
                <template #body="slotProps">
                    Feb 12, 2025, 05:24 PM
                    <!-- {{ formatDate(slotProps.data.Scheduled_for) }} -->
                </template>
            </Column>
            <Column header="SCHEDULED UNTIL" style="min-width: 12rem">
                <template #body="slotProps">
                    Feb 23, 2025, 07:24 PM
                    <!-- {{ formatDate(slotProps.data.Scheduled_until) }} -->
                </template>
            </Column>
        </DataTable>
    </div>
    <div>
        <!-- Dialog Component -->
        <Dialog v-model:visible="visible" header="Maintenance Details" :style="{ width: '55rem' }" modal
            :draggable="false" position="top">
            <div v-if="selectedItem">
                <p class="text-muted-color font-bold text-xl mb-4">{{ selectedItem.heading }}</p>
                <P class="text-muted-color"><strong>Update</strong> posted at {{ selectedItem.update }} with status {{
                    selectedItem.status }}</P>
                <p class="text-muted-color">{{ selectedItem.details }}</p>
                <br />
                <p class="text-muted-color">{{ selectedItem.title }}</p>
            </div>
            <Divider />
            <div class="flex justify-end gap-2 mt-4">
                <Button type="button" label="Close" @click="visible = false"></Button>
            </div>
        </Dialog>
    </div>
</template>

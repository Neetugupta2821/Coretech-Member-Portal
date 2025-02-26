<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const products = ref([]);

const fetchMaintenanceData = async () => {
    try {
        const response = await axios.get('http://192.168.1.83:8000/api/Schedule/Mantance/');
        products.value = response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch maintenance data");
    }
};

onMounted(fetchMaintenanceData);

// Format date function
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

const openLink = (url) => {
    if (url) {
        window.open(url, '_blank');
    } else {
        toast.warning("No URL available");
    }
};
</script>

<template>
    <div class="card">
        <DataTable :value="products" tableStyle="min-width: 50rem">
            <template #header>
                <div class="flex flex-wrap items-center justify-between gap-2">
                    <span class="text-xl font-bold">Scheduled Maintenance</span>
                </div>
            </template>
            <Column header="DETAIL" style="min-width: 12rem">
                <template #body="slotProps">
                    <!-- {{ (slotProps.data.details) }} -->
                    Maintenance - core01.ffm1.de/core02.ffm1.de - vARP Turn-Up
                    &nbsp;<span @click="openLink(slotProps.data.urls)">
                        <i class="pi pi-external-link text-orange-400" style="font-size: 1rem "></i>
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
</template>

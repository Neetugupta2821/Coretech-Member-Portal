<script setup>
import NotificationView from '@/components/dashboard/NotificationView.vue';
import { ref } from "vue";

const selectedCity = ref();
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
]);
</script>
<template>
    <div class="mb-4">
        <div class="col-span-12 xl:col-span-12 mb-6">
            <span class="text-xl font-bold">Services Overview</span>
        </div>
        <div class="col-span-12 xl:col-span-12">
            <router-link :to="'/news'">
                <NotificationView />
            </router-link>
        </div>
    </div>
    <div v-animateonscroll="{ enterClass: 'animate-fadein', leaveClass: 'animate-fadeout' }"
        class="animate-duration-700 animate-ease-in-out">
        <div class="card mb-8">
            <div class="grid grid-cols-12 gap-2">
                <div class="col-span-12 lg:col-span-2 xl:col-span-4">
                    <div class="card">
                        <AutoComplete v-model="selectedCountry" size="small" :suggestions="filteredCountries"
                            @complete="search" placeholder="Search by Description"/>
                    </div>
                </div>
                <div class="col-span-12 lg:col-span-2 xl:col-span-4">
                    <div class="card">
                        <AutoComplete v-model="selectedCountry" size="small" :suggestions="filteredCountries"
                            @complete="search" placeholder="Search by contract" class="w-full md:w-56"/>
                    </div>
                </div>
                <div class="col-span-12 lg:col-span-2 xl:col-span-4">
                    <div class="card">
                        <Select v-model="selectedCity" size="small" :options="cities" optionLabel="name"
                            placeholder="Select a City" class="w-full md:w-56" />
                    </div>
                </div>
                <!-- <div class="col-span-12 lg:col-span-2 xl:col-span-2">
                    <div class="card">
                        <label>Invoice Paid Range: Start</label>
                        <DatePicker v-model="dates" size="small" selectionMode="range" :manualInput="false" />
                    </div>
                </div>
                <div class="col-span-12 lg:col-span-2 xl:col-span-2">
                    <div class="card">
                        <label>Invoice Paid Range: End</label>
                        <DatePicker v-model="dates" selectionMode="range" size="small" :manualInput="false" />
                    </div>
                </div>
                <div class="col-span-12 lg:col-span-2 xl:col-span-2">
                    <div class="card">
                        <label>Refresh</label>
                        <div class="mt-2">
                            <Button icon="pi pi-refresh" square raised />
                        </div>
                    </div>
                </div> -->
            </div>
            <DataTable ref="dt" v-model:selection="selectedProducts" :value="products" dataKey="id" :paginator="true"
                :rows="10" :filters="filters" :rowsPerPageOptions="[5, 10, 25, 50]"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink  RowsPerPageDropdown">
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0 font-bold text-xl">Services
                        </h4>
                    </div>
                </template>

                <Column field="code" header="Contract ID" sortable style="min-width: 8rem"></Column>
                <Column field="type" header="Type" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.inventoryStatus"
                            :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                    </template>
                </Column>
                <Column field="description" header="Description" sortable style="min-width: 8rem" class="text-medium">
                </Column>
                <Column field="active" header="Active" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        {{ formatCurrency(slotProps.data.price) }}
                    </template>
                </Column>
                <Column field="minimumterm" header="Minimum Term" sortable style="min-width: 10rem"></Column>
                <Column field="pricing" header="Pricing" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.inventoryStatus"
                            :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                    </template>
                </Column>
                <Column field="activated" header="Activated" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.inventoryStatus"
                            :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                    </template>
                </Column>
                <Column field="action" header="Action" sortable style="min-width: 8rem"></Column>
            </DataTable>
        </div>
    </div>
</template>

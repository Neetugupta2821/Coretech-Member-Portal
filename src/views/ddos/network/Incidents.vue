<script setup>
import { ref } from 'vue';
import VueTimepicker from 'vue3-timepicker';
import 'vue3-timepicker/dist/VueTimepicker.css';

// Define a reactive variable to store the selected time
const selectedTime = ref(null);
</script>

<template>
    <div class="mb-4">
        <div class="col-span-12 xl:col-span-12 mb-6">
            <span class="text-xl font-bold">Incident Overview</span>
        </div>
    </div>
    <div v-animateonscroll="{ enterClass: 'animate-fadein', leaveClass: 'animate-fadein' }"
        class="animate-duration-700">
        <div class="mb-8">
            <div class="grid grid-cols-12 gap-8">
                <div class="col-span-12 lg:col-span-6 xl:col-span-3">
                    <div class="card mb-0 shadow-lg rounded-lg">
                        <div class="flex justify-between items-center mb-2">
                            <div>
                                <span
                                    class="block text-surface-900 dark:text-surface-0 -color mb-2  font-medium text-2xl">0</span>
                                <div class="text-muted-color font-medium font-medium ">Recent DDoS Incidents
                                </div>
                            </div>
                            <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-full"
                                style="width: 3rem; height: 3rem">
                                <i class="pi pi-shopping-cart text-orange-400 !text-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-12 lg:col-span-6 xl:col-span-3">
                    <div class="card mb-0 shadow-lg rounded-lg">
                        <div class="flex justify-between items-center mb-2">
                            <div>
                                <span class="block text-surface-900 dark:text-surface-0   font-medium mb-2 text-2xl">0
                                    Mbps</span>
                                <div class="text-muted-color font-medium">Average Bandwidth</div>
                            </div>
                            <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-full"
                                style="width: 3rem; height: 3rem">
                                <i class="pi pi-dollar text-orange-400 !text-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-12 lg:col-span-6 xl:col-span-3 ">
                    <div class="card mb-0 shadow-lg rounded-lg">
                        <div class="flex justify-between items-center mb-2">
                            <div>
                                <span class="block text-surface-900 dark:text-surface-0  font-medium mb-2 text-2xl">0
                                    pps</span>
                                <div class="text-muted-color font-medium">Average Packets</div>
                            </div>
                            <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-full"
                                style="width: 3rem; height: 3rem">
                                <i class="pi pi-users text-orange-400 !text-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-12 lg:col-span-6 xl:col-span-3">
                    <div class="card mb-0 shadow-lg rounded-lg">
                        <div class="flex justify-between items-center mb-2">
                            <div>
                                <span class="block text-surface-900 dark:text-surface-0  font-medium mb-2 text-2xl">0
                                    Byte</span>
                                <div class="text-muted-color font-medium font-medium ">Average Packet Size
                                    (Byte)
                                </div>
                            </div>
                            <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-full"
                                style="width: 3rem; height: 3rem">
                                <i class="pi pi-comment text-orange-400 !text-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card mt-8 shadow-lg rounded-lg">
            <div class="flex justify-between col-span-12 xl:col-span-12 mb-6">
                <span class="text-xl font-bold">Recent DDoS Incidents</span>
                <div class="col-span-1">
                    <Select v-model="selectedCity" size="small" :options="cities" optionLabel="name"
                        placeholder="Load Incidents" class="" />
                </div>
            </div>
            <div class="grid grid-cols-4 gap-4">
                <div class="col-span-1">
                    <!-- <label>Search by Prefix</label> -->
                    <AutoComplete v-model="selectedCountry" size="small" :suggestions="filteredCountries"
                        @complete="search" placeholder="Search by prefix" />
                </div>
                <div class="col-span-1">
                    <!-- <label>Search by UUID</label> -->
                    <AutoComplete v-model="selectedCountry" size="small" :suggestions="filteredCountries"
                        @complete="search" placeholder="Search by UUID" />
                </div>
                <div class="col-span-1">
                    <!-- <label>Search by method</label> -->
                    <AutoComplete v-model="selectedCountry" size="small" :suggestions="filteredCountries"
                        @complete="search" placeholder="Search by method" />
                </div>
                <div class="col-span-1">
                    <!-- <label>Search by StartDate</label> -->
                    <DatePicker v-model="dates" selectionMode="range" size="small" :manualInput="false"
                        placeholder="Search by StartDate" />
                </div>
                <div class="col-span-1">
                    <!-- <label>Search by StartTime</label> -->
                    <VueTimepicker v-model="selectedTime" format="hh:mm A" manual-input
                        placeholder="Search by StartTime" />
                </div>
                <div class="col-span-1">
                    <!-- <label>Search by EndDate</label> -->
                    <DatePicker v-model="dates" selectionMode="range" size="small" :manualInput="false"
                        placeholder="Search by EndDate" />
                </div>
                <div class="col-span-1">
                    <!-- <label>Search by EndTime</label> -->
                    <VueTimepicker v-model="selectedTime" format="hh:mm A" manual-input
                        placeholder="Search by EndTime" />
                </div>
            </div>
            <div class="mt-6">
                <DataTable ref="dt" v-model:selection="selectedProducts" :value="products" dataKey="id"
                    :paginator="true" :rows="10" :filters="filters" :rowsPerPageOptions="[5, 10, 25, 50]"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink  RowsPerPageDropdown">

                    <Column field="code" header="UUID" sortable style="min-width: 8rem"></Column>
                    <Column field="target" header="Target" sortable style="min-width: 8rem">
                        <template #body="slotProps">
                            <Tag :value="slotProps.data.inventoryStatus"
                                :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                        </template>
                    </Column>
                    <Column field="attacktype" header="Attack Type" sortable style="min-width: 8rem"
                        class="text-medium">
                    </Column>
                    <Column field="detectionmethod" header="Detection Method" sortable style="min-width: 8rem">
                        <template #body="slotProps">
                            {{ formatCurrency(slotProps.data.price) }}
                        </template>
                    </Column>
                    <Column field="mitigationmethod" header="Mitigation Method" sortable style="min-width: 10rem">
                    </Column>
                    <Column field="Mbps" header="Mbps (init.)" sortable style="min-width: 8rem">
                        <template #body="slotProps">
                            <Tag :value="slotProps.data.inventoryStatus"
                                :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                        </template>
                    </Column>
                    <Column field="pps" header="pps (init.)" sortable style="min-width: 8rem">
                        <template #body="slotProps">
                            <Tag :value="slotProps.data.inventoryStatus"
                                :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                        </template>
                    </Column>
                    <Column field="timestamp" header="Timestamp" sortable style="min-width: 8rem"></Column>
                    <Column field="action" header="Action" sortable style="min-width: 8rem"></Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

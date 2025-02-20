<script setup>
import NotificationView from '@/components/dashboard/NotificationView.vue'; import { ref } from "vue";

const selectedCity = ref();
const cities = ref([

]);
</script>
<template>
    <div class="mb-4">
        <div class="col-span-12 xl:col-span-12 mb-6">
            <span class="text-xl font-bold">Account Billing</span>
        </div>
        <div class="col-span-12 xl:col-span-12">
            <router-link :to="'/news'">
                <NotificationView />
            </router-link>
        </div>
    </div>
    <div v-animateonscroll="{ enterClass: 'animate-fadein', leaveClass: 'animate-fadein' }"
        class="animate-duration-700">
        <div class="card mb-8">
            <Tabs value="0">
                <TabList>
                    <Tab value="0" as="div" class="flex items-center gap-2">
                        <i class="pi pi-user"></i>
                        <span class="font-bold whitespace-nowrap">Invoices</span>
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="0" as="p" class="m-0">
                        <div class="grid grid-cols-12 gap-4">
                            <div class="col-span-12 lg:col-span-2 xl:col-span-2">
                                <div class="card">
                                    <label>Invoice ID</label>
                                    <AutoComplete v-model="selectedCountry" size="small"
                                        :suggestions="filteredCountries" @complete="search"/>
                                </div>
                            </div>
                            <div class="col-span-12 lg:col-span-2 xl:col-span-2">
                                <div class="card">
                                    <label>
                                        Transation UUID</label>
                                    <AutoComplete v-model="selectedCountry" size="small"
                                        :suggestions="filteredCountries" @complete="search" />
                                </div>
                            </div>
                            <div class="col-span-12 lg:col-span-2 xl:col-span-2">
                                <div class="card">
                                    <label>Invoice Entity: Service</label>
                                    <Select v-model="selectedCity" size="small" :options="cities" optionLabel="name"
                                        placeholder="Select a City" />
                                </div>
                            </div>
                            <div class="col-span-12 lg:col-span-2 xl:col-span-2">
                                <div class="card">
                                    <label>Invoice Paid Range: Start</label>
                                    <DatePicker v-model="dates" size="small" selectionMode="range"
                                        :manualInput="false" />
                                </div>
                            </div>
                            <div class="col-span-12 lg:col-span-2 xl:col-span-2">
                                <div class="card">
                                    <label>Invoice Paid Range: End</label>
                                    <DatePicker v-model="dates" selectionMode="range" size="small"
                                        :manualInput="false" />
                                </div>
                            </div>
                            <div class="col-span-12 lg:col-span-2 xl:col-span-2">
                                <div class="card">
                                    <label>Refresh</label>
                                    <div class="mt-2">
                                        <Button icon="pi pi-refresh" square raised />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>

        <div class="card mb-8">
            <DataTable ref="dt" v-model:selection="selectedProducts" :value="products" dataKey="id" :paginator="true"
                :rows="10" :filters="filters" :rowsPerPageOptions="[5, 10, 25, 50]"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink  RowsPerPageDropdown">
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0 font-bold text-xl">Preliminary / Proforma Invoices
                        </h4>
                        <p class="text-muted-color">Proforma invoices are provisional statements that are reissued on an
                            ongoing basis to reflect
                            possible changes to service terms and new orders and to give you a position preview of the
                            end-of-month invoice. When the due date is reached, the invoices are offset against existing
                            customer credit and converted into a regular, bookable invoice in the table below this one.
                            A new proforma invoice is then created for the following month, which follows the same
                            principle.</p>
                    </div>
                </template>

                <Column field="code" header="UUID" sortable style="min-width: 8rem"></Column>
                <Column field="inventoryStatus" header="Invoice#" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.inventoryStatus"
                            :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                    </template>
                </Column>
                <Column field="name" header="Amount(Net)" sortable style="min-width: 8rem" class="text-medium"></Column>
                <Column field="price" header="Amount(Gross)" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        {{ formatCurrency(slotProps.data.price) }}
                    </template>
                </Column>
                <Column field="category" header="Invoice Date" sortable style="min-width: 10rem"></Column>
                <Column field="dueStatus" header="Due Date" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.inventoryStatus"
                            :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                    </template>
                </Column>
                <Column field="paidStatus" header="Paid Date" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.inventoryStatus"
                            :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                    </template>
                </Column>
                <Column field="action" header="Action" sortable style="min-width: 8rem"></Column>
            </DataTable>
        </div>

        <div class="card mb-8">
            <DataTable ref="dt" v-model:selection="selectedProducts" :value="products" dataKey="id" :paginator="true"
                :rows="10" :filters="filters" :rowsPerPageOptions="[5, 10, 25, 50]"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink  RowsPerPageDropdown">
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0 font-bold text-xl">Invoices
                        </h4>
                    </div>
                </template>

                <Column field="code" header="UUID" sortable style="min-width: 8rem"></Column>
                <Column field="inventoryStatus" header="Invoice#" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.inventoryStatus"
                            :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                    </template>
                </Column>
                <Column field="name" header="Amount(Net)" sortable style="min-width: 8rem" class="text-medium"></Column>
                <Column field="price" header="Amount(Gross)" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        {{ formatCurrency(slotProps.data.price) }}
                    </template>
                </Column>
                <Column field="category" header="Invoice Date" sortable style="min-width: 10rem"></Column>
                <Column field="dueStatus" header="Due Date" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.inventoryStatus"
                            :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                    </template>
                </Column>
                <Column field="paidStatus" header="Paid Date" sortable style="min-width: 8rem">
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

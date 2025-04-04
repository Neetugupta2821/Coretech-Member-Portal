<script setup>
import { ref } from 'vue';
const visibleRight = ref(false);
const value = ref(null);
</script>

<template>
    <div class="mb-4">
        <div class="col-span-12 xl:col-span-12 mb-6">
            <span class="text-3xl font-medium">Source Prefix List</span>
        </div>
    </div>
    <div v-animateonscroll="{ enterClass: 'animate-fadein', leaveClass: 'animate-fadein' }"
        class="animate-duration-700">
        <div class="card mt-8 shadow-lg rounded-lg">
            <div class="flex justify-between col-span-12 xl:col-span-12 mb-6">
                <span class="text-2xl font-medium">Source Prefix List</span>
                <div class="col-span-1">
                    <Button label="Create" icon="pi pi-plus" class="flex-auto" severity="success" variant="outlined"
                        @click="visibleRight = true"></Button>
                </div>
            </div>
            <div class="grid grid-cols-4 gap-4">
                <div class="col-span-1">
                    <!-- <label>Search by UUID</label> -->
                    <AutoComplete v-model="selectedCountry" size="small" :suggestions="filteredCountries"
                        @complete="search" placeholder="Search by UUID" />
                </div>
                <div class="col-span-1">
                    <!-- <label>Search by Prefix</label> -->
                    <AutoComplete v-model="selectedCountry" size="small" :suggestions="filteredCountries"
                        @complete="search" placeholder="Search by friendly name" />
                </div>
            </div>
            <div class="mt-6">
                <DataTable ref="dt" v-model:selection="selectedProducts" :value="products" dataKey="id"
                    :paginator="true" :rows="10" :filters="filters" :rowsPerPageOptions="[5, 10, 25, 50]"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink  RowsPerPageDropdown">

                    <Column field="code" header="UUID" sortable style="min-width: 8rem"></Column>
                    <Column field="friendlyName" header="Friendly Name" sortable style="min-width: 8rem">
                        <template #body="slotProps">
                            <Tag :value="slotProps.data.inventoryStatus"
                                :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                        </template>
                    </Column>
                    <Column field="Prefix" header="Prefix" sortable style="min-width: 8rem" class="text-medium">
                    </Column>
                    <Column field="action" header="Action" style="min-width: 8rem">
                        <template #body="slotProps">
                            <div class="relative">
                                <span>
                                    <i class="pi pi-pen-to-square" style="font-size: 1rem;"></i>
                                </span>
                                <span>
                                    <i class="pi pi-trash" style="font-size: 1rem;"></i>
                                </span>
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
    <div class="card flex justify-center">
        <Drawer v-model:visible="visibleRight" header="Create Prefix List" position="right"
            class="!w-full md:!w-80 lg:!w-[30rem]">
            <h3 class="font-bold mb-2">General Information</h3>
            <div class="flex flex-wrap justify-start gap-0">
                <label>Friendly Name</label>
                <InputText type="text" v-model="value" class="w-full mb-2" placeholder="ACME Inc. Prefixes" />
                <label>Prefixes
                </label>
                <InputText type="text" v-model="value" class="w-full mb-2" placeholder="Search for a Prefix" />
            </div>
            <template #footer>
                <div class="flex items-center gap-2">
                    <Button label="cancel" icon="pi pi-times" class="flex-auto" severity="danger"
                        variant="outlined"></Button>
                    <Button label="Create" icon="pi pi-plus" class="flex-auto" severity="success"
                        variant="outlined"></Button>
                </div>
            </template>
        </Drawer>
    </div>
</template>

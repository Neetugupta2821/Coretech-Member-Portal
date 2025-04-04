<script setup>

</script>

<template>
    <div class="mb-4">
        <div class="col-span-12 xl:col-span-12 mb-6">
            <span class="text-2xl font-bold">Threshold </span>
        </div>
    </div>
    <div v-animateonscroll="{ enterClass: 'animate-fadein', leaveClass: 'animate-fadein' }"
        class="animate-duration-700 shadow-lg">
        <div class="card mt-8">
            <div class="col-span-12 xl:col-span-12 mb-6">
                <span class="text-xl font-bold">Active Thresholds
                </span>
            </div>
            <div class="flex justify-between col-span-12 xl:col-span-12 mb-6">
                <Button label="Create Thresholds" severity="success" />
                <div class="col-span-1">
                    <AutoComplete v-model="selectedCountry" size="small" :suggestions="filteredCountries"
                        @complete="search" placeholder="Search Prefix or UUID...." />
                </div>
            </div>
            <div class="mt-6">
                <DataTable ref="dt" v-model:selection="selectedProducts" :value="products" dataKey="id"
                    :paginator="true" :rows="10" :filters="filters" :rowsPerPageOptions="[5, 10, 25, 50]"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink  RowsPerPageDropdown">

                    <Column field="code" header="UUID" style="min-width: 8rem" sortable></Column>
                    <Column field="prefix" header="Prefix" style="min-width: 8rem" sortable>
                        <template #body="slotProps">
                            <Tag :value="slotProps.data.inventoryStatus"
                                :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                        </template>
                    </Column>
                    <Column field="service" header="Service" style="min-width: 8rem" sortable class="text-medium">
                    </Column>
                    <Column field="bandwidthMbps" header="Bandwidth - Mbps" style="min-width: 8rem" sortable>
                        <template #body="slotProps">
                            {{ formatCurrency(slotProps.data.price) }}
                        </template>
                    </Column>
                    <Column field="bandwidthKpps" header="Bandwidth - Kpps" style="min-width: 8rem" sortable>
                    </Column>
                    <Column field="action" header="Action" style="min-width: 8rem"></Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

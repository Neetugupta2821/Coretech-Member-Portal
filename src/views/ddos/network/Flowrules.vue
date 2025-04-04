<script setup>

</script>

<template>
    <div class="mb-4">
        <div class="col-span-12 xl:col-span-12 mb-6">
            <span class="text-xl font-bold">Flowrules Overview</span>
        </div>
        <div class="grid grid-cols-12 gap-8">
            <div class="col-span-12 xl:col-span-12">
                <div class="notify font-bold mb-0 bg-gray-500/10 dark:bg-gray-400/10 p-3 rounded-sm">
                    <div class="block items-center text-large text-gray-400 shadow-lg"> <i
                            class="pi pi-exclamation-circle text-gray-400"></i> &nbsp;Flowrules</div>
                    <div class="mt-2">
                        <span class="block text-large text-gray-400">
                            flowrules are applied on our DDoS analysis, which tracks incoming network traffic and acts
                            accordingly in case of anomalies. The feature makes it possible to change the behavior when
                            DDoS filters are activated by matching traffic patterns. You can use flowrules to change the
                            threshold for specific traffic types or to initiate specific actions for different traffic
                            types.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-animateonscroll="{ enterClass: 'animate-fadein', leaveClass: 'animate-fadein' }"
        class="animate-duration-700 shadow-lg">
        <div class="card mt-8 shadow-lg rounded-lg">
            <div class="col-span-12 xl:col-span-12 mb-6">
                <span class="text-xl font-bold">Flowrules
                </span>
            </div>
            <div class="flex justify-between col-span-12 xl:col-span-12 mb-6">
                <Button label="Create Flowrules" severity="success" />
                <div class="col-span-1">
                    <AutoComplete v-model="selectedCountry" size="small" :suggestions="filteredCountries"
                        @complete="search" placeholder="Search Prefix or UUID...." />
                </div>
            </div>
            <div class="mt-6">
                <DataTable ref="dt" v-model:selection="selectedProducts" :value="products" dataKey="id"
                    :paginator="true" :rows="10" :filters="filters" :rowsPerPageOptions="[5, 10, 25, 50]"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink  RowsPerPageDropdown">

                    <Column field="code" header="UUID" style="min-width: 8rem" sortable ></Column>
                    <Column field="seq" header="Seq" style="min-width: 8rem" sortable>
                        <template #body="slotProps">
                            <Tag :value="slotProps.data.inventoryStatus"
                                :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                        </template>
                    </Column>
                    <Column field="service" header="Service" style="min-width: 8rem" sortable class="text-medium">
                    </Column>
                    <Column field="ip" header="IP Method" style="min-width: 8rem">
                        <template #body="slotProps">
                            {{ formatCurrency(slotProps.data.price) }}
                        </template>
                    </Column>
                    <Column field="srcport" header="Src Port" style="min-width: 8rem">
                    </Column>
                    <Column field="dstport" header="Dst Port" style="min-width: 8rem">
                        <template #body="slotProps">
                            <Tag :value="slotProps.data.inventoryStatus"
                                :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                        </template>
                    </Column>
                    <Column field="parameters" header="Parameters" style="min-width: 8rem">
                        <template #body="slotProps">
                            <Tag :value="slotProps.data.inventoryStatus"
                                :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                        </template>
                    </Column>
                    <Column field="action" header="Action" style="min-width: 8rem"></Column>
                    <Column field="Show Details" header="Show Details" style="min-width: 8rem"></Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<template>
    <div class="mb-4">
        <div class="col-span-12 xl:col-span-12 mb-6">
            <span class="text-xl font-bold">Flexrules Overview</span>
        </div>
        <div class="grid grid-cols-12 gap-8">
            <div class="col-span-12 xl:col-span-12">
                <div class="notify font-bold mb-0 bg-gray-500/10 dark:bg-gray-400/10 p-3 rounded-sm">
                    <div class="block items-center text-large text-gray-400 shadow-lg"> <i
                            class="pi pi-exclamation-circle text-gray-400"></i> &nbsp;Flexrule</div>
                    <div class="mt-2">
                        <span class="block text-large text-gray-400">
                            flexRules are flexible rules that allow traffic to be accepted (whitelist), discarded
                            (blacklist), or to configure the functionality of network-based DDoS protection
                            (flowShield). They can be created for individual IP prefixes (IPv4 /32) or entire subnets
                            (e.g. IPv4 /24), using the longest-prefix-match principle. The rules are processed before
                            any other filter logic is hit, but apply only during active mitigation (whether dynamic or
                            permanent).
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-animateonscroll="{ enterClass: 'animate-fadein', leaveClass: 'animate-fadein' }"
        class="animate-duration-700">
        <div class="card mt-8 shadow-lg rounded-lg">
            <div class="col-span-12 xl:col-span-12 mb-6">
                <span class="text-xl font-bold">Flexrules</span>
            </div>
            <div class="flex justify-between col-span-12 xl:col-span-12 mb-6">
                <router-link :to="'/network/flexrules/create'">
                    <Button label="Create Flexrule" severity="success" />
                </router-link>

                <div class="col-span-1">
                    <AutoComplete v-model="selectedCountry" size="small" :suggestions="filteredCountries"
                        @complete="search" placeholder="Search Prefix or UUID...." />
                </div>
            </div>
            <div class="mt-6">
                <DataTable ref="dt" v-model:selection="selectedProducts" :value="products" dataKey="id"
                    :paginator="true" :rows="10" :filters="filters" :rowsPerPageOptions="[5, 10, 25, 50]"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink  RowsPerPageDropdown">

                    <Column field="code" header="UUID" style="min-width: 8rem"></Column>
                    <Column field="Seq" header="Seq" style="min-width: 8rem">
                        <template #body="slotProps">
                            <Tag :value="slotProps.data.inventoryStatus"
                                :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                        </template>
                    </Column>
                    <Column field="Source" header="Source" style="min-width: 8rem" class="text-medium">
                    </Column>
                    <Column field="Destination" header="Destination Method" style="min-width: 8rem">
                        <template #body="slotProps">
                            {{ formatCurrency(slotProps.data.price) }}
                        </template>
                    </Column>
                    <Column field="Service" header="Service" style="min-width: 8rem">
                    </Column>
                    <Column field="Match Feature" header="Match Feature" style="min-width: 8rem">
                        <template #body="slotProps">
                            <Tag :value="slotProps.data.inventoryStatus"
                                :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                        </template>
                    </Column>
                    <Column field="Action" header="Action" style="min-width: 8rem">
                        <template #body="slotProps">
                            <Tag :value="slotProps.data.inventoryStatus"
                                :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                        </template>
                    </Column>
                    <Column field="Show Details" header="Show Details" style="min-width: 8rem"></Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

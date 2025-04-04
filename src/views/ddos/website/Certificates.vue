<script setup>

</script>

<template>
    <div class="mb-4">
        <div class="col-span-12 xl:col-span-12 mb-6">
            <span class="text-3xl font-medium">flowProxy: Certificate Manager</span>
        </div>
        <div class="grid grid-cols-12 gap-8">
            <div class="col-span-12 xl:col-span-12">
                <div class="notify font-bold mb-0 bg-gray-500/10 dark:bg-gray-400/10 p-3 rounded-sm">
                    <div class="block items-center text-large text-gray-400 shadow-lg"> <i
                            class="pi pi-exclamation-circle text-gray-400"></i> &nbsp;flowProxy - L7 HTTP Protection
                    </div>
                    <div class="mt-2">
                        <span class="block text-large text-gray-400">
                            flowProxy is a cutting-edge inline HTTP client validation reverse proxy that provides robust
                            security and efficient DDoS mitigation for your website. To make proper use of flowProxy,
                            you will have to upload your SSL certificate and set up a challenge (or create your own),
                            and create a virtual host that references these details.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-animateonscroll="{ enterClass: 'animate-fadein', leaveClass: 'animate-fadein' }"
        class="animate-duration-700">
        <div class="card mt-8 shadow-lg rounded-lg">
            <div class="flex justify-between col-span-12 xl:col-span-12 mb-6">
                <span class="text-2xl font-medium">Certificate Overview </span>
                <div class="col-span-1">
                    <Button label="Upload Certificate" icon="pi pi-plus" class="flex-auto" severity="success" variant="outlined"
                        @click="visibleRight = true"></Button>
                </div>
            </div>
            <div class="grid grid-cols-4 gap-4">
                <div class="col-span-1">
                    <AutoComplete v-model="selectedCountry" size="small" :suggestions="filteredCountries"
                        @complete="search" placeholder="Search by UUID" />
                </div>
                <div class="col-span-1">
                    <AutoComplete v-model="selectedCountry" size="small" :suggestions="filteredCountries"
                        @complete="search" placeholder="Search by domain" />
                </div>
            </div>
            <div class="mt-6">
                <DataTable ref="dt" v-model:selection="selectedProducts" :value="products" dataKey="id"
                    :paginator="true" :rows="10" :filters="filters" :rowsPerPageOptions="[5, 10, 25, 50]"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink  RowsPerPageDropdown">

                    <Column field="code" header="UUID" style="min-width: 8rem" sortable></Column>
                    <Column field="Domain" header="Domain" style="min-width: 8rem" sortable>
                        <template #body="slotProps">
                            <Tag :value="slotProps.data.inventoryStatus"
                                :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                        </template>
                    </Column>
                    <Column field="Certificate" header="Certificate" style="min-width: 8rem" class="text-medium"
                        sortable>
                    </Column>
                    <Column field="PrivateKey" header="Private Key" style="min-width: 8rem" sortable>
                        <template #body="slotProps">
                            {{ formatCurrency(slotProps.data.price) }}
                        </template>
                    </Column>
                    <Column field="Validity" header="Validity" style="min-width: 8rem" sortable>
                    </Column>
                    <Column field="Action" header="Action" style="min-width: 8rem" >
                        <template #body="slotProps">
                            <Tag :value="slotProps.data.inventoryStatus"
                                :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

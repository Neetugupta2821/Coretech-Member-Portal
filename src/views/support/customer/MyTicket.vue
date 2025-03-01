<script setup>
</script>

<template>
    <div class="mb-4">
        <div class="col-span-12 xl:col-span-12 mb-6">
            <span class="text-3xl font-medium">Tickets Overview</span>
        </div>
        <div class="grid grid-cols-12 gap-8">
            <div class="col-span-12 xl:col-span-12">
                <div class="notify font-bold mb-0 bg-orange-400/10 dark:bg-orange-400/10 p-3 rounded-sm">
                    <div>
                        <span class="block text-large text-orange-400">
                            To ensure timely support for all our customers, please be aware that tickets without a
                            response from your side for 3-7 days will be automatically closed without prior notice. This
                            policy helps us manage our workload effectively. If there is an ongoing task or work being
                            done by our staff on your ticket, it will remain open until completion.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-animateonscroll="{ enterClass: 'animate-fadein', leaveClass: 'animate-fadeout' }"
        class="animate-duration-700 animate-ease-in-out">
        <div class="card mb-8">
            <DataTable ref="dt" v-model:selection="selectedProducts" :value="products" dataKey="id" :paginator="true"
                :rows="10" :filters="filters" :rowsPerPageOptions="[5, 10, 25, 50]"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink  RowsPerPageDropdown">
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0 font-medium text-xl">All Tickets
                        </h4>
                    </div>
                </template>

                <Column field="uuid" header="UUID" sortable style="min-width: 8rem"></Column>
                <Column field="customer" header="Customer" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.inventoryStatus"
                            :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                    </template>
                </Column>
                <Column field="subject" header="Subject" sortable style="min-width: 10rem" class="text-medium">
                </Column>
                <Column field="flags" header="Flags" sortable style="min-width: 6rem"></Column>
                <Column field="created" header="Created" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.inventoryStatus"
                            :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                    </template>
                </Column>
                <Column field="status" header="Status" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        {{ formatCurrency(slotProps.data.price) }}
                    </template>
                </Column>
                <Column field="action" header="Action" sortable style="min-width: 8rem"></Column>
            </DataTable>
        </div>
    </div>
</template>

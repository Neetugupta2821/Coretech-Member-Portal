<script setup>
import NotificationView from '@/components/dashboard/NotificationView.vue';
// import { ref } from "vue";

</script>
<template>
    <div class="mb-4">
        <div class="col-span-12 xl:col-span-12">
            <router-link :to="'/news'">
                <NotificationView />
            </router-link>
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
                        <h4 class="m-0 font-bold text-xl">Services
                        </h4>
                    </div>
                </template>
                <Column field="service" header="Services" sortable style="min-width: 8rem"></Column>
                <Column field="price" header="Price" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.inventoryStatus"
                            :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                    </template>
                </Column>
                <Column field="description" header="Description" sortable style="min-width: 8rem" class="text-medium">
                </Column>
                <Column field="action" header="Action" sortable style="min-width: 8rem">
                    <template #body>
                        <Button type="submit" label="Save" class="bg-orange-400/10" />
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

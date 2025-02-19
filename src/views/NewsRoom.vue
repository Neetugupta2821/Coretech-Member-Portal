<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { ProductService } from '@/service/ProductService';

onMounted(() => {
    ProductService.getProducts().then((data) => (products.value = data));
});

const dt = ref();
const products = ref();
const selectedProducts = ref();
const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const formatCurrency = (value) => {
    if (value)
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return;
};

const getStatusLabel = (status) => {
    switch (status) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warn';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
};

</script>

<template>
    <div v-animateonscroll="{ enterClass: 'animate-fadein', leaveClass: 'animate-fadeout'}"
        class="animate-duration-500 ">
        <div class="col-span-12 mb-4">
            <h1 class="m-0 font-bold text-xl">News & Announcements</h1>
        </div>
        <div class="card">
            <DataTable ref="dt" v-model:selection="selectedProducts" :value="products" dataKey="id" :paginator="true"
                :rows="10" :filters="filters" :rowsPerPageOptions="[5, 10, 25, 50]"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink  RowsPerPageDropdown">
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0 font-medium text-xl">Recent News</h4>
                    </div>
                </template>

                <Column field="code" header="UUID" sortable style="min-width: 12rem"></Column>
                <Column field="inventoryStatus" header="Type" sortable style="min-width: 12rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.inventoryStatus"
                            :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                    </template>
                </Column>
                <Column field="name" header="Title" sortable style="min-width: 12rem" class="text-medium"></Column>
                <Column field="price" header="Content" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        {{ formatCurrency(slotProps.data.price) }}
                    </template>
                </Column>
                <Column field="category" header="Crated at" sortable style="min-width: 10rem"></Column>
                <Column field="inventoryStatus" header="Status" sortable style="min-width: 12rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.inventoryStatus"
                            :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                    </template>
                </Column>
                <Column field="category" header="Action" sortable style="min-width: 10rem"></Column>
            </DataTable>
        </div>
    </div>
</template>

<style>
@keyframes change {
  0% {
    transform: scale(0) translateX(0px);
  }
  100% {
    transform: scale(2.8) translateX(40px);
  }
}
.zoom {
    animation: change 1s;
}
</style>

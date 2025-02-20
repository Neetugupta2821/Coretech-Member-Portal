<script setup>
import { ref, onMounted } from 'vue';
import { ProductService } from '@/service/ProductService';

onMounted(() => {
    ProductService.getProductsMini().then((data) => (products.value = data));
});

const products = ref();

</script>
<template>
    <div class="card">
        <DataTable :value="products" tableStyle="min-width: 50rem">
            <Column field="detail" header="DETAIL"></Column>
            <Column field="status" header="STATUS"></Column>
            <Column field="scheduledfor" header="Scheduled for"></Column>
            <Column field="scheduleduntil" header="Scheduled until"></Column>
        </DataTable>
    </div>
</template>

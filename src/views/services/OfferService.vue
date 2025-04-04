<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import NotificationView from '@/components/dashboard/NotificationView.vue';
import { baseUrl } from "@/Api/BaseUrl";
import { imageUrl } from "@/Api/ImageUrl";
import { RouterLink } from "vue-router";
const products = ref([]);
const selectedProducts = ref(null);
const isMounted = ref(false);

// Fetch API Data
const fetchData = async () => {
    try {
        const response = await axios.get(`${baseUrl}Overview/`);
        products.value = response.data.map(item => ({
            id: item.id,
            image: `${imageUrl}${item.image}`,
            service: item.name,
            monthlyprice: item.monthly_price ? `€${item.monthly_price}` : "N/A",
            yearlyprice: item.yearly_price ? `€${item.yearly_price}` : "N/A",
            content: item.content,
            description: item.description
        }));
        isMounted.value = true;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// Load data on component mount
onMounted(fetchData);
</script>

<template>
    <div class="mb-4">
        <div class="col-span-12 xl:col-span-12">
            <router-link to="/newsroom">
                <NotificationView />
            </router-link>
        </div>
    </div>

    <Transition name="slide-forward-center">
        <div v-if="isMounted" class="card mb-8 shadow-lg rounded-lg">
            <DataTable ref="dt" v-model:selection="selectedProducts" :value="products" dataKey="id" :paginator="true"
                :rows="10" :rowsPerPageOptions="[5, 10, 25, 50]"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown">
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0 font-bold text-xl">Services</h4>
                    </div>
                </template>

                <Column field="image" header="Image" style="min-width: 8rem">
                    <template #body="slotProps">
                        <img :src="slotProps.data.image" alt="Service Image" class="w-20 h-20 rounded-md" />
                    </template>
                </Column>

                <Column field="service" header="Services" sortable style="min-width: 8rem"></Column>

                <Column field="monthlyprice" header="Monthly Price" sortable style="min-width: 6rem"></Column>

                <Column field="yearlyprice" header="Yearly Price" sortable style="min-width: 6rem"></Column>

                <Column field="description" header="Description" sortable style="min-width: 6rem"></Column>

                <Column field="content" header="Content" style="min-width: 8rem">
                    <template #body="slotProps">
                        <div v-bind:innerHTML="slotProps.data.content"></div>
                    </template>
                </Column>

                <Column field="action" header="Action" style="min-width: 8rem">
                    <template #body>
                        <router-link to="/customer/newticket">
                            <Button type="submit" label="Request"
                                class="bg-orange-400/10 text-xs font-medium" />
                        </router-link>
                    </template>
                </Column>
            </DataTable>
        </div>
    </Transition>

</template>

<!-- <style>
@keyframes slide-forward-center {
    0% {
        transform: translateZ(-1400px);
        opacity: 0;
    }

    100% {
        transform: translateZ(0);
        opacity: 1;
    }
}

.slide-forward-center-enter-active {
    animation: slide-forward-center 0.4s ease-out;
}

.slide-forward-center-leave-active {
    animation: slide-forward-center 0.4s ease-out reverse;
}
</style> -->

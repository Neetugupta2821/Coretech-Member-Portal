<script setup>
import axios from 'axios';
import { baseUrl } from '@/Api/BaseUrl';
import { ref, onMounted } from 'vue';

const accessToken = localStorage.getItem('access_token');
const subnet = ref(null);
const subnetDetails = ref([]);

const fetchSubnet = async () => {
    try {
        const response = await axios.get(`${baseUrl}ip_subnets/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        if (response.data.length > 0) {
            subnet.value = response.data[0];
        }
    } catch (error) {
        console.error("Error Fetching Data:", error);
    }
};

const fetchSubnetDetails = async () => {
    try {
        const response = await axios.get(`${baseUrl}IpSubnet-subcategory/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            }
        });
        if (response.data.length > 0) {
            subnetDetails.value = response.data.map(item => ({
                uuid: item.ipsubnet.uuid,
                order_uuid: item.ipsubnet.ipsubnet_order_uuid,
                size: item.ipsubnet.network_size,
                type: item.ipsubnet.network_type,
                description: item.ipsubnet.service_description,
                emergency_support: item.ipsubnet.emergency_Support_SLA,
                contract_term: item.ipsubnet.contract_term,
                cancellation_terms: item.ipsubnet.cancellation_terms,
                renewal_terms: item.ipsubnet.renewal_terms,
                monthly_price: item.ipsubnet.recurring_net,
                one_time_price: item.ipsubnet.non_recurring_net,
                created_at: item.ipsubnet.created_at,
                updated_at: item.ipsubnet.updated_at,
                region: item.region,
                country: item.country,
                city: item.city
            }));
        }

    } catch (error) {
        console.error("Error Fetching API SubnetDetails:", error);
    }
};


onMounted(() => {
    fetchSubnet();
    fetchSubnetDetails();
});
</script>

<template>
    <div class="p-6 rounded-lg">
        <h2 v-if="subnet" class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
            {{ subnet.name }}
        </h2>
        <p v-if="subnet" class="text-sm text-gray-500 dark:text-gray-400 mb-6">
            {{ subnet.description }}
        </p>
        <p v-else class="text-gray-500 dark:text-gray-400"></p>

        <div v-if="subnetDetails.length > 0" class="space-y-4">
            <div v-for="detail in subnetDetails" :key="detail.uuid" class="card p-4 shadow-md">
                <h3 class="text-lg font-medium">/{{ detail.size }} {{ detail.type }}-Subnet<span class="text-gray-400">
                        (/{{ detail.size }} {{ detail.type }}-Subnet)</span></h3>
                <span class="text-gray-400 text-sm">{{ detail.uuid }}</span>
                <div class="flex justify-between items-center mt-2">
                    <p class="text-gray-500 dark:text-gray-400 mt-4">{{ detail.description }}</p>
                    <div class="col-span-1">
                        <!-- <router-link to="/offer/order"><Button label="Order" icon="pi pi-cart-plus" class="flex-auto"
                                severity="success" variant="outlined"
                                @click="visibleRight = true"></Button></router-link> -->
                        <Button label="Order" icon="pi pi-cart-plus" class="flex-auto" severity="success"
                            variant="outlined"></Button>
                    </div>
                </div>
                <Divider />
                <span class="block font-bold text-gray-400 text-sm p-1">
                    <i class="pi pi-exclamation-circle text-gray-400"></i> {{ detail.region }}
                </span>
                <div class="flex justify-between items-center mt-2">
                    <span
                        class="text-green-500 font-semibold bg-green-600/10 dark:bg-green-600/10 p-1 text-sm border-rounded">
                        {{ detail.monthly_price }} € per month incl. applicable taxes
                    </span>
                    <span
                        class="text-cyan-500 font-semibold bg-cyan-600/10 dark:bg-cyan-600/10 p-1 text-sm border-rounded">
                        {{ detail.one_time_price }} € one time incl. applicable taxes
                    </span>
                </div>
            </div>
        </div>

        <p v-else class="text-gray-500 dark:text-gray-400">Loading subnet details...</p>
    </div>
</template>

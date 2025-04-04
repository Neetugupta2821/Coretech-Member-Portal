<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import axios from "axios";
import { baseUrl } from "@/Api/BaseUrl";
const route = useRoute();
const serviceId = route.params.id;
const serviceDetails = ref(null);
const isLoading = ref(true);
const errorMessage = ref("");

onMounted(async () => {
    try {
        console.log("Fetching data for Service ID:", serviceId);

        const response = await axios.get(`${baseUrl}Service-Overview/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                "Content-Type": "application/json",
            },
        });
        const allServices = response.data.data;
        const matchedService = allServices.find(service => service.request_uuid === serviceId);
        if (matchedService) {
            serviceDetails.value = matchedService;
        } else {
            errorMessage.value = "Service not found!";
        }
    } catch (error) {
        console.error("Error fetching service details:", error);
        errorMessage.value = "Failed to load data!";
    } finally {
        isLoading.value = false;
    }
});
</script>

<template>
    <div class="mb-4">
        <Button label="Service Details" class="w-full" />
    </div>

    <div v-if="isLoading" class="text-center">Loading service details...</div>
    <div v-else-if="errorMessage" class="text-center text-red-500">{{ errorMessage }}</div>

    <div v-else>
        <div class="card shadow-md mb-4">
            <div class="mb-4">
                <h2 class="text-xl font-semibold flex items-center mb-3">
                    Offer: {{ serviceDetails.request_uuid }}
                </h2>
                <h3 class="text-md font-semibold flex items-center mb-3">
                    Location
                </h3>
                <div class="flex justify-between text-gray-400 mt-1">
                    <span><i class="pi pi-map mr-1"></i> Region</span>
                    <span>{{ serviceDetails.service_ip.network_type }} <i class="pi pi-question-circle ml-1"></i></span>
                </div>
                <Divider />
                <div class="flex justify-between text-gray-400 mt-1 mr-2">
                    <span><i class="pi pi-map-marker mr-1"></i> Location</span>
                    <p>
                        <img src="https://flagcdn.com/w40/de.png" class="w-5 h-4 mr-2" />
                        {{ serviceDetails.service_ip.service_description || "N/A" }}
                    </p>
                </div>
            </div>
            <div class="mb-4">
                <h3 class="text-md font-semibold flex items-center mb-3">
                    Network
                </h3>
                <div class="flex justify-between text-gray-400 mt-1">
                    <span><i class="pi pi-sort-alt-slash mr-1"></i> Size</span>
                    <p>
                        {{ serviceDetails.service_ip.network_size }}
                        <span class="bg-cyan-400 text-sm px-2 py-1 rounded text-white ml-1">
                            {{ serviceDetails.service_ip.network_size.split(" ")[2] }}
                        </span>
                    </p>
                </div>
                <Divider />
                <div class="flex justify-between mt-2">
                    <span class="text-gray-400"> <i class="pi pi-hashtag mr-1"></i> Type</span>
                    <span class="bg-green-500 text-sm px-2 py-1 rounded">
                        {{ serviceDetails.service_ip.network_type }}
                    </span>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-12 gap-8">
            <div class="card col-span-12 lg:col-span-6 xl:col-span-6 shadow-md">
                <div class="mb-4">
                    <h3 class="font-semibold text-gray-700 dark:text-gray-300 text-xl">Status</h3>
                </div>
                <!-- Contract Term -->
                <div class="flex justify-between items-center py-1">
                    <span class="text-gray-700 dark:text-gray-300">Active</span>
                    <span class="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">{{
                        serviceDetails.service_ip.contract_term }}</span>
                </div>
                <hr class="my-2 border-gray-300 dark:border-gray-700">
                <!-- Cancellation Terms -->
                <div class="flex justify-between items-center py-2">
                    <span class="text-gray-700 dark:text-gray-300">Status</span>
                    <div>
                        <span class="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">Insufficient
                            funds - 300 EUR Required</span>
                    </div>
                </div>
                <hr class="my-2 border-gray-300 dark:border-gray-700">
                <!-- Renewal Terms -->
                <div class="flex justify-between items-center py-2">
                    <span class="text-gray-700 dark:text-gray-300">Suspended</span>
                    <div>
                        <span class="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">{{
                            serviceDetails.suspended_status }}</span>
                    </div>
                </div>
            </div>
            <div class="card col-span-12 lg:col-span-6 xl:col-span-6 shadow-md">
                <div class="mb-4">
                    <h3 class="font-semibold text-gray-700 dark:text-gray-300 text-xl">Conditions</h3>
                </div>
                <div class="mb-4">
                    <h3 class="font-semibold text-gray-700 dark:text-gray-300">Emergency Support SLA</h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        {{
                            serviceDetails.service_ip.emergency_Support_SLA }}
                    </p>
                    <span
                        class="inline-block bg-gray-700 text-white text-xs font-semibold px-2 py-1 rounded-md mt-2">Not
                        included</span>
                </div>
                <hr class="my-4 border-gray-300 dark:border-gray-700">
                <!-- Contract Term -->
                <div class="flex justify-between items-center py-1">
                    <span class="text-gray-700 dark:text-gray-300">Contract Term</span>
                    <span class="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">{{
                        serviceDetails.service_ip.contract_term }}</span>
                </div>
                <hr class="my-2 border-gray-300 dark:border-gray-700">
                <!-- Cancellation Terms -->
                <div class="flex justify-between items-center py-2">
                    <span class="text-gray-700 dark:text-gray-300">Cancellation Terms</span>
                    <div>
                        <span class="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-md">{{
                            serviceDetails.service_ip.contract_term }}</span>
                        <p class="text-xs text-gray-500 dark:text-gray-400">{{
                            serviceDetails.service_ip.cancellation_terms }}</p>
                    </div>
                </div>
                <hr class="my-2 border-gray-300 dark:border-gray-700">
                <!-- Renewal Terms -->
                <div class="flex justify-between items-center py-2">
                    <span class="text-gray-700 dark:text-gray-300">Renewal Terms</span>
                    <div>
                        <span
                            class="bg-orange-400 text-white text-xs font-semibold px-2 py-1 rounded-md">Auto-renewal</span>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                            {{
                                serviceDetails.service_ip.renewal_terms }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="card shadow-md mt-5">
            <div class="flex justify-between">
                <div>
                    <Button label="Request Support" icon="pi pi-plus-circle" class="w-full" />
                </div>
                <div>
                    <Button label="Cancel Support" icon="pi pi-times-circle" class="w-full" />
                </div>
            </div>
        </div>
    </div>
</template>

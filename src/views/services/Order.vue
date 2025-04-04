<script setup>
import { ref } from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
const activeIndex = ref(0);

// Tab Data
const tabs = ref([
    { label: 'Service Details', description: 'Details about your offered service.', icon: 'pi pi-server' },
    { label: 'Additional Agreements', description: 'Terms and conditions go here.', icon: 'pi pi-file' },
    { label: 'Billing Summary', description: 'Review your billing information.', icon: 'pi pi-credit-card' },
    { label: 'Confirmation', description: 'Finalize your submission.', icon: 'pi pi-check-circle' }
]);

// Navigation Functions
const nextTab = () => {
    if (activeIndex.value < tabs.value.length - 1) {
        activeIndex.value++;
    }
};
const previousTab = () => {
    if (activeIndex.value > 0) {
        activeIndex.value--;
    }
};

// Service Details Data
const serviceDetails = ref({
    location: "Tornado Datacenter GmbH & Co. KG, Langen, Germany",
    size: "254 Hosts",
    type: "IPv4",
    description: "cm01.web03.example.com",
    region: "FFM1"

});

// Order Submission Function
const submitOrder = () => {
    VueSweetalert2('Order submitted successfully!');
};
</script>

<template>
    <div class="p-2">
        <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
            IP Subnet — Order Portal
        </h2>
        <p class="text-sm text-gray-400 dark:text-gray-400">54ff3681-a62f-4fb2-8c4a-8baeec3aaf60</p>
    </div>
    <div class="flex h-screen">
        <!-- Sidebar Navigation -->
        <div class="w-64 p-4 flex flex-col space-y-4">
            <div v-for="(tab, index) in tabs" :key="index" class="flex items-center p-3 rounded-lg cursor-pointer"
                :class="{ 'bg-orange-500 text-white': activeIndex === index, 'hover:bg-gray-400 hover:text-white': activeIndex !== index }"
                @click="activeIndex = index">
                <i :class="tab.icon" class="mr-2"></i>
                <span>{{ tab.label }}</span>
            </div>
        </div>

        <!-- Main Content -->
        <div class="flex-1 p-6">
            <div class="card p-6 rounded-lg shadow-lg">
                <h2 class="text-xl font-semibold mb-4">{{ tabs[activeIndex].label }}</h2>
                <p class="text-gray-400 mb-6">{{ tabs[activeIndex].description }}</p>
                <!-- Service Details (Fixed) -->
                <div v-if="activeIndex === 0" class="text-gray-200">
                    <div class="mb-4">
                        <h3 class="text-md font-semibold flex items-center mb-3">
                            Location
                        </h3>
                        <div class="flex justify-between text-gray-400 mt-1">
                            <span><i class="pi pi-map mr-1"></i> Region</span>
                            <span>
                                {{ serviceDetails.region }}<i class="pi pi-question-circle ml-1"></i></span>
                        </div>
                        <Divider />
                        <div class="flex justify-between text-gray-400 mt-1 mr-2">
                            <span><i class="pi pi-map-marker mr-1"></i> Location</span>
                            <p><img src="https://flagcdn.com/w40/de.png" class="w-5 h-4 mr-2" />
                                {{ serviceDetails.location }}</p>
                        </div>
                    </div>
                    <div class="mb-4">
                        <h3 class="text-md font-semibold flex items-center mb-3">
                            Network
                        </h3>
                        <div class="flex justify-between text-gray-400 mt-1">
                            <span><i class="pi pi-sort-alt-slash mr-1"></i> Size</span>
                            <p>{{ serviceDetails.size }}<span
                                    class="bg-cyan-400 text-sm px-2 py-1 rounded text-white ml-1">/24</span></p>
                        </div>
                        <Divider />
                        <div class="flex justify-between mt-2">
                            <span class="text-gray-400"> <i class="pi pi-hashtag mr-1"></i>Type</span>
                            <span class="bg-green-500 text-sm px-2 py-1 rounded">{{ serviceDetails.type }}</span>
                        </div>
                    </div>
                    <div>
                        <h3 class="text-md font-semibold mb-3">
                            Service Description
                        </h3>
                        <div class="p-3 rounded text-gray-400 text-sm flex items-center border">
                            <i class="pi pi-file text-gray-400"></i>
                            <input v-model="inputValue" type="text" placeholder="com01.web03.example.com"
                                class="ml-2 bg-transparent text-white outline-none" />
                        </div>
                    </div>
                </div>
                <!-- Other Tabs -->
                <div v-else-if="activeIndex === 1" class="text-gray-200">
                    <div class="mb-4">
                        <!-- <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Additional Agreements</h2>
                        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Additional Agreements for your order
                        </p> -->
                    </div>
                    <!-- Emergency Support -->
                    <div class="mb-4">
                        <h3 class="font-semibold text-gray-700 dark:text-gray-300">Emergency Support SLA</h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                            Emergency Support SLA offers 24x7x365 reachable assistance for technical urgencies.
                            The customer shall use Emergency Support only in case of technical difficulties. aurologic
                            GmbH
                            ensures a first reaction time within 30 minutes after creating an emergency flagged ticket,
                            any usage is extra billed according to the prices displayed or negotiated.
                        </p>
                        <span
                            class="inline-block bg-gray-700 text-white text-xs font-semibold px-2 py-1 rounded-md mt-2">Not
                            included</span>
                    </div>
                    <hr class="my-4 border-gray-300 dark:border-gray-700">
                    <!-- Contract Term -->
                    <div class="flex justify-between items-center py-1">
                        <span class="text-gray-700 dark:text-gray-300">Contract Term</span>
                        <span class="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">3 months</span>
                    </div>
                    <hr class="my-2 border-gray-300 dark:border-gray-700">
                    <!-- Cancellation Terms -->
                    <div class="flex justify-between items-center py-2">
                        <span class="text-gray-700 dark:text-gray-300">Cancellation Terms</span>
                        <div>
                            <span class="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-md">30 days
                                notice required</span>
                            <p class="text-xs text-gray-500 dark:text-gray-400">Before current term ends</p>
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
                                Automatically renews for 3 months unless cancelled 30 days before term ends
                            </p>
                        </div>
                    </div>

                </div>
                <div v-else-if="activeIndex === 2">
                    <p>Billing summary details...</p>
                </div>
                <div v-else>
                    <p>Final confirmation content...</p>
                </div>

                <!-- Navigation Buttons -->
                <div class="flex justify-between mt-6">
                    <Button v-if="activeIndex > 0" label="Previous" icon="pi pi-angle-left"
                        class="text-white p-2 px-4 rounded-lg hover:bg-gray-700" @click="previousTab" />

                    <Button v-if="activeIndex < tabs.length - 1" label="Next" icon="pi pi-angle-right" iconPos="right"
                        class="bg-green-600 text-white p-2 px-4 rounded-lg hover:bg-green-700" @click="nextTab" />

                    <!-- Order Button (Only in Confirmation Tab) -->
                    <Button v-if="activeIndex === tabs.length - 1" label="Order with Obligation to Pay"
                        icon="pi pi-angle-right" iconPos="right"
                        class="bg-green-600 text-white p-2 px-4 rounded-lg hover:bg-green-700" @click="submitOrder" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { baseUrl } from '@/Api/BaseUrl';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const isMounted = ref(false);
const subject = ref('');
const message = ref('');
const emergency_or_handon = ref(null);
const category = ref(null);
const affectedService = ref(null);
const categories = ref([]);
const flagOptions = ref([]);
const services = ref([]);

const accessToken = localStorage.getItem('access_token');

// Fetch ticket categories from API
const categoriesList = async () => {
    try {
        const response = await axios.get(`${baseUrl}ticket-categories/`);
        categories.value = response.data.categories.map(cat => ({
            value: cat
        }));
        console.log("API Category List:", categories.value);
    } catch (error) {
        console.error("Failed to fetch Category List:", error);
    }
};

// Fetch emergency/hands-on flag options
const FlagList = async () => {
    try {
        const response = await axios.get(`${baseUrl}emergency-handon/`);
        flagOptions.value = response.data.emergency_or_handon.map(flag => ({
            value: flag
        }));
        console.log("API Flag List:", flagOptions.value);
    } catch (error) {
        console.error("Failed to Fetch Flag list:", error);
    }
};

// Submit ticket function
const submitTicket = async () => {
    try {
        const uuid = localStorage.getItem('uuid');
        const requestData = {
            aurologic_uuid: uuid,
            subject: subject.value,
            message: message.value,
        };
        if (category.value) {
            requestData.category = category.value.value;
        }
        if (emergency_or_handon.value) {
            requestData.emergency_or_handon = emergency_or_handon.value.value;
        }
        const response = await axios.post(`${baseUrl}create-ticket/`, requestData, {
            headers: { "Authorization": `Bearer ${accessToken}` }
        });
        console.log('Ticket Created:', response.data);
        toast.success("Ticket Created Successfully", { autoClose: 2000 });
        isMounted.value = true;
        // Reset form fields
        subject.value = '';
        message.value = '';
        category.value = null;
        emergency_or_handon.value = null;
        affectedService.value = null;
    } catch (error) {
        console.error('Error submitting ticket:', error.response?.data || error.message);
        toast.error("Ticket creation failed", { autoClose: 2000 });
    }
};
onMounted(() => {
    FlagList();
    categoriesList();
});
</script>


<template>
    <div class="mb-4">
        <div class="col-span-12 xl:col-span-12 mb-6">
            <span class="text-xl font-bold">Create Ticket</span>
        </div>
        <div class="grid grid-cols-12 gap-8">
            <div class="col-span-12 xl:col-span-12">
                <div class="notify font-bold mb-0 bg-orange-400/10 dark:bg-orange-400/10 p-3 rounded-sm">
                    <div>
                        <span class="block text-large text-orange-400">
                            <i class="pi pi-exclamation-circle text-orange-400"></i> &nbsp;
                            Our customer service is available from Monday to Friday between 09:00 and 18:00 CET. For
                            important requests, please create an emergency ticket - depending on the SLA, additional
                            costs may apply.
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-12 gap-8 mt-4">
            <div class="col-span-12 xl:col-span-12">
                <div class="notify font-bold mb-0 bg-cyan-600/10 dark:bg-cyan-600/10 p-3">
                    <div class="flex justify-between mb-0">
                        <div>
                            <span class="block font-bold text-cyan-500">
                                <i class="pi pi-exclamation-circle text-cyan-500"></i> &nbsp;
                                Please check our FAQ before creating a ticket. You may find the answer to your question
                                there.
                                &nbsp;
                                <router-link :to="'/customer/faq'">
                                    <i class="pi pi-arrow-right text-orange-400"></i> <span class="text-orange-400">
                                        FAQ
                                    </span>
                                </router-link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-animateonscroll="{ enterClass: 'animate-fadein' }"
        class="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 min-h-screen text-gray-300 animate-duration-700">
        <!-- Left Side - Ticket Form -->
        <div class="card lg:col-span-2 p-6 rounded-2xl shadow">
            <h2 class="text-xl font-semibold mb-4">New Ticket</h2>

            <div class="mb-4">
                <label class="block text-gray-400 mb-1">Subject</label>
                <InputText v-model="subject" placeholder="Enter a subject for your ticket"
                    class="w-full bg-gray-700 text-white" />
            </div>

            <div class="mb-4">
                <label class="block text-gray-400 mb-1">Message</label>
                <Textarea v-model="message" rows="10" class="w-full bg-gray-700 text-white p-4 rounded-md" />
            </div>

            <div class="card dark:bg-gray-800 bg-gray-200 p-4 rounded-md text-gray-400">
                <p class="align-center shadow-md mb-2"><strong>Attachments</strong> (.jpg, .png, .gif, .pdf, .pcap,
                    .txt, .json, etc.)</p>
                <p class="text-sm">File uploading is currently disabled. Please use an external file-sharing service.
                </p>
            </div>
        </div>

        <!-- Right Side - Additional Details -->
        <div class="flex flex-col gap-4">
            <div class="card p-6 rounded-2xl shadow">
                <h3 class="text-lg font-semibold mb-4">Ticket Flags</h3>
                <Dropdown v-model="category" :options="categories" optionLabel="value"
                    class="w-full bg-gray-700 text-white mb-2" placeholder="Select Category" />

                <Dropdown v-model="emergency_or_handon" :options="flagOptions" optionLabel="value"
                    class="w-full bg-gray-700 text-white mb-2" placeholder="Select Flag Type" />
            </div>

            <div class="card p-6 rounded-2xl shadow">
                <h3 class="text-lg font-semibold mb-4">Service Details</h3>
                <Dropdown v-model="affectedService" :options="services" optionLabel="label"
                    class="w-full bg-gray-700 text-white" placeholder="Select Affected Service" />
            </div>

            <div class="card p-6 rounded-2xl shadow">
                <button @click="submitTicket"
                    class="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg shadow">
                    Submit
                </button>
            </div>
        </div>
    </div>
</template>

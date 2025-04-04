<script setup>
import axios from 'axios';
import { baseUrl } from '@/Api/BaseUrl';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { onMounted, ref } from 'vue';
const route = useRoute();
import { useRoute } from 'vue-router';
const ticketData = ref(null);
const accessToken = localStorage.getItem('access_token');
const company = localStorage.getItem('company');

const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
};

console.log("Received ID:", route.params.id);
const fetchTicketData = async () => {
    try {
        console.log("Fetching from:", `${baseUrl}tickets/view/${route.params.id}/`);
        const response = await axios.get(`${baseUrl}tickets/view/${route.params.id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            }
        });
        console.log("API Response:", response.data);
        ticketData.value = response.data;

    } catch (error) {
        console.error("Fetching API TicketDetails Data:", error)
        toast.error("Failed to fetch Ticket Data");
    }
};

onMounted(() => {
    if (route.params.id) {
        fetchTicketData();
    } else {
        console.error("No ID Found in route Parameters");
    }
});

</script>

<template>
    <div class="mb-4">
        <div class="col-span-12 xl:col-span-12 mb-6">
            <span class="text-2xl font-bold">Ticket {{ ticketData?.ticket_uuid }}</span>
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
    </div>

    <div class="flex p-4 min-h-screen">
        <div class="w-1/4 ">
            <div class="card rounded-lg shadow-lg">
                <div class="text-sm bg-cyan-600/10 dark:bg-cyan-600/10 px-3 py-1 rounded-md inline-block"><span
                        class="text-cyan-500 font-bold">
                        {{ formatDate(ticketData?.created_at) }}
                    </span></div>
                <h2 class="text-xl font-bold mt-2">Ticket Title</h2>
                <div class="mt-4">
                    <p class="text-gray-400 text-sm">CATEGORY</p>
                    <span
                        class="dark:bg-gray-700 bg-gray-300 px-3 py-1 rounded text-gray-500 dark:text-gray-300 text-xs">{{
                            ticketData?.category }}</span>
                </div>
                <div class="mt-4">
                    <p class="text-gray-400 text-sm">CUSTOMER</p>
                    <div class="text-sm bg-green-600/10 dark:bg-green-600/10 px-3 py-1 rounded-md inline-block">
                        <span class="text-green-500 text-sm">{{ `${ticketData?.user?.firstname || ''}
                            ${ticketData?.user?.lastname || ''}
                            (${ticketData?.user?.aurologic_uuid || ''})` }}</span>
                    </div>
                </div>
                <div class="mt-4">
                    <p class="text-gray-400 text-sm">FLAGS</p>
                    <span
                        class="dark:bg-gray-700 bg-gray-300 px-3 py-1 rounded text-gray-500 dark:text-gray-300 text-xs">{{
                            ticketData?.emergency_or_handon }}</span>
                </div>
                <div class="mt-4">
                    <p class="text-gray-400 text-sm">STATUS</p>
                    <div class="text-sm bg-yellow-600/10 dark:bg-yellow-600/10 px-3 py-1 rounded-md inline-block">
                        <span class="text-yellow-500 text-sm">{{ ticketData?.status }}</span>
                    </div>

                </div>
            </div>
            <div class="card mt-8 rounded-lg shadow-lg">
                <button class="bg-red-400 dark:bg-red-500 w-full p-2 rounded text-white font-semibold">Close
                    Ticket</button>
            </div>
        </div>
        <!-- Main Content -->
        <div class="w-3/4 px-8 ">
            <div class="card p-4 rounded-lg shadow-lg">
                <Textarea rows="10" class="w-full bg-gray-700 text-white p-4 rounded-md"></Textarea>
                <div class="flex items-center gap-4 mt-4">
                    <label class="flex items-center gap-2">
                        <input type="checkbox" class="form-checkbox" />
                        Emergency
                    </label>
                    <label class="flex items-center gap-2">
                        <input type="checkbox" class="form-checkbox" />
                        Hands-On
                    </label>
                </div>
                <div>
                    <button class="mt-4 bg-orange-400 w-full p-2 rounded font-semibold">Submit</button>
                </div>

            </div>
            <!-- Comments Section -->
            <div class="mt-6 card p-4 rounded-lg shadow-lg">
                <div class="flex justify-between">
                    <p class="text-gray-400 font-bold">{{ `${ticketData?.user?.firstname || ''}
                        ${ticketData?.user?.lastname || ''}
                        (${ticketData?.user?.aurologic_uuid || ''})` }}</p>
                    <p class="text-sm text-gray-400">{{ formatDate(ticketData?.created_at) }}</p>
                </div>
                <p class="text-sm text-gray-400">{{ company }}</p>
                <div class="py-3">
                    <p class="mt-2 text-gray-400">{{ ticketData?.message }}</p>
                </div>
            </div>
            <!-- Comments Section -->
            <div class="mt-6 card p-4 rounded-lg shadow-lg">
                <div class="flex justify-between">
                    <p class="text-gray-400 font-bold">
                        {{ `${ticketData?.user?.firstname || ''} ${ticketData?.user?.lastname || ''}
                        (${ticketData?.user?.aurologic_uuid || ''})` }}
                    </p>
                    <p class="text-sm text-gray-400">{{ formatDate(ticketData?.created_at) }}</p>
                </div>
                <p class="text-sm text-gray-400">{{ company }}</p>
                <div class="py-3">
                    <p class="mt-2 text-gray-400">{{ ticketData?.reply_message || 'null' }}</p>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
.ck.ck-editor__main {
    background: black;
    color: white;
    min-height: 150px;
}
</style>

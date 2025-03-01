<script setup>
import { ref } from 'vue';
const subject = ref('');
const message = ref('');
const category = ref(null);
const affectedService = ref(null);
const flags = ref([]);

const categories = [
    { label: 'General Inquiries', value: 'general' },
    { label: 'Technical Support', value: 'technical' },
];

const services = [
    { label: 'Service A', value: 'serviceA' },
    { label: 'Service B', value: 'serviceB' },
];

const submitTicket = () => {
    console.log({
        subject: subject.value,
        message: message.value,
        category: category.value,
        affectedService: affectedService.value,
        flags: flags.value,
    });
};
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
                            <i class="pi pi-exclamation-circle text-orange-400 "></i> &nbsp;
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
                            <span class="block font-bold text-cyan-500 ">
                                <i class="pi pi-exclamation-circle text-cyan-500 "></i> &nbsp;
                                Please check our FAQ before creating a ticket. You may find the answer to your question
                                there.
                                &nbsp;
                                <router-link :to="'/customer/faq'">
                                    <i class="pi pi-arrow-right text-orange-400 "></i> <span class="text-orange-400">
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

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 min-h-screen text-gray-300">
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
                <Textarea v-model="message" rows="6" class="w-full bg-gray-700 text-white p-4 rounded-md" />
            </div>

            <div class="card dark:bg-gray-700 bg-gray-100  p-4 rounded-md text-gray-400">
                <p><strong>Attachments</strong> (.jpg, .png, .gif, .pdf, .pcap, .txt, .json, etc.)</p>
                <p class="text-sm">File uploading is currently disabled. Please use an external file-sharing service.
                </p>
            </div>
        </div>

        <!-- Right Side - Additional Details -->
        <div class="flex flex-col gap-4">
            <div class="card p-6 rounded-2xl shadow">
                <h3 class="text-lg font-semibold mb-4">Ticket Flags</h3>
                <Dropdown v-model="category" :options="categories" optionLabel="label"
                    class="w-full bg-gray-700 text-white mb-2" placeholder="Select Category" />
                <div class="flex items-center space-x-2">
                    <Checkbox v-model="flags" inputId="handsOn" value="hands-on" />
                    <label for="handsOn" class="text-gray-400">Hands-On</label>
                </div>
                <div class="flex items-center space-x-2">
                    <Checkbox v-model="flags" inputId="emergency" value="emergency" />
                    <label for="emergency" class="text-gray-400">Emergency</label>
                </div>
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

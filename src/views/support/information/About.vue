<script setup>
import NotificationView from '@/components/dashboard/NotificationView.vue';
import { ref, onMounted } from "vue";
import axios from 'axios';
import { baseUrl } from '@/Api/BaseUrl';

const accessToken = localStorage.getItem('access_token');
const AboutApplication = ref(null)
const AboutProudly = ref(null)
const AboutLegal = ref(null)

const fetchAboutApplication = async () => {
    try {
        const response = await axios.get(`${baseUrl}About-application/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            }
        });
        // console.log("API Response:", response.data);
        AboutApplication.value = response.data[0]
    } catch (error) {
        console.error("Error Fetching Data:", error)
    }
};

const fetchAboutProudly = async () => {
    try {
        const response = await axios.get(`${baseUrl}Proudly-Built/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            }
        });
        // console.log("API Proudly Response:", response.data);
        AboutProudly.value = response.data[0];
    } catch (error) {
        console.error("Error Proudly Fetching Data:", error)
    }
}

const fetchAboutLegal = async () => {
    try {
        const response = await axios.get(`${baseUrl}Legal-Info/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            }
        });
        console.log("API Legal Response:", response.data[0])
        AboutLegal.value = response.data[0];
    } catch (error) {
        console.error("Error Legal Fetching API Data:", error)
    }
}

onMounted(() => {
    fetchAboutApplication();
    fetchAboutProudly();
    fetchAboutLegal();
});

</script>

<template>
    <div class="mb-4">
        <div class="col-span-12 xl:col-span-12 mb-6">
            <span class="text-xl">About</span>
        </div>
        <div class="col-span-12 xl:col-span-12">
            <NotificationView />
        </div>
    </div>
    <div v-animateonscroll="{ enterClass: 'animate-fadein', leaveClass: 'animate-fadeout' }"
        class="grid grid-cols-12 gap-8 animate-duration-500 animate-ease-in-out">
        <!-- About this Application Section -->
        <div class="col-span-12 lg:col-span-6 xl:col-span-4">
            <div class="card mb-0 shadow-lg rounded-lg">
                <div>
                    <span class="text-xl mb-6">{{ AboutApplication?.about_heading || 'N/A' }}</span>
                    <p class="mt-4 text-muted-color">
                        {{ AboutApplication?.about_descriptions || 'N/A' }}
                    </p>
                    <ul class="listitem mt-4 mb-4 break-words">
                        <li class="text-muted-color">
                            <span class="font-bold text-gray-500">Version: </span>
                            {{ AboutApplication?.version || 'N/A' }}
                        </li>
                        <Divider />
                        <li class="text-muted-color">
                            <span class="font-bold text-gray-500">Environment: </span>
                            {{ AboutApplication?.environment || 'N/A' }}
                        </li>
                        <Divider />
                        <li class="text-muted-color">
                            <span class="font-bold text-gray-500">Branch: </span>
                            {{ AboutApplication?.branch || 'N/A' }}
                        </li>
                        <Divider />
                        <li class="text-muted-color">
                            <span class="font-bold text-gray-500 ">Commit Hash: </span>
                            {{ AboutApplication?.commit_hash || 'N/A' }}
                        </li>
                        <Divider />
                        <li class="text-muted-color">
                            <span class="font-bold text-gray-500">Updated At: </span>
                            {{ AboutApplication?.updated_at || 'N/A' }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-4">
            <div class="card mb-0 shadow-lg rounded-lg">
                <div>
                    <span class="text-xl mb-6">{{ AboutProudly?.heading }}</span>
                    <p>
                    <ul class="listitem mt-4 mb-4">
                        <!-- hover:bg-slate-700 -->
                        <li class="text-muted-color ">
                            <span class="font-medium dark:text-gray-400 text-red-400">{{ AboutProudly?.vue }} </span>
                        </li>
                        <Divider />
                        <li class="text-muted-color">
                            <span class="font-medium dark:text-gray-400 text-red-400">{{ AboutProudly?.casl }} </span>
                        </li>
                        <Divider />
                        <li class="text-muted-color">
                            <span class="font-medium dark:text-gray-400 text-red-400">{{ AboutProudly?.sentry }} </span>
                        </li>
                        <Divider />
                        <li class="text-muted-color"><span class="font-medium dark:text-gray-400 text-red-400">{{
                            AboutProudly?.jwt }} </span>
                        </li>
                    </ul>
                    </p>
                </div>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-4">
            <div class="card mb-0 shadow-lg rounded-lg">
                <div>
                    <span class="text-xl mb-6">{{ AboutLegal?.heading }}</span>
                    <p>
                    <ul class="listitem mt-4 mb-4">
                        <li class="text-muted-color">
                            <span class="font-bold text-gray-500">Brand: </span>{{ AboutLegal?.brand }}
                        </li>
                        <Divider />
                        <li class="text-muted-color">
                            <span class="font-bold text-gray-500">Company: </span>{{ AboutLegal?.company_name }}
                        </li>
                        <Divider />
                        <li class="text-muted-color">
                            <span class="font-bold text-gray-500">Represented by: </span>{{ AboutLegal?.representative
                            }}
                        </li>
                        <Divider />
                        <li class="text-muted-color">
                            <span class="font-bold text-gray-500">VAT ID: </span>{{ AboutLegal?.vat_id }}
                        </li>
                        <Divider />
                        <li class="text-muted-color">
                            <span class="font-bold text-gray-500">Address: </span>{{ AboutLegal?.address }}
                        </li>
                        <Divider />
                        <li class="text-muted-color">
                            <span class="font-bold text-gray-500">Phone: </span>{{ AboutLegal?.phone }}
                        </li>
                        <Divider />
                        <li class="text-muted-color">
                            <span class="font-bold text-gray-500"> Email: </span><span class="text-red-400 cursor-pointer">{{
                                AboutLegal?.email }}</span>
                        </li>
                        <Divider />
                        <li class="text-muted-color">
                            <span class="font-bold text-gray-500"> Website: </span><span class="text-red-400 cursor-pointer">{{
                                AboutLegal?.website }}</span>
                        </li>
                        <Divider />
                        <li class="text-muted-color">
                            <span class="font-bold text-gray-500"> Terms of Service:
                            </span><span class="text-red-400 cursor-pointer">{{ AboutLegal?.terms_of_service_url }}</span>
                        </li>
                        <Divider />
                        <li class="text-muted-color">
                            <span class="font-bold text-gray-500"> Privacy Policy:
                            </span><span class="text-red-400 cursor-pointer">{{ AboutLegal?.privacy_policy_url }}</span>
                        </li>
                    </ul>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<style></style>

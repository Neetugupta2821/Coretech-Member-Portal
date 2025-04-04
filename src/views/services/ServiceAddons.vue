<script>
import axios from "axios";
import { baseUrl } from "@/Api/BaseUrl";
import IpSubnet from "@/views/services/IpSubnet.vue";
import General from "@/views/services/General.vue";
import DedicatedServers from "@/views/services/Dedicated.vue";
import Colocation from "@/views/services/Colocation.vue";
import CloudServers from "@/views/services/CloudServers.vue";

export default {
    data() {
        return {
            activeTab: "ip-subnet",
            tabs: [
                { name: "ip-subnet", label: "IP-Subnet", icon: "pi pi-folder", component: IpSubnet },
                { name: "general", label: "General", icon: "pi pi-folder", component: General },
                { name: "dedicated-servers", label: "Dedicated Servers", icon: "pi pi-folder", component: DedicatedServers },
                { name: "colocation", label: "Colocation", icon: "pi pi-folder", component: Colocation },
                { name: "cloud-servers", label: "Cloud Servers", icon: "pi pi-folder", component: CloudServers },
            ],
            news: {},
        };
    },
    computed: {
        currentComponent() {
            return this.tabs.find((tab) => tab.name === this.activeTab)?.component || IpSubnet;
        },
    },
    methods: {
        async fetchService() {
            const accessToken = localStorage.getItem("access_token");
            try {
                const response = await axios.get(`${baseUrl}Addon-Service/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                });
                if (response.data.length > 0) {
                    this.news = response.data[0];
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },
    },
    mounted() {
        this.fetchService();
    },
};
</script>

<template>
    <div class="p-2">
        <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
            {{ news.heading }}
        </h2>
        <p class="text-sm text-gray-400 dark:text-gray-400" v-html="news.description"></p>

        <div class="flex h-screen">
            <!-- Sidebar -->
            <div class="w-64 p-4 mt-4">
                <ul>
                    <li v-for="tab in tabs" :key="tab.name" @click="activeTab = tab.name"
                        class="flex items-center gap-2 p-3 cursor-pointer rounded-lg transition-all"
                        :class="activeTab === tab.name ? 'bg-[#ee9537] text-white font-bold' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 font-medium'">
                        <i :class="tab.icon"></i>
                        <span>{{ tab.label }}</span>
                    </li>
                </ul>
            </div>

            <!-- Main Content -->
            <div class="flex-1 p-4">
                <component :is="currentComponent"></component>
            </div>
        </div>
    </div>
</template>

<style scoped></style>

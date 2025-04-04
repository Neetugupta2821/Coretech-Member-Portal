<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { baseUrl } from "@/Api/BaseUrl";
import { useToast } from 'primevue/usetoast';
const accessToken = localStorage.getItem(`access_token`);
const router = useRouter();
const services = ref([]);
const totalServices = ref(0);
const selectedService = ref(null);
const editDialog = ref(false);
const newDescription = ref("");
const toast = useToast();

//Fetch API Data
const fetchServices = async () => {
    try {
        const response = await axios.get(`${baseUrl}Service-Overview/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });
        totalServices.value = response.data["Total Service"];
        services.value = response.data.data.map((service) => ({
            request_uuid: service.request_uuid,
            user:service.user,
            payment_status: service.payment_status,
            order_status: service.order_status,
            activated_status: service.activated_status,
            suspended_status: service.suspended_status,
            net_service_price: service.net_service_price ? `€${service.net_service_price}` : "N/A",
            minimum_term: service.minimum_term ? `${service.minimum_term} months` : "None",
            is_active: service.is_active ? "Yes" : "No",
            // network_type: service.service_ip.network_type,
            created_at: new Date(service.created_at).toLocaleDateString(),
            description: "",
        }));
    } catch (error) {
        console.error("Error fetching services:", error);
    }
};

const navigateToView = (request_uuid) => {
    console.log("Navigating to:", request_uuid);
    if (request_uuid) {
        router.push({
            name: "overview_view",
            params: { id: request_uuid }
        });
    } else {
        console.error("Invalid Request UUID");
    }
};

const navigationToRequest = (request_uuid) => {
    console.log("Navigating to:", request_uuid);
    if (request_uuid) {
        router.push({
            name: "request",
            params: { id: request_uuid }
        });
    } else {
        console.error("Invalid Support UUID");
    }
}

const navigationToCancel = (request_uuid) => {
    console.log("Navigating to:", request_uuid);
    if (request_uuid) {
        router.push({
            name: "cancel",
            params: { id: request_uuid }
        });
    } else {
        console.error("Invalid Cancel UUID");
    }
}

const openEditDialog = (service) => {
    selectedService.value = service;
    newDescription.value = service.description;
    editDialog.value = true;
};

const saveDescription = () => {
    if (selectedService.value) {
        selectedService.value.description = newDescription.value;
    }
    editDialog.value = false;
};

const dropdownOptions = ref([
    { label: 'View Details', icon: 'pi pi-eye' },
    { label: 'Request Support', icon: 'pi pi-exclamation-circle' },
    { label: 'Cancellation Request', icon: 'pi pi-times-circle' }
]);
const handleDropdownChange = (event, service) => {
    const selectedOption = event.value;
    if (!selectedOption) return;
    if (selectedOption.label === "View Details") {
        navigateToView(service.request_uuid);
    } else if (selectedOption.label === "Request Support") {
        navigationToRequest(service.request_uuid);
    } else if (selectedOption.label === "Cancellation Request") {
        navigationToCancel(service.request_uuid);
    }
};

onMounted(() => {
    fetchServices();
});

const copyToClipboard = async (uuid) => {
    if (navigator.clipboard?.writeText) {
        try {
            await navigator.clipboard.writeText(uuid);
            toast.add({ severity: 'success', summary: 'Text Copied!', detail: uuid, life: 1000 });
            return;
        } catch (error) {
            console.error("Failed to copy using Clipboard API:", error);
        }
    }
    const textarea = document.createElement("textarea");
    textarea.value = uuid;
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand("copy");
        toast.add({ severity: 'success', summary: 'Text Copied!', detail: uuid, life: 1000 });
    } catch (error) {
        console.error("Fallback copy failed:", error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to copy UUID', life: 2000 });
    }
    document.body.removeChild(textarea);
};

</script>

<template>
    <div class="mb-4">
        <div class="col-span-12 xl:col-span-12">
            <router-link :to="'/newsroom'">
                <NotificationView />
            </router-link>
        </div>
    </div>
    <div class="card mb-8 shadow-lg rounded-lg">
        <div class="mb-4">
            <div class="col-span-12 xl:col-span-12 mb-6">
                <p class="text-xl font-bold">Services Overview <span
                        class="text-sm bg-gray-400 dark:bg-gray-600 text-white mx-1 p-1.5 rounded-xl  ">
                        {{ totalServices }} Total Services
                    </span></p>
            </div>
        </div>
        <div class="grid grid-cols-12 gap-8 mb-4">
            <div class="col-span-12 lg:col-span-4 w-full">
                <InputText v-model="selectedCountry" size="small" :suggestions="filteredCountries" @complete="search"
                    placeholder="Search by Description" class="w-full" />
            </div>
            <div class="col-span-12 lg:col-span-4">
                <InputText v-model="selectedCountry" size="small" :suggestions="filteredCountries" @complete="search"
                    placeholder="Search by Contract" class="w-full" />
            </div>
            <div class="col-span-12 lg:col-span-4">
                <Select v-model="selectedCity" size="small" :options="cities" optionLabel="name" placeholder="Type All"
                    class="w-full" />
            </div>
        </div>
        <DataTable :value="services" dataKey="request_uuid" :paginator="true" :rows="10" :filters="filters"
            :rowsPerPageOptions="[5, 10, 25, 50]"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown">
            <Column field="request_uuid" header="Contract ID" sortable>
                <template #body="slotProps">
                    <div class="flex items-center gap-2">
                        <p class="font-mono text-md">{{ slotProps.data.request_uuid.substring(0, 8) }}</p>
                        <i class="pi pi-clipboard cursor-pointer text-cyan-500"
                            @click="copyToClipboard(slotProps.data.request_uuid)">
                        </i>
                    </div>
                </template>
            </Column>
            <Column field="network_type" header="Type" sortable></Column>
            <!-- Description Column with Edit Icon -->
            <Column field="description" header="Description" sortable>
                <template #body="slotProps">
                    <div class="flex items-center space-x-2">
                        <Button icon="pi pi-pen-to-square" class="p-button-text p-button-sm text-blue-500"
                            @click="openEditDialog(slotProps.data)" />
                    </div>
                </template>
            </Column>
            <!-- Active Status with Tag Color -->
            <Column field="is_active" header="Active" sortable>
                <template #body="slotProps">
                    <Tag :value="slotProps.data.is_active"
                        :severity="slotProps.data.is_active === 'Yes' ? 'success' : 'warning'" />
                </template>
            </Column>
            <Column field="minimum_term" header="Minimum Term" sortable></Column>
            <Column field="net_service_price" header="Pricing" sortable></Column>
            <Column field="activated_status" header="Activated" sortable>
                <template #body="slotProps">
                    <Tag :value="slotProps.data.activated_status"
                        :severity="slotProps.data.activated_status === 'yes' ? 'success' : 'warning'" />
                </template>
            </Column>
            <!-- Action Column with Dropdown -->
            <Column header="Action" style="min-width: 10rem">
                <template #body="slotProps">
                    <Dropdown :options="dropdownOptions" optionLabel="label" placeholder="Actions"
                        class="w-full bg-orange-400" @change="(event) => handleDropdownChange(event, slotProps.data)">
                        <!-- Customizing dropdown options -->
                        <template #option="optionProps">
                            <div class="flex items-center gap-2">
                                <i :class="optionProps.option.icon"></i> <!-- Icon -->
                                <span>{{ optionProps.option.label }}</span> <!-- Text -->
                            </div>
                        </template>
                    </Dropdown>
                </template>
            </Column>

        </DataTable>
    </div>
    <!-- Edit Description Dialog -->
    <Dialog v-model:visible="editDialog" header="Edit Service Description" :modal="true" :style="{ width: '30rem' }">
        <div class="p-4">
            <label class="block text-sm font-bold mb-2"> Description</label>
            <InputText v-model="newDescription" class="w-full p-2 border rounded-md" placeholder="Enter Description" />
            <div class="flex justify-end mt-4">
                <Button label="Cancel" icon="pi pi-times" severity="danger" variant="outlined"
                    @click="editDialog = false" class="mr-2" />
                <Button label="Save" icon="pi pi-check" severity="success" variant="outlined"
                    @click="saveDescription" />
            </div>
        </div>
    </Dialog>
</template>

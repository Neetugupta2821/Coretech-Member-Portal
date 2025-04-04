<script setup>
import NotificationView from '@/components/dashboard/NotificationView.vue';
import { ref, onMounted } from "vue";
import axios from 'axios';
import { baseUrl } from '@/Api/BaseUrl';
import { imageUrl } from '@/Api/ImageUrl';
import { useToast } from 'primevue/usetoast';
const accessToken = localStorage.getItem('access_token');
const Unpaid = ref([]);
const Paid = ref([]);
const selectedUnpaid = ref([]);
const selectedPaid = ref([]);
const filters = ref({});
const toast = useToast();
// const isDownloading = ref(false);

const fetchUnpaidInvoices = async () => {
    try {
        const response = await axios.get(`${baseUrl}Unpaid-Invoice/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            }
        });
        if (response.data.success) {
            Unpaid.value = response.data["UnPaid Invoice"].map(invoice => ({
                code: invoice.uuid,
                inventoryStatus: invoice.invoice_number,
                name: invoice.amount_net,
                price: invoice.amount_gross,
                category: invoice.invoice_date,
                dueStatus: invoice.due_date,
                paidStatus: invoice.paid_date || "n/a",
                action: "View Details"
            }));
            localStorage.setItem(["total UnPaid Invoice"], response.data["total UnPaid Invoice"]);
        }
    } catch (error) {
        console.error("Error fetching unpaid invoices:", error);
    }
};

const fetchPaidInvoice = async () => {
    try {
        const response = await axios.get(`${baseUrl}Paid-Invoice/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        if (response.data.Success === "True") {
            Paid.value = response.data["Paid Invoice"].map(paidInvoice => ({
                code: paidInvoice.uuid,
                inventoryStatus: paidInvoice.invoice_number,
                amount_net: paidInvoice.amount_net,
                amount_gross: paidInvoice.amount_gross,
                invoice_date: paidInvoice.invoice_date,
                due_date: paidInvoice.due_date,
                paid_date: paidInvoice.paid_date || "n/a",
                action: "View"
            }));
            console.log("Mapped Paid Data:", Paid.value);
        }
    } catch (error) {
        console.error("Error fetching paid invoices:", error);
    }
};


const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(value);
};

const downloadInvoice = (uuid) => {
    const url = `${imageUrl}/invoicepdf/${uuid}`;
    window.open(url, "_blank");
};

// const getStatusLabel = (status) => {
//     return status ? "success" : "danger";
// };

onMounted(() => {
    fetchUnpaidInvoices();
    fetchPaidInvoice();
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
        <div class="col-span-12 xl:col-span-12 mb-6">
            <span class="text-xl font-bold">Account Billing</span>
        </div>
        <div class="col-span-12 xl:col-span-12">
            <router-link :to="'/newsroom'">
                <NotificationView />
            </router-link>
        </div>
    </div>

    <div>
        <div class="card mb-8 shadow-lg rounded-lg">
            <Tabs value="0">
                <TabList>
                    <Tab value="0" as="div" class="flex items-center gap-2">
                        <i class="pi pi-user"></i>
                        <span class="font-bold whitespace-nowrap">Invoices</span>
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="0" as="p" class="m-0">
                        <div class="grid grid-cols-12 gap-8">
                            <div class="col-span-12 xl:col-span-2">
                                <div class="mt-5">
                                    <label class="text-sm">Invoice ID</label>
                                    <InputText v-model="selectedCountry" size="small" :suggestions="filteredCountries"
                                        @complete="search" class="w-full" />
                                </div>
                            </div>
                            <div class="col-span-12 xl:col-span-2">
                                <div class="mt-5">
                                    <label class="text-sm">Transaction UUID</label>
                                    <InputText v-model="selectedCountry" size="small" :suggestions="filteredCountries"
                                        @complete="search" class="w-full" />
                                </div>
                            </div>
                            <div class="col-span-12 xl:col-span-2">
                                <div class="mt-5">
                                    <label class="text-sm">Invoice Entity: Service</label>
                                    <Select v-model="selectedCity" size="small" :options="cities" optionLabel="name"
                                        placeholder="Select a Service" class="w-full" />
                                </div>
                            </div>
                            <div class="col-span-12 xl:col-span-2">
                                <div class="mt-5">
                                    <label class="text-sm">Invoice Range: Start</label>
                                    <DatePicker v-model="dates" size="small" selectionMode="range" :manualInput="false"
                                        class="w-full" />
                                </div>
                            </div>
                            <div class="col-span-12 xl:col-span-2">
                                <div class="mt-5">
                                    <label class="text-sm">Invoice Range: End</label>
                                    <DatePicker v-model="dates" selectionMode="range" size="small" :manualInput="false"
                                        class="w-full" />
                                </div>
                            </div>
                            <div class="xl:col-span-2">
                                <div class="mt-5">
                                    <label class="text-sm">Refresh</label>
                                    <div>
                                        <Button icon="pi pi-refresh" square raised class="w-32 h-8 p-0 text-lg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>

        <div class="card mb-8 shadow-lg rounded-lg">
            <DataTable ref="dt" v-model:selection="selectedUnpaid" :value="Unpaid" dataKey="code" :paginator="true"
                :rows="10" :filters="filters" :rowsPerPageOptions="[5, 10, 25, 50]"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown">
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="mb-2 font-bold text-xl">Preliminary / Proforma Invoices</h4>
                        <p class="text-muted mb-4">
                            Proforma invoices are provisional statements that are reissued on an ongoing basis to
                            reflect
                            possible changes to service terms and new orders and to give you a position preview of the
                            end-of-month invoice.
                        </p>
                    </div>
                </template>

                <Column field="code" header="UUID" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        <div class="flex items-center gap-2">
                            <p class="font-mono text-md">{{ slotProps.data.code.substring(0, 8) }}</p>
                            <i class="pi pi-clipboard cursor-pointer text-cyan-500"
                                @click="copyToClipboard(slotProps.data.code)">
                            </i>
                        </div>
                    </template>
                </Column>
                <Column field="inventoryStatus" header="Invoice#" sortable style="min-width: 8rem"></Column>
                <Column field="name" header="Amount(Net)" sortable style="min-width: 8rem" class="text-medium"></Column>
                <Column field="price" header="Amount(Gross)" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        {{ formatCurrency(slotProps.data.price) }}
                    </template>
                </Column>
                <Column field="category" header="Invoice Date" sortable style="min-width: 10rem"></Column>
                <Column field="dueStatus" header="Due Date" sortable style="min-width: 8rem"></Column>
                <Column field="paidStatus" header="Paid Date" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.paidStatus"
                            :severity="slotProps.data.paidStatus === 'n/a' ? 'danger' : 'success'" />
                    </template>
                </Column>
                <Column field="action" header="Action" style="min-width: 6rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-download" class="p-button-sm" />
                        <!-- @click="downloadInvoice(slotProps.data.code)" -->
                    </template>
                </Column>
            </DataTable>
        </div>

        <!-- <div class="card mb-8 shadow-lg rounded-lg">
            <DataTable ref="dt" v-model:selection="selectedPaid" :value="Paid" dataKey="code" :paginator="true"
                :rows="10" :filters="filters" :rowsPerPageOptions="[5, 10, 25, 50]"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink  RowsPerPageDropdown">
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0 font-bold text-xl">Invoices
                        </h4>
                    </div>
                </template>

                <Column field="code" header="UUID" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        <div class="flex items-center gap-2">
                            <P class="font-mono text-md">{{ slotProps.data.code.substring(0, 8) }}</P>
                            <i class="pi pi-clipboard cursor-pointer text-cyan-500"
                                @click="copyToClipboard(slotProps.data.code)">
                            </i>
                        </div>
                    </template>
                </Column>
                <Column field="inventoryStatus" header="Invoice#" sortable style="min-width: 8rem">
                </Column>
                <Column field="amount_net" header="Amount(Net)" sortable style="min-width: 8rem" class="text-medium">
                </Column>
                <Column field="amount_gross" header="Amount(Gross)" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        {{ formatCurrency(slotProps.data.amount_gross) }}
                    </template>
                </Column>
                <Column field="invoice_date" header="Invoice Date" sortable style="min-width: 10rem"></Column>
                <Column field="due_date" header="Due Date" sortable style="min-width: 8rem">
                </Column>
                <Column field="paid_date" header="Paid Date" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.paid_date"
                            :severity="slotProps.data.paid_date === 'n/a' ? 'danger' : 'success'" />
                    </template>
                </Column>
                <Column field="action" header="Action" style="min-width: 8rem">
                    <template #body="slotProps">
                        <Button label="View" icon="pi pi-eye" class="p-button-sm" />
                    </template>
                </Column>
            </DataTable>
        </div> -->

        <div class="card mb-8 shadow-lg rounded-lg">
            <DataTable ref="dt" v-model:selection="selectedPaid" :value="Paid" dataKey="code" :paginator="true"
                :rows="10" :filters="filters" :rowsPerPageOptions="[5, 10, 25, 50]"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown">
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="mb-4 font-bold text-xl">Invoices</h4>
                    </div>
                </template>

                <Column field="code" header="UUID" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        <div class="flex items-center gap-2">
                            <p class="font-mono text-md">{{ slotProps.data.code.substring(0, 8) }}</p>
                            <i class="pi pi-clipboard cursor-pointer text-cyan-500"
                                @click="copyToClipboard(slotProps.data.code)">
                            </i>
                        </div>
                    </template>
                </Column>
                <Column field="inventoryStatus" header="Invoice#" sortable style="min-width: 8rem"></Column>
                <Column field="amount_net" header="Amount(Net)" sortable style="min-width: 8rem" class="text-medium">
                    <template #body="slotProps">
                        {{ formatCurrency(slotProps.data.amount_net) }}
                    </template>
                </Column>
                <Column field="amount_gross" header="Amount(Gross)" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        {{ formatCurrency(slotProps.data.amount_gross) }}
                    </template>
                </Column>
                <Column field="invoice_date" header="Invoice Date" sortable style="min-width: 10rem"></Column>
                <Column field="due_date" header="Due Date" sortable style="min-width: 8rem"></Column>
                <Column field="paid_date" header="Paid Date" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.paid_date"
                            :severity="slotProps.data.paid_date === 'n/a' ? 'danger' : 'success'" />
                    </template>
                </Column>
                <Column field="action" header="Action" style="min-width: 6rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-download" class="p-button-sm" @click="downloadInvoice(slotProps.data.code)" />
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

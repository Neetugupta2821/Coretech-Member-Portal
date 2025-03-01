<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { baseUrl } from '@/Api/BaseUrl';
const accessToken = localStorage.getItem('access_token');

const formData = ref({
    company: "",
    vatid: "",
    firstname: "",
    lastname: "",
    street: "",
    city: "",
    zipcode: "",
    country: "",
})
const fetchUserData = async () => {
    try {
        const response = await axios.get(`${baseUrl}my-account/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (response.data.length > 0) {
            formData.value = response.data[0];
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
onMounted(fetchUserData)

</script>

<template>
    <Form class="mt-4">
        <div class="grid grid-cols-12 gap-4">
            <div class="col-span-12 lg:col-span-6 xl:col-span-6">
                <div class="flex flex-col gap-1 ">
                    <label>Company</label>
                    <InputText type="text" v-model="formData.company" placeholder="Company" disabled />
                </div>
            </div>
            <div class="col-span-12 lg:col-span-6 xl:col-span-6">
                <div class="flex flex-col gap-1 ">
                    <label>VAT ID</label>
                    <InputText type="text" v-model="formData.vatid" placeholder="VAT ID" disabled />
                </div>
            </div>
            <div class="col-span-12 lg:col-span-6 xl:col-span-6">
                <div class="flex flex-col gap-1 ">
                    <label>Firstname</label>
                    <InputText type="text" v-model="formData.firstname" placeholder="Firstname" disabled />
                </div>
            </div>
            <div class="col-span-12 lg:col-span-6 xl:col-span-6">
                <div class="flex flex-col gap-1 ">
                    <label>Lastname</label>
                    <InputText type="text" v-model="formData.lastname" placeholder="Lastname" disabled />
                </div>
            </div>
            <div class="col-span-12 lg:col-span-4 xl:col-span-4">
                <div class="flex flex-col gap-1 ">
                    <label>Street</label>
                    <InputText type="text" v-model="formData.street" placeholder="Street" disabled />
                </div>
            </div>
            <div class="col-span-12 lg:col-span-4 xl:col-span-4">
                <div class="flex flex-col gap-1 ">
                    <label>ZIP Code</label>
                    <InputText type="text" v-model="formData.zipcode" placeholder="ZIP Code" disabled />
                </div>
            </div>
            <div class="col-span-12 lg:col-span-4 xl:col-span-4">
                <div class="flex flex-col gap-1 ">
                    <label>City / Location</label>
                    <InputText type="text" v-model="formData.city" placeholder="City / Location" disabled />
                </div>
            </div>
            <div class="col-span-12 lg:col-span-12 xl:col-span-12">
                <div class="flex flex-col gap-1 ">
                    <label>Country</label>
                    <InputText type="text" v-model="formData.country" placeholder="country" disabled />
                </div>
            </div>
            <div class="col-span-12 lg:col-span-12 xl:col-span-12">
                <div class="notify font-bold mb-0 bg-muted-color-400/10 dark:bg-gray-400/10">
                    <div>
                        <span class="block text-large text-muted-color">
                            <i class="pi pi-exclamation-circle"></i> &nbsp;
                            To change your customer data, please contact our <span class="text-orange-400">customer
                                service.</span>
                        </span>
                    </div>
                </div>
            </div>
            <Button type="submit" label="Save" class="bg-orange-400/10" />
            <Button type="submit" severity="secondary" label="Reset" class="outline outline-black/5" />
        </div>
    </Form>
</template>
<style scoped>
.notify {
    padding: 10px;
    border-radius: 5px;
    /* box-shadow: 3px 4px 5px rgba(245, 131, 78, 0.24); */
}
</style>

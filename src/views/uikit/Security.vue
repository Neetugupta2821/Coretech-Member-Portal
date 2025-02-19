<script setup>
import { ref } from 'vue';
</script>

<template>
    <div class="mb-4 text-xl mt-4">Security</div>
    <Button type="submit" severity="secondary" label="Reset Pasword" class="bg-orange-400/10" />
    <!-- <Form>
            <div class="grid grid-cols-12 gap-4">
                <div class="col-span-12 lg:col-span-6 xl:col-span-6">
                    <div class="flex flex-col gap-1 ">
                        <label>Company</label>
                        <InputText type="text" v-model="value" />
                    </div>
                </div>
                <div class="col-span-12 lg:col-span-6 xl:col-span-6">
                    <div class="flex flex-col gap-1 ">
                        <label>VAT ID</label>
                        <InputText type="text" v-model="value" />
                    </div>
                </div>
                <div class="col-span-12 lg:col-span-6 xl:col-span-6">
                    <div class="flex flex-col gap-1 ">
                        <label>Firstname</label>
                        <InputText type="text" v-model="value" />
                    </div>
                </div>
                <div class="col-span-12 lg:col-span-6 xl:col-span-6">
                    <div class="flex flex-col gap-1 ">
                        <label>Lastname</label>
                        <InputText type="text" v-model="value" />
                    </div>
                </div>
                <div class="col-span-12 lg:col-span-4 xl:col-span-4">
                    <div class="flex flex-col gap-1 ">
                        <label>Street</label>
                        <InputText type="text" v-model="value" />
                    </div>
                </div>
                <div class="col-span-12 lg:col-span-4 xl:col-span-4">
                    <div class="flex flex-col gap-1 ">
                        <label>ZIP Code</label>
                        <InputText type="text" v-model="value" />
                    </div>
                </div>
                <div class="col-span-12 lg:col-span-4 xl:col-span-4">
                    <div class="flex flex-col gap-1 ">
                        <label>City / Location</label>
                        <InputText type="text" v-model="value" />
                    </div>
                </div>
                <div class="col-span-12 lg:col-span-12 xl:col-span-12">
                    <div class="flex flex-col gap-1 ">
                        <label>Country</label>
                        <Select name="city" :options="cities" optionLabel="name" placeholder="Select a City" fluid />
                    </div>
                </div>
                <div class="col-span-12 lg:col-span-12 xl:col-span-12">
                    <div class="notify font-bold mb-0 bg-muted-color-400/10 dark:bg-gray-400/10">
                        <div>
                            <span class="block text-large text-muted-color">
                                <i class="pi pi-bell"></i> &nbsp;
                                To change your customer data, please contact our <span class="text-orange-400">customer
                                    service.</span>
                            </span>
                        </div>
                    </div>
                </div>
                <Button type="submit" severity="secondary" label="Save" class="bg-orange-400/10" />
                <Button type="submit" severity="secondary" label="Reset" />
            </div>
        </Form> -->
</template>
<style scoped>
.notify {
    padding: 10px;
    border-radius: 5px;
    /* box-shadow: 3px 4px 5px rgba(245, 131, 78, 0.24); */
}
</style>

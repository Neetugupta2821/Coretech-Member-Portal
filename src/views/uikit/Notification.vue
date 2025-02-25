<script setup>
import { ref } from 'vue';

const value = ref(null);
</script>

<template>
    <Form class="mt-4">
        <div class="grid grid-cols-12 gap-4">
            <div class="col-span-12 lg:col-span-12 xl:col-span-12">
                <div class="flex flex-col gap-1 ">
                    <label>Primary Address</label>
                    <InputText type="text" v-model="value" />
                </div>
            </div>
            <div class="col-span-12 lg:col-span-12 xl:col-span-12">
                <div class="flex flex-col gap-1 ">
                    <label>Abuse Notifications</label>
                    <InputText type="text" v-model="value" />
                </div>
            </div>
            <div class="col-span-12 lg:col-span-12 xl:col-span-12">
                <div class="flex flex-col gap-1 ">
                    <label>Accounting Notifications
                    </label>
                    <InputText type="text" v-model="value" />
                </div>
            </div>
            <Button type="submit" label="Save" class="bg-orange-400/10" />
            <Button type="submit" severity="secondary" label="Reset" />
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

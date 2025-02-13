<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';

const toast = useToast();
const router = useRouter();

const items = ref([
    {
        label: 'Add',
        icon: 'pi pi-pencil',
        command: () => {
            toast.add({ severity: 'info', summary: 'Add', detail: 'Data Added', life: 3000 });
        }
    },
    {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => {
            toast.add({ severity: 'success', summary: 'Update', detail: 'Data Updated', life: 3000 });
        }
    },
    {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
            toast.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
        }
    },
    {
        label: 'Upload',
        icon: 'pi pi-upload',
        command: () => {
            router.push('/fileupload');
        }
    },
    {
        label: 'Vue Website',
        icon: 'pi pi-external-link',
        command: () => {
            window.location.href = 'https://vuejs.org/'
        }
    }
])
</script>
<template>
    <div class="card">
        <div class="flex items-end justify-center" :style="{ position: 'relative', height: '400px' }">
            <SpeedDial :model="items" direction="up" :transitionDelay="80" :style="{ position: 'absolute' }"
                pt:menuitem="m-2">
                <template #button="{ toggleCallback }">
                    <Button outlined class="border" @click="toggleCallback">
                        <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="..." fill="var(--p-primary-color)" />
                            <path d="..." fill="var(--p-text-color)" />
                        </svg>
                    </Button>
                </template>
                <template #item="{ item, toggleCallback }">
                    <div class="flex flex-col items-center justify-between gap-2 p-2 border rounded border-surface-200 dark:border-surface-700 w-20 cursor-pointer"
                        @click="toggleCallback">
                        <span :class="item.icon" />
                        <span>
                            {{ item.label }}
                        </span>
                    </div>
                </template>
            </SpeedDial>
        </div>
        <Toast />
    </div>
</template>

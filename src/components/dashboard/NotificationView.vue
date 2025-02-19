<script setup>
</script>
<template>
    <div class="grid grid-cols-12 gap-8">
        <div class="col-span-12 xl:col-span-12">
            <div class="notify font-bold mb-0 bg-orange-400/10 dark:bg-orange-400/10">
                <div class="flex justify-between mb-0">
                    <div>
                        <span class="block text-large text-orange-400">
                            <i class="pi pi-bell text-orange-400 "></i> &nbsp;
                            There are 2 general, 0 maintenance, and 2 development announcements.
                        </span>
                    </div>
                    <div>
                        <span class="block text-large text-orange-400">
                            View All
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.notify {
    padding: 10px;
    border-radius: 5px;
    /* box-shadow: 3px 4px 5px rgba(245, 131, 78, 0.24); */
}
</style>

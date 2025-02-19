<script setup>
import NotificationView from '@/components/dashboard/NotificationView.vue';
import { ref } from "vue";

const selectedCity = ref();
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);
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
    <div v-animateonscroll="{ enterClass: 'animate-fadein', leaveClass: 'animate-fadeout'}" class="grid grid-cols-12 gap-8 animate-duration-500 animate-ease-in-out">
        <div class="col-span-12 lg:col-span-6 xl:col-span-4">
            <div class="card mb-0">
                <div>
                    <span class="text-xl mb-6">About this application</span>
                    <p class="mt-4 text-muted-color">
                        This application is a direct frontend for the aurologic GmbH API interface.
                    </p>
                    <p class="mt-4 text-muted-color">
                        All functions of this page can also be accessed directly via the API and thus be used on your
                        own pages.
                    </p>
                    <p class="mt-4 text-muted-color">
                        The frontend therefore tracks its own version numbering and is not directly related to API.
                    </p>
                    <p>
                    <ul class="listitem mt-4 mb-4">
                        <li class="text-muted-color hover:bg-slate-700">
                            <span class="font-bold text-white">Version: </span>6.9.8+87c0ffb
                        </li>
                        <li class="text-muted-color">
                            <span class="font-bold text-white"> Environment: </span>production
                        </li>
                        <li class="text-muted-color">
                            <span class="font-bold text-white"> Branch: </span>HEAD
                        </li>
                        <li class="text-muted-color">
                            <span class="font-bold text-white"> Commit Hash:
                            </span>87c0ffb1aee42c14f1bbe368df752d06daf48427
                        </li>
                        <li class="text-muted-color">
                            <span class="font-bold text-white"> Commit Date: </span>2025-02-13T22:11:09+01:00
                        </li>
                    </ul>
                    </p>
                </div>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-4">
            <div class="card mb-0">
                <div>
                    <span class="text-xl mb-6">Proudly built with</span>
                    <p>
                    <ul class="listitem mt-4 mb-4">
                        <!-- hover:bg-slate-700 -->
                        <li class="text-muted-color ">
                            <span class="font-bold text-white">Vue Js - </span>The Prograsive Javascript Framework
                        </li>
                        <li class="text-muted-color">
                            <span class="font-bold text-white"> CASL - </span> Isomorphic Authorization Javascript
                            library
                        </li>
                        <li class="text-muted-color">
                            <span class="font-bold text-white"> Sentry - Application Monitoring and Error Tracking
                                Software </span>HEAD
                        </li>
                        <li class="text-muted-color"> Json Web Tokens
                        </li>
                    </ul>
                    </p>
                </div>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-4">
            <div class="card mb-0">
                <div>
                    <span class="text-xl mb-6">Legal Information</span>
                    <p>
                    <ul class="listitem mt-4 mb-4">
                        <li class="text-muted-color hover:bg-slate-700">
                            <span class="font-bold text-white">Version: </span>6.9.8+87c0ffb
                        </li>
                        <li class="text-muted-color">
                            <span class="font-bold text-white"> Environment: </span>production
                        </li>
                        <li class="text-muted-color">
                            <span class="font-bold text-white"> Branch: </span>HEAD
                        </li>
                        <li class="text-muted-color">
                            <span class="font-bold text-white"> Commit Hash:
                            </span>87c0ffb1aee42c14f1bbe368df752d06daf48427
                        </li>
                        <li class="text-muted-color">
                            <span class="font-bold text-white"> Commit Date: </span>2025-02-13T22:11:09+01:00
                        </li>
                    </ul>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<style></style>

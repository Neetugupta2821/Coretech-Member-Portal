<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { baseUrl } from "@/Api/BaseUrl";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";

const categories = ref([]);
const selectedCategory = ref(null);
const activeIndex = ref(null);

const fetchFaqData = async () => {
    try {
        const response = await axios.get(`${baseUrl}faq/`);
        categories.value = response.data;
        selectedCategory.value = categories.value[0];
    } catch (error) {
        console.error("Error fetching FAQs:", error);
    }
};

const selectCategory = (category) => {
    selectedCategory.value = category;
    activeIndex.value = null;
};

onMounted(fetchFaqData);
</script>

<template>
    <div class="mb-4">
        <div class="col-span-12 xl:col-span-12 mb-6">
            <h2 class="text-2xl font-semibold mb-2">Let's answer some questions</h2>
            <p class="text-sm text-gray-400 mb-4">Choose a category to quickly find the help you need</p>
        </div>
    </div>

    <div v-animateonscroll="{ enterClass: 'animate-fadein' }"
        class="animate-duration-700 flex text-white p-6 min-h-screen">
        <!-- Sidebar -->
        <div class="w-1/4">
            <div v-for="category in categories" :key="category.uuid" @click="selectCategory(category)"
                class="cursor-pointer py-3 px-4 rounded-lg mb-2 transition-all duration-200"
                :class="selectedCategory?.category_name === category.category_name ? 'bg-orange-500 text-white font-bold' : 'text-gray-400 font-bold'">
                {{ category.category_name }}
            </div>
        </div>

        <!-- Content Area -->
        <div class="w-3/4 pl-6">
            <div class="mx-6 rounded-lg">
                <h2 class="text-2xl font-semibold"><span style="padding: 5px;"><i class="pi pi-question-circle"
                            style="color: orange; font-size: large"></i></span>{{
                                selectedCategory?.category_name }}</h2>
                <p class="text-gray-400 text-sm mb-4">{{ selectedCategory?.description }}</p>

                <!-- Accordion -->
                <Accordion v-model:activeIndex="activeIndex">
                    <AccordionTab v-for="(faq, index) in selectedCategory?.Question_Answer" :key="index"
                        :header="faq.question">
                        <p class="m-0 text-gray-300">{{ faq.answer }}</p>
                    </AccordionTab>
                </Accordion>
            </div>
        </div>
    </div>

    <div class="flex justify-center text-center mb-4">
        <div class=" col-span-12 xl:col-span-12 mb-6 justify-center">
            <h2 class="text-3xl font-semibold mb-2 items-center ">You still have a question?</h2>
            <p class="text-sm text-gray-400 mb-4">If you cannot find a question in our FAQ, you can always contact us.
                We will answer to you shortly!</p>
        </div>
    </div>

    <div class="grid grid-cols-12 gap-10">
        <div class="col-span-12 lg:col-span-6 xl:col-span-6">
            <div class="card mb-0">
                <div class="flex justify-center text-center mb-2">
                    <div class="text-center mt-6">
                        <span
                            class="text-orange-400 dark:text-orange-400 font-medium text-xl bg-orange-100 dark:bg-orange-400/10 rounded-square p-3 mt-2">
                            <i class="pi pi-at text-orange-500 !text-xl"></i>
                        </span>
                        <div class="text-orange-500 dark:text-orange-500 font-medium text-xl mt-4">info@coretechnologys.com
                        </div>
                        <span class="block text-surface-900 dark:text-surface-0 -color mb-2 text-md font-medium mt-2">We
                            are always happy to help!</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-6">
            <div class="card mb-0">
                <div class="flex justify-center text-center mb-2">
                    <div class="text-center mt-6">
                        <span
                            class="text-orange-500 dark:text-orange-500 font-medium text-xl bg-orange-100 dark:bg-orange-400/10 rounded-square p-3 mt-2">
                            <i class="pi pi-envelope text-orange-500 !text-xl"></i>
                        </span>
                        <div class="text-orange-500 dark:text-orange-500 font-medium text-xl mt-4 text-muted">Create a ticket
                        </div>
                        <span
                            class="block text-surface-900 dark:text-surface-0 -color mb-2 text-md font-medium mt-2">Best
                            way to get answer faster!</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

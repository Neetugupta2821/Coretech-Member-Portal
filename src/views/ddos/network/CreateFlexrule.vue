<script>
import { ref } from 'vue';
const value1 = ref(42723);
const value2 = ref(58151);
const value3 = ref(2351.35);
const value4 = ref(50);

</script>
<template>
    <div class="mb-4">
        <div class="col-span-12 xl:col-span-12 mb-6">
            <span class="text-3xl font-medium">Create Flexrules</span>
        </div>
    </div>

    <!-- card one component -->
    <div class="card shadow-md">
        <div class="mb-4">
            <div class="col-span-12 xl:col-span-12 mb-5">
                <span class="text-2xl font-medium">General Settings</span>
                <p class="text-sm font-medium mt-2 text-muted-color">
                    Provide details about the source of the traffic, which this flowRule should apply to.
                </p>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div class="col-span-1">
                <label for="Seq. Number" class="font-bold block text-sm mb-1"> Seq. Number </label>
                <InputNumber v-model="value1" inputId="integeronly"  fluid />
            </div>
            <div class="col-span-1">
                <label for="Destination IP Prefix" class="font-bold block text-sm mb-1"> Destination IP Prefix</label>
                <InputNumber v-model="value2" inputId="integeronly"  fluid />
            </div>
            <div class="col-span-1">
                <label for="integeronly" class="font-bold block text-sm mb-1"> Packet Length - Start </label>
                <InputNumber v-model="value3" inputId="integeronly" fluid />
            </div>
            <div class="col-span-1">
                <label for="integeronly" class="font-bold block text-sm mb-1"> Packet Length - End </label>
                <InputNumber v-model="value4" inputId="integeronly"  fluid />
            </div>
        </div>

        <div class="grid grid-cols-1 gap-0 mt-3">
            <div class="col-span-1">
                <label for="integeronly" class="font-bold block text-sm mb-1"> Packet Length - End </label>
                <Select id="state" v-model="dropdownItem" :options="dropdownItems" optionLabel="name"
                    class="w-full"></Select>
            </div>
        </div>
    </div>
    <!-- card Two component -->
    <div class="card shadow-md mt-6">
        <div class="mb-4">
            <div class="col-span-12 xl:col-span-12 mb-5">
                <span class="text-2xl font-medium">Match Settings</span>
                <p class="text-sm font-medium mt-2 text-muted-color">
                    Match to Port
                </p>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div class="col-span-1">
                <label for=" SourceStart" class="font-bold block text-sm mb-1"> Source Port - Start </label>
                <InputNumber v-model="value1" inputId="integeronly"  fluid />
            </div>
            <div class="col-span-1">
                <label for="SourceEnd" class="font-bold block text-sm mb-1"> Source Port - End</label>
                <InputNumber v-model="value2" inputId="integeronly"  fluid />
            </div>
            <div class="col-span-1">
                <label for="DestinationStart" class="font-bold block text-sm mb-1"> Destination Port - Start </label>
                <InputNumber v-model="value3" inputId="integeronly"  fluid />
            </div>
            <div class="col-span-1">
                <label for="DestinationEnd" class="font-bold block text-sm mb-1"> Destination Port - End</label>
                <InputNumber v-model="value4" inputId="integeronly"  fluid />
            </div>
        </div>
        <div class="mt-4">
            <div class="col-span-12 xl:col-span-12 mb-2">
                <p class="text-md mt-2 font-bold">
                    Match to Rate
                </p>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div class="col-span-1">
                <label for="LineRate1" class="font-bold block text-sm mb-1">Line Rate (Mbps) </label>
                <InputNumber v-model="value3" inputId="integeronly"  fluid />
            </div>
            <div class="col-span-1">
                <label for="LineRate2" class="font-bold block text-sm mb-1"> Line Rate (Kpps)</label>
                <InputNumber v-model="value4" inputId="integeronly"  fluid />
            </div>
        </div>
        <div class="grid grid-cols-1 gap-0 mt-3">
            <div class="col-span-1">
                <label for="integeronly" class="font-bold block text-sm mb-1"> Packet Length - End </label>
                <Select id="state" v-model="dropdownItem" :options="dropdownItems" optionLabel="name"
                     class="w-full"></Select>
            </div>
        </div>
    </div>

     <!-- card Three component -->
    <div class="card shadow-md mt-6">
        <div class="mb-4">
            <div class="col-span-12 xl:col-span-12 mb-5">
                <span class="text-2xl font-medium">Finalize Rule</span>
                <p class="text-sm font-medium mt-2 text-muted-color">
                    Provide the action to take, if all criteria can be matched to incoming traffic.
                </p>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div class="col-span-1">
                <label for="Threshold1" class="font-bold block text-sm mb-1"> Threshold (Mbps) - Range: 10-10000 </label>
                <InputNumber v-model="value1" inputId="integeronly"  fluid />
            </div>
            <div class="col-span-1">
                <label for="Threshold2" class="font-bold block text-sm mb-1"> Threshold (Kpps) - Range: 10-1000</label>
                <InputNumber v-model="value2" inputId="integeronly"  fluid />
            </div>
        </div>
    </div>
</template>

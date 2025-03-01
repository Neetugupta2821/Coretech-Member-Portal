<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { baseUrl } from '@/Api/BaseUrl';
import { useRouter } from 'vue-router';

const otp = ref('');
const email = ref(localStorage.getItem('email') || '');
const loading = ref(false);

const router = useRouter();

const Otpverify = async () => {
    if (!otp.value) {
        toast.error("Please enter OTP!", { autoClose: 1000 });
        return;
    }

    if (!email.value) {
        toast.error("Email not found! Please request OTP again.", { autoClose: 1000 });
        return;
    }

    try {
        loading.value = true;
        const response = await axios.post(`${baseUrl}password_reset_verify/`, {
            email: email.value,
            otp: otp.value,
        });

        if (response.data.status === "True") {
            console.log('OTP Verify successful:', response.data);
            toast.success("OTP Verified Successfully!", { autoClose: 2000 });
            localStorage.setItem('access_token', response.data.access_token || '');
            localStorage.setItem('refresh_token', response.data.refresh_token || '');
            localStorage.setItem('uuid', response.data.child.uuid || '');
            localStorage.setItem('email', response.data.child.email || '');
            localStorage.setItem('firstname', response.data.child.firstname || '');
            localStorage.setItem('lastname', response.data.child.lastname || '');
            localStorage.setItem('company', response.data.child.company || '');
            localStorage.setItem('isAuthenticated', 'true');
            router.push('/resetpassword');
        } else {
            console.error('OTP Verify Failed:', response.data);
            toast.error(response.data.message || "OTP verification failed!", { autoClose: 2000 });
        }
    } catch (error) {
        console.error('OTP Verify error:', error.response ? error.response.data : error.message);
        toast.error(error.response?.data?.detail || "Something went wrong!", { autoClose: 1000 });
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="login_bg bg-surface-50 dark:bg-surface-950 flex items-center justify-end min-h-screen min-w-[100vw]">
        <div class="flex">
            <div style="border-radius: 56px;">
                <div class="w-full min-h-screen bg-surface-0 dark:bg-surface-900 py-20 sm:px-20"
                    style="background-color: #0F172A;">
                    <div class="text-start mb-8">
                        <div class="mb-8">
                            <img src="../../../assets/images/logo.png" alt="coretechlogo" class="w-36">
                        </div>
                        <div class="text-surface-0 dark:text-surface-900 text-3xl font-medium mb-4">OTP Verification
                        </div>
                        <span class="text-muted-color font-medium">Enter the OTP sent to your email.</span>
                    </div>
                    <div class="mt-6">
                        <label for="email1"
                            class="block text-muted-color dark:text-surface-0 font-medium mb-2">Email</label>
                        <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-[22rem] mb-8"
                            v-model="email" />

                        <label class="block text-muted-color dark:text-surface-0 font-medium mb-2">OTP</label>
                        <div class="flex justify-start">
                            <InputOtp v-model="otp" integerOnly :length="6" />
                        </div>
                    </div>
                    <div class="flex mt-6 items-center justify-start">
                        <Button :disabled="loading" label="Verify OTP" class="w-full md:w-[18rem]" @click="Otpverify"
                            severity="warn">
                            <span v-if="loading">Verifying...</span>
                            <span v-else>Verify OTP</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.login_bg {
    background-image: url("/src/assets/images/aurologic_background.jpg");
    object-fit: contain;
    background-position: bottom;
    background-size: cover;
    background-repeat: no-repeat;
}
</style>

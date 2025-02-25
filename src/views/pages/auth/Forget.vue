<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useRouter } from 'vue-router';
import { baseUrl } from '@/Api/BaseUrl';

const email = ref('');
const loading = ref(false);
const router = useRouter();

const sendOtp = async () => {
    if (!email.value) {
        toast.error("Please enter your email!", { autoClose: 1000 });
        return;
    }

    try {
        loading.value = true;
        const response = await axios.post(`${baseUrl}password_reset_api/`, { email: email.value });
        if (response.data.status === "True") {
            console.log('Sent OTP', response.data);
            toast.success(response.data.message || "OTP sent successfully!", { autoClose: 1000 });
            localStorage.setItem('email', response.data.email)
            localStorage.setItem('access_token', response.data.access_token || '');
            localStorage.setItem('refresh_token', response.data.refresh_token || '');
            localStorage.setItem('child', JSON.stringify(response.data.child || {}));
            router.push('/auth/otpgenerate');
        } else {
            console.error("OTP send failed:", response.data);
            toast.error(response.data.detail || "Failed to send OTP. Please try again.", { autoClose: 1000 });
        }
    } catch (error) {
        console.error("OTP send error:", error.response ? error.response.data : error.message);
        toast.error(error.response?.data?.detail || "Something went wrong!", { autoClose: 1000 });
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div
        class="login_bg bg-surface-50 dark:bg-surface-950 flex items-center justify-end overflow-hidden min-h-screen min-w-[100vw]">
        <div class="flex items-center justify-center">
            <div style="border-radius: 56px;">
                <div class="w-full min-h-screen bg-surface-0 dark:bg-surface-900 py-20 sm:px-20 overflow-hidden items-center"
                    style="background-color: #0F172A;">
                    <div class="text-start mb-8">
                        <div class="mb-8">
                            <img src="../../../assets/images/logo.png" alt="coretechlogo" class="w-36">
                        </div>
                        <div class="text-surface-0 dark:text-surface-900 text-3xl font-medium mb-4">Forgot Password
                        </div>
                        <span class="text-muted-color font-medium">Enter your email and we'll send you instructions to
                            reset your password</span>
                    </div>
                    <div>
                        <label for="email1"
                            class="block text-muted-color dark:text-surface-0 font-medium mb-2">Email</label>
                        <InputText id="email1" type="email" placeholder="Email address" class="w-full md:w-[30rem] mb-8"
                            v-model="email" />
                    </div>
                    <div>
                        <Button :disabled="loading" label="Send OTP" class="w-full md:w-[30rem]" @click="sendOtp"
                            severity="warn">
                            <span v-if="loading">Sending...</span>
                            <span v-else>Send OTP</span>
                        </Button>
                    </div>
                    <div class="flex justify-center items-center mt-8 cursor-pointer">
                        <p class="text-orange-400">
                            <router-link to="/auth/login">Back to Login</router-link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.login_bg {
    background-image: url(/coretech/src/assets/images/aurologic_background.jpg);
    object-fit: contain;
    background-position: bottom;
    background-size: cover;
    background-repeat: no-repeat;
}

.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>

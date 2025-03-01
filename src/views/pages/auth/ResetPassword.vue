<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { baseUrl } from '@/Api/BaseUrl';
import { useRouter } from 'vue-router';

const email = ref(localStorage.getItem('email') || '');
const new_password = ref('');
const confirm_password = ref('');

const router = useRouter()
const Resetpassword = async () => {
    if (!new_password.value) {
        toast.error("Please enter newpassword!", { autoClose: 1000 });
        return;
    }

    if (!confirm_password.value) {
        toast.error("Please enter confirm password!", { autoClose: 1000 });
        return;
    }

    if (!email.value) {
        toast.error("Email not found! Please enter request password again.", { autoClose: 1000 });
        return;
    }
    try {
        const credentials = {
            email: email.value,
            new_password: new_password.value,
            confirm_password: confirm_password.value,
        };
        const response = await axios.post(`${baseUrl}password_set_new/`, credentials);
        if (response.data.status === "True") {
            console.log('Reset Password successful:', response.data);
            toast.success("User Reset Password Successful!", {
                autoClose: 2000,
            });
            // Store token in localStorage
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            localStorage.setItem('child', JSON.stringify(response.data.child));
            localStorage.setItem('uuid', response.data.child.uuid || '');
            localStorage.setItem('email', response.data.child.email || '');
            localStorage.setItem('firstname', response.data.child.firstname || '');
            localStorage.setItem('lastname', response.data.child.lastname || '');
            localStorage.setItem('company', response.data.child.company || '');
            localStorage.setItem('isAuthenticated', 'true');
            router.push('/login');
        } else {
            console.error('Reset Password failed:', response);
            toast.error("User Reset Password Failed!", {
                autoClose: 2000,
            });
        }
    } catch (error) {
        console.error('Reset Password error:', error.response ? error.response.data : error.message);
        toast.error("User Reset Password Failed!", {
            autoClose: 1000,
        });
    }
};
</script>

<template>
    <div
        class="login_bg bg-surface-50 dark:bg-surface-950 flex items-center justify-end overflow-hidden min-h-screen min-w-[100vw]">
        <div class="flex flex-col items-center justify-center">
            <div style="border-radius: 56px;">
                <div class="w-full min-h-screen bg-surface-0 dark:bg-surface-900 py-20 sm:px-20 overflow-hidden"
                    style="background-color: #0F172A;">
                    <div class="text-start mb-8">
                        <div class="mb-8">
                            <img src="../../../assets/images/logo.png" alt="coretechlogo" class="w-36">
                        </div>
                        <div class="text-surface-0 dark:text-surface-900 text-3xl font-medium mb-4">Welcome to coretech
                        </div>
                        <span class="text-muted-color font-medium">Please sign-in to manage your services</span>
                    </div>
                    <div>
                        <label for="email1"
                            class="block text-muted-color dark:text-surface-0 font-medium mb-2">Email</label>
                        <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-[22rem] mb-2"
                            v-model="email" />
                        <label for="New Password"
                            class="block text-muted-color dark:text-surface-0 font-medium mb-2 w-full md:w-[22rem] ">New
                            Password</label>
                        <Password id="new_password" v-model="new_password" placeholder="New Password" :toggleMask="true"
                            class="mb-4" fluid :feedback="false"></Password>

                        <label for="Confirm Password"
                            class="block text-muted-color dark:text-surface-0 font-medium mb-2">Confirm Password</label>
                        <Password id="confirm_password" v-model="confirm_password" placeholder="confirm Password"
                            :toggleMask="true" class="mb-4" fluid :feedback="false"></Password>
                        <Button label="Sign In" class="w-full " @click="Resetpassword" severity="warn"></Button>
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

.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { baseUrl } from '@/Api/BaseUrl';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');

const router = useRouter()
const login = async () => {
    try {
        const credentials = {
            email: email.value,
            password: password.value
        };
        const response = await axios.post(`${baseUrl}child/login/`, credentials);
        if (response.data.success) {
            console.log('Login successful:', response.data);
            toast.success("User Login Successful!", {
                autoClose: 2000,
            });
            // Store token in localStorage
            localStorage.setItem('email', response.data.email)
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            localStorage.setItem('child', JSON.stringify(response.data.child));
            localStorage.setItem('uuid', response.data.child.uuid || '');
            localStorage.setItem('email', response.data.child.email || '');
            localStorage.setItem('firstname', response.data.child.firstname || '');
            localStorage.setItem('lastname', response.data.child.lastname || '');
            localStorage.setItem('company', response.data.child.company || '');
            localStorage.setItem('isAuthenticated', 'true');
            router.push('/');
        } else {
            console.error('Login failed:', response);
            toast.error("User Login Failed!", {
                autoClose: 2000,
            });
        }
    } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message);
        toast.error("User Login Failed!", {
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
                        <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-[30rem] mb-8"
                            v-model="email" />

                        <label for="password1"
                            class="block text-muted-color dark:text-surface-0 font-medium mb-2">Password</label>
                        <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true"
                            class="mb-4" fluid :feedback="false"></Password>
                        <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                            <div class="flex items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2" severity="warn">
                                </Checkbox>
                                <label for="rememberme1 text-muted-color">Remember me</label>
                            </div>
                            <span class="font-medium no-underline ml-2 text-right cursor-pointer text-orange-400">
                                <router-link :to="'/forgetpassword'">
                                    Forgot
                                    password?
                                </router-link>
                            </span>
                        </div>
                        <Button label="Sign In" class="w-full " @click="login" severity="warn"></Button>
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

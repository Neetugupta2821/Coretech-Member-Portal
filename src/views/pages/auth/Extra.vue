<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { baseUrl } from '@/Api/BaseUrl';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const router = useRouter();

// Error messages
const errors = ref({
    email: '',
    password: ''
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
onMounted(() => {
    if (localStorage.getItem('rememberMe') === 'true') {
        email.value = localStorage.getItem('savedEmail') || '';
        password.value = localStorage.getItem('savedPassword') || '';
        rememberMe.value = true;
    }
});

const validateForm = () => {
    // Reset errors
    errors.value = { email: '', password: '' };

    let isValid = true;

    // Validate Email
    if (!email.value.trim()) {
        errors.value.email = "Email is required.";
        isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
        errors.value.email = "Enter a valid email address.";
        isValid = false;
    }

    // Validate Password
    if (!password.value.trim()) {
        errors.value.password = "Password is required.";
        isValid = false;
    } else if (!passwordRegex.test(password.value.trim())) {
        errors.value.password = "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character"
        isValid = false;
    }
    return isValid;
};

const login = async () => {
    if (!validateForm()) return;
    try {
        const credentials = {
            email: email.value.trim(),
            password: password.value.trim()
        };

        const response = await axios.post(`${baseUrl}child/login/`, credentials);
        if (response.data.success) {
            console.log('Login successful:', response.data);

            // Store token in localStorage
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            localStorage.setItem('child', JSON.stringify(response.data.child));
            localStorage.setItem('uuid', response.data.child.uuid || '');
            localStorage.setItem('email', response.data.child.email || '');
            localStorage.setItem('firstname', response.data.child.firstname || '');
            localStorage.setItem('lastname', response.data.child.lastname || '');
            localStorage.setItem('company', response.data.child.company || '');
            localStorage.setItem('street', response.data.child.street || '');
            localStorage.setItem('phone', response.data.child.phone || '');
            localStorage.setItem('zipcode', response.data.child.zipcode || '');
            localStorage.setItem('city', response.data.child.city || '');
            localStorage.setItem('country', response.data.child.country || '');
            localStorage.setItem('vatid', response.data.child.vatid || '');
            localStorage.setItem('isAuthenticated', 'true');

            // "Remember Me" functionality
            if (rememberMe.value) {
                localStorage.setItem('rememberMe', 'true');
                localStorage.setItem('savedEmail', email.value);
                localStorage.setItem('savedPassword', password.value);
            } else {
                localStorage.removeItem('rememberMe');
                localStorage.removeItem('savedEmail');
                localStorage.removeItem('savedPassword');
            }

            router.push('/');
        } else {
            errors.value.password = "Invalid email or password.";
        }
    } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message);
        errors.value.password = "Login failed. Please try again.";
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
                            <img src="../../../assets/images/logo.png" alt="coretechlogo" class="w-40">
                        </div>
                        <div class="text-surface-0 text-3xl font-medium mb-4">Welcome to Coretech</div>
                        <span class="text-muted-color font-medium">Please sign in to manage your services</span>
                    </div>
                    <div>
                        <label for="email1"
                            class="block text-muted-color dark:text-surface-0 font-medium mb-2">Email</label>
                        <InputText name="email" id="email1" type="text" placeholder="Email address"
                            class="w-full md:w-[30rem] mb-2" v-model="email" />
                        <p class="text-red-500 text-sm mb-4" v-if="errors.email">{{ errors.email }}</p>

                        <label for="password1"
                            class="block text-muted-color dark:text-surface-0 font-medium mb-2">Password</label>
                        <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true"
                            class="mb-2 w-full md:w-[30rem]" fluid :feedback="false"></Password>
                        <p class="text-red-500 text-sm mb-4" v-if="errors.password">{{ errors.password }}</p>

                        <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                            <div class="flex items-center">
                                <Checkbox v-model="rememberMe" id="rememberme1" binary class="mr-2" severity="warn">
                                </Checkbox>
                                <label for="rememberme1"
                                    class="block text-muted-color dark:text-surface-0 font-medium">Remember me</label>
                            </div>
                            <span class="font-medium no-underline ml-2 text-right cursor-pointer text-orange-400">
                                <router-link :to="'/forgetpassword'">Forgot password?</router-link>
                            </span>
                        </div>
                        <Button @click="login" label="Sign In" class="w-full !bg-orange-400 !border-none"></Button>
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

.pi-eye,
.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>

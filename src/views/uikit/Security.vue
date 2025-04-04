<script setup>
import { ref } from 'vue';
import { baseUrl } from '@/Api/BaseUrl';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const visible = ref(false);
const old_password = ref('');
const new_password = ref('');
const confirm_new_password = ref('');
const assessToken = localStorage.getItem('access_token');

// Reactive object to store validation errors
const errors = ref({
    old_password: '',
    new_password: '',
    confirm_new_password: '',
    general: ''
});

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const Resetpassword = async () => {
    errors.value = { old_password: '', new_password: '', confirm_new_password: '', general: '' };
    old_password.value = old_password.value.trim();
    new_password.value = new_password.value.trim();
    confirm_new_password.value = confirm_new_password.value.trim();

    // Validation Checks
    if (!old_password.value) {
        errors.value.old_password = "Please enter your old password";
    }
    if (!new_password.value) {
        errors.value.new_password = "Please enter a new password";
    }
    if (!confirm_new_password.value) {
        errors.value.confirm_new_password = "Please confirm your new password";
    }
    if (errors.value.old_password || errors.value.new_password || errors.value.confirm_new_password) {
        return;
    }
    if (!passwordRegex.test(new_password.value)) {
        errors.value.new_password = "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character";
        return;
    }
    if (old_password.value === new_password.value) {
        errors.value.new_password = "New password cannot be the same as the old password";
        return;
    }
    if (new_password.value !== confirm_new_password.value) {
        errors.value.confirm_new_password = "New password and confirm password do not match";
        return;
    }
    try {
        const credentials = {
            old_password: old_password.value,
            new_password: new_password.value,
            confirm_new_password: confirm_new_password.value,
        };

        const response = await axios.post(`${baseUrl}change_password/`, credentials, {
            headers: {
                Authorization: `Bearer ${assessToken}`,
                "Content-Type": "application/json",
            }
        });

        if (response.data.Status === "True") {
            console.log("Reset Password successfull:", response.data);
            toast.success("User Reset Password Successfull!", {
                autoClose: 2000,
            });
            old_password.value = "";
            new_password.value = "";
            confirm_new_password.value = "";
            visible.value = false;
        } else {
            errors.value.general = "Password reset failed. Please try again.";
        }
    } catch (error) {
        console.error('Password reset error:', error.response ? error.response.data : error.message);
        errors.value.general = error.response?.data?.message || "Something went wrong. Please try again.";
    }
};
</script>

<template>
    <div class="mb-4 text-xl mt-4">Password</div>
    <Button class="bg-orange-400/10" type="submit" label="Reset Password" @click="visible = true" />

    <div class="card flex justify-center">
        <Dialog v-model:visible="visible" modal header="Reset Password" :style="{ width: '25rem' }">
            <div class="card flex flex-col justify-start">
                <div class="mb-4">
                    <label for="old_password">Old Password</label>
                    <Password id="old_password" v-model="old_password" :toggleMask="true" fluid :feedback="false"
                        class="w-full mb-1" />
                    <p v-if="errors.old_password" class="text-red-500 text-sm">{{ errors.old_password }}</p>
                </div>
                <div class="mb-4">
                    <label for="new_password">New Password</label>
                    <Password id="new_password" v-model="new_password" :toggleMask="true" fluid :feedback="false"
                        class="w-full mb-1" />
                    <p v-if="errors.new_password" class="text-red-500 text-sm">{{ errors.new_password }}</p>
                </div>
                <div class="mb-4">
                    <label for="confirm_new_password">Confirm Password</label>
                    <Password id="confirm_new_password" v-model="confirm_new_password" :toggleMask="true" fluid
                        :feedback="false" class="w-full mb-1" />
                    <p v-if="errors.confirm_new_password" class="text-red-500 text-sm">{{ errors.confirm_new_password }}
                    </p>
                </div>
                <!-- General Error -->
                <p v-if="errors.general" class="text-red-500 text-sm mb-4">{{ errors.general }}</p>
            </div>
            <template #footer>
                <Button label="Cancel" severity="danger" outlined @click="visible = false" autofocus />
                <Button label="Save" severity="warn" outlined @click="Resetpassword" autofocus />
            </template>
        </Dialog>
    </div>
</template>

<style scoped>
.pi-eye,
.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>

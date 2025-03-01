<script setup>
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { baseUrl } from '@/Api/BaseUrl';
import axios from 'axios';
const visible = ref(false);
const old_password = ref('');
const new_password = ref('');
const confirm_new_password = ref('');
const assessToken = localStorage.getItem('access_token');

const Resetpassword = async () => {
    if (!old_password.value) {
        toast.error("Please enter oldpassword", { autoClose: 1000 });
        return;
    }
    if (!new_password.value) {
        toast.error("Please enter new password", { autoClose: 1000 });
        return;
    }
    if (!confirm_new_password.value) {
        toast.error("Please enter confirm password", { autoClose: 1000 });
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
            console.error('Reset Password Failed!', response);
            toast.error("User Reset Password Failed!", {
                autoClose: 2000,
            })
        }
    } catch (error) {
        console.error('Reset Password error:', error.response ? error.response.data : error.message);
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message, { autoClose: 1000 });
        } else {
            toast.error("User Reset Password Failed!", { autoClose: 1000 });
        }
    }
}
</script>

<template>
    <div class="mb-4 text-xl mt-4">Password</div>
    <Button class="bg-orange-400/10" type="submit" label="Reset Pasword" @click="visible = true" />
    <div class="card flex justify-center">
        <Dialog v-model:visible="visible" modal header="Reset Password" :style="{ width: '25rem' }">
            <div class="card flex flex-wrap justify-start items-end">
                <label for="oldpassword">Old Password</label>
                <Password id="old_password" v-model="old_password" :toggleMask="true" fluid :feedback="false"
                    class="w-full mb-2" />
                <label for="newpassword">New Password</label>
                <Password id="new_password" v-model="new_password" :toggleMask="true" fluid :feedback="false"
                    class="mb-2 w-full" />
                <label for="confirmpassword">Confirm Password</label>
                <Password id="confirm_new_password" v-model="confirm_new_password" :toggleMask="true" fluid
                    :feedback="false" class="w-full mb-2" />
            </div>
            <template #footer>
                <Button label="Cancel" text severity="secondary" @click="visible = false" autofocus />
                <Button label="Save" outlined severity="secondary" @click="Resetpassword" autofocus />
            </template>
        </Dialog>
    </div>
</template>
<style scoped>
.notify {
    padding: 10px;
    border-radius: 5px;
    /* box-shadow: 3px 4px 5px rgba(245, 131, 78, 0.24); */
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

<template>
    <div class="flex flex-col justify-center items-center">
        <TheForm class=" block" :form-fields="formFields" hasSubmitButton @submit="registerUser"
            @input="updateFormValues" />
        <TheButton classes=" text-lg" label="Login instead" :outline="false" @click="router.push('/login')" />
    </div>
</template>

<script setup>
import useAuthStore from '../../stores/auth.js'
import TheForm from './../Forms/TheForm.vue'
import TheButton from '../Forms/TheButton.vue';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const authStore = useAuthStore()
const formValues = ref(null)

const updateFormValues = (data) => {
    formValues.value = { ...data }
}
const registerUser = async (credentials) => {
    authStore.register(credentials)
}

const formFields = ref([
    {
        variable: 'email',
        label: 'Email',
        placeholder: 'email',
        defaultValue: '',
        type: 'email',
    },
    {
        variable: 'username',
        label: 'Username',
        placeholder: 'username',
        defaultValue: '',
        type: 'text',
    },
    {
        variable: 'password',
        label: 'Password',
        placeholder: 'password',
        defaultValue: '',
        type: 'password',
    },
    {
        variable: 'confirmPassword',
        label: 'Repeat password',
        placeholder: 'password',
        defaultValue: '',
        type: 'password',
    },
])
</script>
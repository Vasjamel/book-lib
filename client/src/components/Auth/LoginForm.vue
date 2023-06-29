<template>
    <div class="flex flex-col justify-center items-center">
        <TheForm class=" block" :form-fields="loginFields" hasSubmitButton @submit="loginUser" @input="updateFormValues" />
        <TheButton classes=" text-lg" label="Register instead" :outline="false" @click="router.push('/register')" />
    </div>
</template>

<script setup>
import useAuthStore from '../../stores/auth.js'
import TheButton from '../Forms/TheButton.vue';
import TheForm from './../Forms/TheForm.vue'
import { ref } from 'vue';

import { useRouter } from 'vue-router';

const router = useRouter()
const authStore = useAuthStore()
const formValues = ref(null)

const updateFormValues = (data) => {
    formValues.value = { ...data }
}
const loginUser = async (credentials) => {
    authStore.login(credentials)
}

const loginFields = ref([
    {
        variable: 'email',
        label: 'Email',
        placeholder: 'email',
        defaultValue: '',
        type: 'email',
    },
    {
        variable: 'password',
        label: 'Password',
        placeholder: 'password',
        defaultValue: '',
        type: 'password',
    },
])
</script>
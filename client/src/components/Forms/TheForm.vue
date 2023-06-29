<template>
    <div v-for="field in formFields" :key="field.variable" @keydown.enter="submitForm">
        <TextInput v-if="getFieldType(field) === 'text'" :type="field.type" :placeholder="field.placeholder"
            :label="field.label" :defaultValue="field.defaultValue" :variable="field.variable" @input="handleInput" />
        <CheckboxInput v-if="getFieldType(field) === 'checkbox'" :type="field.type" :placeholder="field.placeholder"
            :label="field.label" :defaultValue="field.defaultValue" :variable="field.variable" @input="handleInput" />
        <DropdownInput v-if="getFieldType(field) === 'dropdown'" :placeholder="field.placeholder" :label="field.label"
            :defaultValue="field.defaultValue" :variable="field.variable" :options="field.options"
            :multiple="!!field.multiple" @input="handleInput" />
    </div>
    <div class=" my-8" v-if="hasSubmitButton">
        <TheButton type="accent" classes=" text-lg" label="Submit!" @click="submitForm" />
    </div>
</template>

<script setup>
import TextInput from './TextInput.vue'
import CheckboxInput from './CheckboxInput.vue';
import DropdownInput from './DropdownInput.vue';
import { reactive } from 'vue';
import TheButton from './TheButton.vue';

const props = defineProps({
    formFields: {
        type: Array,
        required: true
    },
    hasSubmitButton: {
        type: Boolean,
        default: false,
    }
})

const emit = defineEmits(["submit", 'input'])

const getFieldType = ({ type }) => {
    switch (type) {
        case !type:
            return 'text'
        case 'select':
            return 'dropdown'
        case 'select':
            return 'select'
        case 'password':
            return 'text'
        case 'email':
            return 'text'
        default:
            return type
    }
}

const formValue = reactive({})
const handleInput = ({ variable, value }) => {
    formValue[variable] = value
    emit('input', formValue)
}

const submitForm = () => {
    emit("submit", formValue)
}


</script>
<template>
    <div class="my-4">
        <div>
            <label :for="variable">{{ label }}</label>
        </div>
        <select class="p-2 border-solid border-1 border-secondary-color" v-model="inputValue" :id="variable">
            <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps(["type", "placeholder", "label", "defaultValue", "options", "variable", "multiple"])
const emit = defineEmits(["input"])
const inputValue = ref('')

onMounted(() => {
    inputValue.value = props.defaultValue.value || ''
})

watch(inputValue, (value, oldValue) => {
    if (oldValue !== value) {
        emit('input', { variable: props.variable, value })
    }
})
</script>
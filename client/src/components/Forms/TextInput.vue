<template>
    <div class="my-4">
        <div>
            <label :for="variable">{{ label }}</label>
        </div>
        <input class="p-2 border-solid border-2 border-secondary-color" :id="variable" :type="type"
            :placeholder="placeholder" v-model="inputValue">
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps(["type", "placeholder", "label", "defaultValue", "variable"])
const emit = defineEmits(["input"])
const inputValue = ref('')

onMounted(() => {
    inputValue.value = props.defaultValue || ''
})

watch(inputValue, (value, oldValue) => {
    if (oldValue !== value) {
        emit('input', { variable: props.variable, value })
    }
})

</script>
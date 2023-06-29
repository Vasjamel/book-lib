<script setup>
import { computed } from 'vue'

const emit = defineEmits(['click'])

const props = defineProps({
    type: {
        type: String,
        default: 'primary'
    },
    label: {
        type: String,
        default: ''
    },
    classes: {
        type: String,
        default: ''
    },
    outline: {
        type: Boolean,
        default: true
    }
})

const buttonStyle = computed(() => {
    if (props.type === 'primary') {
        return 'border-accent-color border-solid rounded-lg p-1'
    }
    if (props.type === 'accent') {
        return 'bg-accent-color p-4 px-8 border-none text-primary-color '
    }
    return ''
})

</script>

<template>
    <button :class="[buttonStyle, classes, { 'border-none': !props.outline }]"
        class=" border-primary-color border-solid border-2 rounded-lg max-w-lg text-sm" @click="emit('click')">
        <slot v-if="!label?.length"></slot>
        <span v-else>{{ label }}</span>
    </button>
</template>
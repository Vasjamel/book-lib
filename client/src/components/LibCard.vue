<script setup>
import { computed } from 'vue'
const props = defineProps({
    book: {
        type: Object,
        default: () => ({})
    }
})

const genre = computed(() => Array.isArray(props.book.genre) ? props.book.genre[0] : props.book.genre)

</script>

<template>
    <section
        class="mt-4 border-solid border-2 border-accent-color rounded-lg min-w-64 max-w-68 hover:border-4  h-auto py-4  box-border">
        <slot v-if="!Object.keys(book).length"></slot>
        <div v-else class="flex flex-col items-center p-2 text-primary-color hover:cursor-pointer">
            <img class="w-68 max-h-80 rounded-lg" v-if="book.image" :src="book.image" :alt="book.title" />
            <div v-else class="w-68 h-80  bg-gray-300 rounded-lg flex justify-center items-center p-4 text-center">
                <h1>Unfortunately no image</h1>
            </div>
            <h2 class="font-extrabold text-2xl">
                {{ book.title }}
            </h2>
            <h2 class="text-xl text-secondary-color" v-if="book.author">
                {{ book.author.name }}
            </h2>
            <div class=" p-1 rounded-full text-xs font-medium bg-accent-color text-white m-0.5">
                {{ genre }}
            </div>
        </div>
    </section>
</template>
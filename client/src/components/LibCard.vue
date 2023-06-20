<script setup>
defineProps({
    book: {
        type: Object,
        default: () => ({})
    }
})
</script>

<template>
    <section
        class="mt-4 border-solid border-2 border-accent-color rounded-lg min-w-64 max-w-68 flex flex-col items-center p-2 text-primary-color hover:border-8 hover:cursor-pointer box-border">
        <img class="w-68 max-h-80 rounded-lg" v-if="book.image" :src="book.image" />
        <div v-else class="w-68 h-80  bg-gray-300 rounded-lg flex justify-center items-center p-4 text-center">
            <h1>Unfortunately no image</h1>
        </div>
        <h2 class="font-extrabold text-2xl">
            {{ book.title }}
        </h2>
        <h2 class="text-xl text-secondary-color">
            {{ book.author.name }}
        </h2>
        <div v-for="genre in book.genre" :key="genre"
            class=" p-1 rounded-full text-xs font-medium bg-accent-color text-white m-0.5">
            {{ genre }}
        </div>
    </section>
</template>
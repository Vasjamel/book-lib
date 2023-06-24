<script setup>
import TheHeader from './components/Header/TheHeader.vue';

</script>

<template>
  <section class="relative min-h-screen">
    <TheHeader />

    <main class="flex justify-center">
      <RouterView class="w-4/5" />
    </main>

    <!-- <footer class="absolute bottom-0 w-full mt-10 text-center text-secondary-color border-t-2 border-accent-color">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt possimus voluptas quis saepe ratione inventore
      molestias beatae hic, ea quas eveniet earum numquam necessitatibus iusto reiciendis! Totam consequatur animi omnis!
    </footer> -->
  </section>
</template>

<style scoped></style>

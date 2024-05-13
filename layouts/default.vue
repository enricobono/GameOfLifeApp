<script setup>

</script>

<template>
  <div class="p-4  mx-auto">
    <header class="flex items-center justify-between mb-8">
      <NuxtLink
          to="/"
          class="text-3xl font-black" style="color: #ff4758">
        WE<span style="color: #4d4d4d">LIFE</span>
      </NuxtLink>
      <div
          class="flex items-center gap-2">
      </div>
    </header>
    <slot/>
  </div>
</template>
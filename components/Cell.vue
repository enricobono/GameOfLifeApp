<script setup>

defineProps({
  isCellAlive: {
    type: Boolean,
    required: true
  }
})

</script>

<template>
  <div class="w-6 h-6" :class="{'bg-slate-300': !isCellAlive, 'bg-red-600': isCellAlive}"></div>
</template>
<script setup>

const emit = defineEmits(['cellClicked'])

defineProps({
  r: {
    type: Number,
    required: true
  },
  c: {
    type: Number,
    required: true
  },
  isCellAlive: {
    type: Boolean,
    required: true
  }
})

</script>

<template>
  <div class="w-6 h-6" :class="{'bg-slate-300': !isCellAlive, 'bg-red-600': isCellAlive}"
       @click="emit('cellClicked', [r, c])"></div>
</template>
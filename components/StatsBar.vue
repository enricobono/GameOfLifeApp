<script setup>

defineProps({
  aliveCells: {
    type: Number,
    required: true
  },
  ticks: {
    type: Number,
    required: true
  }
})

</script>

<template>
  <div>
    Alive cells: {{ aliveCells }} - Ticks: {{ ticks }}
  </div>
</template>
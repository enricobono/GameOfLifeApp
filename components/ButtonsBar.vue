<script setup>

const emit = defineEmits([
  'startButtonClicked',
  'nextTickButtonClicked',
  'stopButtonClicked',
  'cleanButtonClicked'
])

defineProps({
  isGameActive: {
    type: Boolean,
    required: true
  },
  aliveCells: {
    type: Number,
    required: true
  }
})

</script>


<template>
  <div>
    <button
        class="bg-blue-600 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200
        text-white px-4 py-1 mr-1 rounded-lg" @click="emit('startButtonClicked')"
        :disabled="isGameActive || aliveCells === 0">
      Start
    </button>
    <button
        class="bg-blue-600 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200
        text-white px-4 py-1 mr-1 rounded-lg" @click="emit('nextTickButtonClicked')"
        :disabled="isGameActive || aliveCells === 0">
      Next tick
    </button>
    <button
        class="bg-blue-600 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200
        text-white px-4 py-1 mr-1 rounded-lg" @click="emit('stopButtonClicked')"
        :disabled="!isGameActive">
      Stop
    </button>
    <button
        class="bg-blue-600 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200
        text-white px-4 py-1 mr-1 rounded-lg" @click="emit('cleanButtonClicked')"
        :disabled="isGameActive || aliveCells === 0">
      Clean map
    </button>
  </div>
</template>
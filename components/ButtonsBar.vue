<script setup>

const emit = defineEmits([
  'startButtonClicked',
  'nextTickButtonClicked',
  'pauseButtonClicked',
  'cleanButtonClicked',
  'loadMapButtonClicked'
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
  <div class="flex flex-row items-center justify-between">
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
        text-white px-4 py-1 mr-1 rounded-lg" @click="emit('pauseButtonClicked')"
          :disabled="!isGameActive">
        Pause
      </button>

    </div>
    <div>

      <button
          class="bg-blue-600 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200
        text-white px-4 py-1 ml-4 mr-1 rounded-lg" @click="emit('cleanButtonClicked')"
          :disabled="isGameActive || aliveCells === 0">
        Clean map
      </button>
      <button
          class="bg-blue-600 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200
        text-white px-4 py-1 mr-1 rounded-lg" @click="emit('loadMapButtonClicked')"
          :disabled="isGameActive">
        Load random map
      </button>

    </div>
  </div>
</template>
<script setup>

const emit = defineEmits(['cellClicked'])

defineProps({
  cells: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="flex flex-col space-y-1 p-1 border-2 w-min mt-2">

    <div v-for="(row, r) in cells">
      <div class="flex flex-row space-x-1">
        <div v-for="(cell, c) in row">
          <Cell
              :isCellAlive="cell"
              @click="emit('cellClicked', r, c);"
          />
        </div>
      </div>
    </div>

  </div>
</template>
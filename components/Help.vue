<script setup>

</script>

<template>
  <div class="mt-2 space-y-2">

    <h2 class="font-bold text-2xl">Game of Life</h2>

    <p>
      The
      <NuxtLink
          to="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank"
          class="text-sky-700 underline">
        Game of Life
      </NuxtLink>
      is a cellular automaton devised by the British mathematician John Horton Conway in 1970.
    </p>

    <p>
      Each cell is in one of two
      possible states, live or dead. Every cell interacts with its eight neighbors. At each step in time, the following transitions occur:
    </p>

    <ul class="list-inside list-disc">
      <li>Any live cell with fewer than two live neighbors dies, as if by underpopulation</li>
      <li>Any live cell with more than three live neighbors dies, as if by overpopulation</li>
      <li>Any live cell with two or three live neighbors lives</li>
      <li>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction</li>
    </ul>

    <p>
      Click on any cell to start playing (or load a random map if you are <i>that</i> tired)! 😊
    </p>

  </div>
</template>
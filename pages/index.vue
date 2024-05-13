<script setup>
import StatsBar from "../components/StatsBar.vue";

// Configuration
const mapWidth = 50;
const mapHeight = 30;
const timeout = 125

const cells = ref([[]]);
const interval = ref(undefined)
const aliveCells = ref(0)
const ticks = ref(0)


function clearMap() {
  for (let r = 0; r < mapHeight; r++) {
    cells.value[r] = []
    for (let c = 0; c < mapWidth; c++) {
      cells.value[r][c] = false
    }
  }

  aliveCells.value = 0
  ticks.value = 0
}

function toggleCell(r, c) {
  cells.value[r][c] = !cells.value[r][c]

  if (cells.value[r][c]) {
    aliveCells.value++
  } else {
    aliveCells.value--
  }
}

function isCellAlive(r, c) {
  return cells.value[r][c]
}

function iterate() {
  ticks.value++

  const togglingCells = []

  for (let r = 0; r < mapHeight; r++) {
    for (let c = 0; c < mapWidth; c++) {

      let isAlive = isCellAlive(r, c)
      let aliveCells = countAliveSurroundingCells(r, c);


      if (!isAlive && aliveCells === 3) {
        togglingCells.push({r, c});
      }

      if (isAlive) {
        if (aliveCells < 2 || aliveCells > 3) {
          togglingCells.push({r: r, c: c});
        }
      }
    }
  }

  // Finally update the cells
  for (let cell of togglingCells) {
    toggleCell(cell.r, cell.c)
  }

  // Stop if no cells alive
  if (aliveCells.value === 0) {
    stopGame()
  }
}


function countAliveSurroundingCells(r, c) {
  let aliveCells = 0

  for (let offsetCol = -1; offsetCol <= 1; offsetCol++) {
    for (let offsetRow = -1; offsetRow <= 1; offsetRow++) {
      //Same cell
      if (offsetCol === 0 && offsetRow === 0) {
        continue
      }

      let neighbourRow = r + offsetCol
      let neighbourCol = c + offsetRow

      // Out of map
      if (neighbourRow < 0 || neighbourRow >= mapHeight) {
        continue
      }
      if (neighbourCol < 0 || neighbourCol >= mapWidth) {
        continue
      }

      // Surrounding cell is not alive
      if (!cells.value[neighbourRow][neighbourCol]) {
        continue
      }

      aliveCells++
    }
  }

  return aliveCells
}

function startGame() {
  interval.value = setInterval(iterate, timeout);
}

function stopGame() {
  clearInterval(interval.value)
  interval.value = undefined;
}

clearMap()


</script>

<template>
  <div class="w-min">
    <div class="flex flex-row items-center justify-between">
      <ButtonsBar
          @startButtonClicked="startGame"
          @nextTickButtonClicked="iterate"
          @stopButtonClicked="stopGame"
          @cleanButtonClicked="clearMap"
          :isGameActive="interval !== undefined"
          :aliveCells="aliveCells"
      />
      <StatsBar
          :aliveCells="aliveCells"
          :ticks="ticks"
      />
    </div>
    <div class="mt-2" id="map">

      <div class="flex flex-col space-y-1 p-1 border-2 w-min">

        <div v-for="(row, r) in cells">
          <div class="flex flex-row space-x-1">
            <div v-for="(cell, c) in row">
              <Cell
                  :r="r" :c="c" :isCellAlive="cell"
                  @cellClicked="toggleCell(r, c)"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

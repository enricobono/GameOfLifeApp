<script setup>
import StatsBar from "../components/StatsBar.vue";
import Map from "../components/Map.vue";
import {useMapStore} from "../stores/mapStore";


const mapStore = useMapStore()

// Configuration
const mapCols = 50
const mapRows = 20
const border = 3

const timeout = 125
const ticks = ref(0)
const cells = ref([[]])
const interval = ref(undefined)
const aliveCells = ref(0)

function clearMap() {
  for (let r = 0; r < mapRows; r++) {
    cells.value[r] = []
    for (let c = 0; c < mapCols; c++) {
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

  const cellsToToggle = []

  for (let r = 0; r < mapRows; r++) {
    for (let c = 0; c < mapCols; c++) {

      let isAlive = isCellAlive(r, c)
      let aliveNeighbours = countAliveNeighbours(r, c);

      if (!isAlive && aliveNeighbours === 3) {
        cellsToToggle.push({r, c});
      }

      if (!isAlive) {
        continue;
      }

      if (aliveNeighbours >= 2 && aliveNeighbours <= 3) {
        continue
      }

      cellsToToggle.push({r: r, c: c});
    }
  }

  // Finally update the cells
  for (let cell of cellsToToggle) {
    toggleCell(cell.r, cell.c)
  }

  // Stop if no more cells alive
  if (aliveCells.value === 0) {
    stopGame()
  }
}

function countAliveNeighbours(r, c) {
  let aliveNeighbours = 0

  for (let offsetCol = -1; offsetCol <= 1; offsetCol++) {
    for (let offsetRow = -1; offsetRow <= 1; offsetRow++) {
      //Same cell
      if (offsetCol === 0 && offsetRow === 0) {
        continue
      }

      let neighbourRow = r + offsetCol
      let neighbourCol = c + offsetRow

      // Out of map
      if (neighbourRow < 0 || neighbourRow >= mapRows) {
        continue
      }
      if (neighbourCol < 0 || neighbourCol >= mapCols) {
        continue
      }

      // Surrounding cell is not alive
      if (!cells.value[neighbourRow][neighbourCol]) {
        continue
      }

      aliveNeighbours++
    }
  }

  return aliveNeighbours
}

function startGame() {
  interval.value = setInterval(iterate, timeout);
}

function stopGame() {
  clearInterval(interval.value)
  interval.value = undefined;
}

function createMap() {
  clearMap();

  mapStore.createMap(mapRows, mapCols, border).then((results) => {
    cells.value = results

    countAliveCells()
  });
}

function countAliveCells() {
  for (let r = 0; r < mapRows; r++) {
    for (let c = 0; c < mapCols; c++) {
      aliveCells.value += cells.value[r][c] ? 1 : 0
    }
  }
}

clearMap()

</script>

<template>
  <div class="w-min">
    <ButtonsBar
        @startButtonClicked="startGame"
        @nextTickButtonClicked="iterate"
        @stopButtonClicked="stopGame"
        @cleanButtonClicked="clearMap"
        @loadMapButtonClicked="createMap"
        :aliveCells="aliveCells"
        :isGameActive="interval !== undefined"
    />
    <Map
        :cells="cells"
        @cellClicked="toggleCell"/>
    <StatsBar
        :aliveCells="aliveCells"
        :ticks="ticks"
    />
    <Help/>
  </div>
</template>

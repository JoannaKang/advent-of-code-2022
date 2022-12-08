// A tree is visible if all of the other trees between it and an edge of the grid are shorter than it
// Only consider trees in the same row or column; that is, only look up, down, left, or right from any given tree.
// All of the trees around the edge of the grid are visible - since they are already on the edge, there are no trees to block the view.

const { readFileSync } = require('fs')
// const rawInput = readFileSync('./input.txt').toString().split('\n')
const rawInput = readFileSync('./example.txt').toString().split('\n')

let grid = rawInput.map(line => [...line])

let noOfVisibleTree = 0

const gridSize = grid[0].length
const insideGridSize = grid[0].length-2 
for (let row = 0; row < gridSize; row ++) {
  for (let column = 0; column < gridSize; column++) {
    if (row === 0 || column === 0 || row === gridSize-1 || column === gridSize-1) {
      noOfVisibleTree++
    } else {
      console.log(`✅grid ${row} ${column}:`, grid[column][row])
    }

    // 좌표가 [1],[1] ->  
    // check [2],[1] / [3][1] 
    
  }
}

// console.log(noOfVisibleTree)
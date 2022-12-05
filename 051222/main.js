//                 [V]     [C]     [M]
// [V]     [J]     [N]     [H]     [V]
// [R] [F] [N]     [W]     [Z]     [N]
// [H] [R] [D]     [Q] [M] [L]     [B]
// [B] [C] [H] [V] [R] [C] [G]     [R]
// [G] [G] [F] [S] [D] [H] [B] [R] [S]
// [D] [N] [S] [D] [H] [G] [J] [J] [G]
// [W] [J] [L] [J] [S] [P] [F] [S] [L]
//  1   2   3   4   5   6   7   8   9

let stacks = [
  ['V', 'R', 'H', 'B', 'G', 'D', 'W'],
  ['F','R','C','G','N','J'],
  ['J', 'N', 'D', 'H', 'F', 'S', 'L'],
  ['V', 'S', 'D','J'],
  ['V', 'N', 'W', 'Q', 'R', 'D', 'H', 'S'],
  ['M', 'C', 'H', 'G', 'P'],
  ['C', 'H', 'Z', 'L', 'G', 'B', 'J', 'F'],
  ['R', 'J', 'S'],
  ['M', 'V', 'N', 'B', 'R', 'S', 'G', 'L']
]

const { readFileSync } = require('fs')

const rawInput = readFileSync('./input.txt').toString().split('\n')

const reversedStacks = stacks.map(stack => stack.reverse())

const parsedOrder = rawInput.map(item => item.split(' '))

// Q1
parsedOrder.forEach(order => {
  const quantity = parseInt(order[1])
  const from = parseInt(order[3]) - 1
  const to = parseInt(order[5]) - 1

  for (let i = 0; i < quantity; i ++) {
    if (reversedStacks[from].length === 0) break
    const addingItem = reversedStacks[from].pop()
    reversedStacks[to].push(addingItem)
  }
})

const answer1 = reversedStacks.map(stack => stack.slice(-1))
console.log(answer1.join(''))

// Q2
parsedOrder.forEach(order => {
  const quantity = parseInt(order[1])
  const from = parseInt(order[3]) - 1
  const to = parseInt(order[5]) - 1 

  if (stacks[from].length === 0) return
  const cargo = stacks[from].slice(0, quantity)
  stacks[from].splice(0, quantity)
  stacks[to].unshift(...cargo)
})

const answer2 = stacks.map(stack => stack.slice(0,1))
console.log(answer2.join(''))
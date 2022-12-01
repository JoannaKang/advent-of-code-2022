// Find the elf carrying the most calories
// How many total Calories is that elf is carrying?

const { readFileSync } = require('fs')

const rawInput = readFileSync('./input.txt').toString().split('\n\n')

const regx = /\n/g
const parsedInput = rawInput.map(item => item.replace(regx, ',').split(','))

const calculateSumOfItem = (input) => input.reduce((a, b) => parseInt(a) + parseInt(b))

const arrOfSum = parsedInput.map(input => calculateSumOfItem(input))

const answer1 = Math.max(...arrOfSum)

console.log(answer1)

const top3Elves = arrOfSum.sort((a, b) => b - a).slice(0, 3)
const answer2 = calculateSumOfItem(top3Elves)

console.log(answer2)

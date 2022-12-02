// First column - Opponent 
// A - Rock
// B - Paper
// C - Scissors

// Second colum - Response 
// X - Rock 
// Y - Paper
// Z - Scissors

// Total score = sum of your scores for each round
// The socre for a single round = the shape you selected + outcome of round
// X - Rock - 1
// Y - Paper - 2
// Z - Scissors - 3
// +
// Lose - 0
// win - 6
// draw - 3

const { readFileSync } = require('fs')

const rawInput = readFileSync('./input.txt').toString().replace(/X/g, 'A').replace(/Y/g, 'B').replace(/Z/g, 'C').split('\n')

const winnerDict = {
  "A A" : 3,
  "A B" : 6,
  "A C" : 0,
  "B A" : 0,
  "B B" : 3,
  "B C" : 6,
  "C A" : 6,
  "C B" : 0,
  "C C" : 3
}

const scoreDict = {
  'A' : 1,
  'B' : 2,
  'C' : 3
}

function calculatePoints (input) {
  const score = scoreDict[input[2]]
  const winningScore = winnerDict[input]
  return score + winningScore 
}

const score = rawInput.reduce((acc, curr) => acc + calculatePoints(curr), 0)

console.log(score)


// X - Lose
// Y - Draw
// Z - Win

const strategyDict = {
  "A X" : 3,
  "A Y" : 4,
  "A Z" : 8, 
  "B X" : 1,
  "B Y" : 5,
  "B Z" : 9,
  "C X" : 2,
  "C Y" : 6,
  "C Z" : 7   
}

const rawInput2 = readFileSync('./input.txt').toString().split('\n')
const score2 = rawInput2.reduce((acc, curr) => acc + strategyDict[curr], 0)

console.log(score2)
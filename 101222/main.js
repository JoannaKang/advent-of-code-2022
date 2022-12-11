// The CPU has a single register, X, which starts with the value 1. It supports only two instructions:

// addx V takes two cycles to complete. After two cycles, the X register is increased by the value V. (V can be negative.)
// noop takes one cycle to complete. It has no other effect.

const { readFileSync } = require('fs')

const rawInput = readFileSync('./input.txt').toString().split('\n')

let cycle = 0
let register = 1

const cycleResult = []

rawInput.forEach((input) => {
    const parsedInput = input.split(' ') 
    cycle ++
    cycleResult.push(register)
    if (parsedInput.length > 1) {
        cycleResult.push(register)
        cycle ++
        register += parseInt(parsedInput[1])
    }
})

// function findSignalStrength(register) {
//     for (let index = 0; index < cycleResult.length; index++) {
//         if (cycleResult[index][0] >= register) {
//             return register * cycleResult[index-1][1]
//         }     
//     }
// }

// const REGISTERS = [ 20, 60, 100, 140, 180, 220]

// let part1Answer = 0 

// REGISTERS.forEach(register => {
//     part1Answer += findSignalStrength(register)
// })

let noOfCycle = 0
let outputString = ''

for( let outerLine = 0; outerLine < 6; outerLine++) {
    for (let width = 0; width < 40; width++) {
        const registerValue = cycleResult[noOfCycle]
        if(width >= registerValue -1 && width <= registerValue +1 ) {
            outputString += '#'
        } else {
            outputString += '.'
        }
        ++noOfCycle
    }
    outputString+= '\n'
}

console.log(outputString)

    

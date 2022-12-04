// In how many assignment pairs does one range fully contain the other?
const { readFileSync } = require('fs')

const rawInput = readFileSync('./input.txt').toString().split('\n')

const parsedInput = rawInput.map(item => item.split(','))

let answer = 0

for (let i = 0; i < parsedInput.length; ++i) {
    const leftRange = parsedInput[i][0].split('-')
    const rightRange = parsedInput[i][1].split('-')

    const lr0 = parseInt(leftRange[0])
    const lr1 = parseInt(leftRange[1])
    const rr0 = parseInt(rightRange[0])
    const rr1 = parseInt(rightRange[1])

    if((lr0 >= rr0 && lr1 <= rr1) || (rr0 >= lr0 && rr1 <= lr1)) {
        ++answer
    }
}
console.log(answer)

let answer2 = 0

for (let i = 0; i < parsedInput.length; ++i) {
    const leftRange = parsedInput[i][0].split('-')
    const rightRange = parsedInput[i][1].split('-')

    const lr0 = parseInt(leftRange[0])
    const lr1 = parseInt(leftRange[1])
    const rr0 = parseInt(rightRange[0])
    const rr1 = parseInt(rightRange[1])

    const isCompletelyOutside = (rr0 > lr1) || (lr0 > rr1)
    const overlap = !isCompletelyOutside
    if(overlap) {
        ++answer2
    }
}

console.log(answer2)

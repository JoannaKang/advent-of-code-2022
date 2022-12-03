const { readFileSync } = require('fs')

const rawInput = readFileSync('./input.txt').toString().split('\n')

function convertPriority (text) {
    if (text.length !== 1) {
        throw 'text does not have length'
    }

    const ascii = text.charCodeAt();
    let score = 0

    if (ascii >= 65 && ascii <= 90) {
        score = ascii - 65 + 27
    } else {
        score = ascii - 97 + 1
    }
    return score
}

function getIntersection (set1, set2) {
    return new Set([...set1].filter(item => set2.has(item)))
}

let sum = 0;

rawInput.forEach(text => {
    const compartSize = text.length/2
    const firstInput = text.slice(0, compartSize)
    const secondInput = text.slice(compartSize)

    const set1 = new Set([...firstInput])
    const set2 = new Set([...secondInput])

    const intersection = getIntersection(set1, set2)

    sum += convertPriority([...intersection][0])
})

console.log(sum)

let sum2 = 0

for (let i = 0; i < rawInput.length/3; i++) {
    const group = rawInput.slice(i*3 , i*3+3)

    const set1 = new Set([...group[0]])
    const set2 = new Set([...group[1]])
    const set3 = new Set([...group[2]])

    const intersection2 = getIntersection(getIntersection(set1, set2), set3)
    
    sum2 += convertPriority([...intersection2][0])
}

console.log(sum2)
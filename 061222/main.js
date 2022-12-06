// To fix the communication system, you need to add a subroutine to the device that detects a start-of-packet marker in the datastream. 
// the start of a packet is indicated by a sequence of four characters that are all different.


// subroutine = 겹치지 않는 4개의 알파벳이 등장했을때의 문자열의 인덱스 

// How many characters need to be processed before the first start-of-packet marker is detected?
// subroutine까지의 문자 갯수 구하기
const { readFileSync } = require('fs')
const rawInput = readFileSync('./input.txt').toString()

for (let i = 0; i < rawInput.length; i++) {
  const packet = rawInput.slice(i, i + 4)
  const set = new Set([...packet])
  if ([...set].length === 4) {
    const totalLength = i+4
    console.log('⭐️', totalLength)
    break;
  }
}


for (let i = 0; i < rawInput.length; i++) {
  const packet = rawInput.slice(i, i + 14)
  const set = new Set([...packet])
  if ([...set].length === 14) {
    const totalLength = i+14
    console.log('⭐️', totalLength)
    break;
  }
}
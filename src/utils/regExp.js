// const reg  = /\d/g
// const str = '1a2'
// console.log(str.match(reg))
// console.log(...str.matchAll(reg))

// console.log(str.replace(reg, (num)=>num*2))
const paragraph = "I think Ruth's dog is cuter than your dog!";

console.log(paragraph.replace("Ruth's", 'my'));
// Expected output: "I think my dog is cuter than your dog!"

const regex = /Dog/i;
console.log(paragraph.replace(regex, 'ferret'));

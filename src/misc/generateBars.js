export default function generateBars(numOfBars){
let i;
let bars=[];
for (i=1;i<=numOfBars;i++){
    bars.push(Math.floor(Math.random()*55+11))
}
return bars
}

import { SlidingWindow } from "./circular-buffer.js";
const buffer = new SlidingWindow(0, 1, 2, 3, 4, 5)
    .setSpread(4);
buffer.incrementTail(3);
console.log(buffer.getWindow());
// buffer.incrementSpread(0);
// output: [0]
// buffer.incrementSpread(1);
// output: [0, 1]
// buffer.incrementSpread(2);
// output: [0, 1, 2]
// buffer.decrementSpread(3);
// output: [1, 2, 0]
// buffer.incrementTail(4);
// output: [2, 0, 1]
// buffer.incrementTail(5);
// output: [0, 1, 2]
